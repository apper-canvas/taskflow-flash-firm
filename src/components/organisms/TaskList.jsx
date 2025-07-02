import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from '@/components/molecules/TaskItem';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggleComplete, 
  onUpdateTask, 
  onDeleteTask,
  onRetry 
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!tasks || tasks.length === 0) {
    return <Empty />;
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first (incomplete tasks first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority (high -> medium -> low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by due date (earliest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    // Finally by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.05 }
            }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            layout
          >
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;