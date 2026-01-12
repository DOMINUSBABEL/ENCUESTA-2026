import React from 'react';
import { LayoutDashboard, BarChart3, Users, ThumbsDown, FileText, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'overview', label: 'Resumen General', icon: LayoutDashboard },
    { id: 'first_round', label: '1ª Vuelta Presidencial', icon: BarChart3 },
    { id: 'second_round', label: '2ª Vuelta Presidencial', icon: Users },
    { id: 'government', label: 'Evaluación Gobierno', icon: ThumbsDown },
    { id: 'methodology', label: 'Ficha Técnica', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar Navigation"
      >
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-green-500 flex items-center justify-center text-slate-900 font-bold" aria-hidden="true">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">AtlasIntel</span>
          </div>
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden text-gray-400 hover:text-white"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) toggleSidebar();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                      isActive 
                        ? 'bg-red-600 text-white shadow-md' 
                        : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} aria-hidden="true" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-6 bg-slate-950">
          <p className="text-xs text-gray-500">
            Datos: Encuesta Atlas - Semana<br/>
            Enero 2026
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
