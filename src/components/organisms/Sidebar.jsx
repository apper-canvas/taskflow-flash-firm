import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = ({ categories = [], taskCounts = {}, isOpen, onClose }) => {
  const navigationItems = [
    { 
      path: '/', 
      label: 'All Tasks', 
      icon: 'List',
      count: taskCounts.all || 0
    },
    { 
      path: '/?filter=today', 
      label: 'Today', 
      icon: 'Calendar',
      count: taskCounts.today || 0
    },
    { 
      path: '/?filter=overdue', 
      label: 'Overdue', 
      icon: 'AlertCircle',
      count: taskCounts.overdue || 0
    },
    { 
      path: '/?filter=completed', 
      label: 'Completed', 
      icon: 'CheckCircle',
      count: taskCounts.completed || 0
    }
  ];

  const sidebarContent = (
    <div className="h-full bg-gradient-to-b from-gray-50 to-white border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-sm text-gray-500">Stay organized</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Overview
          </h2>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <ApperIcon name={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count > 0 && (
                <Badge 
                  variant="default" 
                  className="bg-white bg-opacity-20 text-current border-0"
                >
                  {item.count}
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Categories
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        category.name === 'Work' ? 'bg-blue-400' :
                        category.name === 'Personal' ? 'bg-purple-400' :
                        category.name === 'Shopping' ? 'bg-pink-400' :
                        category.name === 'Health' ? 'bg-green-400' :
                        category.name === 'Finance' ? 'bg-indigo-400' :
                        'bg-gray-400'
                      }`}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  {category.taskCount > 0 && (
                    <Badge variant="default" size="xs">
                      {category.taskCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <ApperIcon name="Target" className="w-5 h-5 text-primary-500" />
            <span className="font-medium text-gray-900">Daily Progress</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${taskCounts.completed && taskCounts.all 
                  ? (taskCounts.completed / taskCounts.all) * 100 
                  : 0}%` 
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {taskCounts.completed || 0} of {taskCounts.all || 0} tasks completed
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-80 lg:h-screen lg:relative">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute left-0 top-0 h-full w-80 max-w-sm"
          >
            {sidebarContent}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;