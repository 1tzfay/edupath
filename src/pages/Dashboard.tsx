import React from 'react';
import { useApp, careerConfig } from '../context/AppContext';
import {
  Flame, Trophy, BookOpen, TrendingUp, ArrowRight,
  Map, Sparkles
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const { user, friends, career, onboarding } = state;

  const userRank = friends.find(f => f.name === user.name)?.rank || 4;
  const xpProgress = ((user.xp % 500) / 500) * 100;
  const pathCfg = career.path ? careerConfig[career.path] : null;

  // Derive admission guide progress (same logic as AdmissionGuide page)
  const completedSteps = new Set<number>();
  if (onboarding.completed) completedSteps.add(0);
  if (onboarding.completed && career.path) completedSteps.add(1);
  if (user.completedLessons >= 5) completedSteps.add(2);
  if (user.achievements.filter(a => a.source === 'competition').length >= 1) completedSteps.add(3);
  if (career.essayWritten) completedSteps.add(4);
  const admissionPct = Math.round((completedSteps.size / 7) * 100);

  const guideStepLabels = [
    'Познай себя', 'Составь план', 'Готовься к тестам',
    'Участвуй', 'Напиши заявку', 'Выбери вузы', 'Отправь заявку'
  ];
  const currentGuideStep = (() => {
    for (let i = 0; i < 7; i++) if (!completedSteps.has(i)) return i;
    return 6;
  })();

  // Next recommended action
  const nextAction = !onboarding.completed
    ? { text: 'Заполни анкету, чтобы получить персональный план', page: 'dashboard', cta: 'Заполнить анкету', icon: '✨' }
    : !career.testCompleted
    ? { text: 'Пройди тест профориентации — узнай своё направление', page: 'career', cta: 'Пройти тест', icon: '🧭' }
    : user.completedLessons < 5
    ? { text: `Пройди уроки по ${pathCfg?.lessonCategories[0] || 'SAT/IELTS'} — нужно ещё ${5 - user.completedLessons}`, page: 'lessons', cta: 'Открыть уроки', icon: '📚' }
    : { text: 'Найди конкурс по твоему направлению и участвуй', page: 'opportunities', cta: 'Найти конкурсы', icon: '🏆' };

  const weeklyXP = [150, 100, 200, 50, 180, 250, 120];
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const maxXP = Math.max(...weeklyXP);

  // Recommended lessons based on career path
  const lessonRecs = pathCfg
    ? [pathCfg.lessonCategories[0], pathCfg.lessonCategories[1] || pathCfg.lessonCategories[0]]
    : ['IELTS', 'SAT'];

  return (
    <div className="p-6 space-y-5">

      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-14 translate-x-14 pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Flame size={13} className="text-orange-300" />
              <span className="text-xs text-violet-200">{user.streak} дней подряд</span>
            </div>
            <h1 className="text-xl font-bold mb-0.5">Привет, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-violet-300 text-xs">Уровень {user.level} · {user.xp} XP</p>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex-1 max-w-36 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/70 rounded-full" style={{ width: `${xpProgress}%` }} />
              </div>
              <span className="text-[11px] text-violet-300">{500 - (user.xp % 500)} XP до ур. {user.level + 1}</span>
            </div>
            {pathCfg && (
              <div className="mt-2 inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-lg">
                <span className="text-sm">{pathCfg.emoji}</span>
                <span className="text-xs font-medium text-violet-100">{pathCfg.label}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
              <p className="text-xl font-black leading-none">{user.completedLessons}</p>
              <p className="text-[10px] text-violet-200 mt-0.5">уроков</p>
            </div>
            <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
              <p className="text-xl font-black leading-none">#{userRank}</p>
              <p className="text-[10px] text-violet-200 mt-0.5">рейтинг</p>
            </div>
            <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
              <p className="text-xl font-black leading-none">{user.achievements.length}</p>
              <p className="text-[10px] text-violet-200 mt-0.5">наград</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── NEXT STEP – the single most important action ── */}
      <button
        onClick={() => onNavigate(nextAction.page)}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white flex items-center gap-4 hover:opacity-95 cursor-pointer transition-opacity shadow-md shadow-emerald-100"
      >
        <div className="text-3xl flex-shrink-0">{nextAction.icon}</div>
        <div className="flex-1 text-left">
          <p className="text-[10px] font-semibold text-emerald-100 uppercase tracking-wider mb-0.5">Следующий шаг</p>
          <p className="text-sm font-semibold leading-snug">{nextAction.text}</p>
        </div>
        <div className="bg-white/20 rounded-xl px-3 py-2 text-xs font-semibold flex-shrink-0">
          {nextAction.cta} →
        </div>
      </button>

      {/* ── ADMISSION GUIDE PROGRESS ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Map size={15} className="text-emerald-600" />
            <p className="text-sm font-semibold text-gray-900">Путь поступления</p>
          </div>
          <button onClick={() => onNavigate('guide')} className="text-xs text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium">
            Открыть гайд →
          </button>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                completedSteps.has(i) ? 'bg-emerald-500 text-white' :
                i === currentGuideStep ? 'bg-emerald-100 border-2 border-emerald-500 text-emerald-700' :
                'bg-gray-100 text-gray-400'
              }`}>
                {completedSteps.has(i) ? '✓' : i + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Текущий: <span className="font-medium text-gray-700">{guideStepLabels[currentGuideStep]}</span>
          </p>
          <span className="text-xs font-bold text-emerald-600">{admissionPct}%</span>
        </div>
      </div>

      {/* ── MAIN ROW: chart + streak/rank ── */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-900">Активность за неделю</p>
            <div className="flex items-center gap-1 text-green-500 text-xs font-semibold">
              <TrendingUp size={12} /> +23%
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {weeklyXP.map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full relative" style={{ height: '52px' }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-violet-100 rounded-t-md overflow-hidden" style={{ height: '100%' }}>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-md"
                      style={{ height: `${(xp / maxXP) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-[9px] text-gray-400">{days[i]}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 pt-3 border-t border-gray-50 text-xs">
            <div><span className="text-gray-400">Уроков: </span><span className="font-bold text-gray-800">20</span></div>
            <div><span className="text-gray-400">XP: </span><span className="font-bold text-violet-600">1050</span></div>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-3">
          <div className="flex-1 bg-orange-50 border border-orange-100 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Flame size={18} className="text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-orange-600 leading-none">{user.streak}</p>
              <p className="text-xs text-orange-500">дней подряд</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Рекорд: 21</p>
            </div>
          </div>
          <div className="flex-1 bg-violet-50 border border-violet-100 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy size={18} className="text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-violet-700 leading-none">#{userRank}</p>
              <p className="text-xs text-violet-500">в рейтинге</p>
              <button onClick={() => onNavigate('leaderboard')} className="text-[10px] text-violet-400 hover:text-violet-600 cursor-pointer">Смотреть →</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── RECOMMENDATIONS based on career path ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Recommended lessons */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {pathCfg ? <span className="text-base">{pathCfg.emoji}</span> : <BookOpen size={14} className="text-violet-500" />}
              <p className="text-sm font-semibold text-gray-900">
                {pathCfg ? 'Уроки для тебя' : 'Рекомендованные уроки'}
              </p>
            </div>
            <button onClick={() => onNavigate('lessons')} className="text-violet-500 hover:text-violet-700 cursor-pointer">
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {lessonRecs.map((cat, i) => (
              <button key={i} onClick={() => onNavigate('lessons')} className="w-full flex items-center gap-2.5 bg-gray-50 hover:bg-violet-50 rounded-xl px-3 py-2 transition-colors cursor-pointer text-left">
                <div className="w-7 h-7 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen size={13} className="text-violet-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{cat}</p>
                  <p className="text-[10px] text-gray-400">Подготовка</p>
                </div>
                <div className="ml-auto">
                  <Sparkles size={12} className="text-violet-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended opportunities */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-orange-500" />
              <p className="text-sm font-semibold text-gray-900">Конкурсы для тебя</p>
            </div>
            <button onClick={() => onNavigate('opportunities')} className="text-violet-500 hover:text-violet-700 cursor-pointer">
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {(pathCfg?.opportunityTags ?? ['science', 'math']).slice(0, 2).map((tag, i) => (
              <button key={i} onClick={() => onNavigate('opportunities')} className="w-full flex items-center gap-2.5 bg-gray-50 hover:bg-orange-50 rounded-xl px-3 py-2 transition-colors cursor-pointer text-left">
                <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy size={13} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 capitalize">{tag}</p>
                  <p className="text-[10px] text-gray-400">По твоему направлению</p>
                </div>
                <div className="ml-auto">
                  <Sparkles size={12} className="text-orange-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PORTFOLIO SNAPSHOT ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-900">Твоё портфолио</p>
          <button onClick={() => onNavigate('portfolio')} className="text-violet-500 hover:text-violet-700 text-xs font-medium cursor-pointer">
            Открыть →
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {user.achievements.map((ach, i) => (
            <div key={i} className="flex-shrink-0 w-28 bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
              <div className="text-xl mb-1">
                {ach.type === 'olympiad' ? '🏆' : ach.type === 'hackathon' ? '⚡' : ach.type === 'club' ? '👥' : '📜'}
              </div>
              <p className="text-[10px] font-semibold text-gray-700 leading-tight line-clamp-2">{ach.title}</p>
              {ach.source && <p className="text-[9px] text-gray-400 mt-0.5">{ach.source}</p>}
            </div>
          ))}
          <button onClick={() => onNavigate('portfolio')} className="flex-shrink-0 w-28 border-2 border-dashed border-gray-200 rounded-xl p-2.5 text-center hover:border-violet-300 hover:bg-violet-50 transition-all cursor-pointer">
            <div className="text-xl text-gray-300 mb-1">+</div>
            <p className="text-[10px] text-gray-400">Добавить</p>
          </button>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" style={{ width: `${Math.min(100, (user.achievements.length / 10) * 100)}%` }} />
          </div>
          <span className="text-[10px] text-gray-400">{user.achievements.length}/10 для сильного портфолио</span>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
