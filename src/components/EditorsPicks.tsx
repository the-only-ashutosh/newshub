import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock,
  Sparkles,
  Award,
  User,
  Bot,
  ArrowRight,
  Settings
} from 'lucide-react';

interface PickedStory {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  image: string;
  excerpt: string;
  timestamp: string;
  views: string;
  likes: string;
  comments: string;
  pickType: 'editor' | 'ai';
  isBreaking?: boolean;
}

interface EditorsPicksProps {
  className?: string;
  userCategories?: string[];
}

const EditorsPicks: React.FC<EditorsPicksProps> = ({ 
  className = '',
  userCategories = ['Technology', 'World News', 'Business']
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'editor' | 'ai'>('all');

  // Sample curated stories data
  const pickedStories: PickedStory[] = [
    {
      id: '1',
      title: 'Revolutionary AI System Predicts Climate Changes with 99% Accuracy',
      category: 'Technology',
      categoryColor: 'bg-blue-500',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      excerpt: 'Scientists at MIT have developed an AI system that can predict climate patterns with unprecedented accuracy, potentially revolutionizing weather forecasting and climate research.',
      timestamp: '2h ago',
      views: '1.2M',
      likes: '34K',
      comments: '2.1K',
      pickType: 'ai',
      isBreaking: true
    },
    {
      id: '2',
      title: 'Global Economic Summit Reaches Historic Trade Agreement',
      category: 'World',
      categoryColor: 'bg-red-500',
      image: 'https://images.pexels.com/photos/8828597/pexels-photo-8828597.jpeg',
      excerpt: 'World leaders finalize a groundbreaking trade agreement that promises to reshape international commerce and strengthen global economic cooperation.',
      timestamp: '4h ago',
      views: '890K',
      likes: '28K',
      comments: '1.5K',
      pickType: 'editor'
    },
    {
      id: '3',
      title: 'Breakthrough Gene Therapy Shows Promise for Rare Diseases',
      category: 'Health',
      categoryColor: 'bg-green-500',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg',
      excerpt: 'Clinical trials reveal remarkable success rates for a new gene therapy treatment, offering hope to millions suffering from previously incurable genetic conditions.',
      timestamp: '6h ago',
      views: '654K',
      likes: '19K',
      comments: '987',
      pickType: 'editor'
    },
    {
      id: '4',
      title: 'Space Tourism Industry Reaches New Milestone with Successful Mission',
      category: 'Space',
      categoryColor: 'bg-purple-500',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
      excerpt: 'Private space company completes its 100th successful civilian mission, marking a significant achievement in commercial space exploration.',
      timestamp: '8h ago',
      views: '743K',
      likes: '22K',
      comments: '1.2K',
      pickType: 'ai'
    },
    {
      id: '5',
      title: 'Renewable Energy Breakthrough Could Transform Global Power Grid',
      category: 'Energy',
      categoryColor: 'bg-yellow-500',
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg',
      excerpt: 'New solar panel technology achieves record-breaking efficiency rates, potentially making renewable energy more accessible and affordable worldwide.',
      timestamp: '10h ago',
      views: '567K',
      likes: '16K',
      comments: '743',
      pickType: 'ai'
    },
    {
      id: '6',
      title: 'Cultural Heritage Sites Receive UNESCO Protection Status',
      category: 'Culture',
      categoryColor: 'bg-orange-500',
      image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg',
      excerpt: 'Five historic sites across three continents gain UNESCO World Heritage status, ensuring their preservation for future generations.',
      timestamp: '12h ago',
      views: '432K',
      likes: '13K',
      comments: '567',
      pickType: 'editor'
    }
  ];

  // Filter stories based on active tab
  const filteredStories = pickedStories.filter(story => {
    if (activeTab === 'all') return true;
    return story.pickType === activeTab;
  });

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

  const handleStoryClick = (storyId: string) => {
    console.log(`Navigate to story: ${storyId}`);
    // Handle navigation to story page
  };

  return (
    <section className={`relative py-16 lg:py-24 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 ${className}`}>
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
            <Star className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              ✨ Top Picks for You
            </h2>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            Curated by our Editors & AI to bring you the most impactful stories of the day
          </p>

          {/* Personalization Note */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-700 mb-8">
            <Settings className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Customized for your interests in {userCategories.join(', ')}
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg max-w-md mx-auto">
            {[
              { key: 'all', label: 'All Picks', icon: Star },
              { key: 'editor', label: "Editor's Choice", icon: User },
              { key: 'ai', label: 'AI Suggested', icon: Bot }
            ].map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(key as 'all' | 'editor' | 'ai')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredStories.slice(0, 6).map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={index}
              onClick={() => handleStoryClick(story.id)}
              variants={cardVariants}
            />
          ))}
        </motion.div>

        {/* AI Insight Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 px-6 py-3 rounded-full border border-yellow-200 dark:border-yellow-700">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Stories selected using advanced AI algorithms and editorial expertise
            </span>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/5 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};

// Individual Story Card Component
interface StoryCardProps {
  story: PickedStory;
  index: number;
  onClick: () => void;
  variants: any;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, index, onClick, variants }) => {
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
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`${story.categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
              {story.category}
            </span>
          </div>

          {/* Pick Type Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 ${
              story.pickType === 'editor' 
                ? 'bg-blue-500 text-white' 
                : 'bg-yellow-500 text-black'
            }`}>
              {story.pickType === 'editor' ? (
                <>
                  <Award className="w-3 h-3" />
                  Editor's Choice
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3" />
                  AI Suggested
                </>
              )}
            </span>
          </div>

          {/* Breaking Badge */}
          {story.isBreaking && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                BREAKING
              </span>
            </div>
          )}

          {/* Time Badge */}
          <div className="absolute bottom-4 right-4">
            <span className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {story.timestamp}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {story.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {story.excerpt}
          </p>

          {/* AI Summary Tag */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-purple-600 dark:text-purple-400 text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-full">
              AI Enhanced Summary
            </span>
          </div>

          {/* Engagement Metrics */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{story.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{story.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{story.comments}</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default EditorsPicks;