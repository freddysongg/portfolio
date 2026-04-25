import type { MiscDoc } from '@/components/os/types';

export const miscDocs: MiscDoc[] = [
  {
    id: 'korena_launch',
    title: 'Korena Launch Notes',
    subtitle: 'Voice-first AI product · live now',
    intro:
      'Three days ago we put korena.com live. Calling it a "shopping site" undersells it — it\'s an AI product where the only interface is your voice.',
    sections: [
      {
        heading: 'What it actually is',
        items: [
          'a voice AI you talk to like a friend who knows the catalog cold',
          'intent in, answers out — under two seconds end to end',
          'follow-ups feel natural ("cheaper", "more for hiking", "something a friend would like")',
          'no buttons, no text input, no chat window — just voice',
        ],
      },
      {
        heading: 'Why voice changes things',
        items: [
          'no UI means no fallback when the model is unsure — every answer has to commit',
          'latency has nowhere to hide, so the loop has to feel real-time',
          'spoken intent is messier than typed queries, which is the fun part',
          'when it works, it stops feeling like search and starts feeling like a conversation',
        ],
      },
      {
        heading: 'Why I wanted to ship this',
        items: [
          'most AI products are still chat windows — voice is the next obvious step',
          'shopping is just a domain — the hard problems here are general-purpose AI ones',
          'wanted to set a real bar for what voice AI products feel like in 2026',
        ],
      },
    ],
    outro: 'Try it: korena.com — feedback welcome.',
    linkedFeedId: 'p1',
    linkedFeedLabel: 'Open the launch post in Field Notes',
  },
  {
    id: 'context_management',
    title: 'Context Management Notes',
    subtitle: 'How I think about LLM context windows',
    intro:
      'Long-context models are a tool, not a strategy. Working notes on what I keep coming back to in production.',
    sections: [
      {
        heading: 'The trap',
        items: [
          'More context feels like more capability',
          'Past ~4–6k tokens, retrieval recall plateaus on most tasks',
          'Latency and cost grow linearly; accuracy does not',
          'Bigger windows can quietly hide bad retrieval',
        ],
      },
      {
        heading: 'Tactics that work',
        items: [
          'Summarize at the retrieval boundary, not in the model',
          'Retrieval-grounded windows over rolling chat history',
          'Semantic compaction before falling back to truncation',
          'Drop redundant turns aggressively',
        ],
      },
      {
        heading: 'Dev side',
        items: [
          'Measure end-to-end answer quality, not retrieval F1',
          'Cache aggressively at every layer that is deterministic',
          'Profile token spend per intent, not per request',
        ],
      },
      {
        heading: 'Consumer side',
        items: [
          'Latency is part of the answer; treat p95 like a product KPI',
          'Surface uncertainty when retrieval confidence is low',
          'Smaller, faster, more accurate beats slow and verbose',
        ],
      },
    ],
    outro: 'Smaller model + cleaner context almost always wins.',
    linkedFeedId: 'p2',
    linkedFeedLabel: 'Open the context management post in Field Notes',
  },
  {
    id: 'snowboard_log',
    title: 'Snowboard Log',
    subtitle: '9 trips · 2025–2026 season',
    intro:
      "Mountains I've ridden so far this season. Loosely sorted by month — full vibes always.",
    sections: [
      {
        heading: 'December 2025',
        items: ['Big Bear'],
      },
      {
        heading: 'January 2026',
        items: ['Big Bear', 'Big Bear (round two)'],
      },
      {
        heading: 'February 2026',
        items: ['Brighton', 'Brighton (day two)', 'Big Bear', 'Mammoth'],
      },
      {
        heading: 'March 2026',
        items: ['Snow Valley', 'Big Bear Mountain'],
      },
    ],
    outro: 'More to come — chasing the next storm.',
    linkedFeedId: 'p3',
    linkedFeedLabel: 'Open the mammoth post in Field Notes',
  },
  {
    id: 'secrets',
    fileName: 'secrets.env',
    title: 'secrets.env',
    subtitle: 'do not commit · seriously',
    intro:
      'Hidden terminal commands. Type them into the Terminal app — none of these show up in `help` or in tab completion.',
    sections: [
      {
        heading: 'Forbidden privileges',
        items: [
          'sudo <anything> — gotcha. you really thought, huh?',
          'rm -rf / · ~ · . · * — lol no, that incident has been reported (jk).',
          'rm <anything else> — permission denied.',
        ],
      },
      {
        heading: 'Editor wars',
        items: [
          'vim — vim? in MY terminal? get out.',
          'nano — block-block-block.',
          'emacs — great OS, shame about the editor.',
        ],
      },
      {
        heading: 'Pranks & vibes',
        items: [
          'npm install — fake 4-step install of bad-ideas@1.0.0, caffeine@9.9.9, shipping-fast@2.3.4',
          'coffee — ☕ brewing… status: 200 OK · caffeine.fetch() resolved',
          'cowsay <message> — ASCII cow speaks (defaults to "moo")',
          'matrix — five seconds of green code rain inside the terminal',
        ],
      },
      {
        heading: 'Real signals',
        items: [
          'hire <name?> — submits a hire request, response window: < 24h',
          'secret — random fun fact, different each time',
        ],
      },
    ],
    outro:
      'curiosity is rewarded · tab autocompletes the visible commands · the cow has seen things.',
  },
  {
    id: 'coffee',
    title: 'Coffee Log',
    subtitle: 'Beans, pours, and the occasional clean fern',
    intro: "Tasting notes and brewing wins from this week's home setup.",
    sections: [
      {
        heading: 'This week’s bag',
        items: [
          'Roaster: Monolith Coffee (San Gabriel Valley)',
          'Origin: Ethiopian single-origin',
          'Bag notes: floral, bright, fruit-forward',
        ],
      },
      {
        heading: 'In the cup',
        items: [
          'Heavy blueberry up front',
          'Light floral hangover, almost jasmine',
          'Long, clean finish — closer to tea than to chocolate',
          'Drank as a latte first, hot of course',
        ],
      },
      {
        heading: 'Latte art update',
        items: [
          'Attempted: fern',
          'Achieved: legible fern (small win, taking it)',
          'Working theory: milk a touch cooler, pour from closer in, steady hands',
        ],
      },
    ],
    outro: 'Pour was clean. Coffee was incredible. Double win.',
    linkedFeedId: 'p5',
    linkedFeedLabel: 'Open the coffee post in Field Notes',
  },
];

export function findMiscDoc(id: string): MiscDoc | undefined {
  return miscDocs.find(d => d.id === id);
}
