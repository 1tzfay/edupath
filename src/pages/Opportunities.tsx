import React, { useState } from 'react';
import { opportunities } from '../data/opportunities';
import { Search, Calendar, MapPin, Trophy, Zap, BookOpen, Microscope, Star, ExternalLink, Bookmark } from 'lucide-react';

const typeConfig = {
  hackathon: { label: 'Хакатон', color: 'bg-orange-100 text-orange-700', icon: <Zap size={12} /> },
  olympiad: { label: 'Олимпиада', color: 'bg-blue-100 text-blue-700', icon: <Trophy size={12} /> },
  competition: { label: 'Конкурс', color: 'bg-purple-100 text-purple-700', icon: <Star size={12} /> },
  research: { label: 'Исследование', color: 'bg-teal-100 text-teal-700', icon: <Microscope size={12} /> },
  program: { label: 'Программа', color: 'bg-green-100 text-green-700', icon: <BookOpen size={12} /> },
};

const difficultyConfig = {
  beginner: { label: 'Начальный', color: 'text-green-600 bg-green-50' },
  intermediate: { label: 'Средний', color: 'text-yellow-600 bg-yellow-50' },
  advanced: { label: 'Продвинутый', color: 'text-red-600 bg-red-50' },
};

const Opportunities: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.description.toLowerCase().includes(search.toLowerCase()) ||
      opp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === 'all' || opp.type === selectedType;
    const matchesDiff = selectedDifficulty === 'all' || opp.difficulty === selectedDifficulty;
    return matchesSearch && matchesType && matchesDiff;
  });

  const toggleSave = (id: string) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const featured = opportunities.filter(o => o.isFeatured);

  return (
    <div className="p-6 space-y-6">
      {/* Featured */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Рекомендовано для тебя</h3>
        <div className="grid grid-cols-3 gap-4">
          {featured.map(opp => {
            const tc = typeConfig[opp.type];
            return (
              <div key={opp.id} className="relative bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-5 text-white overflow-hidden shadow-lg shadow-violet-200/50 hover:scale-102 transition-transform cursor-pointer">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-5 translate-x-5" />
                <div className="relative">
                  {opp.isNew && (
                    <span className="inline-block bg-white/20 text-white text-xs px-2 py-0.5 rounded-full mb-2 font-medium">Новое</span>
                  )}
                  <h4 className="font-bold mb-1 leading-tight">{opp.title}</h4>
                  <p className="text-violet-200 text-xs mb-3 line-clamp-2">{opp.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-lg">{tc.label}</span>
                    {opp.prize && <span className="text-yellow-300 font-bold text-sm">{opp.prize}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-violet-200 text-xs">
                    <Calendar size={11} />
                    <span>до {opp.deadline}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск конкурсов, олимпиад, программ..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 appearance-none cursor-pointer"
          >
            <option value="all">Все типы</option>
            <option value="hackathon">Хакатоны</option>
            <option value="olympiad">Олимпиады</option>
            <option value="competition">Конкурсы</option>
            <option value="research">Исследования</option>
            <option value="program">Программы</option>
          </select>
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 appearance-none cursor-pointer"
          >
            <option value="all">Любой уровень</option>
            <option value="beginner">Начальный</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-gray-400 mb-3">Найдено: {filtered.length} возможностей</p>
        <div className="grid grid-cols-2 gap-4">
          {filtered.map(opp => {
            const tc = typeConfig[opp.type];
            const dc = difficultyConfig[opp.difficulty];
            return (
              <div
                key={opp.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${tc.color}`}>
                        {tc.icon} {tc.label}
                      </span>
                      {opp.isNew && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">Новое</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">{opp.title}</h4>
                  </div>
                  <button
                    onClick={() => toggleSave(opp.id)}
                    className={`ml-2 p-1.5 rounded-lg transition-colors cursor-pointer ${saved.has(opp.id) ? 'text-violet-600 bg-violet-50' : 'text-gray-300 hover:text-gray-500'}`}
                  >
                    <Bookmark size={16} fill={saved.has(opp.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{opp.description}</p>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={11} />
                    <span>{opp.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={11} />
                    <span>{opp.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {opp.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${dc.color}`}>{dc.label}</span>
                    {opp.prize && <span className="text-xs font-bold text-green-600">{opp.prize}</span>}
                  </div>
                </div>

                <button className="mt-3 w-full py-2 bg-violet-50 hover:bg-violet-100 text-violet-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  Подробнее <ExternalLink size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
