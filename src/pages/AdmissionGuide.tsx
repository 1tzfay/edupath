import React, { useState } from 'react';
import { useApp, careerConfig } from '../context/AppContext';
import {
  CheckCircle, Circle, Lock, ChevronDown, ChevronUp,
  Compass, BookOpen, Trophy, FileText, GraduationCap, Send, Sparkles, User
} from 'lucide-react';

interface GuideStep {
  id: number;
  icon: React.ReactNode;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  tasks: string[];
  platformLink: string;
  platformLabel: string;
  ali: string;
}

const steps: GuideStep[] = [
  {
    id: 0,
    icon: <Compass size={20} />,
    emoji: '🧭',
    title: 'Познай себя',
    subtitle: 'Шаг 1',
    description: 'Прежде чем выбирать вуз — разберись, кто ты и куда хочешь двигаться. Пройди тест профориентации. Это займёт 5 минут и даст тебе чёткое направление.',
    tasks: ['Пройти тест профориентации', 'Определить 2-3 интересующих специальности', 'Вступить в тематический клуб'],
    platformLink: 'career',
    platformLabel: 'Пройти тест',
    ali: 'Али зашёл на EduPath в начале 10 класса, вообще не понимая, что его интересует. После теста оказалось — IT и разработка. «Я думал, что хочу стать врачом, как папа. Но тест показал, что мне реально интересны технологии», — говорит он.',
  },
  {
    id: 1,
    icon: <BookOpen size={20} />,
    emoji: '📋',
    title: 'Составь план',
    subtitle: 'Шаг 2',
    description: 'Определи целевые вузы и необходимые экзамены. Разные страны требуют разное: для Казахстана — ЕНТ, для Европы — IELTS + SAT, для России — ЕГЭ или вступительные. Начни с 3-5 вузов-целей.',
    tasks: ['Выбрать 3-5 целевых вузов', 'Узнать требования к поступлению', 'Составить дедлайны на год вперёд', 'Определить нужные экзамены (SAT / IELTS / ЕНТ / NUET)'],
    platformLink: 'opportunities',
    platformLabel: 'Исследовать вузы',
    ali: 'Али хотел поехать в Европу. Погуглил и нашёл TU Delft — Технический университет Делфта в Нидерландах. Требования: IELTS 6.5+, хороший аттестат, мотивационное письмо. «Я записал это в блокнот и понял: у меня есть 2 года. Это реально», — вспоминает Али.',
  },
  {
    id: 2,
    icon: <BookOpen size={20} />,
    emoji: '📚',
    title: 'Готовься к тестам',
    subtitle: 'Шаг 3',
    description: 'Регулярная подготовка важнее интенсивной зубрёжки за месяц. Занимайся по 30-60 минут в день — это 180+ часов за год. Используй уроки на платформе: SAT, IELTS, ЕНТ, NUET.',
    tasks: ['Начать уроки по IELTS или SAT', 'Сдать пробный тест', 'Заниматься минимум 5 раз в неделю', 'Отслеживать прогресс в портфолио'],
    platformLink: 'lessons',
    platformLabel: 'Открыть уроки',
    ali: 'Али начал с IELTS — каждый день по 45 минут. Через 6 месяцев сдал на 7.0. «Секрет простой: я не пропускал. Даже когда не хотел, открывал хотя бы один урок», — объясняет он. Его результат попал в портфолио автоматически.',
  },
  {
    id: 3,
    icon: <Trophy size={20} />,
    emoji: '🏆',
    title: 'Участвуй и побеждай',
    subtitle: 'Шаг 4',
    description: 'Приёмные комиссии смотрят не только на оценки, но и на активности вне школы. Хакатоны, олимпиады, исследования, волонтёрство — всё это делает твою заявку живой и запоминающейся.',
    tasks: ['Участвовать в 1-2 конкурсах/хакатонах', 'Пройти научный проект или исследование', 'Добавить результаты в портфолио'],
    platformLink: 'opportunities',
    platformLabel: 'Найти конкурсы',
    ali: 'В 11 классе Али участвовал в двух хакатонах через EduPath. В одном занял второе место — сделал приложение для автоматизации домашней работы. «Именно этот проект я описал в мотивационном письме. Приёмная комиссия его выделила».',
  },
  {
    id: 4,
    icon: <FileText size={20} />,
    emoji: '✍️',
    title: 'Напиши заявку',
    subtitle: 'Шаг 5',
    description: 'Мотивационное письмо — твой голос. Это не пересказ резюме, а живая история о том, кто ты и почему хочешь учиться именно здесь. Используй ИИ-помощник для структуры, но пиши своими словами.',
    tasks: ['Написать черновик эссе', 'Попросить отзыв у учителя или ментора', 'Подготовить резюме', 'Оформить мотивационное письмо'],
    platformLink: 'essay',
    platformLabel: 'Написать эссе',
    ali: 'Али писал мотивационное письмо с помощью эссе-помощника на платформе. «Я ответил на вопросы — про Атырау, про нефть, про то, как я хочу создавать технологии для своего города. Получился настоящий рассказ, а не шаблон».',
  },
  {
    id: 5,
    icon: <GraduationCap size={20} />,
    emoji: '🎓',
    title: 'Финальный выбор',
    subtitle: 'Шаг 6',
    description: 'Сравни 3-5 вузов по: рейтингу, стоимости, городу, возможностям стипендии. Не гонись только за брендом — важно, где тебе будет комфортно и где лучшая программа по твоей специальности.',
    tasks: ['Сравнить программы целевых вузов', 'Рассчитать финансы (стипендии, стоимость)', 'Проверить сроки подачи документов', 'Запросить рекомендательные письма у учителей'],
    platformLink: 'leaderboard',
    platformLabel: 'Кто куда поступил',
    ali: 'Али выбирал между KIMEP (Алматы) и TU Delft (Нидерланды). Выбрал Delft — там была лучшая программа по Software Engineering и возможность получить стипендию Holland Scholarship.',
  },
  {
    id: 6,
    icon: <Send size={20} />,
    emoji: '🚀',
    title: 'Отправь заявку',
    subtitle: 'Шаг 7',
    description: 'Проверь все документы минимум дважды. Отправь заявку за 2-3 дня до дедлайна — не в последний момент. Подтверди получение и жди ответа. Ты сделал всё возможное.',
    tasks: ['Финально проверить все документы', 'Отправить заявки во все выбранные вузы', 'Сохранить все подтверждения', 'Ожидать ответа (обычно 2-8 недель)'],
    platformLink: 'portfolio',
    platformLabel: 'Проверить портфолио',
    ali: 'В марте 12 класса Али отправил заявку в TU Delft. В мае получил письмо: «Congratulations! You have been admitted...». «Я прочитал три раза — не мог поверить. Из Атырау — в Нидерланды. Это реально».',
  },
];

const AdmissionGuide: React.FC = () => {
  const { state } = useApp();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [showAli, setShowAli] = useState<number | null>(null);

  const careerPath = state.career.path;
  const cfg = careerPath ? careerConfig[careerPath] : null;

  // Derive completed steps from actual user progress
  const completedSteps = new Set<number>();
  if (state.onboarding.completed) completedSteps.add(0);
  if (state.onboarding.completed && state.career.path) completedSteps.add(1);
  if (state.user.completedLessons >= 5) completedSteps.add(2);
  if (state.user.achievements.filter(a => a.source === 'competition').length >= 1) completedSteps.add(3);
  if (state.career.essayWritten) completedSteps.add(4);

  const currentStep = (() => {
    for (let i = 0; i < steps.length; i++) {
      if (!completedSteps.has(i)) return i;
    }
    return steps.length - 1;
  })();

  const progressPct = Math.round((completedSteps.size / steps.length) * 100);

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6 pointer-events-none" />
        <div className="relative">
          <p className="text-xs text-emerald-200 mb-1">🗺️ Полный гайд по поступлению</p>
          <h2 className="text-xl font-black mb-1">От «не знаю с чего начать» до «я поступил»</h2>
          <p className="text-emerald-100 text-sm mb-3">7 шагов · Простой язык · Реальные истории</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-sm font-bold">{progressPct}%</span>
          </div>
          <p className="text-xs text-emerald-200 mt-1">{completedSteps.size} из {steps.length} шагов выполнено</p>
        </div>
      </div>

      {/* Path banner */}
      {cfg && (
        <div className={`${cfg.bg} ${cfg.border} border rounded-xl px-4 py-2.5 flex items-center gap-3`}>
          <span className="text-xl">{cfg.emoji}</span>
          <p className={`text-sm font-medium ${cfg.color}`}>
            Гайд адаптирован под твой путь: <span className="font-bold">{cfg.label}</span>
          </p>
        </div>
      )}

      {/* Ali intro */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            АС
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-900">История Али из Атырау</p>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Обычный школьник из нефтяного города, который не знал о поступлении ничего. Через 2 года — студент TU Delft в Нидерландах. На каждом шаге гайда — его реальная история.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2.5">
        {steps.map((step, i) => {
          const done = completedSteps.has(i);
          const active = i === currentStep;
          const locked = i > currentStep + 1;
          const expanded = expandedStep === i;

          return (
            <div
              key={step.id}
              className={`bg-white rounded-2xl border transition-all ${
                active ? 'border-emerald-300 shadow-md shadow-emerald-50' :
                done ? 'border-gray-100' :
                locked ? 'border-gray-100 opacity-60' :
                'border-gray-100'
              }`}
            >
              {/* Step header */}
              <button
                className="w-full flex items-center gap-3 p-4 cursor-pointer text-left"
                onClick={() => !locked && setExpandedStep(expanded ? null : i)}
              >
                {/* Status icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  done ? 'bg-green-100 text-green-600' :
                  active ? 'bg-emerald-600 text-white shadow-sm' :
                  locked ? 'bg-gray-100 text-gray-400' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  {done ? <CheckCircle size={20} /> : locked ? <Lock size={18} /> : step.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-bold ${done ? 'text-gray-400 line-through' : active ? 'text-emerald-700' : 'text-gray-900'}`}>
                      {step.emoji} {step.title}
                    </p>
                    {active && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">Текущий</span>}
                    {done && <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">✓ Готово</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{step.subtitle}</p>
                </div>

                {!locked && (
                  expanded ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
                )}
              </button>

              {/* Expanded content */}
              {expanded && !locked && (
                <div className="px-4 pb-4 space-y-4 border-t border-gray-50 pt-3">
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>

                  {/* Tasks checklist */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Что сделать:</p>
                    <div className="space-y-1.5">
                      {step.tasks.map((task, j) => (
                        <div key={j} className="flex items-start gap-2">
                          {done ? (
                            <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle size={15} className="text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ali's story */}
                  <button
                    onClick={() => setShowAli(showAli === i ? null : i)}
                    className="w-full bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-left cursor-pointer hover:bg-amber-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <User size={13} className="text-amber-600" />
                      <span className="text-xs font-semibold text-amber-800">История Али на этом шаге</span>
                      <span className="ml-auto text-amber-400">{showAli === i ? '▲' : '▼'}</span>
                    </div>
                    {showAli === i && (
                      <p className="text-xs text-amber-700 mt-2 leading-relaxed">{step.ali}</p>
                    )}
                  </button>

                  {/* Platform action button */}
                  {!done && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-600" />
                        <span className="text-sm text-emerald-700 font-medium">Сделай это на платформе</span>
                      </div>
                      <span className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer hover:bg-emerald-700 transition-colors">
                        {step.platformLabel} →
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Finish celebration */}
      {completedSteps.size === steps.length && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-5 text-white text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="font-black text-lg">Ты прошёл весь путь!</h3>
          <p className="text-yellow-100 text-sm mt-1">Как Али из Атырау — от нуля до поступления</p>
        </div>
      )}
    </div>
  );
};

export default AdmissionGuide;
