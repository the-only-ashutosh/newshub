import React from 'react';
import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import TrendingNews from './components/TrendingNews';
import CategoriesOverview from './components/CategoriesOverview';
import EditorsPicks from './components/EditorsPicks';
import { RegionalNewsSection } from './components/RegionalNews';
import NewsletterSignup from './components/NewsletterSignup';
import ArticlePage from './components/ArticlePage/ArticlePage';
import CardNav, { CardNavItem } from './components/CardNav';
import { Globe } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'article'>('home');
  const [currentArticleId, setCurrentArticleId] = useState<string>('');

  // Sample navigation data for NewsHub
  const navItems: CardNavItem[] = [
    {
      label: 'News',
      bgColor: '#1e40af',
      textColor: '#ffffff',
      links: [
        { label: 'Breaking News', href: '/breaking', ariaLabel: 'View breaking news' },
        { label: 'World News', href: '/world', ariaLabel: 'View world news' },
        { label: 'Local News', href: '/local', ariaLabel: 'View local news' }
      ]
    },
    {
      label: 'Categories',
      bgColor: '#7c3aed',
      textColor: '#ffffff',
      links: [
        { label: 'Technology', href: '/tech', ariaLabel: 'View technology news' },
        { label: 'Business', href: '/business', ariaLabel: 'View business news' },
        { label: 'Sports', href: '/sports', ariaLabel: 'View sports news' }
      ]
    },
    {
      label: 'Features',
      bgColor: '#059669',
      textColor: '#ffffff',
      links: [
        { label: 'AI Insights', href: '/ai-insights', ariaLabel: 'View AI-powered insights' },
        { label: 'Personalized Feed', href: '/feed', ariaLabel: 'View personalized news feed' },
        { label: 'Trending Topics', href: '/trending', ariaLabel: 'View trending topics' }
      ]
    }
  ];

  // Create a simple logo using Lucide React Globe icon as SVG data URL
  const logoSvg = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="m4.93 4.93 4.24 4.24"/>
      <path d="m14.83 9.17 4.24-4.24"/>
      <path d="m14.83 14.83 4.24 4.24"/>
      <path d="m9.17 14.83-4.24 4.24"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  `)}`;

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
    // You can add more theme logic here, such as updating CSS variables
    console.log('Theme changed to:', isDark ? 'dark' : 'light');
  };

  const handleNavigate = (url: string) => {
    if (url === '/') {
      setCurrentView('home');
    } else if (url.startsWith('/articles/')) {
      const articleId = url.split('/articles/')[1];
      setCurrentArticleId(articleId);
      setCurrentView('article');
    } else {
      console.log('Navigate to:', url);
      // Handle other navigation
    }
  };

  // Simulate article navigation from other components
  useEffect(() => {
    const handleArticleClick = (event: CustomEvent) => {
      const articleId = event.detail.articleId;
      setCurrentArticleId(articleId);
      setCurrentView('article');
    };

    window.addEventListener('navigate-to-article', handleArticleClick as EventListener);
    return () => window.removeEventListener('navigate-to-article', handleArticleClick as EventListener);
  }, []);

  return (
    <div className="min-h-screen">
      {currentView === 'home' ? (
        <>
          <CardNav
            logo={logoSvg}
            logoAlt="NewsHub Logo"
            items={navItems}
            baseColor="rgba(255, 255, 255, 0.1)"
            menuColor="#ffffff"
            buttonBgColor="#3b82f6"
            buttonTextColor="#ffffff"
            className="backdrop-blur-md"
            onThemeToggle={handleThemeToggle}
          />
          <HeroSection />
          <TrendingNews />
          <CategoriesOverview />
          <EditorsPicks />
          <RegionalNewsSection 
            userLocation="usa"
            onRegionChange={(regionId) => console.log('Region changed to:', regionId)}
            onArticleClick={(articleId) => {
              setCurrentArticleId(articleId);
              setCurrentView('article');
            }}
            onViewAllClick={(regionId) => console.log('View all clicked for:', regionId)}
          />
          <NewsletterSignup 
            onSubscribe={async (email) => {
              console.log('Newsletter subscription for:', email);
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 2000));
              return true; // Return true for success, false for failure
            }}
          />
        </>
      ) : (
        <ArticlePage
          articleId={currentArticleId}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;