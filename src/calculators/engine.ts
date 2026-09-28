import { FullCalculationResult, PlatformType, ProductionSettings } from '../types/calculator';
import { analyzeScriptText } from './textAnalysis';
import { calculateTiming } from './duration';
import { calculateProductionMetrics } from './production';
import { generateConversionMatrix } from './conversions';
import { sanitizeWpm } from './speakingRate';

/**
 * Validates and normalizes settings object to guarantee complete safety against undefined/null/NaN values.
 */
export function normalizeProductionSettings(settings: Partial<ProductionSettings>): ProductionSettings {
  const wpm = sanitizeWpm(settings.wpm, 150);
  return {
    wpm,
    pacePreset: settings.pacePreset || 'standard',
    introDurationSeconds: Math.max(0, Math.round(Number(settings.introDurationSeconds) || 0)),
    outroDurationSeconds: Math.max(0, Math.round(Number(settings.outroDurationSeconds) || 0)),
    pausePercentage: Math.max(0, Math.min(100, Number(settings.pausePercentage) || 0)),
    adBreakDurationSeconds: Math.max(0, Math.round(Number(settings.adBreakDurationSeconds) || 0)),
    numberOfAdBreaks: Math.max(0, Math.round(Number(settings.numberOfAdBreaks) || 0)),
    bRollPercentage: Math.max(0, Math.min(100, Number(settings.bRollPercentage) || 0)),
    averageSceneDurationSeconds: Math.max(0.5, Math.min(60, Number(settings.averageSceneDurationSeconds) || 5)),
    averageBRollClipDurationSeconds: Math.max(0.5, Math.min(30, Number(settings.averageBRollClipDurationSeconds) || 3.2)),
  };
}

/**
 * Unified calculation function that generates the complete production suite for a script.
 */
export function calculateFullMetrics(
  scriptText: string,
  settings: Partial<ProductionSettings>,
  platform: PlatformType = 'youtube'
): FullCalculationResult {
  const normalizedSettings = normalizeProductionSettings(settings);
  const textMetrics = analyzeScriptText(scriptText);
  const timing = calculateTiming(textMetrics.wordCount, normalizedSettings);
  const production = calculateProductionMetrics(timing.finishedContentSeconds, normalizedSettings);
  const conversions = generateConversionMatrix(normalizedSettings);

  return {
    textMetrics,
    timing,
    production,
    conversions,
    settings: normalizedSettings,
    platform,
  };
}
