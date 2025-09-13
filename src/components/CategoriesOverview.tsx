import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Cpu, 
  Film, 
  Users, 
  Building2, 
  Trophy, 
  Clapperboard, 
  Star,
  MapPin,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  bgImage: string;
  bgGradient: string;
  textColor: string;
  hoverColor: string;
  articleCount: string;
}

interface CategoriesOverviewProps {
  className?: string;
}

const CategoriesOverview: React.FC<CategoriesOverviewProps> = ({ className = '' }) => {
  // Category data with AI-powered news themes
  const categories: Category[] = [
    {
      id: 'world',
      name: 'World',
      tagline: 'Global events and international affairs',
      icon: <Globe className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
      bgGradient: 'from-red-500 to-red-700',
      textColor: 'text-red-600',
      hoverColor: 'hover:shadow-red-500/25',
      articleCount: '2.4K'
    },
    {
      id: 'technology',
      name: 'Technology',
      tagline: 'AI, gadgets, and digital innovations',
      icon: <Cpu className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
      bgGradient: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-600',
      hoverColor: 'hover:shadow-blue-500/25',
      articleCount: '1.8K'
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      tagline: 'Celebrity news and pop culture',
      icon: <Film className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      bgGradient: 'from-yellow-500 to-orange-600',
      textColor: 'text-yellow-600',
      hoverColor: 'hover:shadow-yellow-500/25',
      articleCount: '3.1K'
    },
    {
      id: 'politics',
      name: 'Politics',
      tagline: 'Government and policy updates',
      icon: <Users className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/8828597/pexels-photo-8828597.jpeg',
      bgGradient: 'from-purple-500 to-purple-700',
      textColor: 'text-purple-600',
      hoverColor: 'hover:shadow-purple-500/25',
      articleCount: '1.5K'
    },
    {
      id: 'brands',
      name: 'Brands',
      tagline: 'Corporate news and business insights',
      icon: <Building2 className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg',
      bgGradient: 'from-green-500 to-green-700',
      textColor: 'text-green-600',
      hoverColor: 'hover:shadow-green-500/25',
      articleCount: '987'
    },
    {
      id: 'sports',
      name: 'Sports',
      tagline: 'Athletic achievements and competitions',
      icon: <Trophy className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg',
      bgGradient: 'from-orange-500 to-red-600',
      textColor: 'text-orange-600',
      hoverColor: 'hover:shadow-orange-500/25',
      articleCount: '2.2K'
    },
    {
      id: 'movies',
      name: 'Movies',
      tagline: 'Film industry and cinema updates',
      icon: <Clapperboard className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      bgGradient: 'from-pink-500 to-rose-600',
      textColor: 'text-pink-600',
      hoverColor: 'hover:shadow-pink-500/25',
      articleCount: '1.3K'
    },
    {
      id: 'idols',
      name: 'Idols',
      tagline: 'Celebrity lifestyle and achievements',
      icon: <Star className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      bgGradient: 'from-indigo-500 to-purple-600',
      textColor: 'text-indigo-600',
      hoverColor: 'hover:shadow-indigo-500/25',
      articleCount: '2.7K'
    },
    {
      id: 'countries',
      name: 'Countries',
      tagline: 'Regional news and local stories',
      icon: <MapPin className="w-8 h-8" />,
      bgImage: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg',
      bgGradient: 'from-teal-500 to-cyan-600',
      textColor: 'text-teal-600',
      hoverColor: 'hover:shadow-teal-500/25',
      articleCount: '1.9K'
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    // Handle navigation to category page
    console.log(`Navigate to category: ${categoryId}`);
    // In a real app, you would use React Router or Next.js router
    // router.push(`/category/${categoryId}`);
  };

  return (
    <section className={`relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Explore by Category
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover AI-curated stories across diverse topics, from global affairs to entertainment, 
            tailored to your interests and powered by intelligent content curation.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              onClick={() => handleCategoryClick(category.id)}
              variants={cardVariants}
            />
          ))}
        </motion.div>

        {/* AI-Powered Insight */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-700">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Categories personalized by AI based on your reading preferences
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
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};

// Individual Category Card Component
interface CategoryCardProps {
  category: Category;
  index: number;
  onClick: () => void;
  variants: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index, onClick, variants }) => {
  return (
    <motion.div
      className="group relative cursor-pointer"
      variants={variants}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Main Card */}
      <div className={`relative h-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl ${category.hoverColor} transition-all duration-500 overflow-hidden`}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={category.bgImage}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-colors duration-300">
              {category.icon}
            </div>
            <div className="text-right">
              <div className="text-xs font-medium opacity-90">Articles</div>
              <div className="text-lg font-bold">{category.articleCount}</div>
            </div>
          </div>

          {/* Bottom Section */}
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-sm opacity-90 mb-4 line-clamp-2">
              {category.tagline}
            </p>
            
            {/* CTA Button */}
            <motion.div
              className="flex items-center justify-between"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-semibold">View Stories</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* AI Badge */}
      <motion.div
        className="absolute -top-2 -right-2 z-20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: index * 0.1 + 0.5, duration: 0.5, ease: 'backOut' }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          AI Curated
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CategoriesOverview;