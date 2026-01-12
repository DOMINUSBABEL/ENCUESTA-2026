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
      case 'overview': return <Overview setActiveTab={setActiveTab} />;
      case 'first_round': return <FirstRound />;
      case 'second_round': return <SecondRound />;
      case 'government': return <Government />;
      case 'methodology': return <Methodology />;
      default: return <Overview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-inter">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 relative">
        
        {/* Background Pattern - Subtle Technical Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
        }}></div>

        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 flex items-center p-4 sticky top-0 z-10 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 focus:outline-none hover:text-gray-900 transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="ml-4">
             <span className="block font-bold text-lg text-slate-900 leading-none">AtlasIntel</span>
             <span className="text-xs text-slate-500 uppercase tracking-wider">Colombia 2026</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth z-10">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
          
          <footer className="mt-12 text-center text-xs text-slate-400 pb-4">
            &copy; 2026 Consultora Talleyrand. Análisis independiente basado en datos públicos de AtlasIntel.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
