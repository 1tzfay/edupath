import React, { useState } from 'react';
import { Search, Users, Plus, MessageCircle, Star, MapPin } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  city: string;
  skills: string[];
  interests: string[];
  lookingFor: string;
  bio: string;
  rating: number;
  projects: number;
}

const members: TeamMember[] = [
  {
    id: '1',
    name: 'Алихан Бектуров',
    avatar: 'АБ',
    grade: '11',
    city: 'Алматы',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    interests: ['AI', 'Hackathons', 'Research'],
    lookingFor: 'Хакатон по AI/ML',
    bio: 'Победитель 3 хакатонов. Ищу команду для Kazakhstan AI Hackathon 2026.',
    rating: 4.9,
    projects: 5,
  },
  {
    id: '2',
    name: 'Дина Жаксыбекова',
    avatar: 'ДЖ',
    grade: '12',
    city: 'Нур-Султан',
    skills: ['UI/UX Design', 'Figma', 'Frontend'],
    interests: ['Design', 'EdTech', 'Social Impact'],
    lookingFor: 'Конкурс социальных проектов',
    bio: 'Дизайнер с опытом 2+ лет. Хочу создавать продукты, меняющие мир.',
    rating: 4.7,
    projects: 4,
  },
  {
    id: '3',
    name: 'Мейрам Касымов',
    avatar: 'МК',
    grade: '11',
    city: 'Алматы',
    skills: ['React', 'Node.js', 'TypeScript'],
    interests: ['Web Dev', 'Startups', 'Hackathons'],
    lookingFor: 'Хакатон — нужен дизайнер и ML',
    bio: 'Full-stack разработчик. Участвую в хакатонах с 9 класса.',
    rating: 4.8,
    projects: 7,
  },
  {
    id: '4',
    name: 'Ақбота Нұрланова',
    avatar: 'АН',
    grade: '10',
    city: 'Шымкент',
    skills: ['Biology', 'Chemistry', 'Research Writing'],
    interests: ['Science Fairs', 'Medicine', 'Research'],
    lookingFor: 'Научный проект для Google Science Fair',
    bio: 'Интересуюсь биотехнологиями и медициной. Ищу команду для исследования.',
    rating: 4.5,
    projects: 2,
  },
  {
    id: '5',
    name: 'Тимур Сейтов',
    avatar: 'ТС',
    grade: '11',
    city: 'Алматы',
    skills: ['Economics', 'Business Analysis', 'Presentation'],
    interests: ['Business', 'Finance', 'Entrepreneurship'],
    lookingFor: 'Бизнес-кейс чемпионат',
    bio: 'Победитель Junior Achievement Kazakhstan 2025. Ищу аналитика и питчера.',
    rating: 4.6,
    projects: 3,
  },
  {
    id: '6',
    name: 'Камила Ержанова',
    avatar: 'КЕ',
    grade: '12',
    city: 'Алматы',
    skills: ['Creative Writing', 'Public Speaking', 'Marketing'],
    interests: ['Literature', 'Media', 'Social Projects'],
    lookingFor: 'Медиа проект или дебаты',
    bio: 'Капитан дебатного клуба. Умею убеждать и рассказывать истории.',
    rating: 4.4,
    projects: 4,
  },
];

const skillColors = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-teal-100 text-teal-700',
  'bg-pink-100 text-pink-700',
];

const TeamFinder: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [connected, setConnected] = useState<Set<string>>(new Set());

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
    m.interests.some(i => i.toLowerCase().includes(search.toLowerCase())) ||
    m.lookingFor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8" />
        <div className="relative">
          <h2 className="text-xl font-bold mb-1">Найди свою команду мечты</h2>
          <p className="text-teal-100 text-sm mb-4">Объединяйся с единомышленниками для хакатонов, олимпиад и исследований</p>
          <div className="flex gap-3">
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
              <p className="text-xl font-bold">50+</p>
              <p className="text-xs text-teal-200">активных участников</p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
              <p className="text-xl font-bold">12</p>
              <p className="text-xs text-teal-200">команд ищут участников</p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
              <p className="text-xl font-bold">8</p>
              <p className="text-xs text-teal-200">предстоящих событий</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Create */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по навыкам, интересам или конкурсам..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer"
        >
          <Plus size={16} /> Создать объявление
        </button>
      </div>

      {/* Members Grid */}
      <div>
        <p className="text-sm text-gray-400 mb-3">Найдено: {filtered.length} участников</p>
        <div className="grid grid-cols-2 gap-4">
          {filtered.map(member => (
            <div key={member.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-teal-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{member.grade} класс</span>
                    <span className="text-gray-300">·</span>
                    <div className="flex items-center gap-0.5">
                      <MapPin size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{member.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-600 font-medium">{member.rating}</span>
                    <span className="text-xs text-gray-400">· {member.projects} проектов</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-3">{member.bio}</p>

              <div className="mb-3">
                <p className="text-xs font-medium text-gray-500 mb-1.5">Навыки:</p>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, i) => (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded-full font-medium ${skillColors[i % skillColors.length]}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-teal-50 rounded-xl px-3 py-2 mb-3">
                <p className="text-xs font-medium text-teal-700">🎯 Ищет: {member.lookingFor}</p>
              </div>

              <button
                onClick={() => setConnected(prev => {
                  const next = new Set(prev);
                  next.has(member.id) ? next.delete(member.id) : next.add(member.id);
                  return next;
                })}
                className={`w-full py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  connected.has(member.id)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {connected.has(member.id) ? (
                  <><Users size={14} /> Заявка отправлена</>
                ) : (
                  <><MessageCircle size={14} /> Написать</>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Создать объявление</h3>
            <p className="text-sm text-gray-500 mb-4">Расскажи, кого ищешь для своей команды</p>
            <div className="space-y-3">
              <input placeholder="Для какого конкурса ищешь команду?" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300" />
              <input placeholder="Какие навыки нужны (через запятую)?" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300" />
              <textarea placeholder="Расскажи о проекте и своём вкладе..." rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none" />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium cursor-pointer hover:bg-gray-50">Отмена</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 cursor-pointer">Опубликовать</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamFinder;
