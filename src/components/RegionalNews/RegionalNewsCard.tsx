import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock,
  Sparkles,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { NewsArticle } from './RegionalNewsSection';

interface RegionalNewsCardProps {
  article: NewsArticle;
  index: number;
  onClick: () => void;
  variants: any;
}

const RegionalNewsCard: React.FC<RegionalNewsCardProps> = ({ 
  article, 
  index, 
  onClick, 
  variants 
}) => {
  return (
    <motion.div
      className="group relative cursor-pointer"
      variants={variants}
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Main Card */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden h-full">
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

          {/* Region Badge */}
          <div className="absolute top-4 right-4">
            <span className={`${article.regionBadgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}>
              <MapPin className="w-3 h-3" />
              {article.region}
            </span>
          </div>

          {/* Breaking Badge */}
          {article.isBreaking && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                BREAKING
              </span>
            </div>
          )}

          {/* Local Badge */}
          {article.isLocal && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                LOCAL
              </span>
            </div>
          )}

          {/* Time Badge */}
          <div className="absolute bottom-4 right-4">
            <span className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.timestamp}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {article.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* AI Regional Insight Tag */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
              {article.isLocal ? 'Local AI Insights' : 'Regional AI Summary'}
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
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Read Regional Story
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Regional Indicator Line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${article.regionBadgeColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl`} />
    </motion.div>
  );
};

export default RegionalNewsCard;