import { Article } from '../types/content';

export const ARTICLES: Article[] = [
  {
    slug: 'words-in-a-10-minute-youtube-video',
    title: 'How Many Words Are in a 10-Minute YouTube Video? (With Pacing Chart)',
    metaDescription: 'Discover the exact word count needed for a 10-minute YouTube video based on speaking speed, pause buffers, intros, and sponsor reads.',
    publishedDate: '2026-03-15',
    updatedDate: '2026-08-10',
    readTimeMinutes: 6,
    author: {
      name: 'Marcus Vance',
      role: 'Video Production Specialist & Script Consultant',
    },
    category: 'YouTube',
    featuredImageAlt: 'Video script pacing breakdown on laptop and monitor in an editing suite',
    summaryAnswer:
      'A 10-minute YouTube video typically requires between 1,250 and 1,550 words of written script. At a standard creator cadence of 150 to 160 Words Per Minute (WPM), combined with a 10% natural pause buffer, a 15-second intro, a 20-second outro, and a 60-second sponsor break, your ideal script target is approximately 1,320 words.',
    keyTakeaways: [
      'Standard conversational creator pacing ranges between 145 and 165 WPM.',
      'Always reserve 10% to 12% of total duration for natural breathing, transitions, and rhetorical pauses.',
      'Sponsor segments and channel intros directly reduce the number of spoken script words needed.',
      'Video essays with dense information should aim for 1,250–1,350 words to avoid listener fatigue.',
    ],
    quickReferenceTable: {
      headers: ['Speaking Pace', 'Target WPM', 'Pure Narration Words', 'With 10% Pause + 90s Production Buffer'],
      rows: [
        ['Deliberate / Technical', '130 WPM', '1,300 words', '1,070 words'],
        ['Conversational Tutorial', '145 WPM', '1,450 words', '1,195 words'],
        ['Standard Video Essay', '155 WPM', '1,550 words', '1,280 words'],
        ['High Energy / Fast Review', '170 WPM', '1,700 words', '1,400 words'],
        ['Rapid Commentary', '185 WPM', '1,850 words', '1,525 words'],
      ],
    },
    contentHtml: `
      <h2>The Core Formula for YouTube Duration</h2>
      <p>A common misconception among beginner scriptwriters is assuming pure mathematical multiplication: <em>10 minutes × 150 WPM = 1,500 words</em>. In actual video production, this almost always leads to a video that runs 12 to 14 minutes long.</p>
      
      <p>Why does this happen? Because a script is not merely spoken syllables; it lives alongside visual transitions, on-screen text animations, pauses between sentences, and non-spoken production elements.</p>
      
      <h3>The Production Buffer Breakdown</h3>
      <p>When calculating a finished 10-minute (600-second) video, you must deduct production elements before calculating script length:</p>
      <ul>
        <li><strong>Hook & Channel Intro:</strong> 15 to 20 seconds.</li>
        <li><strong>Mid-Roll Sponsor Segment:</strong> 60 to 90 seconds.</li>
        <li><strong>Outro & End Cards:</strong> 15 to 25 seconds.</li>
        <li><strong>Natural Pause Buffer:</strong> 8% to 12% of spoken time (roughly 45 to 60 seconds).</li>
      </ul>
      
      <p>Subtracting roughly 110 seconds of non-scripted time leaves approximately 490 seconds of spoken runtime. At 155 WPM, 490 seconds translates to exactly <strong>1,265 words</strong>.</p>
      
      <h2>How Content Style Alters Pacing</h2>
      <p>Different genres of YouTube content demand radically different pacing:</p>
      
      <h3>1. Documentary and Educational Essays (135–150 WPM)</h3>
      <p>Complex topics require breathing room. If you are explaining macroeconomic monetary policy or the architecture of quantum computers, speaking at 180 WPM will severely harm viewer retention. Allow 1,200 to 1,350 words.</p>
      
      <h3>2. Tech Hardware Reviews and Unboxings (155–165 WPM)</h3>
      <p>Engaging, high-energy hardware reviews thrive on brisk rhythm synchronized with macro B-roll product shots. A 10-minute video can comfortably house 1,350 to 1,480 words.</p>
      
      <h3>3. Reaction and Entertainment Commentary (170–190 WPM)</h3>
      <p>Fast-paced punchy jokes, reaction commentary, and dramatic storytelling can push up to 1,600 words, provided visual cuts happen every 2 to 3 seconds.</p>
      
      <h2>Practical Tips Before Recording</h2>
      <ol>
        <li><strong>Perform a 60-Second Timed Sample:</strong> Read exactly 150 words of your script out loud with your teleprompter or paper copy. If it takes 52 seconds, you speak at ~173 WPM. If it takes 65 seconds, you speak at ~138 WPM.</li>
        <li><strong>Write for the Ear, Not the Eye:</strong> Short sentences with active verbs read faster and clearer on camera than compound academic paragraphs.</li>
        <li><strong>Mark Strategic Pauses:</strong> Place physical indicators (like [PAUSE] or double slashes //) in your teleprompter copy after critical revelations.</li>
      </ol>
    `,
    relatedCalculators: [
      { title: 'YouTube Duration Calculator', path: '/youtube-duration-calculator', badge: 'Specialist' },
      { title: 'YouTube Word Counter', path: '/youtube-word-counter', badge: 'Core Tool' },
      { title: 'Short-Form Calculator', path: '/short-form-calculator', badge: 'Shorts & Reels' },
    ],
    relatedArticleSlugs: ['how-long-to-read-1500-word-script', 'how-many-scenes-and-b-roll-clips'],
  },
  {
    slug: 'how-many-words-for-30-minute-podcast',
    title: 'How Many Words Do You Need for a 30-Minute Podcast Episode?',
    metaDescription: 'Calculate the ideal word count for a 30-minute podcast. Explains conversational pacing, co-host banter, intro themes, and interview outlines.',
    publishedDate: '2026-04-02',
    updatedDate: '2026-08-18',
    readTimeMinutes: 7,
    author: {
      name: 'Sarah Lindqvist',
      role: 'Audio Producer & Podcast Sound Designer',
    },
    category: 'Podcasting',
    featuredImageAlt: 'Studio microphone with headphones on acoustic desk for podcast recording',
    summaryAnswer:
      'A solo scripted 30-minute podcast requires between 3,600 and 4,100 words (averaging 140 WPM with a 14% pause buffer). For a co-hosted or conversational interview podcast, a verbatim script is usually replaced by an outline of 800 to 1,200 words covering talking points, questions, and segment prompts.',
    keyTakeaways: [
      'Podcasts demand slower, warmer delivery (130–145 WPM) than YouTube videos.',
      'Audio-only mediums require higher pause buffers (14–18%) to give listeners time to digest thoughts.',
      'Intro music, midpoint sponsor breaks, and outro credits typically account for 2.5 to 4 minutes.',
      'Solo narrative podcasts (e.g. true crime, history) require precise verbatim scripts, while interview shows thrive on modular bulleted outlines.',
    ],
    quickReferenceTable: {
      headers: ['Podcast Format', 'Delivery Style', 'WPM Baseline', '30-Minute Word Count'],
      rows: [
        ['Solo Narrative / History', 'Measured & Story-Driven', '135 WPM', '3,450 – 3,750 words'],
        ['Solo Educational / Business', 'Warm Conversational', '145 WPM', '3,700 – 4,100 words'],
        ['Co-Hosted Casual Banter', 'Spontaneous Dialogue', '150 WPM (Combined)', 'Outline: 900 – 1,400 words'],
        ['Expert Interview', 'Structured Q&A', '140 WPM', 'Outline: 750 – 1,100 words'],
      ],
    },
    contentHtml: `
      <h2>Solo Narrative vs. Interview Podcasts</h2>
      <p>Before counting words for an episode, identify your format. Audio content fundamentally diverges between <strong>verbatim scripted audio</strong> and <strong>structured conversational audio</strong>.</p>
      
      <h3>1. Verbatim Scripted Podcasts (Narrative, True Crime, Deep Dives)</h3>
      <p>Shows like <em>Hardcore History</em> or investigative journalism series rely on carefully engineered scripts. In this format, word count calculation is strictly mathematical:</p>
      <p>A standard 30-minute episode includes roughly 2 minutes of theme music, intro teasers, mid-roll sponsorships, and sign-offs. That leaves 28 minutes (1,680 seconds) of narration. At 140 WPM with a 12% pause allowance, the host speaks roughly 3,500 words.</p>
      
      <h3>2. Conversational & Interview Podcasts</h3>
      <p>If you attempt to write a 4,000-word script for a conversational interview show, the dialogue will sound stiff and robotic. Instead, podcast producers use <strong>modular timed outlines</strong>:</p>
      <ul>
        <li><strong>Segment 1: Hook & Topic Overview (3 mins)</strong> – 150 words of scripted intro.</li>
        <li><strong>Segment 2: Context & Current News (7 mins)</strong> – 4 bullet points with supporting data.</li>
        <li><strong>Segment 3: Deep Dive Discussion (12 mins)</strong> – 5 core questions with sub-prompts.</li>
        <li><strong>Segment 4: Tactical Takeaways & Listener Mail (5 mins)</strong> – 3 listener questions.</li>
        <li><strong>Segment 5: Sponsor Read & Sign-Off (3 mins)</strong> – 200 words scripted verbatim.</li>
      </ul>
      
      <h2>Why Podcast Speaking Rates Are Slower Than Video</h2>
      <p>On YouTube or TikTok, visual stimulation supports auditory processing. Viewers see b-roll, text overlays, charts, and facial expressions. In podcasting, the listener is often commuting, exercising, or doing chores. Overly brisk speech causes cognitive fatigue and leads to listener drop-off.</p>
    `,
    relatedCalculators: [
      { title: 'Podcast Calculator', path: '/podcast-calculator', badge: 'Specialist' },
      { title: 'Interactive Duration Calculator', path: '/calculator', badge: 'All-in-One' },
      { title: 'Voice-Over Calculator', path: '/voice-over-calculator', badge: 'Audio Suite' },
    ],
    relatedArticleSlugs: ['words-in-a-10-minute-youtube-video', 'optimal-speaking-speed-guide'],
  },
  {
    slug: 'how-long-to-read-1500-word-script',
    title: 'How Long Does It Take to Read a 1,500-Word Script Out Loud?',
    metaDescription: 'Find out exactly how long a 1,500-word script takes to speak across slow, conversational, and fast speaking speeds with real production pause buffers.',
    publishedDate: '2026-05-11',
    updatedDate: '2026-09-01',
    readTimeMinutes: 5,
    author: {
      name: 'Marcus Vance',
      role: 'Video Production Specialist & Script Consultant',
    },
    category: 'Video Production',
    featuredImageAlt: 'Stopwatch and teleprompter showing timing measurements for a 1500 word script',
    summaryAnswer:
      'At an average speaking pace of 150 words per minute, a 1,500-word script takes exactly 10 minutes of pure speaking time. When you factor in natural conversational pauses (10%), the spoken time extends to 11 minutes. When packaged into a finished YouTube video with an intro, outro, and sponsor break, the final video runtime will be approximately 12 minutes and 30 seconds.',
    keyTakeaways: [
      'Pure reading time at 150 WPM = 10 minutes (600 seconds).',
      'Realistic vocal performance with natural breathing = 11 to 11.5 minutes.',
      'Finished video with hook, b-roll transitions, and end screen = 12 to 13 minutes.',
      'For a strict 10-minute video slot, reduce a 1,500-word script down to 1,250–1,300 words.',
    ],
    quickReferenceTable: {
      headers: ['Pace Preset', 'WPM', 'Pure Speaking Time', 'With 10% Natural Pauses', 'Finished Video Runtime (est.)'],
      rows: [
        ['Slow / Keynote Speech', '125 WPM', '12 min 00 sec', '13 min 12 sec', '14 min 30 sec'],
        ['Conversational / Podcast', '140 WPM', '10 min 43 sec', '11 min 47 sec', '13 min 15 sec'],
        ['Standard Video Essay', '155 WPM', '9 min 41 sec', '10 min 39 sec', '12 min 10 sec'],
        ['Fast Review / Commentary', '175 WPM', '8 min 34 sec', '9 min 25 sec', '10 min 50 sec'],
        ['Rapid Short-Form Narration', '190 WPM', '7 min 54 sec', '8 min 41 sec', '9 min 55 sec'],
      ],
    },
    contentHtml: `
      <h2>The Difference Between Silent Reading and Spoken Performance</h2>
      <p>The average adult reads silently in their mind at roughly <strong>250 to 300 words per minute</strong>. When you scan a 1,500-word article in your browser, you might finish in 5 to 6 minutes.</p>
      
      <p>However, <em>speaking aloud</em> requires vocal articulation, breath control, pitch modulation, and emotional emphasis. Human speech mechanics physically limit articulate delivery to between 120 and 190 WPM. Expecting a 1,500-word script to fit into an 8-minute slot will inevitably force the voice actor or presenter to rush, impairing comprehension.</p>
      
      <h2>Pacing by Medium</h2>
      <h3>If You Are Delivering a Speech</h3>
      <p>At 120 WPM, a 1,500-word speech will take <strong>12 to 14 minutes</strong>. Speeches require substantial pauses for emphasis, eye contact, and audience reaction. If your conference organizer allocated a 10-minute keynote slot, you must trim at least 350 words.</p>
      
      <h3>If You Are Producing a YouTube Video</h3>
      <p>At 155 WPM, a 1,500-word script produces approximately 9 minutes and 40 seconds of continuous voice-over. Add your channel intro (15s), mid-roll ad break (60s), and outro (20s), and your final video export will clock in right around <strong>11:30 to 12:15</strong>.</p>
      
      <h3>If You Are Recording an Audiobook</h3>
      <p>Audiobook narrators typically record at 145 to 155 WPM. A 1,500-word chapter represents roughly 10 minutes of finished audio. In the recording booth, narrators usually require 15 to 20 minutes of studio recording time to account for pickups, retakes, and water breaks.</p>
    `,
    relatedCalculators: [
      { title: 'YouTube Duration Calculator', path: '/youtube-duration-calculator', badge: 'Recommended' },
      { title: 'Speech Calculator', path: '/speech-calculator', badge: 'Speeches' },
      { title: 'Voice-Over Calculator', path: '/voice-over-calculator', badge: 'Audio Studio' },
    ],
    relatedArticleSlugs: ['words-in-a-10-minute-youtube-video', 'optimal-speaking-speed-guide'],
  },
  {
    slug: 'optimal-speaking-speed-guide',
    title: 'Optimal Speaking Speed (WPM) for YouTube, Podcasts, and Speeches',
    metaDescription: 'Comprehensive guide to Words Per Minute (WPM) across media formats. Learn scientific speech rates for high viewer retention and audio clarity.',
    publishedDate: '2026-06-04',
    updatedDate: '2026-09-12',
    readTimeMinutes: 7,
    author: {
      name: 'Sarah Lindqvist',
      role: 'Audio Producer & Podcast Sound Designer',
    },
    category: 'Speech & Keynotes',
    featuredImageAlt: 'Waveform audio frequency monitor analyzing vocal cadence and speaking speed',
    summaryAnswer:
      'The optimal speaking speed varies by delivery medium: YouTube video essays perform best at 150–165 WPM; short-form TikTok/Reels thrive at 175–195 WPM; audiobooks and solo podcasts balance clarity at 140–150 WPM; and public keynotes deliver maximum emotional resonance at 115–130 WPM.',
    keyTakeaways: [
      '150 WPM is the golden mean of modern conversational digital media.',
      'Auditory-only formats require slower cadence than audiovisual media.',
      'Audiences perceive speakers who speak between 140–160 WPM as confident, articulate, and trustworthy.',
      'Speaking beyond 190 WPM causes cognitive overload unless accompanied by kinetic subtitles.',
    ],
    quickReferenceTable: {
      headers: ['Platform / Format', 'Recommended WPM', 'Pause Buffer', 'Primary Reason'],
      rows: [
        ['Public Keynote / Toast', '115 – 130 WPM', '18 – 25%', 'Acoustic room echo, audience reaction, gravitas'],
        ['E-Learning & Technical Tutorials', '130 – 145 WPM', '12 – 15%', 'Complex concept synthesis, note-taking'],
        ['Podcasts & Audiobooks', '135 – 150 WPM', '12 – 16%', 'Intimate listening, audio-only processing'],
        ['YouTube Video Essays', '150 – 165 WPM', '8 – 12%', 'High engagement, visual B-roll synchronization'],
        ['TikTok / IG Reels / Shorts', '175 – 195 WPM', '3 – 6%', 'Rapid hook retention, zero dead air'],
      ],
    },
    contentHtml: `
      <h2>The Cognitive Science of Speaking Speed</h2>
      <p>Linguistic research shows that human brains can process spoken language at up to 250 to 300 words per minute without substantial loss of basic sentence comprehension. However, <em>comprehension</em> is not the same as <em>engagement</em> or <em>retention</em>.</p>
      
      <p>When you speak too quickly (over 185 WPM) on a complex topic, listeners must exert high mental effort simply to parse syntax. They have zero spare cognitive capacity to reflect on the meaning of your arguments or retain key lessons.</p>
      
      <p>Conversely, speaking under 110 WPM on a digital video platform risks being perceived as sluggish or unenergetic, leading to viewers clicking away or toggling 1.5x playback speed.</p>
      
      <h2>Platform Pacing Guidelines</h2>
      <h3>1. YouTube Videos: The 155 WPM Sweet Spot</h3>
      <p>Analysis of top-performing educational creators reveals an average delivery rate hovering around 155 words per minute. This rate is brisk enough to maintain forward narrative momentum while remaining completely intelligible across international audiences who speak English as a second language.</p>
      
      <h3>2. Short-Form Video: 180+ WPM with Jump Cuts</h3>
      <p>TikTok and Instagram Reels reward rapid information density. Pauses longer than 0.4 seconds are often edited out in post-production using ripple cuts. If you write a 120-word script for a 30-second Reel, you must deliver it at an energetic 180 to 190 WPM cadence.</p>
      
      <h3>3. Public Speeches: Deliberate Restraint at 120 WPM</h3>
      <p>In an auditorium or conference hall, sound bounces off physical walls. Speaking fast creates an unintelligible acoustic blur. Great orators deliberately slow down to 115–125 WPM and use extended pauses (2 to 4 seconds) to let important points reverberate.</p>
    `,
    relatedCalculators: [
      { title: 'Interactive Calculator', path: '/calculator', badge: 'All-in-One' },
      { title: 'Short-Form Calculator', path: '/short-form-calculator', badge: 'TikTok & Reels' },
      { title: 'Speech Calculator', path: '/speech-calculator', badge: 'Keynotes' },
    ],
    relatedArticleSlugs: ['words-in-a-10-minute-youtube-video', 'how-many-scenes-and-b-roll-clips'],
  },
  {
    slug: 'how-many-scenes-and-b-roll-clips',
    title: 'How Many Scenes and B-Roll Clips Does a YouTube Video Need?',
    metaDescription: 'Learn how to estimate B-roll clip requirements and scene cut pacing for high-retention YouTube videos and commercial video productions.',
    publishedDate: '2026-07-19',
    updatedDate: '2026-09-18',
    readTimeMinutes: 6,
    author: {
      name: 'Marcus Vance',
      role: 'Video Production Specialist & Script Consultant',
    },
    category: 'Video Production',
    featuredImageAlt: 'Video editing timeline showing B-roll video tracks above A-roll dialogue track',
    summaryAnswer:
      'For a standard 10-minute YouTube video, plan for 40% to 50% B-roll coverage. This translates to roughly 4 to 5 minutes of visual overlay, requiring between 60 and 95 distinct B-roll clips based on an average cut length of 2.8 to 4.0 seconds per clip. Total scene transitions across the entire video will range between 110 and 150 visual cuts.',
    keyTakeaways: [
      'Modern viewer retention requires visual changes every 3.5 to 5.5 seconds.',
      'A 10-minute video typically demands between 60 and 95 individual B-roll clips.',
      'B-roll should always illustrate, clarify, or contrast the spoken concept—never serve as empty visual filler.',
      'Organize B-roll into three tiers: Macro product detail, Atmospheric/lifestyle b-roll, and Motion screen recordings.',
    ],
    quickReferenceTable: {
      headers: ['Video Duration', 'Target B-Roll %', 'Total B-Roll Time', 'Clips Needed (Fast Cut 2.5s)', 'Clips Needed (Standard Cut 4s)'],
      rows: [
        ['1 Minute (Short)', '60%', '36 seconds', '14 – 18 clips', '8 – 11 clips'],
        ['5 Minutes', '45%', '2 min 15 sec', '50 – 60 clips', '30 – 38 clips'],
        ['10 Minutes', '40%', '4 min 00 sec', '90 – 105 clips', '55 – 65 clips'],
        ['15 Minutes', '35%', '5 min 15 sec', '115 – 135 clips', '70 – 85 clips'],
        ['20 Minutes', '30%', '6 min 00 sec', '135 – 160 clips', '80 – 100 clips'],
      ],
    },
    contentHtml: `
      <h2>The Visual Fatigue Threshold</h2>
      <p>In online video editing, the <em>Visual Fatigue Threshold</em> is the duration a viewer will watch a single static camera angle before attention starts wandering. Eye-tracking and retention metrics indicate that for YouTube talking-head content, retention begins dropping when a shot remains unaltered for more than 5 to 6 seconds.</p>
      
      <p>To keep viewers engaged, professional editors use visual pattern interrupts:</p>
      <ul>
        <li><strong>A-Roll Angle Changes:</strong> Punching in (110–120% digital crop) on key punchlines or transitions.</li>
        <li><strong>B-Roll Cutaways:</strong> Showing the physical hardware, real-world scenario, or archival footage being referenced.</li>
        <li><strong>Kinetic Motion Graphics:</strong> Animated charts, highlighted document quotes, or UI screencasts.</li>
      </ul>
      
      <h2>Calculating Your B-Roll Shooting List</h2>
      <p>Before stepping into production or purchasing stock footage, use this formula to build your shot list:</p>
      
      <p><code>Target Finished Minutes × B-Roll Percentage ÷ Average Clip Duration = Clips Required</code></p>
      
      <p>For example, a 12-minute documentary-style video with 45% B-roll requirement and a relaxed 4.0-second cut pace:</p>
      <p><code>12 min × 60s = 720s × 0.45 = 324 seconds of B-roll ÷ 4.0s = 81 B-roll clips</code></p>
      
      <p>Always shoot with a <strong>3x coverage ratio</strong>. To select 80 sharp, well-lit clips during editing, record at least 240 raw clips in the field.</p>
    `,
    relatedCalculators: [
      { title: 'Interactive Calculator', path: '/calculator', badge: 'Full Suite' },
      { title: 'YouTube Duration Calculator', path: '/youtube-duration-calculator', badge: 'YouTube' },
      { title: 'Voice-Over Calculator', path: '/voice-over-calculator', badge: 'Audio/Video' },
    ],
    relatedArticleSlugs: ['words-in-a-10-minute-youtube-video', 'how-long-to-read-1500-word-script'],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
