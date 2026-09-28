import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Play,
  Square,
  Pause,
  Download,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Check,
  AlertCircle,
  Clock,
  FileAudio,
  Radio,
  Sliders,
  Copy,
  Headphones,
  CheckCircle2,
} from 'lucide-react';

interface VoiceOption {
  id: string;
  name: string;
  gender: 'male' | 'female';
  tone: string;
  category: 'energetic' | 'authoritative' | 'conversational' | 'smooth' | 'melodic';
  description: string;
  sampleTranscript: string;
  recommendedFor: string;
}

const VOICES: VoiceOption[] = [
  {
    id: 'Puck',
    name: 'Puck',
    gender: 'male',
    tone: 'Energetic & Upbeat',
    category: 'energetic',
    description: 'Crisp, contemporary, fast-paced delivery.',
    sampleTranscript: "Hey there! I'm Puck, an energetic and engaging voice built for fast-paced YouTube videos, TikToks, and high-impact intros.",
    recommendedFor: 'YouTube, TikTok, Shorts & Tech Reviews',
  },
  {
    id: 'Charon',
    name: 'Charon',
    gender: 'male',
    tone: 'Deep & Authoritative',
    category: 'authoritative',
    description: 'Commanding, resonant cinematic tone.',
    sampleTranscript: 'This is Charon. Resonant, deep, and cinematic, tailored for documentaries, trailers, and compelling narratives.',
    recommendedFor: 'Documentaries, Movie Trailers & Audiobooks',
  },
  {
    id: 'Kore',
    name: 'Kore',
    gender: 'female',
    tone: 'Warm & Natural',
    category: 'conversational',
    description: 'Engaging, relatable, friendly cadence.',
    sampleTranscript: "Hi, I'm Kore. A warm, natural, and friendly voice designed for podcasts, product explainers, and relatable tutorials.",
    recommendedFor: 'Podcasts, Tutorials & Explainer Videos',
  },
  {
    id: 'Zephyr',
    name: 'Zephyr',
    gender: 'female',
    tone: 'Smooth & Articulate',
    category: 'smooth',
    description: 'Clear, balanced, executive-grade poise.',
    sampleTranscript: "Greetings, I'm Zephyr. Calm, articulate, and poised, ideal for corporate presentations, keynotes, and instructional guides.",
    recommendedFor: 'Corporate Keynotes, SaaS Demos & Training',
  },
  {
    id: 'Fenrir',
    name: 'Fenrir',
    gender: 'male',
    tone: 'Bold & Direct',
    category: 'authoritative',
    description: 'Impactful, punchy broadcast announcer texture.',
    sampleTranscript: "I'm Fenrir. Confident, direct, and commanding, crafted for broadcast commercials, promos, and high-stakes announcements.",
    recommendedFor: 'Radio Promos, Commercials & Broadcast TV',
  },
  {
    id: 'Aoede',
    name: 'Aoede',
    gender: 'female',
    tone: 'Melodic & Expressive',
    category: 'melodic',
    description: 'Polished, nuanced storytelling cadence.',
    sampleTranscript: 'Hello, I am Aoede. Expressive, nuanced, and melodic, perfect for storybooks, meditations, and brand storytelling.',
    recommendedFor: 'Audio Stories, Meditations & Brand Ethos',
  },
];

const PRESETS = [
  {
    title: '15s Promo Spot',
    words: 36,
    text: 'Tired of guessing how long your video will be? Script Tempo calculates your exact speaking pace, scene cuts, and B-roll needs before you hit record. Try it free right now.',
  },
  {
    title: '30s Commercial Read',
    words: 74,
    text: 'Every second counts in modern content creation. When your script runs over, your viewer retention plummets. Script Tempo provides instant, data-backed narration metrics for YouTube, podcasts, and broadcast voice-overs. Simply paste your draft, choose your natural words-per-minute, and receive a complete production breakdown. Save hours in post-production and record with absolute confidence.',
  },
  {
    title: 'Podcast Intro Hook',
    words: 48,
    text: 'Welcome back to the Creative Edge podcast! Today, we are breaking down the exact formulas top creators use to script ten-minute videos with maximum viewer retention. Let’s dive straight into the numbers.',
  },
];

interface VoiceOverStudioProps {
  initialScript?: string;
  onNavigate?: (path: string) => void;
}

export const VoiceOverStudio: React.FC<VoiceOverStudioProps> = ({
  initialScript = '',
  onNavigate,
}) => {
  const [script, setScript] = useState<string>(initialScript);
  const [selectedVoice, setSelectedVoice] = useState<string>('Puck');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingTime, setLoadingTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Audio Preview State (Interactive Persona Sample Audios)
  const [playingPreviewVoice, setPlayingPreviewVoice] = useState<string | null>(null);
  const [loadingPreviewVoice, setLoadingPreviewVoice] = useState<string | null>(null);
  const previewCache = useRef<Record<string, string>>({});
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Main Script Synthesis Audio State
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlayingMain, setIsPlayingMain] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [generationMeta, setGenerationMeta] = useState<{
    voice: string;
    wordCount: number;
    durationEstimate: number;
    createdAt: Date;
    sizeKb: number;
  } | null>(null);

  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize preview audio element
  useEffect(() => {
    const audio = new Audio();
    previewAudioRef.current = audio;

    const handleEnded = () => {
      setPlayingPreviewVoice(null);
    };

    const handlePause = () => {
      setPlayingPreviewVoice(null);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      // Revoke all created cached preview object URLs
      Object.values(previewCache.current).forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      });
    };
  }, []);

  // Handle Loading Timer
  useEffect(() => {
    if (isLoading) {
      setLoadingTime(0);
      timerRef.current = setInterval(() => {
        setLoadingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading]);

  // Clean up Main Audio Object URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Calculated text stats
  const wordCount = script.trim() ? script.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = script.length;
  const estimatedSeconds = Math.max(1, Math.round((wordCount / 150) * 60));

  // Convert Base64 string to Blob
  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  /**
   * Play or stop a persona sample audio preview with strict mutual exclusivity
   */
  const handleToggleVoicePreview = async (voiceId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card selection if user only wants to listen

    // 1. If this exact voice preview is already playing, pause it
    if (playingPreviewVoice === voiceId) {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
      setPlayingPreviewVoice(null);
      return;
    }

    // 2. Stop any other playing preview or main script audio
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }
    if (mainAudioRef.current && !mainAudioRef.current.paused) {
      mainAudioRef.current.pause();
      setIsPlayingMain(false);
    }

    setLoadingPreviewVoice(voiceId);

    try {
      let previewUrl = previewCache.current[voiceId];

      if (!previewUrl) {
        // Fetch audio from server preview endpoint
        const res = await fetch(`/api/voiceover/sample/${encodeURIComponent(voiceId)}`);
        const data = await res.json();

        if (!res.ok || !data.success || !data.audioBase64) {
          throw new Error(data.error || 'Failed to load persona preview audio');
        }

        const blob = base64ToBlob(data.audioBase64, data.mimeType || 'audio/wav');
        previewUrl = URL.createObjectURL(blob);
        previewCache.current[voiceId] = previewUrl;
      }

      if (previewAudioRef.current) {
        previewAudioRef.current.src = previewUrl;
        previewAudioRef.current.currentTime = 0;
        await previewAudioRef.current.play();
        setPlayingPreviewVoice(voiceId);
      }
    } catch (err: any) {
      console.error('Error playing voice preview:', err);
      setError(`Could not preview ${voiceId}: ${err.message || 'Network issue'}`);
    } finally {
      setLoadingPreviewVoice(null);
    }
  };

  /**
   * Generate Full Script Audio
   */
  const handleGenerateAudio = async () => {
    if (!script.trim()) {
      setError('Please enter or paste your voice-over script first.');
      return;
    }

    if (script.length > 5000) {
      setError('Script exceeds maximum limit of 5,000 characters. Please shorten it.');
      return;
    }

    // Stop any voice persona preview that might be playing
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      setPlayingPreviewVoice(null);
    }

    setIsLoading(true);
    setError(null);
    setIsPlayingMain(false);

    try {
      const response = await fetch('/api/voiceover/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: script.trim(),
          voice: selectedVoice,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to synthesize speech audio.');
      }

      const mimeType = data.mimeType || 'audio/wav';
      const blob = base64ToBlob(data.audioBase64, mimeType);
      const url = URL.createObjectURL(blob);

      // Revoke previous URL if any
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      setAudioBlob(blob);
      setAudioUrl(url);
      setGenerationMeta({
        voice: data.voice,
        wordCount: data.wordCount,
        durationEstimate: data.approximateDuration,
        createdAt: new Date(),
        sizeKb: Math.round(blob.size / 1024),
      });

      // Auto play preview once loaded
      setTimeout(() => {
        if (mainAudioRef.current) {
          mainAudioRef.current.currentTime = 0;
          mainAudioRef.current.play().catch(() => {
            // Autoplay policies might block, silent ignore
          });
        }
      }, 200);
    } catch (err: any) {
      console.error('Error generating audio:', err);
      setError(err.message || 'An error occurred while generating audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!audioBlob && !audioUrl) return;

    const downloadLink = document.createElement('a');
    downloadLink.href = audioUrl!;
    const timestamp = new Date().toISOString().slice(0, 10);
    const sanitizedVoice = selectedVoice.toLowerCase();
    downloadLink.download = `script-tempo-${sanitizedVoice}-${timestamp}.wav`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleCopyScript = () => {
    if (!script) return;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filtered voice list
  const filteredVoices =
    categoryFilter === 'all'
      ? VOICES
      : VOICES.filter((v) => v.category === categoryFilter);

  const activeVoiceObj = VOICES.find((v) => v.id === selectedVoice) || VOICES[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all">
      {/* Studio Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-400/30">
              <Radio className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Studio Voice-Over Generator
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Free • Gemini 3.8 TTS
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Preview distinct voice personas, audition sample delivery, and generate full 24kHz .WAV audio.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-medium mr-1 hidden lg:inline">Templates:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.title}
              type="button"
              onClick={() => setScript(preset.text)}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-7">
        {/* Step 1: Voice Persona Selection with Audio Previews */}
        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-indigo-600" />
              <span>1. Choose Persona &amp; Preview Sample Audio</span>
            </label>

            {/* Persona Category Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Styles' },
                { id: 'energetic', label: 'Energetic' },
                { id: 'authoritative', label: 'Authoritative' },
                { id: 'conversational', label: 'Conversational' },
                { id: 'smooth', label: 'Smooth' },
                { id: 'melodic', label: 'Melodic' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    categoryFilter === cat.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredVoices.map((v) => {
              const isSelected = selectedVoice === v.id;
              const isPreviewPlaying = playingPreviewVoice === v.id;
              const isPreviewLoading = loadingPreviewVoice === v.id;

              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/70 hover:shadow-xs'
                  } ${isPreviewPlaying ? 'border-indigo-500 bg-indigo-50/90 shadow-md ring-2 ring-indigo-400' : ''}`}
                >
                  {/* Top Bar: Name, Gender & Active Indicator */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-extrabold ${isSelected ? 'text-indigo-950' : 'text-slate-900'}`}>
                          {v.name}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Active
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          v.gender === 'female'
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {v.gender}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-700 mt-1">
                      {v.tone}
                    </div>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {v.description}
                    </p>
                  </div>

                  {/* Bottom: Recommended & Interactive Preview Audio Button */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-medium truncate">
                      {v.recommendedFor}
                    </span>

                    {/* Interactive "Play Sample" Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleVoicePreview(v.id, e)}
                      title={isPreviewPlaying ? 'Stop sample preview' : `Listen to ${v.name}'s sample`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 shadow-xs ${
                        isPreviewPlaying
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 ring-2 ring-indigo-300 animate-pulse'
                          : isPreviewLoading
                          ? 'bg-slate-200 text-slate-500 cursor-wait'
                          : isSelected
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200'
                      }`}
                    >
                      {isPreviewLoading ? (
                        <>
                          <svg
                            className="animate-spin w-3.5 h-3.5 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Loading</span>
                        </>
                      ) : isPreviewPlaying ? (
                        <>
                          <Square className="w-3 h-3 fill-current" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Sample</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Voice Transcript Callout */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-start sm:items-center gap-2">
              <span className="font-bold text-slate-800 flex items-center gap-1 shrink-0">
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                {activeVoiceObj.name} Persona Sample:
              </span>
              <span className="text-slate-600 italic">
                &ldquo;{activeVoiceObj.sampleTranscript}&rdquo;
              </span>
            </div>

            {/* Quick listen trigger for currently active voice */}
            <button
              type="button"
              onClick={(e) => handleToggleVoicePreview(activeVoiceObj.id, e)}
              className="self-end sm:self-auto text-xs text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer flex items-center gap-1 shrink-0"
            >
              {playingPreviewVoice === activeVoiceObj.id ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Pause Audition</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Audition {activeVoiceObj.name}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step 2: Script Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="voiceover-text" className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-indigo-600" />
              2. Enter Voice-Over Script
            </label>
            <div className="flex items-center gap-3 text-slate-500">
              <button
                type="button"
                onClick={handleCopyScript}
                className="hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                title="Copy script to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setScript('')}
                className="hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                title="Clear text"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              id="voiceover-text"
              rows={5}
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste or type your voice-over script here... (e.g. commercial reads, YouTube voice-overs, podcasts, or instructional scripts)"
              className="w-full p-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 text-sm leading-relaxed placeholder:text-slate-400 outline-none resize-y transition-all"
            />
          </div>

          {/* Realtime Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 px-1">
            <div className="flex items-center gap-4">
              <span>
                <strong className="text-slate-800 font-semibold">{wordCount}</strong> words
              </span>
              <span>•</span>
              <span>
                <strong className="text-slate-800 font-semibold">{charCount}</strong> / 5,000 characters
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-indigo-600 font-medium">
                <Clock className="w-3 h-3" />
                Est. ~{estimatedSeconds}s narration
              </span>
            </div>

            {wordCount > 0 && (
              <span className="text-[11px] text-slate-400">
                Pacing: ~150 WPM broadcast standard
              </span>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold">Notice:</strong>
              <p className="leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Action Button: Generate Voice-Over */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <button
            type="button"
            onClick={handleGenerateAudio}
            disabled={isLoading || !script.trim()}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-white shadow-md transition-all cursor-pointer ${
              isLoading || !script.trim()
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Synthesizing Voice-Over with {activeVoiceObj.name} ({loadingTime}s)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Generate Audio with {activeVoiceObj.name}</span>
              </>
            )}
          </button>

          <div className="text-xs text-slate-400 text-center sm:text-right">
            <span>Powered by native Gemini 3.8 Flash TTS</span>
            <span className="block text-[11px] text-slate-400">Zero third-party paid dependencies</span>
          </div>
        </div>

        {/* Step 3: Generated Audio Player & Download Hub */}
        {audioUrl && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-emerald-50/40 border border-indigo-100 space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <FileAudio className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Audio Synthesized Successfully
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Voice: <strong>{generationMeta?.voice}</strong></span>
                    <span>•</span>
                    <span>{generationMeta?.wordCount} words</span>
                    <span>•</span>
                    <span>~{generationMeta?.durationEstimate}s duration</span>
                    <span>•</span>
                    <span>{generationMeta?.sizeKb} KB (WAV)</span>
                  </div>
                </div>
              </div>

              {/* Prominent Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm shadow-emerald-600/20 hover:shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-emerald-200" />
                <span>Download Audio (.wav)</span>
              </button>
            </div>

            {/* Embedded Native HTML5 Audio Player */}
            <div className="space-y-3">
              <audio
                ref={mainAudioRef}
                src={audioUrl}
                controls
                onPlay={() => {
                  setIsPlayingMain(true);
                  // Stop any voice persona preview if playing
                  if (previewAudioRef.current) {
                    previewAudioRef.current.pause();
                    setPlayingPreviewVoice(null);
                  }
                }}
                onPause={() => setIsPlayingMain(false)}
                onEnded={() => setIsPlayingMain(false)}
                className="w-full accent-indigo-600 rounded-lg"
              />

              {/* Playback Status Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      isPlayingMain ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                    }`}
                  />
                  <span>
                    {isPlayingMain ? 'Playing preview...' : 'Ready for playback and export'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline cursor-pointer"
                  >
                    Save WAV File
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={handleGenerateAudio}
                    disabled={isLoading}
                    className="text-slate-600 hover:text-slate-900 font-medium hover:underline cursor-pointer"
                  >
                    Re-generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
