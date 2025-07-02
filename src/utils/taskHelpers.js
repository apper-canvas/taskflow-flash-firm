export const getPriorityColor = (priority) => {
  const colors = {
    high: 'text-red-600 bg-red-100 border-red-200',
    medium: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    low: 'text-green-600 bg-green-100 border-green-200'
  };
  return colors[priority] || colors.medium;
};

export const getCategoryColor = (category) => {
  const colors = {
    work: 'text-blue-600 bg-blue-100 border-blue-200',
    personal: 'text-purple-600 bg-purple-100 border-purple-200',
    shopping: 'text-pink-600 bg-pink-100 border-pink-200',
    health: 'text-green-600 bg-green-100 border-green-200',
    finance: 'text-indigo-600 bg-indigo-100 border-indigo-200'
  };
  return colors[category?.toLowerCase()] || 'text-gray-600 bg-gray-100 border-gray-200';
};

export const filterTasks = (tasks, filters) => {
  let filtered = [...tasks];

  // Filter by completion status
  if (filters.status === 'active') {
    filtered = filtered.filter(task => !task.completed);
  } else if (filters.status === 'completed') {
    filtered = filtered.filter(task => task.completed);
  }

  // Filter by priority
  if (filters.priorities && filters.priorities.length > 0) {
    filtered = filtered.filter(task => filters.priorities.includes(task.priority));
  }

  // Filter by category
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(task => 
      filters.categories.includes(task.category?.toLowerCase())
    );
  }

  // Filter by search query
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.category?.toLowerCase().includes(query)
    );
  }

  return filtered;
};

export const sortTasks = (tasks, sortBy = 'priority') => {
  return [...tasks].sort((a, b) => {
    // Always show incomplete tasks first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

switch (sortBy) {
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        if (priorityDiff !== 0) return priorityDiff;
        break;
      }
      case 'dueDate':
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        break;
      
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      
      default:
        break;
    }

    // Fallback to creation date
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const overdue = tasks.filter(t => 
    !t.completed && 
    t.dueDate && 
    new Date(t.dueDate) < new Date()
  ).length;

  const today = new Date().toISOString().split('T')[0];
  const dueToday = tasks.filter(t => t.dueDate === today).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    active,
    overdue,
    dueToday,
    completionRate
  };
};

export const validateTask = (taskData) => {
  const errors = {};

  if (!taskData.title || !taskData.title.trim()) {
    errors.title = 'Task title is required';
  }

  if (taskData.title && taskData.title.length > 200) {
    errors.title = 'Task title must be less than 200 characters';
  }

  if (taskData.dueDate) {
    const dueDate = new Date(taskData.dueDate);
    if (isNaN(dueDate.getTime())) {
      errors.dueDate = 'Invalid due date';
    }
  }

if (taskData.priority && !['low', 'medium', 'high'].includes(taskData.priority)) {
    errors.priority = 'Invalid priority level';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
export const validateRecurringTaskConfig = (config) => {
  const errors = {};

  // Validate interval
  if (!config.interval || !['daily', 'weekly', 'monthly'].includes(config.interval)) {
    errors.interval = 'Invalid interval type';
  }

  // Validate interval count
  if (!config.intervalCount || config.intervalCount < 1 || config.intervalCount > 30) {
    errors.intervalCount = 'Interval count must be between 1 and 30';
  }

  // Validate start date
  if (!config.startDate) {
    errors.startDate = 'Start date is required';
  } else {
    const startDate = new Date(config.startDate);
    if (isNaN(startDate.getTime())) {
      errors.startDate = 'Invalid start date';
    }
  }

  // Validate end date if provided
  if (config.endDate) {
    const endDate = new Date(config.endDate);
    const startDate = new Date(config.startDate);
    
    if (isNaN(endDate.getTime())) {
      errors.endDate = 'Invalid end date';
    } else if (startDate && endDate <= startDate) {
      errors.endDate = 'End date must be after start date';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getRecurringTaskPreview = (config) => {
  if (!config.interval || !config.intervalCount || !config.startDate) {
    return 'Invalid configuration';
  }

  const startDate = new Date(config.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);

  // Format interval text
  let intervalText = '';
  if (config.intervalCount === 1) {
    intervalText = config.interval === 'daily' ? 'day' : 
                   config.interval === 'weekly' ? 'week' : 'month';
  } else {
    intervalText = `${config.intervalCount} ${config.interval === 'daily' ? 'days' : 
                    config.interval === 'weekly' ? 'weeks' : 'months'}`;
  }

  // Format start date
  let startText = '';
  if (startDate.getTime() === today.getTime()) {
    startText = 'today';
  } else if (startDate > today) {
    startText = startDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } else {
    startText = startDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  let preview = `Every ${intervalText} starting ${startText}`;

  // Add end date if specified
  if (config.endDate) {
    const endDate = new Date(config.endDate);
    const endText = endDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    preview += `, ending ${endText}`;
  }

return preview;
};

export const calculateSubtaskProgress = (subtasks) => {
  if (!subtasks || subtasks.length === 0) {
    return { completed: 0, total: 0, percentage: 0 };
  }
  
  const completed = subtasks.filter(subtask => subtask.completed).length;
  const total = subtasks.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};

export const validateSubtask = (subtaskData) => {
  const errors = {};
  
  if (!subtaskData.title || !subtaskData.title.trim()) {
    errors.title = 'Subtask title is required';
  }
  
  if (subtaskData.title && subtaskData.title.length > 150) {
    errors.title = 'Subtask title must be less than 150 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getSubtaskStats = (tasks) => {
  let totalSubtasks = 0;
  let completedSubtasks = 0;
  
  tasks.forEach(task => {
    if (task.subtasks && task.subtasks.length > 0) {
      totalSubtasks += task.subtasks.length;
      completedSubtasks += task.subtasks.filter(s => s.completed).length;
    }
  });
  
  const completionRate = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
  
  return {
    totalSubtasks,
    completedSubtasks,
    completionRate
  };
};

export const updateTaskProgress = (task) => {
  if (!task.subtasks || task.subtasks.length === 0) {
    return task;
  }
  
  const progress = calculateSubtaskProgress(task.subtasks);
  return {
    ...task,
    progress: progress.percentage,
    subtaskProgress: progress
  };
};