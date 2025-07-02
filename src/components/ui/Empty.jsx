import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({
  title = "No tasks yet",
  message = "Start your productive day by creating your first task!",
  actionText = "Create Your First Task",
  onAction,
  icon = "CheckSquare"
}) => {
  const handleScroll = () => {
    const taskInput = document.querySelector('input[placeholder*="What needs to be done"]');
    if (taskInput) {
      taskInput.focus();
      taskInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            delay: 0.2,
            duration: 0.6 
          }}
          className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-3"
        >
          {title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onAction || handleScroll}
            variant="primary"
            icon="Plus"
            size="lg"
            className="w-full mb-4"
          >
            {actionText}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-6 border-t border-gray-100"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <ApperIcon name="Plus" className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500">Add tasks</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <ApperIcon name="Tag" className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-gray-500">Organize</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <ApperIcon name="CheckCircle" className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500">Complete</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Empty;