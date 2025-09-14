import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  Eye, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2,
  ThumbsUp,
  ThumbsDown,
  Flame,
  Zap,
  Brain,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  Tag,
  Mail,
  Twitter,
  Linkedin,
  Send
} from 'lucide-react';

// TypeScript Interfaces
export interface ArticleData {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: string; // Markdown content
  category: {
    name: string;
    slug: string;
    color: string;
  };
  subcategory?: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  featured_image: string;
  published_at: string;
  reading_time: number;
  view_count: number;
  like_count: number;
  comment_count: number;
  save_count: number;
  tags: Array<{
    name: string;
    slug: string;
  }>;
  ai_summary: string[];
  ai_insights: {
    context: string[];
    background: string[];
    similar_stories: Array<{
      id: string;
      title: string;
      url: string;
    }>;
  };
  related_articles: Array<{
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    reading_time: number;
    url: string;
  }>;
}

interface ArticlePageProps {
  articleId: string;
  onNavigate?: (url: string) => void;
  className?: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ 
  articleId, 
  onNavigate,
  className = '' 
}) => {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showAISummary, setShowAISummary] = useState(true);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  // Mock data for development
  const mockArticle: ArticleData = {
    id: '1',
    title: 'AI Revolution Transforms Global Healthcare Systems Worldwide',
    subtitle: 'How artificial intelligence is reshaping medical diagnosis, treatment, and patient care across continents',
    slug: 'ai-revolution-healthcare-systems',
    content: `# The Dawn of AI-Powered Healthcare

The healthcare industry is experiencing an unprecedented transformation as artificial intelligence technologies revolutionize how we diagnose, treat, and care for patients worldwide.

## Breakthrough Diagnostic Capabilities

Recent advances in machine learning have enabled AI systems to achieve **95% accuracy rates** in medical imaging, surpassing human radiologists in detecting early-stage cancers and rare diseases.

> "We're witnessing the most significant advancement in medical technology since the discovery of antibiotics." - Dr. Sarah Chen, Chief Medical Officer at Global Health Institute

### Key Innovations:

- **Computer Vision**: AI can now identify tumors in CT scans within seconds
- **Natural Language Processing**: Electronic health records are automatically analyzed for risk factors
- **Predictive Analytics**: Patient outcomes are forecasted with remarkable precision

## Global Implementation

Countries across the world are rapidly adopting AI healthcare solutions:

1. **United States**: FDA has approved over 100 AI-powered medical devices
2. **European Union**: €1.5 billion invested in AI health research programs  
3. **Asia-Pacific**: Leading the world in AI diagnostic tool deployment

### Real-World Impact

The implementation of AI in healthcare has led to:

- 40% reduction in diagnostic errors
- 60% faster treatment planning
- 25% decrease in healthcare costs
- Improved patient satisfaction scores

## Challenges and Considerations

While the benefits are substantial, healthcare AI faces several challenges:

- **Data Privacy**: Ensuring patient information remains secure
- **Regulatory Compliance**: Meeting strict medical device standards
- **Integration**: Seamlessly incorporating AI into existing workflows
- **Training**: Educating healthcare professionals on AI tools

## The Future of Medicine

As we look ahead, AI promises to make healthcare more:

- **Accessible**: Remote diagnosis in underserved areas
- **Personalized**: Treatment plans tailored to individual genetics
- **Preventive**: Early detection of diseases before symptoms appear
- **Efficient**: Streamlined operations and reduced wait times

The convergence of artificial intelligence and healthcare represents one of the most promising developments of our time, offering hope for better health outcomes for people around the world.`,
    category: {
      name: 'Technology',
      slug: 'technology',
      color: 'bg-blue-500'
    },
    subcategory: {
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence'
    },
    author: {
      name: 'Dr. Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Senior Technology Correspondent specializing in AI and healthcare innovation'
    },
    featured_image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    published_at: '2024-01-15T10:30:00Z',
    reading_time: 8,
    view_count: 24567,
    like_count: 1234,
    comment_count: 89,
    save_count: 456,
    tags: [
      { name: 'Artificial Intelligence', slug: 'ai' },
      { name: 'Healthcare', slug: 'healthcare' },
      { name: 'Medical Technology', slug: 'medtech' },
      { name: 'Innovation', slug: 'innovation' }
    ],
    ai_summary: [
      'AI systems now achieve 95% accuracy in medical imaging, surpassing human radiologists',
      'Global healthcare costs reduced by 25% through AI implementation',
      'Over 100 AI-powered medical devices approved by FDA in the United States'
    ],
    ai_insights: {
      context: [
        'This represents the largest technological shift in healthcare since the introduction of antibiotics',
        'Investment in AI healthcare solutions has increased 400% over the past three years',
        'Major tech companies are partnering with hospitals to accelerate AI adoption'
      ],
      background: [
        'The COVID-19 pandemic accelerated digital health adoption by an estimated 10 years',
        'Machine learning algorithms have been in development for medical use since the 1970s',
        'Current AI systems process medical data 1000x faster than traditional methods'
      ],
      similar_stories: [
        { id: '2', title: 'Quantum Computing Breakthrough in Drug Discovery', url: '/articles/quantum-drug-discovery' },
        { id: '3', title: 'Telemedicine Adoption Reaches All-Time High', url: '/articles/telemedicine-growth' },
        { id: '4', title: 'Robotic Surgery Precision Improves Patient Outcomes', url: '/articles/robotic-surgery' }
      ]
    },
    related_articles: [
      {
        id: '5',
        title: 'Machine Learning Predicts Heart Disease Risk',
        excerpt: 'New algorithms can identify cardiovascular risks years before symptoms appear',
        image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg',
        category: 'Health',
        reading_time: 5,
        url: '/articles/ml-heart-disease'
      },
      {
        id: '6',
        title: 'Digital Health Records Revolution',
        excerpt: 'How electronic health systems are transforming patient care worldwide',
        image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
        category: 'Technology',
        reading_time: 6,
        url: '/articles/digital-health-records'
      },
      {
        id: '7',
        title: 'Wearable Tech Monitors Chronic Conditions',
        excerpt: 'Smart devices provide continuous health monitoring for better outcomes',
        image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
        category: 'Innovation',
        reading_time: 4,
        url: '/articles/wearable-health-tech'
      }
    ]
  };

  // Simulate data fetching
  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setArticle(mockArticle);
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle interactions
  const handleLike = () => {
    setIsLiked(!isLiked);
    // API call to update like status
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // API call to update save status
  };

  const handleReaction = (reaction: string) => {
    setSelectedReaction(selectedReaction === reaction ? null : reaction);
    // API call to update reaction
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || '';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({ title, url });
        }
        break;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  if (isLoading) {
    return <ArticlePageSkeleton />;
  }

  if (error || !article) {
    return <ArticlePageError error={error} />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumbs */}
        <motion.nav 
          className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8"
          variants={itemVariants}
        >
          <button 
            onClick={() => onNavigate?.('/')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <button 
            onClick={() => onNavigate?.(`/category/${article.category.slug}`)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {article.category.name}
          </button>
          {article.subcategory && (
            <>
              <ChevronRight className="w-4 h-4" />
              <button 
                onClick={() => onNavigate?.(`/category/${article.subcategory?.slug}`)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {article.subcategory.name}
              </button>
            </>
          )}
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-700 dark:text-gray-300 truncate max-w-xs">
            {article.title}
          </span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <motion.header className="mb-8" variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`${article.category.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {article.category.name}
                </span>
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.view_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.reading_time} min read</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="text-xl text-gray-600 dark:text-gray-300 italic mb-6">
                  {article.subtitle}
                </p>
              )}

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {article.author.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(article.published_at)}
                    </div>
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('native')}
                    className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    aria-label="Share article"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.header>

            {/* Featured Image */}
            <motion.div className="mb-8" variants={itemVariants}>
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </motion.div>

            {/* AI Quick Summary */}
            <motion.div 
              className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
              variants={itemVariants}
            >
              <button
                onClick={() => setShowAISummary(!showAISummary)}
                className="flex items-center justify-between w-full mb-4"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    🧠 Quick AI Takeaways
                  </h3>
                </div>
                {showAISummary ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {showAISummary && (
                  <motion.ul
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {article.ai_summary.map((point, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Article Body */}
            <motion.article 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
              variants={itemVariants}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </motion.article>

            {/* Tags */}
            <motion.div className="mt-8 mb-8" variants={itemVariants}>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => onNavigate?.(`/tag/${tag.slug}`)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {tag.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Engagement Tools */}
            <motion.div 
              className="flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-700 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isLiked 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{article.like_count + (isLiked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isSaved 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{article.save_count + (isSaved ? 1 : 0)}</span>
                </button>

                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{article.comment_count}</span>
                </div>
              </div>

              {/* Reaction Emojis */}
              <div className="flex items-center gap-2">
                {[
                  { emoji: '👍', key: 'thumbs_up', icon: ThumbsUp },
                  { emoji: '👎', key: 'thumbs_down', icon: ThumbsDown },
                  { emoji: '🔥', key: 'fire', icon: Flame },
                  { emoji: '⚡', key: 'zap', icon: Zap }
                ].map(({ emoji, key, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => handleReaction(key)}
                    className={`p-2 rounded-lg transition-all ${
                      selectedReaction === key
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 scale-110'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{emoji}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Related Articles */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {article.related_articles.map((relatedArticle) => (
                  <motion.div
                    key={relatedArticle.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                    onClick={() => onNavigate?.(relatedArticle.url)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                          {relatedArticle.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{relatedArticle.reading_time} min</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          Read More
                        </span>
                        <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Newsletter CTA */}
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center border border-blue-200 dark:border-blue-800"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📬 Stay Informed
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Get the latest AI-curated news and insights delivered to your inbox daily.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* AI Contextual Insights */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                variants={itemVariants}
              >
                <button
                  onClick={() => setShowAIInsights(!showAIInsights)}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      AI Insights
                    </h3>
                  </div>
                  {showAIInsights ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                <AnimatePresence>
                  {showAIInsights && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Extra Context */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-1">
                          📌 Extra Context
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {article.ai_insights.context.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Background */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Related Background
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {article.ai_insights.background.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Similar Stories */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Similar Stories
                        </h4>
                        <div className="space-y-2">
                          {article.ai_insights.similar_stories.map((story) => (
                            <button
                              key={story.id}
                              onClick={() => onNavigate?.(story.url)}
                              className="block w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                {story.title}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Loading Skeleton Component
const ArticlePageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          {/* Breadcrumbs Skeleton */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Header Skeleton */}
              <div className="mb-8">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
              </div>

              {/* Image Skeleton */}
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"></div>

              {/* Content Skeleton */}
              <div className="space-y-4 mb-8">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Component
interface ArticlePageErrorProps {
  error: string | null;
}

const ArticlePageError: React.FC<ArticlePageErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📰</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Article Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error || 'The article you\'re looking for doesn\'t exist or has been moved.'}
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ArticlePage;