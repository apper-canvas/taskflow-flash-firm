import categoryData from '@/services/mockData/categories.json';

class CategoryService {
  constructor() {
    this.categories = [...categoryData];
  }

  // Simulate API delay
  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    // Calculate task counts dynamically
    const categories = this.categories.map(category => ({
      ...category,
      taskCount: this.calculateTaskCount(category.name)
    }));
    return categories;
  }

  async getById(id) {
    await this.delay();
    const category = this.categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  }

  async create(categoryData) {
    await this.delay();
    
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color || '#6B7280',
      taskCount: 0
    };

    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, updates) {
    await this.delay();
    
    const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(id));
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    this.categories[categoryIndex] = {
      ...this.categories[categoryIndex],
      ...updates,
      Id: this.categories[categoryIndex].Id
    };

    return { ...this.categories[categoryIndex] };
  }

  async delete(id) {
    await this.delay();
    
    const categoryIndex = this.categories.findIndex(c => c.Id === parseInt(id));
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    this.categories.splice(categoryIndex, 1);
    return true;
  }

  // Helper method to calculate task count (would normally query tasks)
  calculateTaskCount(categoryName) {
    // This is a mock calculation - in a real app, this would query the task service
    const taskCounts = {
      'Work': 5,
      'Personal': 3,
      'Shopping': 2,
      'Health': 1,
      'Finance': 0
    };
    return taskCounts[categoryName] || 0;
  }
}

export default new CategoryService();