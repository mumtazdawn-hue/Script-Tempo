import { ProductionSettings, WordConversionItem } from '../types/calculator';
import { sanitizeWpm } from './speakingRate';

export const STANDARD_INTERVALS: { label: string; seconds: number }[] = [
  { label: '30 seconds', seconds: 30 },
  { label: '1 minute', seconds: 60 },
  { label: '5 minutes', seconds: 300 },
  { label: '10 minutes', seconds: 600 },
  { label: '15 minutes', seconds: 900 },
  { label: '20 minutes', seconds: 1200 },
  { label: '30 minutes', seconds: 1800 },
  { label: '60 minutes', seconds: 3600 },
];

/**
 * Calculates how many words are required to produce content of a given target duration.
 * Inverse formula:
 * Target Duration = SpokenTime + Intro + Outro + AdBreaks
 * SpokenTime = PureNarration * (1 + pausePercentage/100)
 * PureNarration = SpokenTime / (1 + pausePercentage/100)
 * WordCount = (PureNarration / 60) * WPM
 */
export function calculateWordsForDuration(
  targetSeconds: number,
  settings: ProductionSettings
): number {
  if (targetSeconds <= 0) return 0;

  const wpm = sanitizeWpm(settings.wpm, 150);
  const pauseFactor = 1 + Math.max(0, settings.pausePercentage) / 100;
  const nonSpokenSeconds =
    (settings.introDurationSeconds || 0) +
    (settings.outroDurationSeconds || 0) +
    (settings.adBreakDurationSeconds || 0) * (settings.numberOfAdBreaks || 0);

  // Available spoken seconds
  const availableSpokenSeconds = Math.max(0, targetSeconds - nonSpokenSeconds);
  if (availableSpokenSeconds <= 0) return 0;

  // Pure narration seconds without pauses
  const pureNarrationSeconds = availableSpokenSeconds / pauseFactor;

  // Words needed:
  return Math.round((pureNarrationSeconds / 60) * wpm);
}

/**
 * Generates the standardized conversion matrix for quick reference.
 */
export function generateConversionMatrix(settings: ProductionSettings): WordConversionItem[] {
  const avgScene = Math.max(1, settings.averageSceneDurationSeconds || 5);
  const avgBRoll = Math.max(1, settings.averageBRollClipDurationSeconds || 3.2);
  const bRollPct = Math.max(0, Math.min(100, settings.bRollPercentage || 0)) / 100;

  return STANDARD_INTERVALS.map((item) => {
    const wordsNeeded = calculateWordsForDuration(item.seconds, settings);
    const scenesEstimate = Math.max(1, Math.round(item.seconds / avgScene));
    const bRollSeconds = item.seconds * bRollPct;
    const bRollClipsEstimate = bRollSeconds > 0 ? Math.round(bRollSeconds / avgBRoll) : 0;

    return {
      durationLabel: item.label,
      targetSeconds: item.seconds,
      wordsNeeded,
      scenesEstimate,
      bRollClipsEstimate,
    };
  });
}
