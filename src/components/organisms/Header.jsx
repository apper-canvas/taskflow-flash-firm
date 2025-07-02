import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onMenuToggle,
  taskCounts = {}
}) => {
  const completedPercentage = taskCounts.all > 0 
    ? Math.round((taskCounts.completed / taskCounts.all) * 100)
    : 0;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            icon="Menu"
            className="lg:hidden"
          />
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good morning! 👋
            </h1>
            <p className="text-gray-600">
              {taskCounts.active > 0 
                ? `You have ${taskCounts.active} tasks to complete today`
                : 'All caught up! Great work 🎉'
              }
            </p>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block min-w-0 flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search tasks..."
            />
          </div>

          {/* Quick Stats */}
          <div className="hidden sm:flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-3 border border-primary-200"
            >
              <div className="flex items-center gap-2">
                <ApperIcon name="CheckCircle" className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-semibold text-primary-900">
                    {completedPercentage}%
                  </p>
                  <p className="text-xs text-primary-600">Complete</p>
                </div>
              </div>
            </motion.div>

            {taskCounts.overdue > 0 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 border border-red-200"
              >
                <div className="flex items-center gap-2">
                  <ApperIcon name="AlertCircle" className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">
                      {taskCounts.overdue}
                    </p>
                    <p className="text-xs text-red-600">Overdue</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search tasks..."
        />
      </div>
    </header>
  );
};

export default Header;