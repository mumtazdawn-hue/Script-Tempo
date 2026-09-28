import { analyzeScriptText } from '../textAnalysis';
import { sanitizeWpm, PACE_PRESETS } from '../speakingRate';
import { calculateTiming, formatDuration } from '../duration';
import { calculateProductionMetrics } from '../production';
import { calculateWordsForDuration, generateConversionMatrix } from '../conversions';
import { calculateFullMetrics, normalizeProductionSettings } from '../engine';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('--- RUNNING UNIT TESTS FOR CALCULATION ENGINE ---');

// 1. Text Analysis tests
console.log('Testing text analysis...');
const emptyResult = analyzeScriptText('');
assert(emptyResult.wordCount === 0, 'Empty text should have 0 words');
assert(emptyResult.characterCount === 0, 'Empty text should have 0 characters');
assert(emptyResult.sentenceCount === 0, 'Empty text should have 0 sentences');
assert(emptyResult.paragraphCount === 0, 'Empty text should have 0 paragraphs');

const whitespaceResult = analyzeScriptText('   \n\n\t   ');
assert(whitespaceResult.wordCount === 0, 'Whitespace-only text should have 0 words');

const sampleScript = `Welcome back to the channel! Today, we're testing the new Sony FX3 cinema camera.
Is it worth the upgrade in 2026? Let's break down the specs, dynamic range, and low-light performance.

First, let's talk about the sensor. It has outstanding dual-native ISO at 800 and 12,800.
Make sure you subscribe before we jump into the next chapter!`;

const sampleMetrics = analyzeScriptText(sampleScript);
assert(sampleMetrics.wordCount > 50 && sampleMetrics.wordCount < 65, `Word count should be ~56, got ${sampleMetrics.wordCount}`);
assert(sampleMetrics.paragraphCount === 2, `Paragraph count should be 2, got ${sampleMetrics.paragraphCount}`);
assert(sampleMetrics.sentenceCount >= 4, `Sentence count should be >= 4, got ${sampleMetrics.sentenceCount}`);

// Unusual punctuation test
const punctuationScript = `Hello... Are you there?! Don't forget: e.g., Dr. Smith said "it's 100% state-of-the-art."`;
const punctMetrics = analyzeScriptText(punctuationScript);
assert(punctMetrics.wordCount >= 10, 'Should parse hyphenated and contracted words correctly');

// 2. Speaking Rate sanitization
console.log('Testing speaking rate...');
assert(sanitizeWpm(0) === 40, 'Zero WPM should clamp to minimum physiological floor (40 WPM)');
assert(sanitizeWpm(-50) === 40, 'Negative WPM should clamp to 40 WPM');
assert(sanitizeWpm(1000) === 350, 'Extreme 1000 WPM should clamp to maximum 350 WPM');
assert(sanitizeWpm(160) === 160, '160 WPM should remain 160');
assert(PACE_PRESETS.standard.wpm === 160, 'Standard pace should be 160 WPM');

// 3. Duration & Timing
console.log('Testing duration calculations...');
assert(formatDuration(0) === '0:00', '0 seconds formatted as 0:00');
assert(formatDuration(59) === '0:59', '59 seconds formatted as 0:59');
assert(formatDuration(60) === '1:00', '60 seconds formatted as 1:00');
assert(formatDuration(65) === '1:05', '65 seconds formatted as 1:05');
assert(formatDuration(600) === '10:00', '600 seconds formatted as 10:00');
assert(formatDuration(3665) === '1:01:05', '3665 seconds formatted as 1:01:05');

// Prompt example verification:
// 1,500 words at 155 WPM (approx YouTube standard) with ~10% pause
const timing1500 = calculateTiming(1500, {
  wpm: 155,
  pacePreset: 'standard',
  introDurationSeconds: 15,
  outroDurationSeconds: 15,
  pausePercentage: 10,
  adBreakDurationSeconds: 60,
  numberOfAdBreaks: 1,
  bRollPercentage: 40,
  averageSceneDurationSeconds: 5,
  averageBRollClipDurationSeconds: 3.5,
});

// 1500 / 155 * 60 = 580.64s = ~9 min 40 sec pure narration
console.log(`1500 words pure narration: ${timing1500.formattedNarration} (seconds: ${timing1500.pureNarrationSeconds.toFixed(1)})`);
console.log(`1500 words pauses (10%): ${timing1500.formattedPauses}`);
console.log(`1500 words finished runtime: ${timing1500.formattedFinishedDuration}`);
assert(timing1500.pureNarrationSeconds > 575 && timing1500.pureNarrationSeconds < 585, 'Pure narration for 1500 words at 155 WPM should be ~580s (9:40)');

// 4. Production Metrics
console.log('Testing production metrics...');
const prod1500 = calculateProductionMetrics(timing1500.finishedContentSeconds, {
  wpm: 155,
  pacePreset: 'standard',
  introDurationSeconds: 15,
  outroDurationSeconds: 15,
  pausePercentage: 10,
  adBreakDurationSeconds: 60,
  numberOfAdBreaks: 1,
  bRollPercentage: 40,
  averageSceneDurationSeconds: 5,
  averageBRollClipDurationSeconds: 3.5,
});
console.log(`Estimated scenes: ${prod1500.estimatedScenes}`);
console.log(`Estimated B-roll clips: ${prod1500.estimatedBRollClipsMin} - ${prod1500.estimatedBRollClipsMax}`);
assert(prod1500.estimatedScenes > 100, 'Scenes should be calculated correctly for ~11min video at 5s per scene');
assert(prod1500.estimatedBRollClipsMin > 30, 'B-roll clip minimum should be > 30');

// 5. Reverse Duration to Words
console.log('Testing reverse conversions...');
const settingsForReverse = normalizeProductionSettings({
  wpm: 150,
  pausePercentage: 10,
  introDurationSeconds: 0,
  outroDurationSeconds: 0,
  numberOfAdBreaks: 0,
});
// 5 minutes = 300s. Spoken = 300 / 1.10 = ~272.7s. 272.7 / 60 * 150 = ~682 words
const wordsFor5Min = calculateWordsForDuration(300, settingsForReverse);
console.log(`Words needed for 5 min: ${wordsFor5Min}`);
assert(wordsFor5Min > 650 && wordsFor5Min < 720, `Words for 5 min should be ~682, got ${wordsFor5Min}`);

// 6. Conversion Matrix
const matrix = generateConversionMatrix(settingsForReverse);
assert(matrix.length === 8, 'Matrix should contain 8 standard intervals');
assert(matrix[0].targetSeconds === 30, 'First interval should be 30 seconds');
assert(matrix[7].targetSeconds === 3600, 'Last interval should be 60 minutes');

// 7. Full Metrics Suite
console.log('Testing full metrics suite with empty, decimal, and extreme inputs...');
const emptyFull = calculateFullMetrics('', {});
assert(emptyFull.textMetrics.wordCount === 0, 'Empty script full metrics');
assert(emptyFull.timing.finishedContentSeconds === 0, 'Empty script runtime 0');

const extremeFull = calculateFullMetrics('word '.repeat(10000), {
  wpm: 250,
  introDurationSeconds: 12.5,
  pausePercentage: 15.75,
});
assert(extremeFull.textMetrics.wordCount === 10000, 'Extreme 10,000 word script');
assert(extremeFull.timing.finishedContentSeconds > 0, 'Finished content > 0');

console.log('✅ ALL UNIT TESTS PASSED SUCCESSFULLY!');
