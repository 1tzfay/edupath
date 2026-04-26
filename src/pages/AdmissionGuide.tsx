import React, { useState } from 'react';
import { useApp, careerConfig } from '../context/AppContext';
import {
  CheckCircle, Circle, ChevronDown, ChevronUp,
  Compass, BookOpen, Trophy, FileText, GraduationCap, Send, Sparkles, User,
  Map, Lightbulb
} from 'lucide-react';

// ─── 7-step journey data ──────────────────────────────────────────────────────
interface GuideStep {
  id: number; icon: React.ReactNode; emoji: string; title: string; subtitle: string;
  description: string; tasks: string[]; platformLink: string; platformLabel: string; ali: string;
}

const steps: GuideStep[] = [
  { id: 0, icon: <Compass size={20} />, emoji: '🧭', title: 'Познай себя', subtitle: 'Шаг 1',
    description: 'Прежде чем выбирать вуз — разберись, кто ты и куда хочешь двигаться. Пройди тест профориентации. Это займёт 5 минут и даст тебе чёткое направление.',
    tasks: ['Пройти тест профориентации', 'Определить 2-3 интересующих специальности', 'Вступить в тематический клуб'],
    platformLink: 'career', platformLabel: 'Пройти тест',
    ali: 'Али зашёл на EduPath в начале 10 класса, вообще не понимая, что его интересует. После теста оказалось — IT и разработка. «Я думал, что хочу стать врачом, как папа. Но тест показал, что мне реально интересны технологии».' },
  { id: 1, icon: <BookOpen size={20} />, emoji: '📋', title: 'Составь план', subtitle: 'Шаг 2',
    description: 'Определи целевые вузы и необходимые экзамены. Разные страны требуют разное: для Казахстана — ЕНТ, для Европы — IELTS + SAT, для России — ЕГЭ или вступительные. Начни с 3-5 вузов-целей.',
    tasks: ['Выбрать 3-5 целевых вузов', 'Узнать требования к поступлению', 'Составить дедлайны на год вперёд', 'Определить нужные экзамены'],
    platformLink: 'opportunities', platformLabel: 'Исследовать вузы',
    ali: 'Али хотел поехать в Европу. Погуглил и нашёл TU Delft — Технический университет Делфта в Нидерландах. Требования: IELTS 6.5+, хороший аттестат, мотивационное письмо. «У меня есть 2 года. Это реально».' },
  { id: 2, icon: <BookOpen size={20} />, emoji: '📚', title: 'Готовься к тестам', subtitle: 'Шаг 3',
    description: 'Регулярная подготовка важнее интенсивной зубрёжки за месяц. Занимайся по 30-60 минут в день — это 180+ часов за год. Используй уроки на платформе: SAT, IELTS, ЕНТ, NUET.',
    tasks: ['Начать уроки по IELTS или SAT', 'Сдать пробный тест', 'Заниматься минимум 5 раз в неделю'],
    platformLink: 'lessons', platformLabel: 'Открыть уроки',
    ali: 'Али начал с IELTS — каждый день по 45 минут. Через 6 месяцев сдал на 7.0. «Секрет простой: я не пропускал. Даже когда не хотел, открывал хотя бы один урок». Результат попал в портфолио автоматически.' },
  { id: 3, icon: <Trophy size={20} />, emoji: '🏆', title: 'Участвуй и побеждай', subtitle: 'Шаг 4',
    description: 'Приёмные комиссии смотрят не только на оценки, но и на активности вне школы. Хакатоны, олимпиады, исследования, волонтёрство — всё это делает твою заявку живой.',
    tasks: ['Участвовать в 1-2 конкурсах/хакатонах', 'Пройти научный проект или исследование', 'Добавить результаты в портфолио'],
    platformLink: 'opportunities', platformLabel: 'Найти конкурсы',
    ali: 'В 11 классе Али участвовал в двух хакатонах через EduPath. В одном занял второе место — сделал приложение для автоматизации домашней работы. «Именно этот проект я описал в мотивационном письме».' },
  { id: 4, icon: <FileText size={20} />, emoji: '✍️', title: 'Напиши заявку', subtitle: 'Шаг 5',
    description: 'Мотивационное письмо — твой голос. Это не пересказ резюме, а живая история о том, кто ты и почему хочешь учиться именно здесь. Используй ИИ-помощник для структуры, но пиши своими словами.',
    tasks: ['Написать черновик эссе', 'Попросить отзыв у учителя или ментора', 'Подготовить резюме', 'Оформить мотивационное письмо'],
    platformLink: 'essay', platformLabel: 'Написать эссе',
    ali: 'Али писал мотивационное письмо с помощью эссе-помощника. «Я ответил на вопросы — про Атырау, про нефть, про то, как я хочу создавать технологии для своего города. Получился настоящий рассказ, а не шаблон».' },
  { id: 5, icon: <GraduationCap size={20} />, emoji: '🎓', title: 'Финальный выбор', subtitle: 'Шаг 6',
    description: 'Сравни 3-5 вузов по: рейтингу, стоимости, городу, возможностям стипендии. Не гонись только за брендом — важно, где тебе будет комфортно и где лучшая программа.',
    tasks: ['Сравнить программы целевых вузов', 'Рассчитать финансы (стипендии, стоимость)', 'Проверить сроки подачи документов', 'Запросить рекомендательные письма'],
    platformLink: 'leaderboard', platformLabel: 'Кто куда поступил',
    ali: 'Али выбирал между KIMEP (Алматы) и TU Delft (Нидерланды). Выбрал Delft — там была лучшая программа и возможность получить Holland Scholarship.' },
  { id: 6, icon: <Send size={20} />, emoji: '🚀', title: 'Отправь заявку', subtitle: 'Шаг 7',
    description: 'Проверь все документы минимум дважды. Отправь заявку за 2-3 дня до дедлайна. Подтверди получение и жди ответа. Ты сделал всё возможное.',
    tasks: ['Финально проверить все документы', 'Отправить заявки во все выбранные вузы', 'Сохранить все подтверждения', 'Ожидать ответа (2-8 недель)'],
    platformLink: 'portfolio', platformLabel: 'Проверить портфолио',
    ali: 'В марте 12 класса Али отправил заявку в TU Delft. В мае получил письмо: «Congratulations! You have been admitted...». «Я прочитал три раза — не мог поверить. Из Атырау — в Нидерланды».' },
];

// ─── Country guides data ──────────────────────────────────────────────────────
interface CountryGuide {
  flag: string; country: string; color: string; bg: string; border: string;
  ielts: string; platform: string; deadline: string; scholarship: string;
  steps: string[]; tips: string[];
}

const countryGuides: CountryGuide[] = [
  { flag: '🇰🇿', country: 'Казахстан (NU / KIMEP / КазНУ)', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200',
    ielts: '6.0–7.0', platform: 'Сайт вуза / NU Admissions', deadline: 'Февраль–апрель',
    scholarship: 'Грант МОН РК (по ЕНТ), NU Scholarship 50–100%',
    steps: ['Сдай ЕНТ — 70+ для гранта МОН', 'Для NU: пройди NUET + IELTS 6.0+', 'Для KIMEP: SAT 1100+ или IELTS 6.0', 'Загрузи документы на сайт вуза', 'Дождись письма о поступлении'],
    tips: ['NU Scholarship покрывает до 100% обучения — стоит попробовать', 'NUET можно пересдать — готовься через раздел «Уроки»', 'Дедлайн NU — обычно февраль, не откладывай'] },
  { flag: '🇬🇧', country: 'Великобритания (через UCAS)', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200',
    ielts: '6.5–7.5', platform: 'ucas.com', deadline: '15 января (Oxbridge — октябрь)',
    scholarship: 'Chevening Scholarship, университетские стипендии',
    steps: ['Зарегистрируйся на ucas.com', 'Выбери до 5 вузов в одной заявке', 'Напиши один Personal Statement (4000 символов) для всех', 'Получи IELTS 6.5+', 'Дождись offers и выбери вуз'],
    tips: ['Один Personal Statement идёт во все 5 вузов — пиши универсально', 'Oxbridge требует отдельных тестов (MAT, STEP, BMAT)', 'Chevening — престижная стипендия, подаётся отдельно'] },
  { flag: '🇳🇱', country: 'Нидерланды', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200',
    ielts: '6.0–7.0', platform: 'Сайт вуза напрямую', deadline: 'Апрель–май (некоторые — январь)',
    scholarship: 'Holland Scholarship (5000€), Orange Tulip Scholarship',
    steps: ['Выбери программу на studyfinder.nl', 'Подай заявку напрямую на сайт вуза', 'Загрузи IELTS, аттестат, мотивационное письмо', 'Подай на Holland Scholarship отдельно', 'Получи Decision Letter и оформляй визу'],
    tips: ['Holland Scholarship — 5000€ для студентов из-за пределов ЕС', 'Медицина: numerus fixus — ограниченные места, часто лотерея', 'TU Delft и Eindhoven — топ для инженеров и IT'] },
  { flag: '🇩🇪', country: 'Германия', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200',
    ielts: '6.0 (или TestDaF B2)', platform: 'uni-assist.de или сайт вуза', deadline: 'Июль (зимний семестр)',
    scholarship: 'DAAD Scholarship, обучение бесплатно в государственных вузах',
    steps: ['Проверь требования через uni-assist.de', 'Подтверди языковой уровень (IELTS или TestDaF)', 'Загрузи документы через uni-assist', 'Подай на стипендию DAAD при желании', 'Дождись Zulassungsbescheid (письмо о зачислении)'],
    tips: ['Государственные вузы Германии — бесплатно! Только семестровый сбор ~300€', 'DAAD покрывает проживание и обучение', 'Немецкие программы на английском — не нужен немецкий'] },
  { flag: '🇷🇺', country: 'Россия', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200',
    ielts: 'Не обязателен', platform: 'rs.gov.ru (квоты) или сайт вуза', deadline: 'Март (квоты), Июль (общий)',
    scholarship: 'Квоты Россотрудничества — полностью бесплатно для граждан СНГ',
    steps: ['Зарегистрируйся на rs.gov.ru для получения квоты', 'Выбери до 6 вузов и программ', 'Пройди отбор (собеседование или тестирование)', 'Или подавай напрямую с ЕГЭ / внутренними экзаменами', 'Оформи студенческую визу'],
    tips: ['Квоты Россотрудничества — полностью бесплатное обучение', 'МГУ, МФТИ, ВШЭ принимают по внутренним вступительным', 'Срок подачи квот — февраль-март, не пропусти'] },
];

// ─── Topic guides ─────────────────────────────────────────────────────────────
interface TopicGuide {
  emoji: string; title: string; subtitle: string; color: string; bg: string;
  points: string[];
}

const topicGuides: TopicGuide[] = [
  { emoji: '✍️', title: 'Как написать мотивационное письмо', subtitle: 'Personal Statement / SOP',
    color: 'text-violet-700', bg: 'bg-violet-50',
    points: ['Начни с яркой истории или момента — избегай «С детства я мечтал...»',
      'Структура: крюк → твоя история → достижения → почему этот вуз → будущее',
      'Конкретика важнее красоты: «занял 2 место среди 200 участников» лучше, чем «я успешный»',
      'Покажи, что ты знаешь вуз: упомяни конкретных профессоров или программы',
      'Длина: 500-650 слов (Common App) или 4000 символов (UCAS)'] },
  { emoji: '💰', title: 'Как получить грант или стипендию', subtitle: 'Финансирование учёбы',
    color: 'text-green-700', bg: 'bg-green-50',
    points: ['Казахстан: МОН РК (по ЕНТ), Болашак (для магистратуры)',
      'UK: Chevening Scholarship — 1 год магистратуры полностью',
      'EU: Holland Scholarship (5000€), DAAD (Германия), Erasmus+',
      'Подавай везде параллельно — это не исключает друг друга',
      'Стипендии часто требуют отдельного эссе → начни заранее'] },
  { emoji: '✉️', title: 'Рекомендательные письма', subtitle: 'Как просить и что давать',
    color: 'text-blue-700', bg: 'bg-blue-50',
    points: ['Проси учителей за 2-3 месяца до дедлайна — не в последний момент',
      'Лучший рекомендатель: учитель профильного предмета + классный руководитель',
      'Дай им твоё CV, почему ты хочешь в этот вуз, примеры совместных достижений',
      'Напомни за 2 недели до дедлайна — вежливо и с благодарностью',
      'Для UK/US обычно нужно 2-3 письма, для Казахстана — 1'] },
  { emoji: '📅', title: 'Дедлайны: когда что делать', subtitle: 'Таймлайн на 2 года',
    color: 'text-orange-700', bg: 'bg-orange-50',
    points: ['10 класс (сейчас): профориентация, начало IELTS/SAT, первые конкурсы',
      'Лето перед 11 классом: сдать IELTS первый раз, летняя программа',
      '11 класс (сентябрь–октябрь): исследовать вузы, начать черновик эссе',
      '11 класс (ноябрь–январь): финальные эссе, заявки (UK дедлайн — 15 января!)',
      '11 класс (февраль–май): интервью, ожидание офферов, квоты РФ и KZ'] },
];

// ─── Main component ───────────────────────────────────────────────────────────
const AdmissionGuide: React.FC = () => {
  const { state } = useApp();
  const [mainTab, setMainTab] = useState<'journey' | 'countries' | 'tips'>('journey');
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [showAli, setShowAli] = useState<number | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<number | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  const careerPath = state.career.path;
  const cfg = careerPath ? careerConfig[careerPath] : null;

  const completedSteps = new Set<number>();
  if (state.onboarding.completed) completedSteps.add(0);
  if (state.onboarding.completed && state.career.path) completedSteps.add(1);
  if (state.user.completedLessons >= 5) completedSteps.add(2);
  if (state.user.achievements.filter(a => a.source === 'competition').length >= 1) completedSteps.add(3);
  if (state.career.essayWritten) completedSteps.add(4);
  const progressPct = Math.round((completedSteps.size / steps.length) * 100);

  const currentStep = (() => {
    for (let i = 0; i < steps.length; i++) if (!completedSteps.has(i)) return i;
    return steps.length - 1;
  })();

  return (
    <div className="p-6 space-y-5">

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -translate-y-5 translate-x-5 pointer-events-none" />
        <div className="relative">
          <p className="text-xs text-emerald-200 mb-1">🗺️ Полный гайд по поступлению</p>
          <h2 className="text-xl font-black mb-1">От «не знаю с чего начать» до «я поступил»</h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 max-w-xs h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-sm font-bold">{progressPct}%</span>
            <span className="text-xs text-emerald-200">{completedSteps.size} / {steps.length} шагов</span>
          </div>
        </div>
      </div>

      {/* Path badge */}
      {cfg && (
        <div className={`${cfg.bg} ${cfg.border} border rounded-xl px-4 py-2.5 flex items-center gap-2`}>
          <span className="text-lg">{cfg.emoji}</span>
          <p className={`text-sm font-medium ${cfg.color}`}>
            Адаптировано под твой путь: <span className="font-bold">{cfg.label}</span>
          </p>
        </div>
      )}

      {/* Main tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        {([
          { id: 'journey',   icon: <Map size={14} />,       label: 'Мой путь' },
          { id: 'countries', icon: <GraduationCap size={14} />, label: 'По странам' },
          { id: 'tips',      icon: <Lightbulb size={14} />, label: 'Советы' },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setMainTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              mainTab === t.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── JOURNEY TAB ── */}
      {mainTab === 'journey' && (
        <>
          {/* Ali intro */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">АС</div>
            <div>
              <p className="text-sm font-semibold text-amber-900">История Али из Атырау</p>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">Обычный школьник, который не знал о поступлении ничего. Через 2 года — студент TU Delft в Нидерландах. На каждом шаге — его реальная история.</p>
            </div>
          </div>

          <div className="space-y-2">
            {steps.map((step, i) => {
              const done = completedSteps.has(i);
              const active = i === currentStep;
              const locked = i > currentStep + 1;
              const expanded = expandedStep === i;

              return (
                <div key={step.id} className={`bg-white rounded-2xl border transition-all ${
                  active ? 'border-emerald-300 shadow-md shadow-emerald-50' :
                  done ? 'border-gray-100' : locked ? 'border-gray-100 opacity-60' : 'border-gray-100'
                }`}>
                  <button className="w-full flex items-center gap-3 p-4 cursor-pointer text-left"
                    onClick={() => !locked && setExpandedStep(expanded ? null : i)}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      done ? 'bg-green-100 text-green-600' :
                      active ? 'bg-emerald-600 text-white shadow-sm' :
                      locked ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {done ? <CheckCircle size={18} /> : locked ? <Lock size={16} /> : step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-bold ${done ? 'text-gray-400 line-through' : active ? 'text-emerald-700' : 'text-gray-900'}`}>
                          {step.emoji} {step.title}
                        </p>
                        {active && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">Текущий</span>}
                        {done && <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">✓ Готово</span>}
                      </div>
                      <p className="text-xs text-gray-400">{step.subtitle}</p>
                    </div>
                    {!locked && (expanded ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />)}
                  </button>

                  {expanded && !locked && (
                    <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                      <div className="space-y-1.5">
                        {step.tasks.map((task, j) => (
                          <div key={j} className="flex items-start gap-2">
                            {done ? <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" /> : <Circle size={14} className="text-gray-300 flex-shrink-0 mt-0.5" />}
                            <span className={`text-sm ${done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{task}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setShowAli(showAli === i ? null : i)}
                        className="w-full bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-left cursor-pointer hover:bg-amber-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <User size={12} className="text-amber-600" />
                          <span className="text-xs font-semibold text-amber-800">История Али на этом шаге</span>
                          <span className="ml-auto text-amber-400 text-xs">{showAli === i ? '▲' : '▼'}</span>
                        </div>
                        {showAli === i && <p className="text-xs text-amber-700 mt-2 leading-relaxed">{step.ali}</p>}
                      </button>
                      {!done && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles size={13} className="text-emerald-600" />
                            <span className="text-xs text-emerald-700 font-medium">Сделай на платформе</span>
                          </div>
                          <span className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-medium">
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
        </>
      )}

      {/* ── COUNTRIES TAB ── */}
      {mainTab === 'countries' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-400">Выбери страну — узнай как подавать, что нужно и где найти деньги</p>
          {countryGuides.map((g, i) => {
            const open = expandedCountry === i;
            return (
              <div key={i} className={`bg-white rounded-2xl border transition-all ${open ? `${g.border} border-2` : 'border-gray-100'}`}>
                <button onClick={() => setExpandedCountry(open ? null : i)}
                  className="w-full flex items-center gap-3 p-4 cursor-pointer text-left">
                  <span className="text-2xl flex-shrink-0">{g.flag}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{g.country}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] text-gray-400">IELTS {g.ielts}</span>
                      <span className="text-[10px] text-gray-400">Дедлайн: {g.deadline}</span>
                    </div>
                  </div>
                  {open ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />}
                </button>

                {open && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-50 pt-3">
                    {/* Key stats */}
                    <div className={`${g.bg} ${g.border} border rounded-xl p-3 grid grid-cols-3 gap-3 text-center`}>
                      <div>
                        <p className={`text-sm font-black ${g.color}`}>{g.ielts}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">IELTS</p>
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${g.color} leading-tight`}>{g.deadline}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Дедлайн</p>
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${g.color} leading-tight`}>{g.platform}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Платформа</p>
                      </div>
                    </div>

                    {/* Scholarship */}
                    <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
                      <span className="text-base flex-shrink-0">💰</span>
                      <div>
                        <p className="text-xs font-semibold text-green-800">Стипендии</p>
                        <p className="text-xs text-green-700 mt-0.5">{g.scholarship}</p>
                      </div>
                    </div>

                    {/* Steps */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">Как подавать — шаг за шагом:</p>
                      <div className="space-y-1.5">
                        {g.steps.map((s, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <span className={`w-5 h-5 ${g.bg} ${g.color} rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>{j + 1}</span>
                            <span className="text-sm text-gray-700">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">💡 Важно знать:</p>
                      <div className="space-y-1">
                        {g.tips.map((tip, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-gray-300 flex-shrink-0 mt-0.5">•</span>{tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── TIPS TAB ── */}
      {mainTab === 'tips' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-400">Практические советы по ключевым этапам поступления</p>
          {topicGuides.map((g, i) => {
            const open = expandedTopic === i;
            return (
              <div key={i} className={`bg-white rounded-2xl border transition-all ${open ? 'border-violet-200 shadow-sm' : 'border-gray-100'}`}>
                <button onClick={() => setExpandedTopic(open ? null : i)}
                  className="w-full flex items-center gap-3 p-4 cursor-pointer text-left">
                  <div className={`w-10 h-10 ${g.bg} rounded-xl flex items-center justify-center flex-shrink-0 text-xl`}>{g.emoji}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{g.title}</p>
                    <p className="text-xs text-gray-400">{g.subtitle}</p>
                  </div>
                  {open ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />}
                </button>
                {open && (
                  <div className="px-4 pb-4 space-y-2 border-t border-gray-50 pt-3">
                    {g.points.map((pt, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <span className={`w-5 h-5 ${g.bg} ${g.color} rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>{j + 1}</span>
                        <span className="text-sm text-gray-700 leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

// Helper for Lock icon (not in lucide-react default import)
const Lock: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default AdmissionGuide;
