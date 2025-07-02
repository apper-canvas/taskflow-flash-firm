import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskInput = ({ onAddTask, categories = [] }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category: category || 'general',
      priority,
      dueDate: dueDate || null
    });

    setTitle('');
    setCategory('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setTitle('');
    setCategory('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? 'auto' : 'auto' }}
      className="bg-white rounded-xl shadow-card border border-gray-100 p-6 mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleInputFocus}
            icon="Plus"
            iconPosition="left"
            className="text-lg py-4 bg-gray-50 border-0 focus:bg-white focus:shadow-card"
          />
        </div>

        <motion.div
          initial={false}
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? 'auto' : 0,
            marginTop: isExpanded ? 16 : 0
          }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name.toLowerCase()}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              icon="X"
              size="md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon="Plus"
              size="md"
              disabled={!title.trim()}
            >
              Add Task
            </Button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default TaskInput;