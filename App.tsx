import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './views/Overview';
import FirstRound from './views/FirstRound';
import SecondRound from './views/SecondRound';
import Government from './views/Government';
import Methodology from './views/Methodology';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'first_round': return <FirstRound />;
      case 'second_round': return <SecondRound />;
      case 'government': return <Government />;
      case 'methodology': return <Methodology />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 flex items-center p-4 sticky top-0 z-10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 focus:outline-none hover:text-gray-900 transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-lg text-gray-900">AtlasIntel</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
