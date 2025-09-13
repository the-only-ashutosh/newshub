import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, Globe, TrendingUp } from 'lucide-react';

interface CategoryChip {
  id: string;
  label: string;
}

interface NewsItem {
  id: string;
  headline: string;
}

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryChip[] = [
    { id: '1', label: 'World' },
    { id: '2', label: 'Technology' },
    { id: '3', label: 'Business' },
    { id: '4', label: 'Entertainment' },
    { id: '5', label: 'Politics' },
    { id: '6', label: 'Movies' },
    { id: '7', label: 'Sports' },
    { id: '8', label: 'Science' },
    { id: '9', label: 'Health' },
    { id: '10', label: 'Travel' }
  ];

  const breakingNews: NewsItem[] = [
    { id: '1', headline: 'AI Technology Revolutionizes Global News Distribution' },
    { id: '2', headline: 'International Climate Summit Reaches Historic Agreement' },
    { id: '3', headline: 'Tech Giants Announce Major Partnership for Digital Innovation' },
    { id: '4', headline: 'Global Markets Show Strong Recovery Amid Economic Optimism' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const glowVariants = {
    initial: { textShadow: '0 0 10px rgba(59, 130, 246, 0.3)' },
    animate: {
      textShadow: [
        '0 0 10px rgba(59, 130, 246, 0.3)',
        '0 0 20px rgba(59, 130, 246, 0.5)',
        '0 0 10px rgba(59, 130, 246, 0.3)'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-purple-900/80"></div>
        
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
            animate="animate"
            initial="initial"
          >
            <span className="block">Your Global News,</span>
            <motion.span 
              className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
              variants={glowVariants}
            >
              Powered by AI
            </motion.span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Breaking headlines, deep insights, and personalized stories — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 min-w-[200px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Globe className="w-5 h-5" />
                Explore News
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-blue-400/50 text-blue-300 font-semibold rounded-xl backdrop-blur-sm hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 min-w-[200px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Personalize Feed
              </span>
            </motion.button>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="max-w-md mx-auto mb-12"
            variants={itemVariants}
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search global news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Category Chips */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 px-4 sm:px-0">
              <div className="flex gap-3 min-w-max">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-gray-300 border border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.label}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Breaking News Ticker */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-900/80 to-red-800/80 backdrop-blur-md border-t border-red-500/30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex items-center h-16">
          <div className="flex-shrink-0 bg-red-600 text-white px-4 py-2 font-bold text-sm uppercase tracking-wider">
            Breaking
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex gap-8 items-center h-full"
              animate={{ x: ['0%', '-100%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear'
                }
              }}
            >
              {[...breakingNews, ...breakingNews].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="text-white text-sm whitespace-nowrap flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                  {item.headline}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;