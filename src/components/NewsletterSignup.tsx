import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Check, 
  AlertCircle,
  Newspaper,
  Globe,
  BarChart3,
  Sparkles,
  Shield
} from 'lucide-react';

interface NewsletterSignupProps {
  className?: string;
  onSubscribe?: (email: string) => Promise<boolean>;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  className = '',
  onSubscribe
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Call the onSubscribe prop if provided, otherwise simulate success
      const success = onSubscribe ? await onSubscribe(email) : true;
      
      if (success) {
        setIsSuccess(true);
        setEmail('');
        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  // Background decoration icons
  const decorativeIcons = [
    { Icon: Newspaper, position: 'top-20 left-10', delay: 0 },
    { Icon: Globe, position: 'top-32 right-16', delay: 0.5 },
    { Icon: BarChart3, position: 'bottom-24 left-16', delay: 1 },
    { Icon: Sparkles, position: 'bottom-32 right-12', delay: 1.5 },
    { Icon: Mail, position: 'top-40 left-1/4', delay: 2 },
    { Icon: Shield, position: 'bottom-40 right-1/4', delay: 2.5 }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'backOut' }
    }
  };

  return (
    <section className={`relative py-16 lg:py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10 overflow-hidden ${className}`}>
      {/* Background Decorative Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {decorativeIcons.map(({ Icon, position, delay }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} text-blue-200/30 dark:text-blue-800/20`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={iconVariants}
            transition={{ delay }}
          >
            <Icon className="w-8 h-8 lg:w-12 lg:h-12" />
          </motion.div>
        ))}
      </div>

      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header Section */}
          <motion.div className="mb-12" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              📬 Stay Ahead of the News
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Get personalized daily updates in your inbox. Curated by Editors & AI.
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div 
            className="max-w-md mx-auto mb-8"
            variants={itemVariants}
          >
            {isSuccess ? (
              // Success State
              <motion.div
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
              >
                <motion.div
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                  Welcome to NewsHub!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Check your inbox for a confirmation email to complete your subscription.
                </p>
              </motion.div>
            ) : (
              // Form State
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl ${
                      error 
                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    disabled={isLoading}
                    aria-label="Email address"
                    aria-describedby={error ? "email-error" : undefined}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    id="email-error"
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || !email}
                  className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe Now
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            {/* Privacy Note */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Shield className="w-4 h-4" />
              <span>No spam. Cancel anytime.</span>
            </div>

            {/* Feature Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { icon: Sparkles, text: 'AI-Powered Curation' },
                { icon: Globe, text: 'Global Coverage' },
                { icon: BarChart3, text: 'Trending Insights' }
              ].map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={text}
                  className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl py-3 px-4 border border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                >
                  <Icon className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 px-6 py-3 rounded-full border border-green-200 dark:border-green-700">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Join 50,000+ readers staying informed daily
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;