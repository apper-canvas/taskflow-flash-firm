import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  const skeletonItems = Array(6).fill(0);

  return (
    <div className="space-y-4">
      {skeletonItems.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl border border-gray-100 p-4 shadow-card"
        >
          <div className="flex items-start gap-3">
            {/* Checkbox skeleton */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-5 h-5 bg-gray-200 rounded border-2 shimmer" />
            </div>

            <div className="flex-1 space-y-3">
              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded shimmer w-3/4" />
                <div className="h-4 bg-gray-200 rounded shimmer w-1/2" />
              </div>

              {/* Badges skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-6 bg-gray-200 rounded-full shimmer w-16" />
                <div className="h-6 bg-gray-200 rounded-full shimmer w-20" />
                <div className="h-6 bg-gray-200 rounded-full shimmer w-14" />
              </div>
            </div>

            {/* Actions skeleton */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-gray-200 rounded shimmer" />
              <div className="w-8 h-8 bg-gray-200 rounded shimmer" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;