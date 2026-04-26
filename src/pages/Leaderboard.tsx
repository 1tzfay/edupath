import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy, Flame, Star, TrendingUp, Crown, Medal, Award,
  GraduationCap, Filter, ChevronDown, Sparkles
} from 'lucide-react';

interface AdmissionResult {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  xp: number;
  university: string;
  country: string;
  flag: string;
  program: string;
  scholarship: boolean;
  scholarshipName?: string;
  year: string;
  sat?: number;
  ielts?: number;
  gpa?: string;
  tags: string[];
}

const admissions: AdmissionResult[] = [
  {
    id: '1',
    name: 'Алихан Бектуров',
    avatar: 'АБ',
    grade: '12',
    xp: 1850,
    university: 'Nazarbayev University',
    country: 'Казахстан',
    flag: '🇰🇿',
    program: 'Computer Science',
    scholarship: true,
    scholarshipName: 'NU Scholarship 100%',
    year: '2025',
    ielts: 7.5,
    gpa: '5.0',
    tags: ['AI', 'Math Olympiad', 'Hackathon'],
  },
  {
    id: '2',
    name: 'Дина Жаксыбекова',
    avatar: 'ДЖ',
    grade: '12',
    xp: 1620,
    university: 'University of Edinburgh',
    country: 'Великобритания',
    flag: '🇬🇧',
    program: 'Design Informatics',
    scholarship: true,
    scholarshipName: 'Global Excellence Scholarship',
    year: '2025',
    ielts: 8.0,
    gpa: '4.9',
    tags: ['UI/UX', 'Design', 'Portfolio'],
  },
  {
    id: '3',
    name: 'Мейрам Касымов',
    avatar: 'МК',
    grade: '12',
    xp: 1450,
    university: 'KIMEP University',
    country: 'Казахстан',
    flag: '🇰🇿',
    program: 'Business Administration',
    scholarship: true,
    scholarshipName: 'Presidential Grant',
    year: '2025',
    ielts: 7.0,
    sat: 1380,
    gpa: '4.8',
    tags: ['Leadership', 'Business Case', 'Economics'],
  },
  {
    id: '4',
    name: 'Ұлан Сейтжанов',
    avatar: 'УС',
    grade: '12',
    xp: 1320,
    university: 'Томский политехнический университет',
    country: 'Россия',
    flag: '🇷🇺',
    program: 'Нефтегазовое дело',
    scholarship: false,
    year: '2025',
    gpa: '4.7',
    tags: ['Physics', 'Chemistry', 'Olympiad'],
  },
  {
    id: '5',
    name: 'Аружан Нурланова',
    avatar: 'АН',
    grade: '12',
    xp: 1280,
    university: 'Nazarbayev University',
    country: 'Казахстан',
    flag: '🇰🇿',
    program: 'Biology',
    scholarship: true,
    scholarshipName: 'NU Scholarship 50%',
    year: '2025',
    ielts: 7.0,
    gpa: '4.9',
    tags: ['Biology', 'Research', 'Science Fair'],
  },
  {
    id: '6',
    name: 'Тимур Абдрахманов',
    avatar: 'ТА',
    grade: '12',
    xp: 1190,
    university: 'Suleyman Demirel University',
    country: 'Казахстан',
    flag: '🇰🇿',
    program: 'Information Systems',
    scholarship: true,
    scholarshipName: 'Грант МОН РК',
    year: '2025',
    ielts: 6.5,
    gpa: '4.6',
    tags: ['Programming', 'Web Dev'],
  },
  {
    id: '7',
    name: 'Камила Ержанова',
    avatar: 'КЕ',
    grade: '12',
    xp: 1050,
    university: 'Al-Farabi KazNU',
    country: 'Казахстан',
    flag: '🇰🇿',
    program: 'International Relations',
    scholarship: true,
    scholarshipName: 'Грант МОН РК',
    year: '2025',
    ielts: 7.0,
    gpa: '4.8',
    tags: ['Debates', 'Public Speaking', 'Writing'],
  },
  {
    id: '8',
    name: 'Санжар Омаров',
    avatar: 'СО',
    grade: '12',
    xp: 920,
    university: 'Казахстанско-Британский технический университет',
    country: 'Казахстан',
    flag: '🇰🇿',
    program: 'Petroleum Engineering',
    scholarship: false,
    year: '2025',
    ielts: 6.0,
    gpa: '4.5',
    tags: ['Math', 'Physics'],
  },
  {
    id: '9',
    name: 'Малика Досова',
    avatar: 'МД',
    grade: '12',
    xp: 850,
    university: 'Eurasian National University',
    country: 'Казахстан',
    flag: '🇰🇿',
    program: 'Medicine',
    scholarship: true,
    scholarshipName: 'Грант МОН РК',
    year: '2025',
    gpa: '4.9',
    tags: ['Biology', 'Chemistry', 'ENT Top'],
  },
];

const countryOptions = ['Все', 'Казахстан', 'Великобритания', 'Россия'];

const Leaderboard: React.FC = () => {
  const { state } = useApp();
  const { friends, user } = state;

  const [mainTab, setMainTab] = useState<'rating' | 'admissions'>('rating');
  const [rankTab, setRankTab] = useState<'xp' | 'streak'>('xp');
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('all');
  const [filterCountry, setFilterCountry] = useState('Все');
  const [filterSimilar, setFilterSimilar] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sorted = [...friends].sort((a, b) =>
    rankTab === 'xp' ? b.xp - a.xp : b.streak - a.streak
  );

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={16} className="text-yellow-500 fill-yellow-400" />;
    if (rank === 2) return <Medal size={16} className="text-gray-400 fill-gray-300" />;
    if (rank === 3) return <Award size={16} className="text-orange-500 fill-orange-400" />;
    return <span className="text-sm font-bold text-gray-400">#{rank}</span>;
  };

  const top3 = sorted.slice(0, 3);

  const filteredAdmissions = admissions.filter(a => {
    const countryMatch = filterCountry === 'Все' || a.country === filterCountry;
    const similarMatch = !filterSimilar || Math.abs(a.xp - user.xp) <= 400;
    return countryMatch && similarMatch;
  });

  const similarCount = admissions.filter(a => Math.abs(a.xp - user.xp) <= 400).length;

  return (
    <div className="p-6 space-y-5">

      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6 pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy size={16} className="text-yellow-200" />
              <span className="text-xs text-yellow-100">Таблица лидеров</span>
            </div>
            <h2 className="text-xl font-black mb-0.5">Топ учеников</h2>
            <p className="text-orange-100 text-sm">Соревнуйся и смотри, куда поступили</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl px-5 py-3 text-center">
            <p className="text-xs text-orange-200">Твоя позиция</p>
            <p className="text-3xl font-black leading-none mt-0.5">
              #{friends.findIndex(f => f.name === user.name) + 1}
            </p>
          </div>
        </div>
      </div>

      {/* Main tab switcher */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setMainTab('rating')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
            mainTab === 'rating' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Trophy size={15} /> Рейтинг
        </button>
        <button
          onClick={() => setMainTab('admissions')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
            mainTab === 'admissions' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <GraduationCap size={15} /> Куда поступили
        </button>
      </div>

      {/* ─── RATING TAB ─── */}
      {mainTab === 'rating' && (
        <>
          {/* Sub-filters */}
          <div className="flex gap-2">
            <div className="flex bg-gray-100 rounded-xl p-1 flex-1">
              {(['xp', 'streak'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setRankTab(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    rankTab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {t === 'xp' ? '⭐ По XP' : '🔥 По серии'}
                </button>
              ))}
            </div>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {(['week', 'month', 'all'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    period === p ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {p === 'week' ? 'Неделя' : p === 'month' ? 'Месяц' : 'Всё время'}
                </button>
              ))}
            </div>
          </div>

          {/* Podium */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-5">🏆 Пьедестал</p>
            <div className="flex items-end justify-center gap-4">
              {/* 2nd */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="w-13 h-13 w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center text-white font-bold">
                    {top3[1]?.avatar}
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-black text-white">2</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-900">{top3[1]?.name.split(' ')[0]}</p>
                  <p className="text-xs text-gray-400">{rankTab === 'xp' ? `${top3[1]?.xp} XP` : `${top3[1]?.streak}🔥`}</p>
                </div>
                <div className="w-16 h-12 bg-gray-100 rounded-t-xl flex items-end justify-center pb-2">
                  <span className="text-lg font-black text-gray-400">2</span>
                </div>
              </div>
              {/* 1st */}
              <div className="flex flex-col items-center gap-2">
                <Crown size={18} className="text-yellow-500" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-yellow-200">
                    {top3[0]?.avatar}
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-black text-white">1</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-900">{top3[0]?.name.split(' ')[0]}</p>
                  <p className="text-xs text-gray-500">{rankTab === 'xp' ? `${top3[0]?.xp} XP` : `${top3[0]?.streak}🔥`}</p>
                </div>
                <div className="w-16 h-20 bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-t-xl flex items-end justify-center pb-2">
                  <span className="text-2xl font-black text-yellow-500">1</span>
                </div>
              </div>
              {/* 3rd */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center text-white font-bold">
                    {top3[2]?.avatar}
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-black text-white">3</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-900">{top3[2]?.name.split(' ')[0]}</p>
                  <p className="text-xs text-gray-400">{rankTab === 'xp' ? `${top3[2]?.xp} XP` : `${top3[2]?.streak}🔥`}</p>
                </div>
                <div className="w-16 h-8 bg-orange-100 rounded-t-xl flex items-end justify-center pb-1">
                  <span className="text-sm font-black text-orange-400">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full list */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-50">
              <p className="font-semibold text-gray-900 text-sm">Все участники</p>
            </div>
            <div className="divide-y divide-gray-50">
              {sorted.map((friend, i) => {
                const isUser = friend.name === user.name;
                return (
                  <div
                    key={friend.id}
                    className={`flex items-center gap-4 px-5 py-3 ${isUser ? 'bg-violet-50' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    <div className="w-7 flex justify-center">{getRankIcon(i + 1)}</div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs ${
                      i === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-400' :
                      i === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                      i === 2 ? 'bg-gradient-to-br from-orange-400 to-red-400' :
                      'bg-gradient-to-br from-violet-400 to-indigo-500'
                    }`}>
                      {friend.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${isUser ? 'text-violet-700' : 'text-gray-900'}`}>
                        {friend.name} {isUser && <span className="text-xs font-normal text-violet-400">(ты)</span>}
                      </p>
                      <p className="text-xs text-gray-400">{friend.grade} класс</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Flame size={13} className="text-orange-400" />
                        <span className="text-sm font-bold text-orange-600">{friend.streak}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={13} className="text-violet-400 fill-violet-300" />
                        <span className="text-sm font-bold text-violet-600">{friend.xp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivation nudge */}
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 flex items-center gap-3">
            <TrendingUp size={18} className="text-violet-500 flex-shrink-0" />
            <p className="text-sm text-violet-700">
              До следующей позиции:{' '}
              <span className="font-bold">
                {Math.max(0, (sorted[sorted.findIndex(f => f.name === user.name) - 1]?.xp || 0) - user.xp + 1)} XP
              </span>{' '}
              — обгони {sorted[sorted.findIndex(f => f.name === user.name) - 1]?.name.split(' ')[0] || 'лидера'}!
            </p>
          </div>
        </>
      )}

      {/* ─── ADMISSIONS TAB ─── */}
      {mainTab === 'admissions' && (
        <>
          {/* "Similar to you" banner */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-4 text-white flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Студенты с похожим рейтингом</p>
              <p className="text-xs text-violet-200 mt-0.5">
                {similarCount} человек с {user.xp - 400}–{user.xp + 400} XP уже поступили
              </p>
            </div>
            <button
              onClick={() => setFilterSimilar(p => !p)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                filterSimilar ? 'bg-white text-violet-700' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {filterSimilar ? 'Показать всех' : 'Показать похожих'}
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5 flex-wrap">
              {countryOptions.map(c => (
                <button
                  key={c}
                  onClick={() => setFilterCountry(c)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                    filterCountry === c
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-auto">{filteredAdmissions.length} результатов</span>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {filteredAdmissions.map(a => {
              const isSimilar = Math.abs(a.xp - user.xp) <= 400;
              const isExpanded = expandedId === a.id;

              return (
                <div
                  key={a.id}
                  className={`bg-white rounded-2xl border transition-all ${
                    isSimilar ? 'border-violet-200 shadow-sm shadow-violet-50' : 'border-gray-100'
                  }`}
                >
                  <button
                    className="w-full text-left p-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : a.id)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {a.avatar}
                      </div>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                          {isSimilar && (
                            <span className="text-[10px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full font-semibold">
                              похожий рейтинг
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>{a.flag}</span>
                          <span className="font-medium text-gray-800">{a.university}</span>
                          <span className="text-gray-300">·</span>
                          <span>{a.program}</span>
                        </div>
                      </div>

                      {/* Right side */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {a.scholarship ? (
                          <span className="text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                            🎓 Грант
                          </span>
                        ) : (
                          <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                            Платно
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <Star size={11} className="text-violet-400 fill-violet-300" />
                          <span className="text-xs text-gray-500">{a.xp} XP</span>
                        </div>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`text-gray-300 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3">
                      {/* Scores */}
                      <div className="flex gap-3">
                        {a.ielts && (
                          <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center">
                            <p className="text-lg font-black text-blue-700">{a.ielts}</p>
                            <p className="text-xs text-blue-400">IELTS</p>
                          </div>
                        )}
                        {a.sat && (
                          <div className="flex-1 bg-indigo-50 rounded-xl p-3 text-center">
                            <p className="text-lg font-black text-indigo-700">{a.sat}</p>
                            <p className="text-xs text-indigo-400">SAT</p>
                          </div>
                        )}
                        {a.gpa && (
                          <div className="flex-1 bg-violet-50 rounded-xl p-3 text-center">
                            <p className="text-lg font-black text-violet-700">{a.gpa}</p>
                            <p className="text-xs text-violet-400">GPA</p>
                          </div>
                        )}
                        <div className="flex-1 bg-orange-50 rounded-xl p-3 text-center">
                          <p className="text-lg font-black text-orange-600">{a.xp}</p>
                          <p className="text-xs text-orange-400">XP</p>
                        </div>
                      </div>

                      {/* Scholarship name */}
                      {a.scholarship && a.scholarshipName && (
                        <div className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2">
                          <GraduationCap size={14} className="text-green-600 flex-shrink-0" />
                          <p className="text-xs text-green-700 font-medium">{a.scholarshipName}</p>
                        </div>
                      )}

                      {/* Tags */}
                      <div>
                        <p className="text-xs text-gray-400 mb-1.5">Чем выделился:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {a.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* XP comparison */}
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                          <span>Его XP: <span className="font-bold text-gray-700">{a.xp}</span></span>
                          <span>Твой XP: <span className="font-bold text-violet-600">{user.xp}</span></span>
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-gray-400 rounded-full"
                            style={{ width: `${Math.min(100, (a.xp / 2000) * 100)}%` }}
                          />
                          <div
                            className="absolute left-0 top-0 h-full bg-violet-500 rounded-full opacity-70"
                            style={{ width: `${Math.min(100, (user.xp / 2000) * 100)}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1.5">
                          {a.xp > user.xp
                            ? `У него на ${a.xp - user.xp} XP больше`
                            : a.xp < user.xp
                            ? `У тебя на ${user.xp - a.xp} XP больше — у тебя есть шансы!`
                            : 'Одинаковый рейтинг!'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
