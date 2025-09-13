import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface ArticleCard {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  image: string;
  summary: string;
  views: string;
  likes: string;
  comments: string;
  timeAgo: string;
  isBreaking?: boolean;
}

interface TrendingNewsProps {
  className?: string;
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ className = '' }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Sample trending articles data
  const trendingArticles: ArticleCard[] = [
    {
      id: '1',
      title: 'AI Revolution Transforms Global Healthcare Systems Worldwide',
      category: 'Technology',
      categoryColor: 'bg-blue-500',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      summary: 'Artificial intelligence is revolutionizing healthcare delivery across continents, with new diagnostic tools showing 95% accuracy rates.',
      views: '2.4M',
      likes: '45K',
      comments: '1.2K',
      timeAgo: '2h ago',
      isBreaking: true
    },
    {
      id: '2',
      title: 'Climate Summit Reaches Historic Carbon Neutrality Agreement',
      category: 'Environment',
      categoryColor: 'bg-green-500',
      image: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg',
      summary: 'World leaders unite on unprecedented climate action plan targeting net-zero emissions by 2035, surpassing previous commitments.',
      views: '1.8M',
      likes: '32K',
      comments: '890',
      timeAgo: '4h ago'
    },
    {
      id: '3',
      title: 'Breakthrough in Quantum Computing Promises Faster Drug Discovery',
      category: 'Science',
      categoryColor: 'bg-purple-500',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
      summary: 'Scientists achieve quantum supremacy milestone that could accelerate pharmaceutical research and reduce drug development timelines.',
      views: '1.5M',
      likes: '28K',
      comments: '654',
      timeAgo: '6h ago'
    },
    {
      id: '4',
      title: 'Global Markets Surge Following Economic Recovery Indicators',
      category: 'Business',
      categoryColor: 'bg-orange-500',
      image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg',
      summary: 'International markets show strongest growth in two years as economic indicators point to sustained recovery across major economies.',
      views: '2.1M',
      likes: '38K',
      comments: '1.1K',
      timeAgo: '8h ago'
    },
    {
      id: '5',
      title: 'Space Exploration Milestone: Mars Colony Planning Advances',
      category: 'Space',
      categoryColor: 'bg-red-500',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
      summary: 'International space agencies collaborate on ambitious Mars colonization project with first human missions planned for 2030.',
      views: '1.9M',
      likes: '41K',
      comments: '987',
      timeAgo: '10h ago'
    },
    {
      id: '6',
      title: 'Renewable Energy Breakthrough Cuts Solar Panel Costs by 60%',
      category: 'Energy',
      categoryColor: 'bg-yellow-500',
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg',
      summary: 'Revolutionary solar technology promises to make renewable energy more accessible worldwide, accelerating clean energy adoption.',
      views: '1.6M',
      likes: '29K',
      comments: '743',
      timeAgo: '12h ago'
    }
  ];

  // Breaking news ticker headlines
  const breakingHeadlines = [
    'AI Healthcare Revolution Shows 95% Diagnostic Accuracy',
    'Global Climate Summit Reaches Historic Agreement',
    'Quantum Computing Breakthrough Accelerates Drug Discovery',
    'International Markets Surge on Recovery Indicators',
    'Mars Colony Planning Reaches Major Milestone',
    'Solar Panel Costs Drop 60% with New Technology'
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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

  return (
    <motion.section 
      className={`relative py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              🔥 Trending Now
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-curated stories from around the globe, personalized for your interests
          </p>
        </motion.div>

        {/* Breaking News Ticker */}
        <motion.div 
          className="mb-12 bg-red-600 text-white rounded-xl overflow-hidden shadow-lg"
          variants={itemVariants}
        >
          <div className="flex items-center h-14">
            <div className="flex-shrink-0 bg-red-700 px-4 py-2 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Breaking
            </div>
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex gap-8 items-center h-full whitespace-nowrap"
                animate={{ x: ['0%', '-100%'] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 25,
                    ease: 'linear'
                  }
                }}
              >
                {[...breakingHeadlines, ...breakingHeadlines].map((headline, index) => (
                  <div
                    key={`${headline}-${index}`}
                    className="text-sm flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-300 rounded-full flex-shrink-0"></div>
                    {headline}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Carousel Section */}
        <motion.div className="relative" variants={itemVariants}>
          {/* Navigation Buttons */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none z-10">
            <motion.button
              className={`pointer-events-auto w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 ${
                prevBtnEnabled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 hover:shadow-xl' 
                  : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              whileHover={{ scale: prevBtnEnabled ? 1.1 : 1 }}
              whileTap={{ scale: prevBtnEnabled ? 0.95 : 1 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              className={`pointer-events-auto w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 ${
                nextBtnEnabled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900 hover:shadow-xl' 
                  : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              whileHover={{ scale: nextBtnEnabled ? 1.1 : 1 }}
              whileTap={{ scale: nextBtnEnabled ? 0.95 : 1 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {trendingArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-48">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ scale: 1.05 }}
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`${article.categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
                          {article.category}
                        </span>
                      </div>

                      {/* Breaking Badge */}
                      {article.isBreaking && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                            BREAKING
                          </span>
                        </div>
                      )}

                      {/* Time Badge */}
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.timeAgo}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {article.summary}
                      </p>

                      {/* AI Tag */}
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span className="text-purple-600 dark:text-purple-400 text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                          Summarized for you
                        </span>
                      </div>

                      {/* Engagement Metrics */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Read More
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-8 md:hidden">
            <div className="flex gap-2">
              {trendingArticles.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.section>
  );
};

export default TrendingNews;