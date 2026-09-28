import React, { useRef } from 'react';
import { MainCalculatorPage } from '../calculator/MainCalculatorPage';
import { SEOHead } from '../layout/SEOHead';
import { SEO_ROUTES, getWebApplicationSchema } from '../../config/seo';
import { Sliders, ArrowDown, Youtube, Mic, Radio, MessageSquare, Zap, Check } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const seo = SEO_ROUTES['/'];
  const calculatorSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    if (calculatorSectionRef.current) {
      calculatorSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const platforms = [
    { label: 'YouTube Video', path: '/youtube-word-counter', icon: Youtube },
    { label: 'Podcast Episode', path: '/podcast-calculator', icon: Mic },
    { label: 'Speech & Keynote', path: '/speech-calculator', icon: MessageSquare },
    { label: 'Voice-Over', path: '/voice-over-calculator', icon: Radio },
    { label: 'Short-Form Reels', path: '/short-form-calculator', icon: Zap },
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title={seo.title}
        description={seo.metaDescription}
        canonicalPath="/"
        schema={getWebApplicationSchema()}
      />

      {/* Hero Section */}
      <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200/80 bg-white">
        <div className="max-w-5xl lg:max-w-6xl mx-auto px-2 sm:px-4 md:px-6 text-center space-y-5">
          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto text-center">
            Video Production Calculator for <br className="hidden sm:inline" />
            YouTube, Podcasts &amp; More
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl font-medium text-slate-700 max-w-3xl mx-auto leading-relaxed text-center">
            Calculate your video length, speaking time, scenes, B-roll and <br className="hidden sm:inline" />
            production needs from your script in seconds.
          </p>

          {/* Narrative Paragraph */}
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re creating a <strong className="text-slate-800 font-semibold">YouTube video, podcast, presentation, TikTok, Instagram Reel, or voice-over</strong>, turn your word count into a practical production estimate before you hit record.
          </p>

          {/* Primary Action Button & Trust Microcopy */}
          <div className="pt-1 flex flex-col items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={scrollToCalculator}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] rounded-2xl shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-indigo-200" aria-hidden="true" />
              <span>Calculate Your Video</span>
              <ArrowDown className="w-4 h-4 ml-0.5 text-indigo-300" aria-hidden="true" />
            </button>

            {/* Trust Microcopy */}
            <div className="text-xs text-slate-400 font-medium tracking-wide">
              Free • Fast • No signup required
            </div>
          </div>

          {/* Value Workflow Chain */}
          <div className="pt-4 max-w-3xl mx-auto">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-semibold">
              <span className="flex items-center gap-1.5 text-indigo-700">
                <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold">1</span>
                Paste your script
              </span>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">→</span>
              <span className="flex items-center gap-1.5 text-indigo-700">
                <span className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold">2</span>
                Get your production estimate
              </span>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">→</span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                Start recording with confidence
              </span>
            </div>
          </div>

          {/* Quick Platform Presets Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.path}
                  onClick={() => onNavigate(p.path)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Interactive Studio Canvas */}
      <section ref={calculatorSectionRef} id="calculator" className="scroll-mt-4">
        <MainCalculatorPage
          initialPlatform="youtube"
          path="/"
          onNavigate={onNavigate}
        />
      </section>
    </div>
  );
};
