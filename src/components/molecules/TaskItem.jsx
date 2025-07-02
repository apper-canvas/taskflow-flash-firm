import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isPast, parseISO } from 'date-fns';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onUpdateTask, 
  onDeleteTask 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showActions, setShowActions] = useState(false);

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdateTask(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const isOverdue = task.dueDate && !task.completed && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate));
  const isDueToday = task.dueDate && isToday(parseISO(task.dueDate));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`group bg-white rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:shadow-card-hover hover:border-gray-200 ${
        task.completed ? 'opacity-60' : ''
      } ${isOverdue ? 'ring-1 ring-red-200 bg-red-50' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSaveEdit}
                autoFocus
                className="font-medium"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSaveEdit}
                  icon="Check"
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancelEdit}
                  icon="X"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <h3 
                  className={`font-medium text-gray-900 cursor-pointer hover:text-primary-600 transition-colors ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                  onClick={handleEdit}
                >
                  {task.title}
                </h3>
                
                <AnimatePresence>
                  {showActions && !isEditing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1"
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleEdit}
                        icon="Edit2"
                        className="text-gray-400 hover:text-gray-600"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteTask(task.id)}
                        icon="Trash2"
                        className="text-gray-400 hover:text-red-600"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant={task.priority}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                
                {task.category && (
                  <Badge variant={task.category.toLowerCase()}>
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                  </Badge>
                )}

                {task.dueDate && (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    isOverdue 
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : isDueToday
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}>
                    <ApperIcon 
                      name={isOverdue ? 'AlertCircle' : isDueToday ? 'Clock' : 'Calendar'} 
                      className="w-3 h-3" 
                    />
                    {isOverdue ? 'Overdue' : isDueToday ? 'Due today' : format(parseISO(task.dueDate), 'MMM d')}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;