import React from 'react';
import { LayoutDashboard, BarChart3, Users, ThumbsDown, FileText, X, Briefcase } from 'lucide-react';

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
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-slate-950 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg text-white font-bold" aria-hidden="true">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">AtlasIntel</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Colombia 2026</span>
            </div>
          </div>
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Análisis Electoral
          </p>
          <ul className="space-y-2">
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
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg shadow-red-900/20' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} aria-hidden="true" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer / Branding */}
        <div className="p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex items-start space-x-3">
             <Briefcase className="w-4 h-4 text-slate-500 mt-1" />
             <div>
                <p className="text-xs text-slate-400 mb-1">Desarrollado por:</p>
                <p className="text-sm font-bold text-white tracking-wide">Consultora Talleyrand</p>
                <p className="text-[10px] text-slate-600 mt-2">
                  Datos: Encuesta Atlas<br/>
                  Enero 2026
                </p>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
