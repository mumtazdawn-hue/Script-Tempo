import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, ZoomIn, ZoomOut, FlipHorizontal, ArrowUp } from 'lucide-react';

interface TeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptText: string;
  wpm: number;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  isOpen,
  onClose,
  scriptText,
  wpm,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedWpm, setSpeedWpm] = useState(wpm);
  const [fontSize, setFontSize] = useState(36); // px
  const [isMirrored, setIsMirrored] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Sync speed when wpm changes
  useEffect(() => {
    setSpeedWpm(wpm);
  }, [wpm]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Teleprompter scroll engine
  useEffect(() => {
    if (!isPlaying || !containerRef.current) return;

    let lastTimestamp: number | null = null;
    // Calculate pixels per second based on font size and WPM
    // Rough heuristic: 1 word ~ 5 characters; average line ~ 10 words ~ 1.5 * fontSize height
    const pixelsPerSecond = (speedWpm / 60) * (fontSize * 0.9);

    const step = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (containerRef.current) {
        containerRef.current.scrollTop += pixelsPerSecond * elapsed;
        // Check if reached bottom
        if (
          containerRef.current.scrollTop + containerRef.current.clientHeight >=
          containerRef.current.scrollHeight - 20
        ) {
          setIsPlaying(false);
          return;
        }
      }
      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, speedWpm, fontSize]);

  if (!isOpen) return null;

  const handleResetScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col font-sans select-none animate-in fade-in duration-200">
      {/* Floating Minimal Control Bar */}
      <header className="h-16 px-6 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-black'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause (Space)' : 'Start Scrolling (Space)'}</span>
          </button>

          <button
            onClick={handleResetScroll}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="Reset to Top"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-neutral-800 hidden sm:block" />

          {/* Speed Control */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-300">
            <span>Speed:</span>
            <input
              type="range"
              min="80"
              max="240"
              value={speedWpm}
              onChange={(e) => setSpeedWpm(Number(e.target.value))}
              className="w-24 accent-indigo-500 cursor-pointer"
            />
            <span className="font-mono text-indigo-400 font-bold tabular-nums w-14">
              {speedWpm} WPM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Font Size controls */}
          <div className="flex items-center gap-1 bg-neutral-800/80 rounded-lg p-1 border border-neutral-700/60">
            <button
              onClick={() => setFontSize((s) => Math.max(20, s - 4))}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors"
              title="Decrease Font Size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono px-2 tabular-nums text-neutral-300">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize((s) => Math.min(72, s + 4))}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-700 transition-colors"
              title="Increase Font Size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mirror toggle for physical glass prompters */}
          <button
            onClick={() => setIsMirrored((m) => !m)}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isMirrored
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                : 'text-neutral-400 border-neutral-700 hover:text-white hover:bg-neutral-800'
            }`}
            title="Mirror Display (for glass teleprompters)"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          {/* Exit Modal Button */}
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="Exit Teleprompter (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Eyeline Indicator Guide Overlay */}
      <div className="absolute top-1/3 left-0 right-0 h-16 pointer-events-none border-y border-indigo-500/20 bg-indigo-500/5 z-10 flex items-center justify-between px-4 text-xs font-mono text-indigo-400/50">
        <span>▶ READING EYELINE</span>
        <span>◀</span>
      </div>

      {/* Main Scrolling Text Area */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto px-8 sm:px-16 lg:px-32 py-40 transition-transform duration-100 ${
          isMirrored ? 'scale-x-[-1]' : ''
        }`}
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <p
            className="font-medium text-neutral-100 leading-relaxed tracking-normal whitespace-pre-wrap selection:bg-indigo-500/40"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
          >
            {scriptText || 'Paste or draft your script on the main screen to run the teleprompter.'}
          </p>
          <div className="h-96" /> {/* Bottom breathing room so script can scroll all the way */}
        </div>
      </div>
    </div>
  );
};
