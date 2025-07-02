import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import TaskInput from '@/components/molecules/TaskInput';
import FilterBar from '@/components/molecules/FilterBar';
import TaskList from '@/components/organisms/TaskList';
import taskService from '@/services/api/taskService';
import categoryService from '@/services/api/categoryService';

const TasksPage = ({ searchQuery = '' }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    priorities: [],
    categories: []
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task added successfully!');
      
      // Update category counts
      const updatedCategories = await categoryService.getAll();
      setCategories(updatedCategories);
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });

      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      
      if (updatedTask.completed) {
        toast.success('Task completed! 🎉');
      } else {
        toast.info('Task marked as incomplete');
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      toast.success('Task updated successfully!');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task deleted');
      
      // Update category counts
      const updatedCategories = await categoryService.getAll();
      setCategories(updatedCategories);
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.category?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    const today = new Date().toISOString().split('T')[0];
    switch (activeFilters.status) {
      case 'active':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'overdue':
        filtered = filtered.filter(task => 
          !task.completed && 
          task.dueDate && 
          task.dueDate < today
        );
        break;
      case 'today':
        filtered = filtered.filter(task => 
          task.dueDate === today
        );
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply priority filter
    if (activeFilters.priorities && activeFilters.priorities.length > 0) {
      filtered = filtered.filter(task => 
        activeFilters.priorities.includes(task.priority)
      );
    }

    // Apply category filter
    if (activeFilters.categories && activeFilters.categories.length > 0) {
      filtered = filtered.filter(task => 
        activeFilters.categories.includes(task.category?.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, searchQuery, activeFilters]);

  // Calculate task counts for filter bar
  const taskCounts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    return {
      all: tasks.length,
      active: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length,
      overdue: tasks.filter(t => !t.completed && t.dueDate && t.dueDate < today).length,
      today: tasks.filter(t => t.dueDate === today).length
    };
  }, [tasks]);

  return (
    <div className="max-w-4xl mx-auto">
      <TaskInput 
        onAddTask={handleAddTask}
        categories={categories}
      />
      
      <FilterBar
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        categories={categories}
        taskCounts={taskCounts}
      />
      
      <TaskList
        tasks={filteredTasks}
        loading={loading}
        error={error}
        onToggleComplete={handleToggleComplete}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onRetry={loadData}
      />
    </div>
  );
};

export default TasksPage;