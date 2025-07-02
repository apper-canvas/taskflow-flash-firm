import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { validateRecurringTaskConfig, getRecurringTaskPreview } from '@/utils/taskHelpers';
import { formatRecurringPattern } from '@/utils/dateHelpers';

// Set app element for accessibility
if (typeof document !== 'undefined') {
  Modal.setAppElement('#root');
}

const RecurringTaskModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  const [config, setConfig] = useState({
    interval: 'daily',
    intervalCount: 1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    hasEndDate: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setConfig({
        interval: 'daily',
        intervalCount: 1,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        hasEndDate: false
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user makes changes
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateRecurringTaskConfig({
      ...config,
      endDate: config.hasEndDate ? config.endDate : null
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onConfirm({
      ...config,
      endDate: config.hasEndDate ? config.endDate : null
    });
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      position: 'relative',
      inset: 'auto',
      border: 'none',
      background: 'transparent',
      overflow: 'visible',
      borderRadius: '0',
      outline: 'none',
      padding: '0',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '90vh'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      closeTimeoutMS={200}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Repeat" size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Set Recurring Task
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {taskTitle && `"${taskTitle}"`}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              icon="X"
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repeat every
              </label>
              <select
                value={config.interval}
                onChange={(e) => handleConfigChange('interval', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Day(s)</option>
                <option value="weekly">Week(s)</option>
                <option value="monthly">Month(s)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interval
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={config.intervalCount}
                onChange={(e) => handleConfigChange('intervalCount', parseInt(e.target.value) || 1)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.intervalCount ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.intervalCount && (
                <p className="mt-1 text-xs text-red-600">{errors.intervalCount}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={config.startDate}
              onChange={(e) => handleConfigChange('startDate', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.startDate ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {errors.startDate && (
              <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>
            )}
          </div>

          <div>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="hasEndDate"
                checked={config.hasEndDate}
                onChange={(e) => handleConfigChange('hasEndDate', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="hasEndDate" className="ml-2 text-sm font-medium text-gray-700">
                Set end date
              </label>
            </div>
            
            {config.hasEndDate && (
              <input
                type="date"
                value={config.endDate}
                onChange={(e) => handleConfigChange('endDate', e.target.value)}
                min={config.startDate}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.endDate ? 'border-red-300' : 'border-gray-200'
                }`}
              />
            )}
            {errors.endDate && (
              <p className="mt-1 text-xs text-red-600">{errors.endDate}</p>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <ApperIcon name="Info" size={16} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Preview</h4>
                <p className="text-sm text-blue-800">
                  {getRecurringTaskPreview({
                    ...config,
                    endDate: config.hasEndDate ? config.endDate : null
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              size="md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon="Check"
              size="md"
            >
              Create Recurring Tasks
            </Button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default RecurringTaskModal;