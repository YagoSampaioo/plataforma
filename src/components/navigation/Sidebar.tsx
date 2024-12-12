import React, { useState } from 'react';
import { LayoutDashboard, Users, MessageSquare, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LogoutButton } from './LogoutButton';

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-ffb400/20 text-ffb400 border-ffb400' 
      : 'text-gray-400 hover:bg-ffb400/10 hover:text-ffb400 border-transparent';
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/clients', icon: Users, label: 'Clientes' },
    { path: '/demands', icon: MessageSquare, label: 'Demandas' },
    { path: '/settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <div 
      className={`fixed h-full z-10 transition-all duration-300 ease-in-out 
        bg-dark-200/40 backdrop-blur-sm border-r border-ffb400/10
        ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center justify-between px-4 py-6 border-b border-ffb400/10 ${isCollapsed ? 'justify-center' : ''}`}>
          {!isCollapsed && (
            <h2 className="text-xl font-semibold text-ffb400">Painel</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-full hover:bg-ffb400/10 text-ffb400 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg border ${isActive(item.path)} transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className={`px-2 py-4 border-t border-ffb400/10 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}