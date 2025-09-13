import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Region } from './RegionalNewsSection';

interface RegionTabsProps {
  regions: Region[];
  activeRegion: string;
  onRegionChange: (regionId: string) => void;
  isLoading: boolean;
}

const RegionTabs: React.FC<RegionTabsProps> = ({
  regions,
  activeRegion,
  onRegionChange,
  isLoading
}) => {
  return (
    <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Desktop Tabs */}
      <div className="hidden md:flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg">
        {regions.map((region) => (
          <motion.button
            key={region.id}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeRegion === region.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => onRegionChange(region.id)}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading && activeRegion === region.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              region.icon
            )}
            <span>{region.name}</span>
            
            {/* User Location Indicator */}
            {region.isUserLocation && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden w-full">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 px-4">
          <div className="flex gap-3 min-w-max">
            {regions.map((region, index) => (
              <motion.button
                key={region.id}
                className={`relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                  activeRegion === region.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => onRegionChange(region.id)}
                disabled={isLoading}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading && activeRegion === region.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  region.icon
                )}
                <span>{region.name}</span>
                
                {/* User Location Indicator */}
                {region.isUserLocation && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

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
    </motion.div>
  );
};

export default RegionTabs;