import { ProductionSettings, TimingBreakdown } from '../types/calculator';
import { sanitizeWpm } from './speakingRate';

/**
 * Formats raw seconds into human-readable mm:ss or hh:mm:ss format.
 * Returns "0:00" for non-positive or invalid inputs.
 */
export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds <= 0 || !isFinite(seconds)) {
    return '0:00';
  }

  const rounded = Math.round(seconds);
  const hrs = Math.floor(rounded / 3600);
  const mins = Math.floor((rounded % 3600) / 60);
  const secs = rounded % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats raw seconds into a descriptive text format like "11 min 20 sec" or "45 sec".
 */
export function formatDurationDescriptive(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds <= 0) {
    return '0 sec';
  }

  const rounded = Math.round(seconds);
  const hrs = Math.floor(rounded / 3600);
  const mins = Math.floor((rounded % 3600) / 60);
  const secs = rounded % 60;

  const parts: string[] = [];
  if (hrs > 0) parts.push(`${hrs} hr${hrs > 1 ? 's' : ''}`);
  if (mins > 0) parts.push(`${mins} min${mins > 1 ? 's' : ''}`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs} sec`);

  return parts.join(' ');
}

/**
 * Calculates complete timing breakdown for a script given word count and production settings.
 */
export function calculateTiming(
  wordCount: number,
  settings: ProductionSettings
): TimingBreakdown {
  const safeWords = Math.max(0, Math.round(wordCount));
  const safeWpm = sanitizeWpm(settings.wpm, 150);
  const safePausePct = Math.max(0, Math.min(100, settings.pausePercentage || 0)) / 100;
  const safeIntroSecs = Math.max(0, settings.introDurationSeconds || 0);
  const safeOutroSecs = Math.max(0, settings.outroDurationSeconds || 0);
  const safeAdDuration = Math.max(0, settings.adBreakDurationSeconds || 0);
  const safeNumAds = Math.max(0, Math.round(settings.numberOfAdBreaks || 0));

  // Pure narration time: (wordCount / wpm) * 60 seconds
  const pureNarrationSeconds = safeWords > 0 ? (safeWords / safeWpm) * 60 : 0;

  // Natural pause allowance (breaths, emphasis, transition pauses between sentences)
  const pauseSeconds = pureNarrationSeconds * safePausePct;

  // Total speaking time
  const totalSpeakingSeconds = pureNarrationSeconds + pauseSeconds;

  // Total ad break time
  const adBreakTotalSeconds = safeAdDuration * safeNumAds;

  // Finished finished content duration
  // If there are no spoken words and no intro/outro/ads, finished runtime is 0
  const hasContent = safeWords > 0 || safeIntroSecs > 0 || safeOutroSecs > 0 || adBreakTotalSeconds > 0;
  const finishedContentSeconds = hasContent
    ? totalSpeakingSeconds + safeIntroSecs + safeOutroSecs + adBreakTotalSeconds
    : 0;

  return {
    pureNarrationSeconds,
    pauseSeconds,
    totalSpeakingSeconds,
    introSeconds: safeIntroSecs,
    outroSeconds: safeOutroSecs,
    adBreakTotalSeconds,
    finishedContentSeconds,
    formattedNarration: formatDuration(pureNarrationSeconds),
    formattedPauses: formatDuration(pauseSeconds),
    formattedSpeaking: formatDuration(totalSpeakingSeconds),
    formattedIntro: formatDuration(safeIntroSecs),
    formattedOutro: formatDuration(safeOutroSecs),
    formattedAdTime: formatDuration(adBreakTotalSeconds),
    formattedFinishedDuration: formatDuration(finishedContentSeconds),
  };
}
