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
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        if (priorityDiff !== 0) return priorityDiff;
        break;
      
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