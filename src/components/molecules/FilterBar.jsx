import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const FilterBar = ({ 
  activeFilters, 
  onFilterChange, 
  categories = [],
  taskCounts = {}
}) => {
  const priorities = [
    { value: 'high', label: 'High', variant: 'high' },
    { value: 'medium', label: 'Medium', variant: 'medium' },
    { value: 'low', label: 'Low', variant: 'low' }
  ];

  const statusFilters = [
    { value: 'all', label: 'All', icon: 'List' },
    { value: 'active', label: 'Active', icon: 'Circle' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { value: 'overdue', label: 'Overdue', icon: 'AlertCircle' }
  ];

  const handleStatusFilter = (status) => {
    onFilterChange({ ...activeFilters, status });
  };

  const handlePriorityFilter = (priority) => {
    const currentPriorities = activeFilters.priorities || [];
    const newPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter(p => p !== priority)
      : [...currentPriorities, priority];
    
    onFilterChange({ ...activeFilters, priorities: newPriorities });
  };

  const handleCategoryFilter = (category) => {
    const currentCategories = activeFilters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    onFilterChange({ ...activeFilters, categories: newCategories });
  };

  const clearFilters = () => {
    onFilterChange({ status: 'all', priorities: [], categories: [] });
  };

  const hasActiveFilters = 
    activeFilters.status !== 'all' || 
    (activeFilters.priorities && activeFilters.priorities.length > 0) ||
    (activeFilters.categories && activeFilters.categories.length > 0);

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            icon="X"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Status Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <motion.button
                key={filter.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStatusFilter(filter.value)}
                className={`inline-flex items-center px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                  activeFilters.status === filter.value
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500 shadow-lg'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                <ApperIcon name={filter.icon} className="w-4 h-4 mr-1.5" />
                {filter.label}
                {taskCounts[filter.value] > 0 && (
                  <span className="ml-1.5 text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full">
                    {taskCounts[filter.value]}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Priority Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {priorities.map((priority) => {
              const isActive = activeFilters.priorities?.includes(priority.value);
              return (
                <motion.button
                  key={priority.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePriorityFilter(priority.value)}
                  className={`transition-all duration-200 ${
                    isActive ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                  }`}
                >
                  <Badge variant={priority.variant}>
                    {priority.label}
                  </Badge>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = activeFilters.categories?.includes(category.name.toLowerCase());
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryFilter(category.name.toLowerCase())}
                    className={`transition-all duration-200 ${
                      isActive ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                    }`}
                  >
                    <Badge variant={category.name.toLowerCase()}>
                      {category.name}
                      {category.taskCount > 0 && (
                        <span className="ml-1.5 text-xs bg-white bg-opacity-30 px-1.5 py-0.5 rounded-full">
                          {category.taskCount}
                        </span>
                      )}
                    </Badge>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;