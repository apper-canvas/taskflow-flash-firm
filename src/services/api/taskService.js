import { format } from 'date-fns';
import { generateRecurringDates } from '@/utils/dateHelpers';

// Import mock data
import tasksData from '@/services/mockData/tasks.json';

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay();
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  }

  async create(taskData) {
    await this.delay(200);
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      completed: false,
      priority: taskData.priority || 'medium',
      category: taskData.category || 'general',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.tasks.unshift(newTask);
    return { ...newTask };
  }

  async update(id, updates) {
    await this.delay(200);
    
    const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
      id: this.tasks[taskIndex].Id // Ensure Id remains unchanged
    };

    return { ...this.tasks[taskIndex] };
  }

  async delete(id) {
    await this.delay(200);
    
    const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  // Additional utility methods
  async getByCategory(category) {
    await this.delay();
    return this.tasks.filter(t => 
      t.category?.toLowerCase() === category.toLowerCase()
    );
  }

  async getByPriority(priority) {
    await this.delay();
    return this.tasks.filter(t => t.priority === priority);
  }

  async getOverdue() {
    await this.delay();
    const today = format(new Date(), 'yyyy-MM-dd');
    return this.tasks.filter(t => 
      !t.completed && 
      t.dueDate && 
      t.dueDate < today
    );
  }

  async getDueToday() {
    await this.delay();
    const today = format(new Date(), 'yyyy-MM-dd');
return this.tasks.filter(t => t.dueDate === today);
  }

  async createRecurringTasks(taskData, recurringConfig) {
    await this.delay(300);
    
    // Generate all the dates for the recurring tasks
    const dates = generateRecurringDates(
      recurringConfig.startDate,
      recurringConfig.endDate,
      recurringConfig.interval,
      recurringConfig.intervalCount
    );

    if (dates.length === 0) {
      throw new Error('No valid dates generated for recurring task');
    }

    // Create tasks for each date
    const createdTasks = [];
    const baseId = Math.max(...this.tasks.map(t => t.Id), 0) + 1;

    dates.forEach((date, index) => {
      const newTask = {
        Id: baseId + index,
        title: taskData.title,
        completed: false,
        priority: taskData.priority || 'medium',
        category: taskData.category || 'general',
        dueDate: date,
        createdAt: new Date().toISOString(),
        completedAt: null,
        isRecurring: true,
        recurringConfig: {
          interval: recurringConfig.interval,
          intervalCount: recurringConfig.intervalCount,
          originalStartDate: recurringConfig.startDate,
          endDate: recurringConfig.endDate
        }
      };

      this.tasks.unshift(newTask);
      createdTasks.push({ ...newTask });
    });

    return createdTasks;
  }
}

export default new TaskService();