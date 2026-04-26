import React, { useState } from 'react';
import { lessonCategories, lessons } from '../data/lessons';
import { useApp } from '../context/AppContext';
import { Clock, Star, CheckCircle, Play, Lock, Flame } from 'lucide-react';

const Lessons: React.FC = () => {
  const { addXP } = useApp();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [completedToday, setCompletedToday] = useState<Set<string>>(new Set());

  const filteredLessons = selectedCat
    ? lessons.filter(l => l.category.toLowerCase() === selectedCat)
    : lessons;

  const handleComplete = (id: string, xp: number) => {
    if (!completedToday.has(id)) {
      setCompletedToday(prev => new Set([...prev, id]));
      addXP(xp);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Категории</h3>
          {selectedCat && (
            <button onClick={() => setSelectedCat(null)} className="text-xs text-violet-600 hover:underline cursor-pointer">
              Все категории
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {lessonCategories.map(cat => {
            const progress = Math.round((cat.completedLessons / cat.totalLessons) * 100);
            const isActive = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(isActive ? null : cat.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'border-violet-400 bg-violet-50 shadow-md shadow-violet-100'
                    : 'border-gray-100 bg-white hover:border-violet-200 hover:shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{cat.description}</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{cat.completedLessons}/{cat.totalLessons}</span>
                    <span className="text-xs font-medium text-violet-600">{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lessons List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {selectedCat ? `Уроки: ${lessonCategories.find(c => c.id === selectedCat)?.name}` : 'Все уроки'}
          </h3>
          <span className="text-xs text-gray-400">{filteredLessons.length} уроков</span>
        </div>
        <div className="space-y-3">
          {filteredLessons.map((lesson, i) => {
            const isLocked = i > 0 && !lessons[i - 1].isCompleted && lesson.progress === 0;
            const isDoneToday = completedToday.has(lesson.id);
            const diffColors = {
              beginner: 'bg-green-100 text-green-600',
              intermediate: 'bg-yellow-100 text-yellow-600',
              advanced: 'bg-red-100 text-red-600',
            };

            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-2xl border p-4 transition-all ${
                  isLocked ? 'opacity-50 border-gray-100' : 'border-gray-100 hover:border-violet-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Status icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    lesson.isCompleted || isDoneToday
                      ? 'bg-green-100'
                      : lesson.progress && lesson.progress > 0
                      ? 'bg-violet-100'
                      : isLocked
                      ? 'bg-gray-100'
                      : 'bg-violet-50'
                  }`}>
                    {lesson.isCompleted || isDoneToday ? (
                      <CheckCircle size={22} className="text-green-500" />
                    ) : isLocked ? (
                      <Lock size={20} className="text-gray-400" />
                    ) : (
                      <Play size={20} className="text-violet-600" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-semibold text-gray-900 truncate">{lesson.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">{lesson.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} />
                        <span>{lesson.duration} мин</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffColors[lesson.difficulty]}`}>
                        {lesson.difficulty === 'beginner' ? 'Начальный' : lesson.difficulty === 'intermediate' ? 'Средний' : 'Продвинутый'}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <Star size={11} fill="currentColor" />
                        <span className="font-medium">{lesson.xp} XP</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress / Action */}
                  <div className="flex flex-col items-end gap-2">
                    {lesson.progress !== undefined && lesson.progress > 0 && lesson.progress < 100 && !isDoneToday && (
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">{lesson.progress}%</p>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-500 rounded-full"
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {!isLocked && (
                      <button
                        onClick={() => handleComplete(lesson.id, lesson.xp)}
                        disabled={lesson.isCompleted || isDoneToday}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          lesson.isCompleted || isDoneToday
                            ? 'bg-green-50 text-green-600 cursor-default'
                            : lesson.progress && lesson.progress > 0
                            ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm'
                            : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                        }`}
                      >
                        {lesson.isCompleted || isDoneToday ? (
                          <><CheckCircle size={14} /> Готово</>
                        ) : lesson.progress && lesson.progress > 0 ? (
                          <><Play size={14} /> Продолжить</>
                        ) : (
                          <><Play size={14} /> Начать</>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Topics */}
                {!isLocked && (
                  <div className="flex gap-1.5 mt-3 pt-3 border-t border-gray-50">
                    {lesson.topics.map((t, i) => (
                      <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Goal */}
      {completedToday.size > 0 && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <Flame size={20} className="text-orange-300" />
          <div>
            <p className="text-sm font-bold">+XP заработано!</p>
            <p className="text-xs text-violet-200">Серия продолжается 🔥</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;
