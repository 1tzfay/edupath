import React from 'react';
import { useApp, careerConfig } from '../context/AppContext';
import {
  LayoutDashboard, Search, BookOpen, MessageSquare, Briefcase,
  Users, FileText, Trophy, Flame, Star, ChevronLeft, ChevronRight,
  Compass, Map, Flag
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Путь',
    items: [
      { id: 'dashboard', label: 'Главная', icon: <LayoutDashboard size={18} /> },
      { id: 'career', label: 'Профориентация', icon: <Compass size={18} /> },
      { id: 'guide', label: 'Гайд', icon: <Map size={18} /> },
      { id: 'usa', label: 'Поступление в США', icon: <Flag size={18} /> },
    ],
  },
  {
    label: 'Подготовка',
    items: [
      { id: 'lessons', label: 'Уроки', icon: <BookOpen size={18} /> },
      { id: 'ai', label: 'ИИ-ассистент', icon: <MessageSquare size={18} />, badge: 1 },
      { id: 'essay', label: 'Эссе-помощник', icon: <FileText size={18} /> },
    ],
  },
  {
    label: 'Активности',
    items: [
      { id: 'opportunities', label: 'Возможности', icon: <Search size={18} /> },
      { id: 'teams', label: 'Найти команду', icon: <Users size={18} /> },
    ],
  },
  {
    label: 'Прогресс',
    items: [
      { id: 'portfolio', label: 'Портфолио', icon: <Briefcase size={18} /> },
      { id: 'leaderboard', label: 'Рейтинг', icon: <Trophy size={18} /> },
    ],
  },
];

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentPage, collapsed, onToggle }) => {
  const { state } = useApp();
  const { user, career } = state;
  const xpProgress = ((user.xp % 500) / 500) * 100;
  const pathCfg = career.path ? careerConfig[career.path] : null;

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 transition-all duration-200 flex-shrink-0 relative`}>

      {/* Toggle button — always on the right edge at the same spot */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-5 z-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-violet-600 hover:border-violet-300 shadow-sm transition-colors cursor-pointer"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Logo */}
      <div className={`flex items-center border-b border-gray-100 h-14 flex-shrink-0 ${collapsed ? 'justify-center' : 'px-4 gap-2.5'}`}>
        <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
          <Star size={14} className="text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-gray-900 leading-none">EduPath</h1>
            <p className="text-[10px] text-gray-400 mt-0.5">Твой путь в топ-вуз</p>
          </div>
        )}
      </div>

      {/* User mini-card */}
      {!collapsed ? (
        <div className="px-3 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate leading-tight">{user.name}</p>
              <p className="text-[10px] text-gray-400">Ур. {user.level} · {user.xp} XP</p>
            </div>
            <div className="flex items-center gap-0.5 bg-orange-50 px-1.5 py-0.5 rounded-lg">
              <Flame size={10} className="text-orange-500" />
              <span className="text-[10px] font-bold text-orange-600">{user.streak}</span>
            </div>
          </div>
          {/* XP bar */}
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${xpProgress}%` }} />
          </div>
          {/* Career path badge */}
          {pathCfg && (
            <div className={`mt-2 flex items-center gap-1 ${pathCfg.bg} ${pathCfg.border} border rounded-lg px-2 py-1`}>
              <span className="text-xs">{pathCfg.emoji}</span>
              <span className={`text-[10px] font-semibold ${pathCfg.color} truncate`}>{pathCfg.label}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-3 border-b border-gray-100 gap-1.5 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            {user.avatar}
          </div>
          <div className="flex items-center gap-0.5">
            <Flame size={10} className="text-orange-500" />
            <span className="text-[10px] font-bold text-orange-600">{user.streak}</span>
          </div>
          {pathCfg && <span className="text-sm">{pathCfg.emoji}</span>}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1">{group.label}</p>
            )}
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl mb-0.5 transition-all duration-150 group cursor-pointer ${
                  collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2'
                } ${
                  currentPage === item.id
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className={`flex-shrink-0 ${currentPage === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="text-xs font-medium flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${currentPage === item.id ? 'bg-white/25 text-white' : 'bg-violet-100 text-violet-600'}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Daily goal */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-gray-100 flex-shrink-0">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-3 text-white">
            <p className="text-[10px] font-semibold mb-0.5">🎯 Цель на сегодня</p>
            <p className="text-[10px] opacity-75">Пройди 1 урок!</p>
            <div className="mt-1.5 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
