import React from 'react';
import { KanbanProvider } from './context/KanbanContext';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <KanbanProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <KanbanBoard />
      </div>
    </KanbanProvider>
  );
}

export default App;
