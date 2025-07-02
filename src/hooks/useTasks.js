import { useState, useEffect } from 'react';
import taskService from '@/services/api/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      throw new Error(err.message || 'Failed to add task');
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || 'Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      throw new Error(err.message || 'Failed to delete task');
    }
  };

  const toggleTaskComplete = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) throw new Error('Task not found');

      const updatedTask = await taskService.update(id, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });

      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || 'Failed to toggle task completion');
    }
  };

const addSubtask = async (taskId, subtaskData) => {
    try {
      const updatedTask = await taskService.addSubtask(taskId, subtaskData);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || 'Failed to add subtask');
    }
  };

  const updateSubtask = async (taskId, subtaskId, updates) => {
    try {
      const updatedTask = await taskService.updateSubtask(taskId, subtaskId, updates);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || 'Failed to update subtask');
    }
  };

  const deleteSubtask = async (taskId, subtaskId) => {
    try {
      const updatedTask = await taskService.deleteSubtask(taskId, subtaskId);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete subtask');
    }
  };

  const toggleSubtask = async (taskId, subtaskId) => {
    try {
      const updatedTask = await taskService.toggleSubtask(taskId, subtaskId);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || 'Failed to toggle subtask');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleSubtask
  };
};