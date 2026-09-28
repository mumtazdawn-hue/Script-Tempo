export type PlatformType =
  | 'youtube'
  | 'tiktok'
  | 'instagram_reel'
  | 'podcast'
  | 'voice_over'
  | 'presentation'
  | 'speech'
  | 'custom';

export type SpeakingPacePreset = 'slow' | 'conversational' | 'standard' | 'fast' | 'custom';

export interface TextMetrics {
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  syllableCount: number;
  fleschKincaidGrade: number;
  readingEase: number;
  averageWordsPerSentence: number;
}

export interface ProductionSettings {
  wpm: number;
  pacePreset: SpeakingPacePreset;
  introDurationSeconds: number;
  outroDurationSeconds: number;
  pausePercentage: number; // e.g. 12% = 0.12 of pure narration time
  adBreakDurationSeconds: number; // duration of each ad break
  numberOfAdBreaks: number; // manual or auto
  bRollPercentage: number; // e.g. 40% = 0.40 of finished video
  averageSceneDurationSeconds: number; // average shot/scene length before cut (e.g. 4.5s)
  averageBRollClipDurationSeconds: number; // average b-roll cut length (e.g. 3.0s)
}

export interface TimingBreakdown {
  pureNarrationSeconds: number;
  pauseSeconds: number;
  totalSpeakingSeconds: number;
  introSeconds: number;
  outroSeconds: number;
  adBreakTotalSeconds: number;
  finishedContentSeconds: number;
  // Formatted string representations (mm:ss or hh:mm:ss)
  formattedNarration: string;
  formattedPauses: string;
  formattedSpeaking: string;
  formattedIntro: string;
  formattedOutro: string;
  formattedAdTime: string;
  formattedFinishedDuration: string;
}

export interface ProductionMetrics {
  estimatedScenes: number;
  sceneDurationSeconds: number;
  bRollTotalSeconds: number;
  formattedBRollTime: string;
  estimatedBRollClipsMin: number;
  estimatedBRollClipsMax: number;
  estimatedVisualCuts: number;
  pacingCategory: 'Rapid' | 'Fast' | 'Standard' | 'Deliberate' | 'Slow';
  talkingHeadSeconds: number;
  formattedTalkingHeadTime: string;
}

export interface WordConversionItem {
  durationLabel: string;
  targetSeconds: number;
  wordsNeeded: number;
  scenesEstimate: number;
  bRollClipsEstimate: number;
}

export interface FullCalculationResult {
  textMetrics: TextMetrics;
  timing: TimingBreakdown;
  production: ProductionMetrics;
  conversions: WordConversionItem[];
  settings: ProductionSettings;
  platform: PlatformType;
}

export interface PresetConfiguration {
  id: PlatformType;
  label: string;
  description: string;
  defaultWpm: number;
  defaultPacePreset: SpeakingPacePreset;
  defaultIntroSeconds: number;
  defaultOutroSeconds: number;
  defaultPausePercentage: number;
  defaultAdBreakDurationSeconds: number;
  defaultNumberOfAdBreaks: number;
  defaultBRollPercentage: number;
  defaultAverageSceneDurationSeconds: number;
  defaultAverageBRollClipDurationSeconds: number;
  recommendedPaceRange: { min: number; max: number };
  sampleScript: string;
  tip: string;
}
