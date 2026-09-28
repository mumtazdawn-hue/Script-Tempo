import React, { useState, useEffect, useMemo } from 'react';
import { PlatformType, ProductionSettings } from '../../types/calculator';
import { PLATFORM_PRESETS } from '../../config/presets';
import { calculateFullMetrics } from '../../calculators/engine';
import { ScriptInput } from './ScriptInput';
import { PaceSelector } from './PaceSelector';
import { ProductionSettingsPanel } from './ProductionSettings';
import { ResultsDashboard } from './ResultsDashboard';
import { WordConversionTable } from './WordConversionTable';
import { ReverseCalculator } from './ReverseCalculator';
import { FormulaExplainer } from './FormulaExplainer';
import { TeleprompterModal } from './TeleprompterModal';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../layout/SEOHead';
import { SEO_ROUTES, getWebApplicationSchema } from '../../config/seo';
import { CreatorToolkitSection } from '../monetization/CreatorToolkitSection';
import { FileText, ArrowLeftRight, Youtube, Mic, Radio, MessageSquare, Zap, Sliders } from 'lucide-react';

interface MainCalculatorPageProps {
  initialPlatform?: PlatformType;
  path: string;
  onNavigate: (path: string) => void;
}

export const MainCalculatorPage: React.FC<MainCalculatorPageProps> = ({
  initialPlatform = 'youtube',
  path,
  onNavigate,
}) => {
  const [platform, setPlatform] = useState<PlatformType>(initialPlatform);
  const currentPreset = PLATFORM_PRESETS[platform];

  // Mode: 'script' (Paste/type script) vs 'reverse' (Target duration -> word count)
  const [mode, setMode] = useState<'script' | 'reverse'>('script');

  // Secondary Tab on the right side: 'matrix' | 'formulas' | 'toolkit'
  const [activeTab, setActiveTab] = useState<'matrix' | 'formulas' | 'toolkit'>('matrix');

  // Teleprompter Modal state
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);

  // Script text state
  const [scriptText, setScriptText] = useState<string>(currentPreset.sampleScript);

  // Settings state
  const [settings, setSettings] = useState<ProductionSettings>({
    wpm: currentPreset.defaultWpm,
    pacePreset: currentPreset.defaultPacePreset,
    introDurationSeconds: currentPreset.defaultIntroSeconds,
    outroDurationSeconds: currentPreset.defaultOutroSeconds,
    pausePercentage: currentPreset.defaultPausePercentage,
    adBreakDurationSeconds: currentPreset.defaultAdBreakDurationSeconds,
    numberOfAdBreaks: currentPreset.defaultNumberOfAdBreaks,
    bRollPercentage: currentPreset.defaultBRollPercentage,
    averageSceneDurationSeconds: currentPreset.defaultAverageSceneDurationSeconds,
    averageBRollClipDurationSeconds: currentPreset.defaultAverageBRollClipDurationSeconds,
  });

  // When initialPlatform prop changes
  useEffect(() => {
    if (initialPlatform !== platform) {
      const newPreset = PLATFORM_PRESETS[initialPlatform];
      setPlatform(initialPlatform);
      setSettings({
        wpm: newPreset.defaultWpm,
        pacePreset: newPreset.defaultPacePreset,
        introDurationSeconds: newPreset.defaultIntroSeconds,
        outroDurationSeconds: newPreset.defaultOutroSeconds,
        pausePercentage: newPreset.defaultPausePercentage,
        adBreakDurationSeconds: newPreset.defaultAdBreakDurationSeconds,
        numberOfAdBreaks: newPreset.defaultNumberOfAdBreaks,
        bRollPercentage: newPreset.defaultBRollPercentage,
        averageSceneDurationSeconds: newPreset.defaultAverageSceneDurationSeconds,
        averageBRollClipDurationSeconds: newPreset.defaultAverageBRollClipDurationSeconds,
      });
      setScriptText(newPreset.sampleScript);
    }
  }, [initialPlatform]);

  const handlePlatformChange = (newPlatform: PlatformType) => {
    const config = PLATFORM_PRESETS[newPlatform];
    setPlatform(newPlatform);
    setSettings({
      wpm: config.defaultWpm,
      pacePreset: config.defaultPacePreset,
      introDurationSeconds: config.defaultIntroSeconds,
      outroDurationSeconds: config.defaultOutroSeconds,
      pausePercentage: config.defaultPausePercentage,
      adBreakDurationSeconds: config.defaultAdBreakDurationSeconds,
      numberOfAdBreaks: config.defaultNumberOfAdBreaks,
      bRollPercentage: config.defaultBRollPercentage,
      averageSceneDurationSeconds: config.defaultAverageSceneDurationSeconds,
      averageBRollClipDurationSeconds: config.defaultAverageBRollClipDurationSeconds,
    });
  };

  const handleResetDefaults = () => {
    const config = PLATFORM_PRESETS[platform];
    setSettings({
      wpm: config.defaultWpm,
      pacePreset: config.defaultPacePreset,
      introDurationSeconds: config.defaultIntroSeconds,
      outroDurationSeconds: config.defaultOutroSeconds,
      pausePercentage: config.defaultPausePercentage,
      adBreakDurationSeconds: config.defaultAdBreakDurationSeconds,
      numberOfAdBreaks: config.defaultNumberOfAdBreaks,
      bRollPercentage: config.defaultBRollPercentage,
      averageSceneDurationSeconds: config.defaultAverageSceneDurationSeconds,
      averageBRollClipDurationSeconds: config.defaultAverageBRollClipDurationSeconds,
    });
  };

  // Memoized Calculation Result
  const result = useMemo(() => {
    return calculateFullMetrics(scriptText, settings, platform);
  }, [scriptText, settings, platform]);

  const handleCopySpec = () => {
    const specText = `--- CREATOR SCRIPT & PRODUCTION SPEC ---
Format: ${currentPreset.label}
Word Count: ${result.textMetrics.wordCount.toLocaleString()} words
Speaking Pace: ${result.settings.wpm} WPM (${result.production.pacingCategory})
Estimated Finished Duration: ${result.timing.formattedFinishedDuration} (${Math.round(result.timing.finishedContentSeconds)}s)
Pure Narration Time: ${result.timing.formattedNarration}
Natural Pauses (${result.settings.pausePercentage}%): ${result.timing.formattedPauses}
Intro/Hook: ${result.timing.formattedIntro} | Outro: ${result.timing.formattedOutro}
Sponsor / Ad Time: ${result.timing.formattedAdTime} (${result.settings.numberOfAdBreaks} breaks)
Estimated Scenes: ~${result.production.estimatedScenes} scenes (cut length: ${result.settings.averageSceneDurationSeconds}s)
Estimated B-Roll: ${result.production.formattedBRollTime} (${result.production.estimatedBRollClipsMin}-${result.production.estimatedBRollClipsMax} clips at ${result.settings.bRollPercentage}% coverage)
Generated with Script Tempo: https://creatorscriptcalc.com`;

    navigator.clipboard.writeText(specText);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('wpm', String(settings.wpm));
    url.searchParams.set('platform', platform);
    navigator.clipboard.writeText(url.toString());
    alert('Shareable configuration link copied to clipboard!');
  };

  const seoConfig = SEO_ROUTES[path] || SEO_ROUTES['/'];

  const platforms: { id: PlatformType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'youtube', label: 'YouTube', icon: Youtube },
    { id: 'tiktok', label: 'Shorts & TikTok', icon: Zap },
    { id: 'podcast', label: 'Podcast', icon: Mic },
    { id: 'speech', label: 'Speech', icon: MessageSquare },
    { id: 'voice_over', label: 'Voice-Over', icon: Radio },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.metaDescription}
        canonicalPath={seoConfig.path}
        schema={getWebApplicationSchema()}
      />

      {path !== '/' && (
        <Breadcrumbs
          items={[
            { label: 'Calculators', path: '/calculator' },
            { label: seoConfig.heading },
          ]}
          onNavigate={onNavigate}
        />
      )}

      {/* Workspace Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        {/* Format Selector Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {platforms.map((p) => {
            const Icon = p.icon;
            const isSelected = platform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePlatformChange(p.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mode Switcher: Script to Duration vs Target Duration */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('script')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'script'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Script to Duration</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('reverse')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'reverse'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Target Duration</span>
          </button>
        </div>
      </div>

      {/* Two-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Input & Production Configuration) */}
        <div className="lg:col-span-7 space-y-4">
          {mode === 'script' ? (
            <>
              {/* Minimal Script Canvas */}
              <ScriptInput
                value={scriptText}
                onChange={setScriptText}
                metrics={result.textMetrics}
                onLoadSample={() => setScriptText(currentPreset.sampleScript)}
                onClear={() => setScriptText('')}
                platformLabel={currentPreset.label}
              />

              {/* Minimal Speaking Pace Control */}
              <PaceSelector
                preset={settings.pacePreset}
                wpm={settings.wpm}
                onPresetChange={(newPreset) =>
                  setSettings((prev) => ({ ...prev, pacePreset: newPreset }))
                }
                onWpmChange={(newWpm) =>
                  setSettings((prev) => ({ ...prev, wpm: newWpm }))
                }
              />

              {/* Progressive Disclosure: Production Settings */}
              <ProductionSettingsPanel
                settings={settings}
                onChange={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
                onResetDefaults={handleResetDefaults}
              />
            </>
          ) : (
            <div className="space-y-4">
              <ReverseCalculator
                settings={settings}
                onApplyWordsToScript={(targetWords) => {
                  setScriptText((prev) => {
                    const clean = prev.replace(/\n*\[Target Goal:.*\]/, '');
                    return `${clean}\n\n[Target Goal: ~${targetWords} words]`;
                  });
                  setMode('script');
                }}
              />

              <PaceSelector
                preset={settings.pacePreset}
                wpm={settings.wpm}
                onPresetChange={(newPreset) =>
                  setSettings((prev) => ({ ...prev, pacePreset: newPreset }))
                }
                onWpmChange={(newWpm) =>
                  setSettings((prev) => ({ ...prev, wpm: newWpm }))
                }
              />
            </div>
          )}
        </div>

        {/* Right Column (Results Engine & Reference Tabs) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
          {/* Main Results Hero */}
          <ResultsDashboard
            result={result}
            onShare={handleShare}
            onCopySpec={handleCopySpec}
            onOpenTeleprompter={() => setIsTeleprompterOpen(true)}
          />

          {/* Clean Tabbed Explorer for Secondary Information */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('matrix')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'matrix'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Conversions
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('formulas')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'formulas'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Formulas
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('toolkit')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'toolkit'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Toolkit
                </button>
              </div>

              <span className="text-[11px] text-slate-400">
                {activeTab === 'matrix' && 'Standard runtimes'}
                {activeTab === 'formulas' && 'Methodology'}
                {activeTab === 'toolkit' && 'Recommended gear'}
              </span>
            </div>

            {/* Tab Views */}
            {activeTab === 'matrix' && (
              <WordConversionTable
                conversions={result.conversions}
                wpm={settings.wpm}
              />
            )}

            {activeTab === 'formulas' && <FormulaExplainer />}

            {activeTab === 'toolkit' && <CreatorToolkitSection onNavigate={onNavigate} />}
          </div>
        </div>
      </div>

      {/* Interactive Teleprompter Modal */}
      <TeleprompterModal
        isOpen={isTeleprompterOpen}
        onClose={() => setIsTeleprompterOpen(false)}
        scriptText={scriptText}
        wpm={settings.wpm}
      />
    </div>
  );
};
