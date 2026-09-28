import { TextMetrics } from '../types/calculator';

/**
 * Counts syllables in an English word using phonetic heuristic rules.
 */
export function countWordSyllables(word: string): number {
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!cleanWord) return 0;
  if (cleanWord.length <= 3) return 1;

  // Replace common diphthongs and multi-vowel patterns
  const simplified = cleanWord
    .replace(/(?:[^laeiouy]|ed|es|e)$/, '')
    .replace(/^y/, '');

  const matches = simplified.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

/**
 * Robustly parses and extracts text metrics from raw script content.
 * Gracefully handles empty strings, unusual punctuation, extreme lengths, and emojis.
 */
export function analyzeScriptText(rawText: string): TextMetrics {
  if (!rawText || typeof rawText !== 'string') {
    return {
      wordCount: 0,
      characterCount: 0,
      characterCountNoSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      syllableCount: 0,
      fleschKincaidGrade: 0,
      readingEase: 100,
      averageWordsPerSentence: 0,
    };
  }

  const trimmed = rawText.trim();
  if (!trimmed) {
    return {
      wordCount: 0,
      characterCount: rawText.length,
      characterCountNoSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      syllableCount: 0,
      fleschKincaidGrade: 0,
      readingEase: 100,
      averageWordsPerSentence: 0,
    };
  }

  const characterCount = rawText.length;
  const characterCountNoSpaces = rawText.replace(/\s+/g, '').length;

  // Word extraction matching alphanumeric tokens, contractions, and compound words
  // e.g., "state-of-the-art" or "don't" or "AI-powered"
  const rawWords = trimmed.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || [];
  const wordCount = rawWords.length;

  // Paragraph extraction: split by 2 or more newlines
  const paragraphs = rawText
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const paragraphCount = Math.max(paragraphs.length, wordCount > 0 ? 1 : 0);

  // Sentence extraction: handle standard punctuation (. ! ?)
  // Guard against common abbreviations like Dr., e.g., i.e., vs., Mr., Ms.
  let sentenceCount = 0;
  if (wordCount > 0) {
    const cleanedForSentences = trimmed
      .replace(/\b(?:Dr|Mr|Mrs|Ms|Prof|Sr|Jr|vs|e\.g|i\.e|approx|etc)\./gi, '$1')
      .replace(/\.{2,}/g, '.');

    const sentenceMatches = cleanedForSentences.split(/[.!?]+(?:\s+|$)/).filter((s) => s.trim().length > 0);
    sentenceCount = Math.max(1, sentenceMatches.length);
  }

  // Syllables
  let totalSyllables = 0;
  for (let i = 0; i < rawWords.length; i++) {
    totalSyllables += countWordSyllables(rawWords[i]);
  }

  // Readability computations
  const averageWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;
  const syllablesPerWord = wordCount > 0 ? totalSyllables / wordCount : 0;

  let fleschKincaidGrade = 0;
  let readingEase = 100;

  if (wordCount > 5 && sentenceCount > 0) {
    // Standard Flesch-Kincaid Grade Level formula:
    // 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
    const rawGrade = 0.39 * averageWordsPerSentence + 11.8 * syllablesPerWord - 15.59;
    fleschKincaidGrade = Math.max(1, Math.min(18, Math.round(rawGrade * 10) / 10));

    // Standard Flesch Reading Ease formula:
    // 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    const rawEase = 206.835 - 1.015 * averageWordsPerSentence - 84.6 * syllablesPerWord;
    readingEase = Math.max(0, Math.min(100, Math.round(rawEase * 10) / 10));
  }

  return {
    wordCount,
    characterCount,
    characterCountNoSpaces,
    sentenceCount,
    paragraphCount,
    syllableCount: totalSyllables,
    fleschKincaidGrade,
    readingEase,
    averageWordsPerSentence: Math.round(averageWordsPerSentence * 10) / 10,
  };
}
