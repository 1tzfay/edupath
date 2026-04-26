import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Download, Trophy, Award, Code, Star, Calendar, Eye, Share2, FileText } from 'lucide-react';

const achievementTypes = [
  { value: 'olympiad', label: 'Олимпиада', icon: '🏆', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'hackathon', label: 'Хакатон', icon: '⚡', color: 'bg-orange-100 text-orange-700' },
  { value: 'research', label: 'Исследование', icon: '🔬', color: 'bg-teal-100 text-teal-700' },
  { value: 'certificate', label: 'Сертификат', icon: '📜', color: 'bg-blue-100 text-blue-700' },
  { value: 'project', label: 'Проект', icon: '💡', color: 'bg-purple-100 text-purple-700' },
  { value: 'award', label: 'Награда', icon: '🎖️', color: 'bg-red-100 text-red-700' },
];

interface NewAchievement {
  title: string;
  type: string;
  date: string;
  description: string;
}

const Portfolio: React.FC = () => {
  const { state, addAchievement } = useApp();
  const { user } = state;
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [newAch, setNewAch] = useState<NewAchievement>({ title: '', type: 'olympiad', date: '', description: '' });

  const handleAdd = () => {
    if (!newAch.title || !newAch.date) return;
    addAchievement({ id: Date.now().toString(), ...newAch });
    setNewAch({ title: '', type: 'olympiad', date: '', description: '' });
    setShowAddModal(false);
  };

  const stats = [
    { label: 'Достижений', value: user.achievements.length, icon: <Trophy size={18} className="text-yellow-600" />, bg: 'bg-yellow-50' },
    { label: 'Уровень', value: user.level, icon: <Star size={18} className="text-violet-600" />, bg: 'bg-violet-50' },
    { label: 'XP очков', value: user.xp, icon: <Award size={18} className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Уроков пройдено', value: user.completedLessons, icon: <FileText size={18} className="text-green-600" />, bg: 'bg-green-50' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative flex items-start gap-5">
          <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white text-2xl font-black">
            {user.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-violet-200 text-sm mt-0.5">{user.grade} класс · Уровень {user.level}</p>
            <p className="text-violet-300 text-xs mt-2">Сформируй конкурентное портфолио для поступления в топ-вузы</p>
            <div className="flex gap-2 mt-3">
              <button className="flex items-center gap-2 bg-white text-violet-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-violet-50 transition-colors cursor-pointer">
                <Download size={14} /> Скачать PDF
              </button>
              <button className="flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/25 transition-colors cursor-pointer">
                <Share2 size={14} /> Поделиться
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} rounded-2xl p-4 text-center`}>
            <div className="flex justify-center mb-1">{s.icon}</div>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Достижения</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-500 text-xs cursor-pointer"
            >
              {viewMode === 'grid' ? <Eye size={15} /> : <Code size={15} />}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors cursor-pointer"
            >
              <Plus size={14} /> Добавить
            </button>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-3'}>
          {user.achievements.map((ach, i) => {
            const typeInfo = achievementTypes.find(t => t.value === ach.type) || achievementTypes[0];
            return viewMode === 'grid' ? (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-violet-200 hover:shadow-md transition-all group">
                <div className="text-3xl mb-3">{typeInfo.icon}</div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeInfo.color}`}>{typeInfo.label}</span>
                <h4 className="font-semibold text-gray-900 mt-2 mb-1">{ach.title}</h4>
                <p className="text-xs text-gray-500 mb-3">{ach.description}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={11} />
                  <span>{ach.date}</span>
                </div>
              </div>
            ) : (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:border-violet-200 transition-all">
                <div className="text-2xl">{typeInfo.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-semibold text-gray-900">{ach.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeInfo.color}`}>{typeInfo.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">{ach.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={11} />
                  <span>{ach.date}</span>
                </div>
              </div>
            );
          })}

          {/* Add placeholder */}
          <button
            onClick={() => setShowAddModal(true)}
            className={`${viewMode === 'grid' ? '' : 'w-full'} border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center hover:border-violet-300 hover:bg-violet-50 transition-all group cursor-pointer flex flex-col items-center justify-center gap-2`}
          >
            <Plus size={24} className="text-gray-300 group-hover:text-violet-400 transition-colors" />
            <p className="text-sm text-gray-400 group-hover:text-violet-600">Добавить достижение</p>
          </button>
        </div>
      </div>

      {/* Skills section */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Мои навыки</h3>
        <div className="space-y-3">
          {[
            { skill: 'Математика', level: 78 },
            { skill: 'Английский язык', level: 72 },
            { skill: 'Программирование', level: 55 },
            { skill: 'Научное исследование', level: 60 },
            { skill: 'Публичные выступления', level: 45 },
          ].map((s, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">{s.skill}</span>
                <span className="text-sm font-medium text-violet-600">{s.level}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-1000"
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Achievement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Добавить достижение</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Название</label>
                <input
                  value={newAch.title}
                  onChange={e => setNewAch(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Например: 1 место на Math Olympiad"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Тип</label>
                <select
                  value={newAch.type}
                  onChange={e => setNewAch(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                >
                  {achievementTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Дата</label>
                <input
                  type="month"
                  value={newAch.date}
                  onChange={e => setNewAch(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Описание</label>
                <textarea
                  value={newAch.description}
                  onChange={e => setNewAch(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Кратко опишите достижение"
                  rows={2}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={handleAdd}
                disabled={!newAch.title || !newAch.date}
                className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
