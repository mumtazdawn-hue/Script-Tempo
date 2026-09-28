import { ProductionMetrics, ProductionSettings } from '../types/calculator';
import { formatDuration } from './duration';

/**
 * Calculates video editing and production metrics such as scene counts,
 * B-roll requirements, visual change frequency, and pacing benchmarks.
 */
export function calculateProductionMetrics(
  finishedContentSeconds: number,
  settings: ProductionSettings
): ProductionMetrics {
  if (finishedContentSeconds <= 0) {
    return {
      estimatedScenes: 0,
      sceneDurationSeconds: settings.averageSceneDurationSeconds,
      bRollTotalSeconds: 0,
      formattedBRollTime: '0:00',
      estimatedBRollClipsMin: 0,
      estimatedBRollClipsMax: 0,
      estimatedVisualCuts: 0,
      pacingCategory: 'Standard',
      talkingHeadSeconds: 0,
      formattedTalkingHeadTime: '0:00',
    };
  }

  // Scene duration: average length before camera angle or scene changes (default ~4.5 - 6s)
  const avgSceneSec = Math.max(1, settings.averageSceneDurationSeconds || 5);
  const avgBRollClipSec = Math.max(1, settings.averageBRollClipDurationSeconds || 3.2);
  const bRollPct = Math.max(0, Math.min(100, settings.bRollPercentage || 0)) / 100;

  // Scene count represents distinct visual blocks / sequences
  const estimatedScenes = Math.max(1, Math.round(finishedContentSeconds / avgSceneSec));

  // B-roll duration is a percentage of finished video
  const bRollTotalSeconds = finishedContentSeconds * bRollPct;
  const talkingHeadSeconds = Math.max(0, finishedContentSeconds - bRollTotalSeconds);

  // B-roll clip estimates:
  // Short cuts (dynamic): clip duration * 0.8
  // Longer cuts (establishing/deliberate): clip duration * 1.3
  const estimatedBRollClipsMin = bRollTotalSeconds > 0
    ? Math.max(1, Math.floor(bRollTotalSeconds / (avgBRollClipSec * 1.35)))
    : 0;
  const estimatedBRollClipsMax = bRollTotalSeconds > 0
    ? Math.max(1, Math.ceil(bRollTotalSeconds / (avgBRollClipSec * 0.8)))
    : 0;

  // Total visual cuts = scenes + b-roll cut points
  const estimatedVisualCuts = Math.max(
    estimatedScenes,
    Math.round(finishedContentSeconds / avgSceneSec + (estimatedBRollClipsMin + estimatedBRollClipsMax) / 2)
  );

  // Pacing Category
  let pacingCategory: ProductionMetrics['pacingCategory'] = 'Standard';
  if (avgSceneSec <= 2.8) {
    pacingCategory = 'Rapid';
  } else if (avgSceneSec <= 4.2) {
    pacingCategory = 'Fast';
  } else if (avgSceneSec <= 6.5) {
    pacingCategory = 'Standard';
  } else if (avgSceneSec <= 9.5) {
    pacingCategory = 'Deliberate';
  } else {
    pacingCategory = 'Slow';
  }

  return {
    estimatedScenes,
    sceneDurationSeconds: avgSceneSec,
    bRollTotalSeconds,
    formattedBRollTime: formatDuration(bRollTotalSeconds),
    estimatedBRollClipsMin,
    estimatedBRollClipsMax,
    estimatedVisualCuts,
    pacingCategory,
    talkingHeadSeconds,
    formattedTalkingHeadTime: formatDuration(talkingHeadSeconds),
  };
}
