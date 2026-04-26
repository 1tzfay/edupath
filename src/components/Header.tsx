import React from 'react';
import { Bell, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { state } = useApp();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
            <Flame size={15} className="text-orange-500" />
            <span className="text-sm font-bold text-orange-600">{state.user.streak}</span>
          </div>
          <div className="relative">
            <button className="w-9 h-9 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors cursor-pointer">
              <Bell size={18} className="text-gray-500" />
            </button>
            {state.notifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                {state.notifications}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
