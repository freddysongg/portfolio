'use client';

import type { KeyboardEvent as ReactKeyboardEvent, ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { AppId, OsProject, TerminalLine } from '@/components/os/types';
import { osExperience } from '@/data/os/experience';
import { profile } from '@/data/os/profile';
import { osProjects } from '@/data/os/projects';

interface TerminalWindowProps {
  openApp: (id: AppId) => void;
  onOpenProject: (project: OsProject) => void;
}

interface CommandContext {
  args: string[];
  cwd: string;
  setCwd: (next: string) => void;
  openApp: (id: AppId) => void;
  openProject: (project: OsProject) => void;
  append: (lines: TerminalLine[]) => void;
  clearLines: () => void;
}

type CommandHandler = (ctx: CommandContext) => void | Promise<void>;

interface CommandSpec {
  desc: string;
  hidden?: boolean;
  run: CommandHandler;
}

interface TabCycleState {
  prefix: string;
  candidates: string[];
  index: number;
  lastSet: string;
}

const HISTORY_LIMIT = 30;
const HOME_PATH = '~';
const VALID_APPS: ReadonlyArray<AppId> = [
  'about',
  'projects',
  'experience',
  'feed',
  'finder',
  'music',
  'terminal',
];
const LS_DIRS: ReadonlyArray<string> = ['projects', 'work', 'music'];
const CD_TARGETS: ReadonlyArray<string> = [...LS_DIRS, HOME_PATH, '..'];
const MATRIX_GLYPHS =
  'アァカサタナハマヤラワガザダバパイィキシチニヒミリ0123456789ABCDEF$#@';
const MATRIX_DURATION_MS = 5000;
const MATRIX_TICK_MS = 90;
const MATRIX_COLS = 38;
const SECRETS: ReadonlyArray<string> = [
  'first site i ever shipped was a rotating cube of cat photos.',
  'i debug at 2am with lo-fi and oolong tea.',
  'i once named a feature flag `flagFlag`. nobody noticed.',
  'this terminal is fake. the typing is real.',
  'try `cd projects` then `ls`. trust me.',
  'the cow has seen things.',
  "half my best ideas show up while i'm on a walk.",
];
const PROJECT_FILES: ReadonlyArray<string> = osProjects.map(p => `${p.id}.app`);

function isAppId(value: string): value is AppId {
  return (VALID_APPS as ReadonlyArray<string>).includes(value);
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

function pickRandom<T>(items: ReadonlyArray<T>): T {
  return items[Math.floor(Math.random() * items.length)];
}

function buildMatrixRow(cols: number): string {
  let row = '';
  for (let i = 0; i < cols; i += 1) {
    row += MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
    row += ' ';
  }
  return row;
}

function formatPromptPath(cwd: string): string {
  return cwd === HOME_PATH ? '~' : `~/${cwd}`;
}

function findProjectByToken(token: string): OsProject | undefined {
  return osProjects.find(p => `${p.id}.app` === token || p.id === token);
}

const COMMANDS: Record<string, CommandSpec> = {
  help: {
    desc: 'list commands',
    run: ({ append }): void => {
      const visible = Object.entries(COMMANDS).filter(([, s]) => !s.hidden);
      const out: TerminalLine[] = [
        { type: 'out', text: 'available commands:' },
      ];
      for (const [name, spec] of visible) {
        out.push({
          type: 'out',
          text: `  ${name.padEnd(10)}— ${spec.desc}`,
        });
      }
      out.push({ type: 'out', text: '' });
      out.push({
        type: 'info',
        text: 'tip: tab autocompletes · curiosity is rewarded.',
      });
      append(out);
    },
  },
  whoami: {
    desc: 'about me',
    run: ({ append }): void => {
      append([
        { type: 'out', text: profile.name },
        { type: 'out', text: profile.role },
        { type: 'out', text: profile.bio },
      ]);
    },
  },
  ls: {
    desc: 'list a directory',
    run: ({ args, append }): void => {
      const target = args.join(' ') || 'projects';
      if (target === 'projects') {
        append([{ type: 'out', text: PROJECT_FILES.join('  ') }]);
        return;
      }
      if (target === 'work') {
        append([
          {
            type: 'out',
            text: osExperience
              .map(
                e => `${e.company.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`
              )
              .join('  '),
          },
        ]);
        return;
      }
      if (target === 'music') {
        append([
          {
            type: 'out',
            text: 'set_01_house.mp3  set_02_break.mp3  set_03_disco.mp3',
          },
        ]);
        return;
      }
      append([{ type: 'err', text: `ls: ${target}: no such directory` }]);
    },
  },
  cat: {
    desc: 'read a project file',
    run: ({ args, append }): void => {
      const target = args.join(' ');
      const proj = findProjectByToken(target);
      if (!proj) {
        append([
          {
            type: 'err',
            text: `cat: ${target || '(missing arg)'}: no such file`,
          },
        ]);
        return;
      }
      append([
        { type: 'out', text: `=== ${proj.title} ===` },
        { type: 'out', text: proj.cat },
        { type: 'out', text: '' },
        { type: 'out', text: proj.desc },
        { type: 'out', text: '' },
        { type: 'out', text: `stack: ${proj.tags.join(', ')}` },
      ]);
    },
  },
  cd: {
    desc: 'change directory',
    run: ({ args, cwd, setCwd, append }): void => {
      const target = args[0];
      if (!target || target === HOME_PATH || target === '/') {
        setCwd(HOME_PATH);
        return;
      }
      if (target === '..') {
        if (cwd !== HOME_PATH) setCwd(HOME_PATH);
        return;
      }
      if ((LS_DIRS as ReadonlyArray<string>).includes(target)) {
        setCwd(target);
        return;
      }
      append([{ type: 'err', text: `cd: ${target}: no such directory` }]);
    },
  },
  pwd: {
    desc: 'print working directory',
    run: ({ cwd, append }): void => {
      append([
        {
          type: 'out',
          text: `/Users/freddy/${cwd === HOME_PATH ? '' : cwd}`.replace(
            /\/$/,
            ''
          ),
        },
      ]);
    },
  },
  open: {
    desc: 'open an app or project',
    run: ({ args, append, openApp, openProject }): void => {
      const target = args.join(' ');
      if (!target) {
        append([{ type: 'err', text: 'open: usage: open <app|project>' }]);
        return;
      }
      if (isAppId(target)) {
        openApp(target);
        append([{ type: 'out', text: `launched ${target}.app` }]);
        return;
      }
      const proj = findProjectByToken(target);
      if (proj) {
        openProject(proj);
        append([{ type: 'out', text: `opened ${proj.title}` }]);
        return;
      }
      append([
        { type: 'err', text: `open: ${target}: unknown app or project` },
      ]);
    },
  },
  contact: {
    desc: 'show contact info',
    run: ({ append }): void => {
      append([
        { type: 'out', text: `email:    ${profile.email}` },
        { type: 'out', text: `github:   ${profile.github}` },
        { type: 'out', text: `linkedin: ${profile.linkedin}` },
      ]);
    },
  },
  resume: {
    desc: 'open resume',
    run: ({ append }): void => {
      append([
        {
          type: 'out',
          text: 'opening resume.pdf… [hint: use the Resume button on About]',
        },
      ]);
    },
  },
  clear: {
    desc: 'clear the terminal',
    run: ({ clearLines }): void => {
      clearLines();
    },
  },
  exit: {
    desc: 'close the session',
    run: ({ append }): void => {
      append([
        {
          type: 'out',
          text: 'session terminated. close the window when ready.',
        },
      ]);
    },
  },
  echo: {
    desc: 'echo text back',
    run: ({ args, append }): void => {
      append([{ type: 'out', text: args.join(' ') }]);
    },
  },
  date: {
    desc: 'print the current time',
    run: ({ append }): void => {
      append([{ type: 'out', text: new Date().toString() }]);
    },
  },
  man: {
    desc: 'show command manual',
    run: ({ args, append }): void => {
      const cmd = args[0];
      if (!cmd) {
        append([{ type: 'err', text: 'usage: man <command>' }]);
        return;
      }
      const spec = COMMANDS[cmd];
      if (!spec || spec.hidden) {
        append([{ type: 'err', text: `no manual entry for ${cmd}` }]);
        return;
      }
      append([
        { type: 'out', text: `NAME` },
        { type: 'out', text: `       ${cmd} — ${spec.desc}` },
        { type: 'out', text: '' },
        { type: 'out', text: `SEE ALSO` },
        { type: 'out', text: `       help, man` },
      ]);
    },
  },
  sudo: {
    desc: 'elevated privileges',
    hidden: true,
    run: ({ append }): void => {
      append([
        { type: 'err', text: 'gotcha. you really thought, huh?' },
        { type: 'err', text: "try again. (or don't.)" },
      ]);
    },
  },
  rm: {
    desc: "remove (don't)",
    hidden: true,
    run: ({ args, append }): void => {
      const flags = args[0] ?? '';
      const target = args[1] ?? '';
      const isReckless =
        flags.includes('rf') &&
        (target === '/' || target === '~' || target === '.' || target === '*');
      if (isReckless) {
        append([
          { type: 'err', text: 'lol no.' },
          { type: 'err', text: 'this incident has been reported. (jk.)' },
        ]);
        return;
      }
      append([
        {
          type: 'err',
          text: `rm: ${args.join(' ') || '(nothing)'}: permission denied`,
        },
      ]);
    },
  },
  vim: {
    desc: 'editor war: vim',
    hidden: true,
    run: ({ append }): void => {
      append([{ type: 'err', text: 'vim? in MY terminal? get out.' }]);
    },
  },
  nano: {
    desc: 'editor war: nano',
    hidden: true,
    run: ({ append }): void => {
      append([{ type: 'err', text: 'nano user detected. block-block-block.' }]);
    },
  },
  emacs: {
    desc: 'editor war: emacs',
    hidden: true,
    run: ({ append }): void => {
      append([
        {
          type: 'err',
          text: 'emacs is a great operating system — shame about the editor.',
        },
      ]);
    },
  },
  npm: {
    desc: 'package manager',
    hidden: true,
    run: async ({ args, append }): Promise<void> => {
      if (args[0] !== 'install') {
        append([
          {
            type: 'err',
            text: `npm: ${args.join(' ') || '(no args)'}: try \`npm install\``,
          },
        ]);
        return;
      }
      append([{ type: 'out', text: 'npm WARN deprecated portfolio@1.0.0' }]);
      await delay(280);
      append([{ type: 'out', text: '[1/4] resolving packages...' }]);
      await delay(420);
      append([{ type: 'out', text: '[2/4] fetching packages...' }]);
      await delay(380);
      append([{ type: 'out', text: '[3/4] linking dependencies...' }]);
      await delay(540);
      append([{ type: 'out', text: '[4/4] building fresh packages...' }]);
      await delay(320);
      append([
        { type: 'out', text: '+ bad-ideas@1.0.0' },
        { type: 'out', text: '+ caffeine@9.9.9' },
        { type: 'out', text: '+ shipping-fast@2.3.4' },
        {
          type: 'out',
          text: 'added 47 packages, audited 0 vulnerabilities (suspicious)',
        },
        { type: 'out', text: 'done in 1.873s' },
      ]);
    },
  },
  coffee: {
    desc: 'brew coffee',
    hidden: true,
    run: async ({ append }): Promise<void> => {
      append([{ type: 'out', text: '☕ brewing...' }]);
      await delay(500);
      append([
        { type: 'out', text: 'status: 200 OK' },
        { type: 'out', text: 'caffeine.fetch() resolved.' },
      ]);
    },
  },
  cowsay: {
    desc: 'cow says a thing',
    hidden: true,
    run: ({ args, append }): void => {
      const msg = args.join(' ') || 'moo';
      const bar = '_'.repeat(msg.length + 2);
      const bottom = '-'.repeat(msg.length + 2);
      append([
        { type: 'out', text: ` ${bar}` },
        { type: 'out', text: `< ${msg} >` },
        { type: 'out', text: ` ${bottom}` },
        { type: 'out', text: '        \\   ^__^' },
        { type: 'out', text: '         \\  (oo)\\_______' },
        { type: 'out', text: '            (__)\\       )\\/\\' },
        { type: 'out', text: '                ||----w |' },
        { type: 'out', text: '                ||     ||' },
      ]);
    },
  },
  matrix: {
    desc: 'jack into the matrix',
    hidden: true,
    run: async ({ append }): Promise<void> => {
      const start = Date.now();
      while (Date.now() - start < MATRIX_DURATION_MS) {
        append([{ type: 'matrix', text: buildMatrixRow(MATRIX_COLS) }]);
        await delay(MATRIX_TICK_MS);
      }
      append([
        { type: 'info', text: '' },
        { type: 'info', text: '// exited the matrix.' },
      ]);
    },
  },
  hire: {
    desc: 'submit a hire request',
    hidden: true,
    run: ({ args, append }): void => {
      const name = args.join(' ').trim() || 'recruiter';
      append([
        { type: 'out', text: `[hire] request received from ${name}.` },
        { type: 'out', text: '[hire] response window: < 24h.' },
        {
          type: 'out',
          text: `[hire] tip: linkedin or ${profile.email} for fastest reply.`,
        },
      ]);
    },
  },
  secret: {
    desc: 'reveal a small secret',
    hidden: true,
    run: ({ append }): void => {
      append([
        { type: 'info', text: '// shhh:' },
        { type: 'out', text: pickRandom(SECRETS) },
      ]);
    },
  },
};

const VISIBLE_COMMANDS: ReadonlyArray<string> = Object.entries(COMMANDS)
  .filter(([, spec]) => !spec.hidden)
  .map(([name]) => name)
  .sort();

function buildInitialLines(): TerminalLine[] {
  return [
    {
      type: 'info',
      text: `freddy_os v1.0 — last login: ${new Date().toLocaleString()}`,
    },
    { type: 'info', text: 'type `help` to list commands · tab autocompletes' },
    { type: 'info', text: '' },
  ];
}

function getTabCandidates(value: string): string[] {
  const tokens = value.split(/\s+/);
  const lastToken = tokens[tokens.length - 1] ?? '';
  const head = tokens[0];

  if (tokens.length === 1) {
    return VISIBLE_COMMANDS.filter(c => c.startsWith(lastToken));
  }
  if (head === 'open') {
    const apps = (VALID_APPS as ReadonlyArray<string>).filter(a =>
      a.startsWith(lastToken)
    );
    const files = PROJECT_FILES.filter(f => f.startsWith(lastToken));
    return [...apps, ...files];
  }
  if (head === 'cd') {
    return CD_TARGETS.filter(d => d.startsWith(lastToken));
  }
  if (head === 'cat') {
    return PROJECT_FILES.filter(f => f.startsWith(lastToken));
  }
  if (head === 'ls') {
    return LS_DIRS.filter(d => d.startsWith(lastToken));
  }
  if (head === 'man') {
    return VISIBLE_COMMANDS.filter(c => c.startsWith(lastToken));
  }
  return [];
}

function renderPrompt(path: string): ReactElement {
  return (
    <span className='terminal-prompt'>
      <span className='user'>freddy</span>
      <span className='at'>@</span>
      <span className='host'>portfolio</span>
      <span className='colon'>:</span>
      <span className='path'>{path}</span>
      <span className='dollar'>$</span>
    </span>
  );
}

export function TerminalWindow({
  openApp,
  onOpenProject,
}: TerminalWindowProps): ReactElement {
  const [lines, setLines] = useState<TerminalLine[]>(() => buildInitialLines());
  const [value, setValue] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [cwd, setCwd] = useState<string>(HOME_PATH);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const tabStateRef = useRef<TabCycleState | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isBusy) inputRef.current?.focus();
  }, [isBusy]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, isBusy]);

  const append = (entries: TerminalLine[]): void => {
    setLines(current => [...current, ...entries]);
  };

  const promptPath = formatPromptPath(cwd);

  const run = async (raw: string): Promise<void> => {
    const cmd = raw.trim();
    setLines(current => [
      ...current,
      { type: 'cmd', text: cmd, prompt: promptPath } as TerminalLine,
    ]);
    if (!cmd) return;

    const tokens = cmd.split(/\s+/);
    const head = tokens[0];
    const args = tokens.slice(1);

    const spec = COMMANDS[head];
    if (!spec) {
      append([
        {
          type: 'err',
          text: `${head}: command not found — try \`help\``,
        },
      ]);
      return;
    }

    const ctx: CommandContext = {
      args,
      cwd,
      setCwd,
      openApp,
      openProject: onOpenProject,
      append,
      clearLines: (): void => setLines([]),
    };

    setIsBusy(true);
    try {
      await spec.run(ctx);
    } finally {
      setIsBusy(false);
    }
  };

  const handleTab = (event: ReactKeyboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const candidates = getTabCandidates(value);
    if (candidates.length === 0) return;

    const tokens = value.split(/\s+/);
    const prefix = tokens.slice(0, -1).join(' ');
    const fullPrefix = prefix.length > 0 ? `${prefix} ` : '';

    const cur = tabStateRef.current;
    if (cur && cur.lastSet === value) {
      const nextIndex = (cur.index + 1) % cur.candidates.length;
      const newValue = cur.prefix + cur.candidates[nextIndex];
      cur.index = nextIndex;
      cur.lastSet = newValue;
      setValue(newValue);
      return;
    }

    const newValue = fullPrefix + candidates[0];
    tabStateRef.current = {
      prefix: fullPrefix,
      candidates,
      index: 0,
      lastSet: newValue,
    };
    setValue(newValue);
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>): void => {
    if (isBusy) {
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const submitted = value;
      setValue('');
      setHistoryIndex(-1);
      tabStateRef.current = null;
      if (submitted.trim()) {
        setHistory(h => [submitted, ...h].slice(0, HISTORY_LIMIT));
      }
      void run(submitted);
      return;
    }
    if (e.key === 'Tab') {
      handleTab(e);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(history.length - 1, historyIndex + 1);
      if (next >= 0) {
        setHistoryIndex(next);
        setValue(history[next]);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setValue('');
      } else {
        setHistoryIndex(next);
        setValue(history[next]);
      }
    }
  };

  const refocusInput = (): void => {
    inputRef.current?.focus();
  };

  return (
    <div
      className='os-window-body'
      style={{ padding: 0, overflow: 'hidden', background: '#0e0d0b' }}
      onClick={refocusInput}
    >
      <div className='os-terminal-app' ref={scrollRef}>
        {lines.map((l, i) => {
          if (l.type === 'cmd') {
            const promptPathForLine = l.prompt ?? promptPath;
            return (
              <div key={i} className='terminal-line'>
                {renderPrompt(promptPathForLine)}
                {l.text}
              </div>
            );
          }
          return (
            <div key={i} className={`terminal-line ${l.type}`}>
              {l.text || ' '}
            </div>
          );
        })}
        <div
          className={`terminal-input-row${isBusy ? 'busy' : ''}`}
          aria-hidden={isBusy}
        >
          {renderPrompt(promptPath)}
          <div className='terminal-input-wrap'>
            <span className='terminal-input-display' aria-hidden='true'>
              {value}
            </span>
            {isBusy ? null : <span className='terminal-cursor' />}
            <input
              ref={inputRef}
              className='terminal-input'
              value={value}
              onChange={(e): void => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete='off'
              aria-label='terminal input'
              tabIndex={isBusy ? -1 : 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
