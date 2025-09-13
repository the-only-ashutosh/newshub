import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  MapPin, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Users
} from 'lucide-react';
import RegionalNewsCard from './RegionalNewsCard';
import RegionTabs from './RegionTabs';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor: string;
  region: string;
  regionBadgeColor: string;
  timestamp: string;
  views: string;
  likes: string;
  comments: string;
  isBreaking?: boolean;
  isLocal?: boolean;
}

export interface Region {
  id: string;
  name: string;
  code: string;
  icon: React.ReactNode;
  color: string;
  isUserLocation?: boolean;
}

interface RegionalNewsSectionProps {
  className?: string;
  userLocation?: string;
  onRegionChange?: (regionId: string) => void;
  onArticleClick?: (articleId: string) => void;
  onViewAllClick?: (regionId: string) => void;
}

const RegionalNewsSection: React.FC<RegionalNewsSectionProps> = ({
  className = '',
  userLocation = 'usa',
  onRegionChange,
  onArticleClick,
  onViewAllClick
}) => {
  const [activeRegion, setActiveRegion] = useState<string>('global');
  const [isLoading, setIsLoading] = useState(false);

  // Sample regions data
  const regions: Region[] = [
    {
      id: 'global',
      name: 'Global',
      code: 'WORLD',
      icon: <Globe className="w-4 h-4" />,
      color: 'bg-blue-500'
    },
    {
      id: 'asia',
      name: 'Asia',
      code: 'ASIA',
      icon: <MapPin className="w-4 h-4" />,
      color: 'bg-green-500'
    },
    {
      id: 'europe',
      name: 'Europe',
      code: 'EUR',
      icon: <MapPin className="w-4 h-4" />,
      color: 'bg-purple-500'
    },
    {
      id: 'usa',
      name: 'United States',
      code: 'USA',
      icon: <MapPin className="w-4 h-4" />,
      color: 'bg-red-500',
      isUserLocation: userLocation === 'usa'
    },
    {
      id: 'local',
      name: 'Your Area',
      code: 'LOCAL',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-orange-500',
      isUserLocation: true
    }
  ];

  // Sample news data organized by region
  const newsData: Record<string, NewsArticle[]> = {
    global: [
      {
        id: 'g1',
        title: 'Global Climate Summit Reaches Historic Carbon Neutrality Agreement',
        excerpt: 'World leaders unite on unprecedented climate action plan targeting net-zero emissions by 2035, surpassing previous commitments.',
        image: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg',
        category: 'Environment',
        categoryColor: 'bg-green-500',
        region: 'Global',
        regionBadgeColor: 'bg-blue-500',
        timestamp: '2h ago',
        views: '2.1M',
        likes: '45K',
        comments: '1.8K',
        isBreaking: true
      },
      {
        id: 'g2',
        title: 'International Space Station Welcomes New Research Mission',
        excerpt: 'Multinational crew begins groundbreaking experiments in zero gravity that could revolutionize medical treatments.',
        image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
        category: 'Space',
        categoryColor: 'bg-indigo-500',
        region: 'Global',
        regionBadgeColor: 'bg-blue-500',
        timestamp: '4h ago',
        views: '1.5M',
        likes: '32K',
        comments: '1.2K'
      },
      {
        id: 'g3',
        title: 'Global Economic Recovery Shows Strong Momentum Across Markets',
        excerpt: 'International markets surge as economic indicators point to sustained growth and stability worldwide.',
        image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg',
        category: 'Economy',
        categoryColor: 'bg-yellow-500',
        region: 'Global',
        regionBadgeColor: 'bg-blue-500',
        timestamp: '6h ago',
        views: '1.8M',
        likes: '38K',
        comments: '1.5K'
      }
    ],
    asia: [
      {
        id: 'a1',
        title: 'Asian Tech Giants Collaborate on Revolutionary AI Healthcare Platform',
        excerpt: 'Major technology companies across Asia announce joint venture to develop AI-powered medical diagnostic tools.',
        image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
        category: 'Technology',
        categoryColor: 'bg-blue-500',
        region: 'Asia',
        regionBadgeColor: 'bg-green-500',
        timestamp: '1h ago',
        views: '890K',
        likes: '24K',
        comments: '987',
        isBreaking: true
      },
      {
        id: 'a2',
        title: 'High-Speed Rail Network Expansion Connects Major Asian Cities',
        excerpt: 'New transportation infrastructure promises to revolutionize travel and commerce across the continent.',
        image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg',
        category: 'Infrastructure',
        categoryColor: 'bg-orange-500',
        region: 'Asia',
        regionBadgeColor: 'bg-green-500',
        timestamp: '3h ago',
        views: '654K',
        likes: '18K',
        comments: '743'
      },
      {
        id: 'a3',
        title: 'Renewable Energy Initiative Powers Sustainable Growth in Southeast Asia',
        excerpt: 'Regional cooperation leads to massive solar and wind energy projects across multiple countries.',
        image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg',
        category: 'Energy',
        categoryColor: 'bg-green-600',
        region: 'Asia',
        regionBadgeColor: 'bg-green-500',
        timestamp: '5h ago',
        views: '567K',
        likes: '15K',
        comments: '654'
      }
    ],
    europe: [
      {
        id: 'e1',
        title: 'European Union Launches Digital Innovation Hub for Startups',
        excerpt: 'New initiative provides funding and resources for emerging technology companies across member nations.',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
        category: 'Business',
        categoryColor: 'bg-purple-500',
        region: 'Europe',
        regionBadgeColor: 'bg-purple-500',
        timestamp: '2h ago',
        views: '743K',
        likes: '21K',
        comments: '876'
      },
      {
        id: 'e2',
        title: 'Historic Cultural Exchange Program Connects European Universities',
        excerpt: 'Students and researchers gain unprecedented access to collaborative educational opportunities.',
        image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
        category: 'Education',
        categoryColor: 'bg-teal-500',
        region: 'Europe',
        regionBadgeColor: 'bg-purple-500',
        timestamp: '4h ago',
        views: '432K',
        likes: '12K',
        comments: '543'
      },
      {
        id: 'e3',
        title: 'Green Transportation Revolution Transforms European Cities',
        excerpt: 'Electric vehicle infrastructure and sustainable public transport systems see massive expansion.',
        image: 'https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg',
        category: 'Transport',
        categoryColor: 'bg-emerald-500',
        region: 'Europe',
        regionBadgeColor: 'bg-purple-500',
        timestamp: '7h ago',
        views: '621K',
        likes: '17K',
        comments: '698'
      }
    ],
    usa: [
      {
        id: 'u1',
        title: 'Silicon Valley Breakthrough: Quantum Computing Reaches New Milestone',
        excerpt: 'American tech companies achieve quantum supremacy breakthrough that could revolutionize computing.',
        image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
        category: 'Technology',
        categoryColor: 'bg-blue-500',
        region: 'United States',
        regionBadgeColor: 'bg-red-500',
        timestamp: '1h ago',
        views: '1.2M',
        likes: '35K',
        comments: '1.4K',
        isBreaking: true
      },
      {
        id: 'u2',
        title: 'National Infrastructure Bill Allocates Billions for Clean Energy',
        excerpt: 'Historic legislation promises to transform American energy landscape with renewable investments.',
        image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg',
        category: 'Politics',
        categoryColor: 'bg-red-600',
        region: 'United States',
        regionBadgeColor: 'bg-red-500',
        timestamp: '3h ago',
        views: '987K',
        likes: '28K',
        comments: '1.1K'
      },
      {
        id: 'u3',
        title: 'American Space Program Announces Mars Mission Timeline',
        excerpt: 'NASA reveals detailed plans for human Mars exploration with international partnership support.',
        image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
        category: 'Space',
        categoryColor: 'bg-indigo-500',
        region: 'United States',
        regionBadgeColor: 'bg-red-500',
        timestamp: '5h ago',
        views: '1.5M',
        likes: '42K',
        comments: '1.7K'
      }
    ],
    local: [
      {
        id: 'l1',
        title: 'Local Community Center Opens New Technology Learning Hub',
        excerpt: 'Residents gain access to coding classes, digital literacy programs, and modern computer facilities.',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
        category: 'Community',
        categoryColor: 'bg-orange-500',
        region: 'Your Area',
        regionBadgeColor: 'bg-orange-500',
        timestamp: '30m ago',
        views: '12K',
        likes: '234',
        comments: '45',
        isLocal: true
      },
      {
        id: 'l2',
        title: 'City Council Approves Green Infrastructure Development Plan',
        excerpt: 'New initiative includes solar panels, electric vehicle charging stations, and sustainable building codes.',
        image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg',
        category: 'Local Gov',
        categoryColor: 'bg-green-500',
        region: 'Your Area',
        regionBadgeColor: 'bg-orange-500',
        timestamp: '2h ago',
        views: '8.5K',
        likes: '187',
        comments: '32',
        isLocal: true
      },
      {
        id: 'l3',
        title: 'Regional Hospital Introduces AI-Assisted Diagnostic System',
        excerpt: 'Healthcare facility becomes first in area to implement advanced artificial intelligence medical tools.',
        image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg',
        category: 'Healthcare',
        categoryColor: 'bg-blue-500',
        region: 'Your Area',
        regionBadgeColor: 'bg-orange-500',
        timestamp: '4h ago',
        views: '15K',
        likes: '298',
        comments: '67',
        isLocal: true
      }
    ]
  };

  // Set default region based on user location
  useEffect(() => {
    if (userLocation && regions.find(r => r.id === userLocation)) {
      setActiveRegion(userLocation);
    }
  }, [userLocation]);

  // Handle region change with loading state
  const handleRegionChange = async (regionId: string) => {
    setIsLoading(true);
    setActiveRegion(regionId);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 300);

    if (onRegionChange) {
      onRegionChange(regionId);
    }
  };

  // Handle article click
  const handleArticleClick = (articleId: string) => {
    if (onArticleClick) {
      onArticleClick(articleId);
    }
    console.log(`Navigate to article: ${articleId}`);
  };

  // Handle view all click
  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick(activeRegion);
    }
    console.log(`View all news from: ${activeRegion}`);
  };

  // Get current region data
  const currentRegion = regions.find(r => r.id === activeRegion);
  const currentNews = newsData[activeRegion] || [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className={`relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-900 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              🌍 Around the World
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Stay updated with the latest from your region and beyond. AI-powered regional insights 
            bring you the most relevant stories from around the globe.
          </p>

          {/* User Location Indicator */}
          {userLocation && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-700 mb-8">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Showing news relevant to your location
              </span>
            </div>
          )}
        </motion.div>

        {/* Region Tabs */}
        <RegionTabs
          regions={regions}
          activeRegion={activeRegion}
          onRegionChange={handleRegionChange}
          isLoading={isLoading}
        />

        {/* News Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-12"
          >
            {/* Region Header */}
            <motion.div 
              className="flex items-center justify-between mb-8"
              variants={contentVariants}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 ${currentRegion?.color} text-white rounded-lg`}>
                  {currentRegion?.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentRegion?.name} News
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {currentNews.length} stories available
                  </p>
                </div>
              </div>

              {/* AI Personalization Badge */}
              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-700">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Curated for You
                </span>
              </div>
            </motion.div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-xl mb-4"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* News Grid */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  variants={containerVariants}
                >
                  {currentNews.map((article, index) => (
                    <RegionalNewsCard
                      key={article.id}
                      article={article}
                      index={index}
                      onClick={() => handleArticleClick(article.id)}
                      variants={contentVariants}
                    />
                  ))}
                </motion.div>

                {/* View All Button */}
                <motion.div 
                  className="text-center mt-12"
                  variants={contentVariants}
                >
                  <motion.button
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={handleViewAllClick}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>View All News from {currentRegion?.name}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* AI Insight Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-6 py-3 rounded-full border border-green-200 dark:border-green-700">
            <Sparkles className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Regional news powered by AI location intelligence and user preferences
            </span>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 bg-green-500/5 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};

export default RegionalNewsSection;