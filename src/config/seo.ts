import { SEOMetadata } from '../types/content';

export const SITE_URL = 'https://creatorscriptcalc.com';
export const SITE_NAME = 'Script Tempo - Script Calculator for Creators';

export interface RouteSEOConfig {
  path: string;
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  heading: string;
  subheading: string;
  badge: string;
}

export const SEO_ROUTES: Record<string, RouteSEOConfig> = {
  '/': {
    path: '/',
    title: 'Video Production Calculator for YouTube, Podcasts & More',
    metaDescription: 'Calculate your video length, speaking time, scenes, B-roll, and production needs from your script in seconds. Free, fast, and no signup required.',
    ogTitle: 'Video Production Calculator for YouTube, Podcasts & More',
    ogDescription: 'Calculate your video length, speaking time, scenes, B-roll, and production needs from your script in seconds.',
    heading: 'Video Production Calculator for YouTube, Podcasts & More',
    subheading: 'Calculate your video length, speaking time, scenes, B-roll, and production needs from your script in seconds.',
    badge: 'Creator Production Suite',
  },
  '/calculator': {
    path: '/calculator',
    title: 'Interactive Script Duration Calculator | Creator Production Suite',
    metaDescription: 'Interactive script calculator to estimate speaking speed, pauses, scene cuts, and B-roll clips for online video creators.',
    ogTitle: 'Interactive Script Duration Calculator',
    ogDescription: 'Estimate video length, narration timing, and production specs instantly.',
    heading: 'Interactive Script Duration Calculator',
    subheading: 'Configure speaking speed, intros, pauses, and editing assumptions to calculate video length.',
    badge: 'Full Production Suite',
  },
  '/youtube-word-counter': {
    path: '/youtube-word-counter',
    title: 'YouTube Word Counter & Duration Calculator | 5, 10 & 15 Min Scripts',
    metaDescription: 'How many words for a 5, 10, or 15-minute YouTube video? Calculate script length, narration time, mid-roll ad breaks, and retention pacing.',
    ogTitle: 'YouTube Word Counter & Duration Calculator',
    ogDescription: 'Determine exact word count and video runtime for YouTube videos with retention cut estimations.',
    heading: 'YouTube Word Counter & Video Duration Calculator',
    subheading: 'How long will your YouTube script be? Calculate narration duration, retention cut pacing, mid-roll ad placement, and scene requirements.',
    badge: 'YouTube Production Engine',
  },
  '/youtube-duration-calculator': {
    path: '/youtube-duration-calculator',
    title: 'YouTube Video Duration & Pacing Calculator | Script to Runtime',
    metaDescription: 'Convert script word count into finished YouTube video duration. Features mid-roll break planning, visual scene counts, and B-roll recommendations.',
    ogTitle: 'YouTube Video Duration & Pacing Calculator',
    ogDescription: 'Accurately plan your YouTube video runtime and post-production timeline.',
    heading: 'YouTube Video Duration & Pacing Calculator',
    subheading: 'Plan your YouTube runtime with precision. Account for intros, sponsor segments, mid-roll ads, and dynamic visual cuts.',
    badge: 'YouTube Pacing Specialist',
  },
  '/podcast-calculator': {
    path: '/podcast-calculator',
    title: 'Podcast Episode Script & Duration Calculator | 10 to 60 Min Shows',
    metaDescription: 'Estimate script word count and recording duration for podcasts. Accounts for conversational cadence, pauses, intro jingles, and sponsor reads.',
    ogTitle: 'Podcast Episode Script & Duration Calculator',
    ogDescription: 'Accurately calculate podcast duration, conversational pauses, and sponsor reads from your script.',
    heading: 'Podcast Episode Script & Duration Calculator',
    subheading: 'Calculate speech duration for solo podcasts, co-hosted discussions, and structured interviews with conversational pacing buffers.',
    badge: 'Audio & Podcast Specialist',
  },
  '/speech-calculator': {
    path: '/speech-calculator',
    title: 'Speech Duration & Word Count Calculator | 3, 5, 10 & 20 Min Speeches',
    metaDescription: 'Calculate how many words you need for a 3-minute, 5-minute, or 20-minute speech. Accounts for deliberate delivery, pauses, and rhetorical cadence.',
    ogTitle: 'Speech Duration & Word Count Calculator',
    ogDescription: 'Accurately pace your keynote address, toast, or presentation speech.',
    heading: 'Speech Duration & Word Count Calculator',
    subheading: 'Never run over time during a keynote, toast, or address. Accurately estimate speaking time with deliberate rhetorical pause buffers.',
    badge: 'Public Speaking Specialist',
  },
  '/voice-over-calculator': {
    path: '/voice-over-calculator',
    title: 'Voice-Over Timing & Word Count Calculator | Commercials & Audiobooks',
    metaDescription: 'Accurately calculate voice-over narration timing for 15s, 30s, and 60s commercials, explainer animations, and corporate narrations.',
    ogTitle: 'Voice-Over Timing & Word Count Calculator',
    ogDescription: 'Precision word counting and timing for voice actors, animators, and commercial producers.',
    heading: 'Voice-Over Timing & Word Count Calculator',
    subheading: 'Precision script timing for commercial spots, animated explainers, audiobooks, and e-learning modules.',
    badge: 'Voice-Over Precision Engine',
  },
  '/short-form-calculator': {
    path: '/short-form-calculator',
    title: 'Short-Form Video Calculator | TikTok, Reels & Shorts Pacing',
    metaDescription: 'Optimize script word counts for TikTok, Instagram Reels, and YouTube Shorts. Calculate rapid speech pacing, hook length, and fast scene cuts.',
    ogTitle: 'Short-Form Video Calculator (TikTok, Reels, Shorts)',
    ogDescription: 'Calculate exact word counts and 1.8-second scene cut schedules for high-retention vertical videos.',
    heading: 'Short-Form Video Script Calculator',
    subheading: 'Optimize script word counts for 15s, 30s, and 60s vertical videos with rapid pacing and dynamic visual scene cut benchmarks.',
    badge: 'Short-Form Viral Specialist',
  },
  '/how-it-works': {
    path: '/how-it-works',
    title: 'How This Calculator Works | Formulas, Speech Science & Assumptions',
    metaDescription: 'Explore the scientific formulas, speaking speed research (WPM), pause percentages, and video production assumptions powering our calculator.',
    ogTitle: 'How This Calculator Works — Formulas & Speech Research',
    ogDescription: 'Transparent breakdown of mathematical formulas, WPM benchmarks, and production metrics.',
    heading: 'How This Calculator Works: Formulas & Methodology',
    subheading: 'Transparent, documented formulas and empirical speech research powering our script and video production estimates.',
    badge: 'Documentation & Transparency',
  },
  '/blog': {
    path: '/blog',
    title: 'Creator Production Guides & Script Writing Resources',
    metaDescription: 'In-depth, data-backed guides on script word counts, speaking speed benchmarks, B-roll ratios, and video production workflow optimization.',
    ogTitle: 'Creator Production Guides & Resources',
    ogDescription: 'Practical, research-grounded production guides for creators, podcasters, and video editors.',
    heading: 'Creator Script & Production Knowledge Base',
    subheading: 'Data-driven guides, empirical speaking benchmarks, and production strategies for modern video and audio creators.',
    badge: 'Research & Field Guides',
  },
  '/toolkit': {
    path: '/toolkit',
    title: 'Recommended Creator Production Gear & Software Toolkit',
    metaDescription: 'Curated hardware, teleprompters, microphones, and editing tools trusted by professional video creators and voice artists.',
    ogTitle: 'Recommended Creator Production Toolkit',
    ogDescription: 'Essential hardware and software for high-efficiency script writing and video production.',
    heading: 'Creator Production Toolkit & Recommendations',
    subheading: 'Hand-selected hardware and software tools to streamline scriptwriting, teleprompter recording, and post-production editing.',
    badge: 'Creator Gear & Tools',
  },
  '/sitemap': {
    path: '/sitemap',
    title: 'HTML Sitemap | Script Tempo',
    metaDescription: 'Complete index of all calculators, guides, tools, and resources available on Script Tempo.',
    ogTitle: 'Sitemap | Script Tempo',
    ogDescription: 'Complete index of all calculators and resources on Script Tempo.',
    heading: 'Platform Sitemap & Tool Directory',
    subheading: 'Navigate all specialized calculators, duration estimators, and creator production guides.',
    badge: 'Index',
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | Script Tempo',
    metaDescription: 'Our commitment to creator privacy: your script text never leaves your browser and is never stored on external servers.',
    ogTitle: 'Privacy Policy | Script Tempo',
    ogDescription: 'Client-side privacy guarantee for script creators.',
    heading: 'Privacy Policy',
    subheading: 'Client-side processing guarantee: your scripts remain 100% private in your browser.',
    badge: 'Privacy Notice',
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Service | Script Tempo',
    metaDescription: 'Terms of service and usage guidelines for the Script Tempo calculation utility.',
    ogTitle: 'Terms of Service | Script Tempo',
    ogDescription: 'Usage terms and conditions.',
    heading: 'Terms of Service',
    subheading: 'Terms of service and fair use guidelines for our calculation platform.',
    badge: 'Legal Terms',
  },
};

/**
 * Generates Schema.org JSON-LD structured data for the application.
 */
export function getWebApplicationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Script Tempo - Script Calculator for Creators',
    url: SITE_URL,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    description: 'Professional calculator for video script duration, speaking pace, scene counts, and B-roll clip requirements.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Script word, character, and sentence counting',
      'Speaking rate presets from slow to fast with custom WPM',
      'Estimated pure narration and natural pause timing',
      'Finished video runtime with intro, outro, and mid-roll ad calculations',
      'Estimated scene counts and cut frequency',
      'B-roll duration and recommended clip counts',
      'Inverse calculation: Target Duration to Required Word Count',
    ],
  };
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
