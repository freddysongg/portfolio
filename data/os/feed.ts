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
    imgSrc: '/images/korena.png',
    imgHref: 'https://korena.com',
    reactions: { fire: 89, spark: 41, heart: 22, disk: 14 },
    total: 166,
    comments: [
      {
        who: 'anonymous',
        text: 'voice for shopping has been a dream demo for years — congrats on shipping!',
        when: '2d',
      },
      {
        who: 'anonymous',
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
    body: "picked up some new beans from monolith coffee down in the SGV — their ethiopian single-origin roast.\n\npulled a shot, steamed milk, free-poured a fern. nothing too crazy — but it actually looked like a fern this time, so i'm taking the W.\n\nthe coffee itself though — ridiculous. heavy blueberry up front, then this floral finish that just hangs around the back of the cup.\n\npour was clean. coffee was incredible. double win. ☕",
    hasImage: true,
    imgLabel: 'Latte attempt #47',
    imgSrc: '/images/latte_art.png',
    imgObjectPosition: 'center 70%',
    reactions: { heart: 38, coffee: 24, spark: 9 },
    total: 71,
    comments: [
      {
        who: 'anonymous',
        text: 'clean fern. respect.',
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
        who: 'anonymous',
        text: 'the F1-vs-answer-quality split is the killer insight. our team chased retrieval scores for months before noticing the disconnect.',
        when: '5d',
      },
    ],
  },
  {
    id: 'p3',
    who: 'Freddy Song',
    what: 'is feeling nostalgic',
    when: '2 months ago',
    avatar: 'FS',
    body: "first snowboarding trip of the season — brighton, utah was unreal this weekend. salt lake city was such a fun city, i'd definitely go back. the drive up the mountain was so calming as well.\n\nback to building tomorrow. but for now: fresh tracks, hot ramen, and zero notifications. ❄️ #powday",
    hasImage: true,
    imgLabel: 'Brighton, Utah',
    imgGallery: [
      {
        src: '/images/snowboard2.JPG',
        label: 'Brighton, Utah',
        objectPosition: 'center 75%',
      },
      {
        src: '/images/snowboard1.JPG',
        label: 'Brighton, Utah',
        objectPosition: 'center 75%',
      },
    ],
    reactions: { heart: 112, coffee: 28, spark: 14 },
    total: 154,
    comments: [
      { who: 'anonymous', text: 'reset mode activated 🏂', when: '60d' },
      {
        who: 'anonymous',
        text: 'the conditions looked unreal this weekend',
        when: '61d',
      },
    ],
  },
];
