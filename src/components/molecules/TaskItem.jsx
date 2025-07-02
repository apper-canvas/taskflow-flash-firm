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
  onDeleteTask,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
  onToggleSubtask
}) => {
const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showActions, setShowActions] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editSubtaskTitle, setEditSubtaskTitle] = useState('');

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

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(task.id, { title: newSubtaskTitle.trim() });
      setNewSubtaskTitle('');
      setIsAddingSubtask(false);
    }
  };

  const handleEditSubtask = (subtaskId, title) => {
    setEditingSubtaskId(subtaskId);
    setEditSubtaskTitle(title);
  };

  const handleSaveSubtask = (subtaskId) => {
    if (editSubtaskTitle.trim()) {
      onUpdateSubtask(task.id, subtaskId, { title: editSubtaskTitle.trim() });
    }
    setEditingSubtaskId(null);
    setEditSubtaskTitle('');
  };

  const handleCancelSubtaskEdit = () => {
    setEditingSubtaskId(null);
    setEditSubtaskTitle('');
  };

  const handleSubtaskKeyPress = (e, subtaskId = null) => {
    if (e.key === 'Enter') {
      if (subtaskId) {
        handleSaveSubtask(subtaskId);
      } else {
        handleAddSubtask();
      }
    } else if (e.key === 'Escape') {
      if (subtaskId) {
        handleCancelSubtaskEdit();
      } else {
        setIsAddingSubtask(false);
        setNewSubtaskTitle('');
      }
    }
  };

  const subtasks = task.subtasks || [];
  const subtaskProgress = subtasks.length > 0 ? {
    completed: subtasks.filter(s => s.completed).length,
    total: subtasks.length,
    percentage: Math.round((subtasks.filter(s => s.completed).length / subtasks.length) * 100)
  } : null;

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

                {subtaskProgress && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Progress: {subtaskProgress.completed}/{subtaskProgress.total}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {subtaskProgress.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subtaskProgress.percentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {subtasks.length > 0 && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowSubtasks(!showSubtasks)}
                      icon={showSubtasks ? "ChevronUp" : "ChevronDown"}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      {showSubtasks ? 'Hide' : 'Show'} subtasks ({subtasks.length})
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
</div>
      </div>

      <AnimatePresence>
        {showSubtasks && subtasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pl-8 border-l-2 border-gray-100"
          >
            <div className="space-y-2">
              {subtasks.map((subtask) => (
                <div
                  key={subtask.Id}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                >
                  <Checkbox
                    checked={subtask.completed}
                    onChange={() => onToggleSubtask(task.id, subtask.Id)}
                    size="sm"
                  />
                  
                  {editingSubtaskId === subtask.Id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        value={editSubtaskTitle}
                        onChange={(e) => setEditSubtaskTitle(e.target.value)}
                        onKeyDown={(e) => handleSubtaskKeyPress(e, subtask.Id)}
                        onBlur={() => handleSaveSubtask(subtask.Id)}
                        autoFocus
                        className="text-sm"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSaveSubtask(subtask.Id)}
                        icon="Check"
                        className="text-green-600 hover:text-green-700"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelSubtaskEdit}
                        icon="X"
                        className="text-gray-500 hover:text-gray-700"
                      />
                    </div>
                  ) : (
                    <>
                      <span 
                        className={`flex-1 text-sm cursor-pointer ${
                          subtask.completed ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}
                        onClick={() => handleEditSubtask(subtask.Id, subtask.title)}
                      >
                        {subtask.title}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditSubtask(subtask.Id, subtask.title)}
                          icon="Edit2"
                          className="text-gray-400 hover:text-gray-600"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteSubtask(task.id, subtask.Id)}
                          icon="Trash2"
                          className="text-gray-400 hover:text-red-600"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}

              {isAddingSubtask ? (
                <div className="flex items-center gap-2 p-2">
                  <div className="w-4" /> {/* Spacer for checkbox alignment */}
                  <Input
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    onKeyDown={handleSubtaskKeyPress}
                    placeholder="Add subtask..."
                    autoFocus
                    className="text-sm"
                  />
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleAddSubtask}
                    icon="Plus"
                    disabled={!newSubtaskTitle.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setIsAddingSubtask(false);
                      setNewSubtaskTitle('');
                    }}
                    icon="X"
                  />
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsAddingSubtask(true)}
                  icon="Plus"
                  className="text-sm text-gray-600 hover:text-gray-800 ml-7"
                >
                  Add subtask
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSubtasks && subtasks.length === 0 && !isAddingSubtask && (
        <div className="mt-3 pl-8">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsAddingSubtask(true)}
            icon="Plus"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Add subtask
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;