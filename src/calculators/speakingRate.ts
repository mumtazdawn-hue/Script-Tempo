import { SpeakingPacePreset } from '../types/calculator';

export const PACE_PRESETS: Record<SpeakingPacePreset, { label: string; wpm: number; description: string }> = {
  slow: {
    label: 'Slow / Deliberate',
    wpm: 125,
    description: '120-130 WPM. Keynotes, formal speeches, meditative voice-overs, and complex technical concepts.',
  },
  conversational: {
    label: 'Conversational',
    wpm: 145,
    description: '140-150 WPM. Podcasts, interview shows, audiobooks, and casual vlogs.',
  },
  standard: {
    label: 'Standard Video',
    wpm: 160,
    description: '155-165 WPM. YouTube video essays, documentary explainers, and educational content.',
  },
  fast: {
    label: 'Fast / High Energy',
    wpm: 185,
    description: '180-200 WPM. TikTok, Instagram Reels, fast tech reviews, and rapid-fire commentary.',
  },
  custom: {
    label: 'Custom Pace',
    wpm: 150,
    description: 'Freely select any target words-per-minute pace from 50 to 300 WPM.',
  },
};

/**
 * Validates and constrains WPM value to realistic physiological speech thresholds.
 */
export function sanitizeWpm(wpm: unknown, fallback: number = 150): number {
  if (typeof wpm !== 'number' || isNaN(wpm) || !isFinite(wpm)) {
    return fallback;
  }
  // Minimum 40 WPM (slow dramatic reading), max 350 WPM (fast auctioneer / high-speed speedread)
  return Math.min(350, Math.max(40, Math.round(wpm)));
}

/**
 * Categorizes a given WPM into a human-readable pace category.
 */
export function getPaceCategory(wpm: number): string {
  if (wpm < 120) return 'Very Deliberate';
  if (wpm < 140) return 'Deliberate / Speech';
  if (wpm < 160) return 'Natural Conversational';
  if (wpm < 185) return 'Engaging Standard';
  if (wpm < 210) return 'High-Pace Short-Form';
  return 'Rapid / Speed-Narration';
}
