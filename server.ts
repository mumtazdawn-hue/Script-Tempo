import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK with standard User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Allowed Gemini TTS prebuilt voices
const VALID_VOICES = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr', 'Aoede'] as const;
type VoiceName = (typeof VALID_VOICES)[number];

// Specific sample text for each voice persona preview
const PERSONA_SAMPLES: Record<VoiceName, { title: string; sampleText: string }> = {
  Puck: {
    title: 'Upbeat & Energetic',
    sampleText: "Hey there! I'm Puck, an energetic and engaging voice built for fast-paced YouTube videos, TikToks, and high-impact intros.",
  },
  Charon: {
    title: 'Deep & Authoritative',
    sampleText: 'This is Charon. Resonant, deep, and cinematic, tailored for documentaries, trailers, and compelling narratives.',
  },
  Kore: {
    title: 'Warm & Natural',
    sampleText: "Hi, I'm Kore. A warm, natural, and friendly voice designed for podcasts, product explainers, and relatable tutorials.",
  },
  Zephyr: {
    title: 'Smooth & Articulate',
    sampleText: "Greetings, I'm Zephyr. Calm, articulate, and poised, ideal for corporate presentations, keynotes, and instructional guides.",
  },
  Fenrir: {
    title: 'Bold & Direct',
    sampleText: "I'm Fenrir. Confident, direct, and commanding, crafted for broadcast commercials, promos, and high-stakes announcements.",
  },
  Aoede: {
    title: 'Melodic & Expressive',
    sampleText: 'Hello, I am Aoede. Expressive, nuanced, and melodic, perfect for storybooks, meditations, and brand storytelling.',
  },
};

// In-memory cache for instant voice preview playback
const previewAudioCache = new Map<VoiceName, { audioBase64: string; mimeType: string }>();

/**
 * GET /api/voiceover/sample/:voice
 * Returns cached or synthesized instant audio preview for a voice persona
 */
app.get('/api/voiceover/sample/:voice', async (req, res) => {
  try {
    const rawVoice = req.params.voice;
    const matchedVoice = VALID_VOICES.find(
      (v) => v.toLowerCase() === rawVoice.toLowerCase()
    ) as VoiceName | undefined;

    if (!matchedVoice) {
      return res.status(400).json({ error: `Invalid voice '${rawVoice}'. Valid voices: ${VALID_VOICES.join(', ')}` });
    }

    // Check memory cache for instant response
    if (previewAudioCache.has(matchedVoice)) {
      const cached = previewAudioCache.get(matchedVoice)!;
      return res.json({
        success: true,
        voice: matchedVoice,
        sampleText: PERSONA_SAMPLES[matchedVoice].sampleText,
        audioBase64: cached.audioBase64,
        mimeType: cached.mimeType,
        cached: true,
      });
    }

    // Generate sample with Gemini 3.8 Flash TTS
    const persona = PERSONA_SAMPLES[matchedVoice];
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: persona.sampleText,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: matchedVoice,
            },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const audioPart = candidate?.content?.parts?.find(
      (part) => part.inlineData && part.inlineData.mimeType?.startsWith('audio/')
    );

    if (!audioPart || !audioPart.inlineData?.data) {
      return res.status(502).json({
        error: 'The TTS model did not return sample audio data.',
      });
    }

    const audioBase64 = audioPart.inlineData.data;
    const mimeType = audioPart.inlineData.mimeType || 'audio/wav';

    // Store in cache for subsequent instant hits
    previewAudioCache.set(matchedVoice, { audioBase64, mimeType });

    return res.json({
      success: true,
      voice: matchedVoice,
      sampleText: persona.sampleText,
      audioBase64,
      mimeType,
      cached: false,
    });
  } catch (error: any) {
    console.error('Error generating voice sample:', error);
    return res.status(500).json({ error: error?.message || 'Failed to synthesize sample audio' });
  }
});

/**
 * POST /api/voiceover/generate
 * Generates natural audio using Gemini 3.8 Flash TTS
 */
app.post('/api/voiceover/generate', async (req, res) => {
  try {
    const { text, voice = 'Puck', tone = 'professional' } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text prompt is required.' });
    }

    if (text.length > 5000) {
      return res.status(400).json({ error: 'Text exceeds maximum limit of 5,000 characters.' });
    }

    const selectedVoice: VoiceName = VALID_VOICES.includes(voice) ? voice : 'Puck';

    // Call Gemini 3.8 Flash TTS
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: text.trim(),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: selectedVoice,
            },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const audioPart = candidate?.content?.parts?.find(
      (part) => part.inlineData && part.inlineData.mimeType?.startsWith('audio/')
    );

    if (!audioPart || !audioPart.inlineData?.data) {
      return res.status(502).json({
        error: 'The TTS model did not return synthesized audio data. Please try again.',
      });
    }

    const audioBase64 = audioPart.inlineData.data;
    const mimeType = audioPart.inlineData.mimeType || 'audio/wav';

    // Calculate approximate duration based on word count
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const approximateDuration = Math.max(1, Math.round((words / 150) * 60));

    return res.json({
      success: true,
      audioBase64,
      mimeType,
      voice: selectedVoice,
      wordCount: words,
      approximateDuration,
    });
  } catch (error: any) {
    console.error('Error generating voiceover TTS:', error);
    const errorMessage = error?.message || 'Failed to generate voice-over audio';
    return res.status(500).json({ error: errorMessage });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Script Tempo TTS Engine' });
});

async function startServer() {
  if (!isProduction) {
    // Mount Vite middlewares in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static build in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Script Tempo full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
