import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MainCalculatorPage } from './components/calculator/MainCalculatorPage';
import { HomePage } from './components/home/HomePage';
import { YouTubeCalculatorPage } from './components/specialized/YouTubeCalculatorPage';
import { PodcastCalculatorPage } from './components/specialized/PodcastCalculatorPage';
import { SpeechCalculatorPage } from './components/specialized/SpeechCalculatorPage';
import { VoiceOverCalculatorPage } from './components/specialized/VoiceOverCalculatorPage';
import { ShortFormCalculatorPage } from './components/specialized/ShortFormCalculatorPage';
import { BlogIndexPage } from './components/content/BlogIndexPage';
import { ArticleDetailPage } from './components/content/ArticleDetailPage';
import { HowItWorksPage } from './components/common/HowItWorksPage';
import { ToolkitPage } from './components/common/ToolkitPage';
import { SitemapPage } from './components/common/SitemapPage';
import { PrivacyPage, TermsPage } from './components/common/PrivacyPage';
import { getArticleBySlug } from './content/articles';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic navigation with pushState
  const handleNavigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route matching
  const renderCurrentView = () => {
    // 1. Article detail view: /blog/:slug
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      const article = getArticleBySlug(slug);
      if (article) {
        return <ArticleDetailPage article={article} onNavigate={handleNavigate} />;
      }
      // If slug not found, fall back to blog index
      return <BlogIndexPage onNavigate={handleNavigate} />;
    }

    // 2. Specific routes
    switch (currentPath) {
      case '/youtube-word-counter':
      case '/youtube-duration-calculator':
        return <YouTubeCalculatorPage onNavigate={handleNavigate} />;

      case '/podcast-calculator':
      case '/podcast-word-counter':
      case '/podcast-duration-calculator':
        return <PodcastCalculatorPage onNavigate={handleNavigate} />;

      case '/speech-calculator':
      case '/speech-word-counter':
        return <SpeechCalculatorPage onNavigate={handleNavigate} />;

      case '/voice-over-calculator':
        return <VoiceOverCalculatorPage onNavigate={handleNavigate} />;

      case '/short-form-calculator':
        return <ShortFormCalculatorPage onNavigate={handleNavigate} />;

      case '/blog':
        return <BlogIndexPage onNavigate={handleNavigate} />;

      case '/how-it-works':
        return <HowItWorksPage onNavigate={handleNavigate} />;

      case '/toolkit':
        return <ToolkitPage onNavigate={handleNavigate} />;

      case '/sitemap':
        return <SitemapPage onNavigate={handleNavigate} />;

      case '/privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;

      case '/terms':
        return <TermsPage onNavigate={handleNavigate} />;

      case '/':
        return <HomePage onNavigate={handleNavigate} />;

      case '/calculator':
      default:
        return (
          <MainCalculatorPage
            initialPlatform="youtube"
            path="/calculator"
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onQuickReset={() => {
          // Navigating to calculator refreshes defaults
          handleNavigate('/calculator');
        }}
      />

      <main className="flex-1" id="main-content">
        {renderCurrentView()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
