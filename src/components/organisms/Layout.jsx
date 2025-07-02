import React, { useState } from 'react';
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Mock data for sidebar - in real app this would come from props or context
  const categories = [
    { id: 1, name: 'Work', taskCount: 5 },
    { id: 2, name: 'Personal', taskCount: 3 },
    { id: 3, name: 'Shopping', taskCount: 2 },
    { id: 4, name: 'Health', taskCount: 1 },
    { id: 5, name: 'Finance', taskCount: 0 }
  ];

  const taskCounts = {
    all: 11,
    active: 8,
    completed: 3,
    overdue: 2,
    today: 4
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        categories={categories}
        taskCounts={taskCounts}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onMenuToggle={handleMenuToggle}
          taskCounts={taskCounts}
        />
        
        <main className="flex-1 p-6">
          {React.cloneElement(children, { searchQuery })}
        </main>
      </div>
    </div>
  );
};

export default Layout;