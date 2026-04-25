import type { FeedPost, ReactionDef } from '@/components/os/types';

export const REACTION_TYPES: ReactionDef[] = [
  { key: 'fire', label: 'Fire', glyph: '▲' },
  { key: 'spark', label: 'Spark', glyph: '✦' },
  { key: 'heart', label: 'Heart', glyph: '♥' },
  { key: 'coffee', label: 'Brew', glyph: '◉' },
  { key: 'disk', label: 'Saved', glyph: '▣' },
];

export const feedPosts: FeedPost[] = [
  {
    id: 'p1',
    who: 'Freddy Song',
    what: 'shared a launch',
    when: '3 days ago · ◉ public',
    avatar: 'FS',
    body: "three days ago we shipped korena.com.\n\ncalling this 'shopping' undersells it. it's a voice AI product — intent goes in, answers come out, and the entire interface is your voice. you talk to it the way you'd talk to a friend who knows the catalog cold. the e-commerce part is downstream of the AI part.\n\nthe hard problems aren't merchandising. they're holding context across follow-ups ('cheaper', 'something for hiking instead'), resolving ambiguity in real time without a UI to lean on, and keeping the whole loop under two seconds end to end. voice raises the bar because there's nowhere to hide latency or hand-wave a bad answer.\n\nif you're into AI products that step past the chat window, try it → korena.com #ai #voice",
    hasImage: true,
    imgLabel: 'korena.com — voice flow',
    reactions: { fire: 89, spark: 41, heart: 22, disk: 14 },
    total: 166,
    comments: [
      {
        who: 'Sara K.',
        text: 'voice for shopping has been a dream demo for years — congrats on shipping!',
        when: '2d',
      },
      {
        who: 'Marcus L.',
        text: 'sub-2s end-to-end with retrieval is wild. the latency story is the real flex.',
        when: '2d',
      },
    ],
  },
  {
    id: 'p5',
    who: 'Freddy Song',
    what: 'is fueling up',
    when: '5 days ago',
    avatar: 'FS',
    body: 'picked up some new beans from monolith coffee down in the SGV — their ethiopian single-origin roast.\n\npulled a shot, steamed milk, attempted latte art... and absolutely butchered the pour. my simple heart turned into a potato shape.\n\nthe coffee itself though — ridiculous. heavy blueberry up front, then this floral finish that just hangs around the back of the cup. \n\npour was bad. coffee was incredible. net win. ☕',
    hasImage: true,
    imgLabel: 'Latte attempt #47',
    reactions: { heart: 38, coffee: 24, spark: 9 },
    total: 71,
    comments: [
      {
        who: 'Jess W.',
        text: 'potato heart is the new pattern',
        when: '4d',
      },
    ],
  },
  {
    id: 'p2',
    who: 'Freddy Song',
    what: 'posted',
    when: '1 week ago',
    avatar: 'FS',
    body: "thinking about context management for production LLMs lately.\n\nthe trap: more context feels like more capability, but past a certain depth it's more latency, more cost, and (counterintuitively) worse accuracy. retrieval recall plateaus around the 4–6k token mark for most tasks; everything beyond is noise diluting the prompt.\n\nwhat's been working for us:\n— summarize at the retrieval boundary, not in the model\n— retrieval-grounded windows over rolling chat history\n— semantic compaction (drop redundant turns) before truncating\n— measure end-to-end answer quality, not retrieval F1\n\nthe right model size matters less than the right context shape. smaller model + cleaner context almost always wins on cost AND quality. #llm #ml #engineering",
    reactions: { spark: 67, fire: 28, disk: 19 },
    total: 114,
    comments: [
      {
        who: 'Dr. K. Park',
        text: 'the F1-vs-answer-quality split is the killer insight. our team chased retrieval scores for months before noticing the disconnect.',
        when: '5d',
      },
    ],
  },
  {
    id: 'p3',
    who: 'Freddy Song',
    what: 'is feeling nostalgic',
    when: '2 weeks ago',
    avatar: 'FS',
    body: "first snowboarding trip of the season — mammoth was unreal this weekend. there's something about being completely off-grid for 48 hours that resets the brain better than any productivity hack.\n\nback to building tomorrow. but for now: fresh tracks, hot ramen, and zero notifications. ❄️ #powday",
    hasImage: true,
    imgLabel: 'Mammoth Mountain',
    reactions: { heart: 112, coffee: 28, spark: 14 },
    total: 154,
    comments: [
      { who: 'Jess W.', text: 'reset mode activated 🏂', when: '12d' },
      {
        who: 'Tom R.',
        text: 'the conditions looked unreal this weekend',
        when: '13d',
      },
    ],
  },
  {
    id: 'p4',
    who: 'Freddy Song',
    what: 'shared an update',
    when: '3 weeks ago',
    avatar: 'FS',
    body: "honest take: i don't think 'AI replaces engineers' is the right frame. AI raises the floor for what one engineer can ship. the people who'll struggle aren't the seniors — it's anyone who built their identity around being a faster typist.\n\nlearn the systems. ship the things. the tools will keep changing. #engineering",
    reactions: { fire: 203, spark: 88, heart: 41, disk: 22 },
    total: 354,
    comments: [
      { who: 'Ana V.', text: 'this. all of this.', when: '20d' },
      {
        who: 'Devon S.',
        text: "the floor metaphor is the cleanest take i've heard on this",
        when: '21d',
      },
      { who: 'Priya M.', text: 'saving for later 📌', when: '22d' },
    ],
  },
];
