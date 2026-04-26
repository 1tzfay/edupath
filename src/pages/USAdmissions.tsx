import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen, FileText, DollarSign, GraduationCap,
  Calendar, Star, TrendingUp, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle, Sparkles, ExternalLink, Clock
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const universities = [
  { name: 'MIT', emoji: '🔬', city: 'Boston, MA', acceptance: '4%', sat: '1510–1580', act: '34–36', aid: 'Need-blind', programs: ['Engineering', 'CS', 'Physics', 'Math'], color: 'bg-red-50 border-red-200', badge: 'bg-red-100 text-red-700', tip: 'MIT не требует конкретного эссе о MIT — пиши честно о своей научной страсти.' },
  { name: 'Harvard', emoji: '🏛️', city: 'Cambridge, MA', acceptance: '4%', sat: '1500–1580', act: '34–36', aid: 'Need-blind', programs: ['Economics', 'CS', 'Biology', 'Law'], color: 'bg-rose-50 border-rose-200', badge: 'bg-rose-100 text-rose-700', tip: 'Harvard не имеет специальности по умолчанию — можно изменить её на 1 курсе.' },
  { name: 'Stanford', emoji: '🌲', city: 'Palo Alto, CA', acceptance: '4%', sat: '1500–1570', act: '34–36', aid: 'Need-blind', programs: ['CS', 'Business', 'Engineering', 'Biology'], color: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-700', tip: 'Stanford ищет «интеллектуальную жизнестойкость» — покажи, как ты справляешься с неудачами.' },
  { name: 'Yale', emoji: '🎭', city: 'New Haven, CT', acceptance: '5%', sat: '1500–1570', act: '34–36', aid: 'Need-blind', programs: ['Law', 'Political Science', 'Arts', 'Biology'], color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700', tip: 'Yale уделяет огромное внимание community — расскажи, что ты даёшь другим.' },
  { name: 'Princeton', emoji: '🐯', city: 'Princeton, NJ', acceptance: '6%', sat: '1490–1570', act: '34–36', aid: 'Need-blind', programs: ['Engineering', 'Economics', 'Public Policy', 'Physics'], color: 'bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-700', tip: 'Princeton — единственная Лига Плюща без магистерских программ по многим специальностям.' },
  { name: 'Columbia', emoji: '🗽', city: 'New York, NY', acceptance: '7%', sat: '1490–1570', act: '34–36', aid: 'Need-blind', programs: ['Journalism', 'Business', 'Engineering', 'Arts'], color: 'bg-sky-50 border-sky-200', badge: 'bg-sky-100 text-sky-700', tip: 'Core Curriculum — все студенты читают одни великие книги. Упомяни конкретное произведение в эссе.' },
  { name: 'UPenn', emoji: '🏙️', city: 'Philadelphia, PA', acceptance: '8%', sat: '1470–1570', act: '33–35', aid: 'Need-blind', programs: ['Wharton Business', 'Engineering', 'Nursing', 'Law'], color: 'bg-indigo-50 border-indigo-200', badge: 'bg-indigo-100 text-indigo-700', tip: 'Wharton — лучшая бизнес-программа для undergrad. Если идёшь туда, пиши конкретно почему Wharton.' },
  { name: 'Cornell', emoji: '🌿', city: 'Ithaca, NY', acceptance: '11%', sat: '1400–1560', act: '33–35', aid: 'Need-blind', programs: ['Hotel', 'Agriculture', 'Engineering', 'CS'], color: 'bg-teal-50 border-teal-200', badge: 'bg-teal-100 text-teal-700', tip: 'Cornell — самый «доступный» Ivy. Каждая школа (Engineering, Arts, Business) принимает отдельно.' },
  { name: 'Carnegie Mellon', emoji: '🤖', city: 'Pittsburgh, PA', acceptance: '15%', sat: '1500–1570', act: '34–36', aid: 'Need-aware', programs: ['CS', 'Robotics', 'Drama', 'Architecture'], color: 'bg-purple-50 border-purple-200', badge: 'bg-purple-100 text-purple-700', tip: 'CS в CMU — одна из лучших в мире. Конкуренция огромная, нужна сильная математика.' },
  { name: 'UC Berkeley', emoji: '🐻', city: 'Berkeley, CA', acceptance: '14%', sat: '1310–1530', act: '28–35', aid: 'Need-based (из CA)', programs: ['Engineering', 'Business (Haas)', 'CS', 'Biology'], color: 'bg-yellow-50 border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', tip: 'Для международных студентов нет финансовой помощи. Зато это топ-3 публичный вуз мира.' },
  { name: 'NYU', emoji: '🏙️', city: 'New York, NY', acceptance: '21%', sat: '1350–1530', act: '31–35', aid: 'Need-aware', programs: ['Business (Stern)', 'Arts', 'Film', 'Law'], color: 'bg-violet-50 border-violet-200', badge: 'bg-violet-100 text-violet-700', tip: 'NYU Stern — топ для финансов. Есть кампусы в Абу-Даби и Шанхае с полными стипендиями.' },
  { name: 'University of Michigan', emoji: '💛', city: 'Ann Arbor, MI', acceptance: '20%', sat: '1360–1540', act: '33–35', aid: 'Ограниченная для международных', programs: ['Engineering', 'Business (Ross)', 'Medicine', 'Law'], color: 'bg-yellow-50 border-yellow-100', badge: 'bg-yellow-100 text-yellow-700', tip: 'Ross School of Business — одна из лучших undergrad business программ. Требует отдельного эссе.' },
];

const essayPrompts = [
  { number: 1, prompt: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it.', tip: 'Расскажи о чём-то уникальном для тебя — твой город, культура, редкое хобби. Не старайся казаться «универсальным».' },
  { number: 2, prompt: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure.', tip: 'Важен не масштаб неудачи, а то, что ты из неё вынес. Маленькая история с глубоким уроком — лучше, чем драматическая трагедия.' },
  { number: 3, prompt: 'Reflect on a time when you questioned or challenged a belief or idea.', tip: 'Покажи интеллектуальную смелость — не бойся написать о спорной позиции, если аргументируешь её честно.' },
  { number: 4, prompt: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way.', tip: 'Необычный выбор помогает выделиться. Это не должна быть очевидная история о родителях или учителях.' },
  { number: 5, prompt: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth.', tip: 'Избегай банальных спортивных историй о победе. Выбери момент, когда ты изменил не результат, а своё мышление.' },
  { number: 6, prompt: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time.', tip: 'Пиши о том, что тебя реально захватывает — admissions officers чувствуют искреннее увлечение.' },
  { number: 7, prompt: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.', tip: 'Самый свободный промпт. Подходит для нестандартных форматов — стихотворение, список, диалог.' },
];

const timeline = [
  { grade: '9–10 класс', color: 'bg-gray-100 text-gray-600 border-gray-200', items: [
    'Начни строить сильный GPA — оценки за все 4 года важны',
    'Участвуй в 2–3 экстракурикулярах и углубляйся в них',
    'Начни готовиться к SAT/ACT — хотя бы по 30 минут в неделю',
    'Проходи сложные курсы (AP, IB, A-Levels) — они показывают амбиции',
  ]},
  { grade: '11 класс (осень)', color: 'bg-blue-100 text-blue-700 border-blue-200', items: [
    'Сдай PSAT — шанс на National Merit Scholarship',
    'Начни серьёзную подготовку к SAT/ACT, сдай пробный экзамен',
    'Составь список вузов: 3–4 reach, 3–4 match, 2–3 safety',
    'Исследуй программы финансовой помощи каждого вуза',
    'Посети кампусы или виртуальные туры',
  ]},
  { grade: '11 класс (весна)', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', items: [
    'Сдай SAT/ACT весной — останется время на пересдачу',
    'Попроси рекомендательные письма у 2–3 учителей заблаговременно',
    'Начни набрасывать идеи для Common App essay',
    'Пройди AP экзамены — хороший балл зачтётся как кредит в вузе',
    'Займись значимым проектом летом (research, internship, стартап)',
  ]},
  { grade: '12 класс (август–октябрь)', color: 'bg-violet-100 text-violet-700 border-violet-200', items: [
    'Финализируй список вузов',
    'Напиши и отредактируй Common App essay (650 слов)',
    'Напиши supplemental essays для каждого вуза',
    'Подай заявки Early Decision / Early Action — дедлайн 1–15 ноября',
    'Попроси школу отправить транскрипты и рекомендации',
  ]},
  { grade: '12 класс (ноябрь–январь)', color: 'bg-purple-100 text-purple-700 border-purple-200', items: [
    'Дедлайн Regular Decision — 1 января (большинство вузов)',
    'Подай CSS Profile для финансовой помощи (если нужно)',
    'Узнай решение по ED/EA (декабрь)',
    'Если попал в ED — поздравляем, принимай оффер!',
    'Продолжай хорошо учиться — вузы проверяют финальные оценки',
  ]},
  { grade: '12 класс (февраль–май)', color: 'bg-green-100 text-green-700 border-green-200', items: [
    'Regular Decision результаты — конец марта/начало апреля',
    'Сравни финансовые офферы от разных вузов',
    'Дедлайн принятия решения — 1 мая (National Decision Day)',
    'Откажись от других предложений вежливо',
    'Заполни документы на визу F-1 (для международных студентов)',
  ]},
];

const financeSections = [
  { emoji: '💰', title: 'Стоимость обучения', content: [
    { label: 'Частные университеты (Ivy+)', value: '$60,000–$85,000/год', note: 'Tuition + room + board + fees' },
    { label: 'Государственные (для нерезидентов)', value: '$35,000–$55,000/год', note: 'UC Berkeley, Michigan и др.' },
    { label: 'Community College', value: '$4,000–$8,000/год', note: 'Перевод в топ вуз после 2 лет' },
  ]},
  { emoji: '🎓', title: 'Need-blind vs Need-aware', content: [
    { label: 'Need-blind', value: '~20 вузов', note: 'Решение о приёме не зависит от финансов. MIT, Harvard, Yale, Princeton, Amherst, Williams' },
    { label: 'Need-aware', value: 'Большинство', note: 'Финансовое положение может влиять на решение' },
    { label: 'Международные студенты', value: 'Особые правила', note: 'Только ~5 вузов need-blind для иностранцев: MIT, Harvard, Yale, Princeton, Dartmouth' },
  ]},
  { emoji: '🏆', title: 'Стипендии для международных', content: [
    { label: 'Merit Aid в Liberal Arts', value: 'До 100%', note: 'Amherst, Williams, Middlebury — дают щедрую помощь' },
    { label: 'NYU Abu Dhabi / Shanghai', value: 'Full Ride', note: 'Полная стипендия + проживание + перелёты' },
    { label: 'University of Rochester', value: '$15,000–$20,000/год', note: 'Renaissance Scholarship для международных' },
    { label: 'Fulbright (магистратура)', value: 'Полное финансирование', note: 'После бакалавра, подаётся через посольство США' },
  ]},
];

// ─── Component ─────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'timeline' | 'tests' | 'application' | 'essays' | 'finance' | 'universities';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview',     label: 'Обзор',        icon: <Star size={14} /> },
  { id: 'timeline',     label: 'Таймлайн',     icon: <Calendar size={14} /> },
  { id: 'tests',        label: 'Тесты',         icon: <TrendingUp size={14} /> },
  { id: 'application',  label: 'Common App',    icon: <FileText size={14} /> },
  { id: 'essays',       label: 'Эссе',          icon: <BookOpen size={14} /> },
  { id: 'finance',      label: 'Финансы',       icon: <DollarSign size={14} /> },
  { id: 'universities', label: 'Вузы',          icon: <GraduationCap size={14} /> },
];

const USAdmissions: React.FC = () => {
  useApp();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(null);
  const [expandedUni, setExpandedUni] = useState<string | null>(null);
  const [expandedFinance, setExpandedFinance] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-5">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-10 w-20 h-20 bg-white/5 rounded-full translate-y-8" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🇺🇸</span>
            <span className="text-xs text-blue-200 font-medium">Модуль поступления</span>
          </div>
          <h2 className="text-2xl font-black mb-1">Поступление в США</h2>
          <p className="text-blue-100 text-sm mb-4">Полный гайд: от выбора вузов до получения визы F-1</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Топ вузов', value: '12+' },
              { label: 'Ivy League', value: '8' },
              { label: 'Дедлайн ED', value: '1 нояб.' },
              { label: 'Дедлайн RD', value: '1 янв.' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-2.5 text-center">
                <p className="text-lg font-black leading-none">{s.value}</p>
                <p className="text-[10px] text-blue-200 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide bg-gray-100 rounded-xl p-1">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
              activeTab === t.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* ED/EA/RD cards */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Раунды подачи</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'ED', name: 'Early Decision', emoji: '🔒', color: 'bg-red-50 border-red-200 text-red-800',
                  badge: 'bg-red-100 text-red-700',
                  deadline: '1 ноября', result: 'Декабрь',
                  desc: 'Обязывающий раунд — если поступил, обязан идти. Повышает шансы на 10–15%.',
                  pros: ['Значительно повышает шансы', 'Ответ уже в декабре'],
                  cons: ['Нельзя сравнить финансовые офферы', 'Только 1 вуз'] },
                { id: 'EA', name: 'Early Action', emoji: '⚡', color: 'bg-orange-50 border-orange-200 text-orange-800',
                  badge: 'bg-orange-100 text-orange-700',
                  deadline: '1–15 ноября', result: 'Декабрь',
                  desc: 'Необязывающий. Можно подавать в несколько EA вузов одновременно.',
                  pros: ['Не обязывает принять оффер', 'Можно в несколько вузов'],
                  cons: ['Ниже буст, чем ED', 'Не всегда даёт больший финансовый оффер'] },
                { id: 'RD', name: 'Regular Decision', emoji: '📅', color: 'bg-blue-50 border-blue-200 text-blue-800',
                  badge: 'bg-blue-100 text-blue-700',
                  deadline: '1 января', result: 'Март–апрель',
                  desc: 'Стандартный раунд. Можно подавать в неограниченное количество вузов.',
                  pros: ['Время финализировать эссе', 'Сравниваешь все офферы'],
                  cons: ['Конкуренция выше', 'Ждать до апреля'] },
              ].map(round => (
                <div key={round.id} className={`rounded-2xl border p-4 ${round.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{round.emoji}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${round.badge}`}>{round.id}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{round.name}</h4>
                  <p className="text-xs opacity-80 mb-2 leading-relaxed">{round.desc}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span className="opacity-60">Дедлайн:</span><span className="font-semibold">{round.deadline}</span></div>
                    <div className="flex justify-between"><span className="opacity-60">Ответ:</span><span className="font-semibold">{round.result}</span></div>
                  </div>
                  <div className="mt-3 space-y-1">
                    {round.pros.map((p, i) => <div key={i} className="text-[10px] flex items-start gap-1"><span className="text-green-500 flex-shrink-0">+</span>{p}</div>)}
                    {round.cons.map((c, i) => <div key={i} className="text-[10px] flex items-start gap-1"><span className="text-red-400 flex-shrink-0">–</span>{c}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School list strategy */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">📋 Стратегия списка вузов</p>
            <div className="space-y-2.5">
              {[
                { label: 'Reach', emoji: '🚀', count: '3–4', desc: 'Вузы мечты. Шансы поступления <15%. Подавай с полной отдачей, но не делай ставку только на них.', color: 'bg-red-50 border-red-200 text-red-700' },
                { label: 'Match', emoji: '🎯', count: '3–4', desc: 'Вузы, куда твои показатели соответствуют среднему. Шансы 30–60%. Основа твоего списка.', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
                { label: 'Safety', emoji: '✅', count: '2–3', desc: 'Вузы, куда ты почти точно поступишь. Не значит «плохие» — это план Б, в который ты был бы рад пойти.', color: 'bg-green-50 border-green-200 text-green-700' },
              ].map((tier, i) => (
                <div key={i} className={`${tier.color} border rounded-xl p-3 flex items-start gap-3`}>
                  <span className="text-xl flex-shrink-0">{tier.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold">{tier.label}</span>
                      <span className="text-xs opacity-60">{tier.count} вуза</span>
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key facts */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-indigo-900 mb-2">💡 Важно знать</p>
            <div className="space-y-1.5">
              {[
                'Common App позволяет подать в 1000+ вузов одной заявкой',
                'Большинство топ-вузов test-optional — SAT не обязателен, но помогает',
                'Письменная работа (Common App Essay) — одна на все вузы',
                'Supplemental essays пишутся отдельно для каждого вуза',
                'Visa F-1 оформляется только после принятия оффера',
              ].map((fact, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-indigo-800">
                  <CheckCircle size={12} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                  {fact}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TIMELINE ── */}
      {activeTab === 'timeline' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-400">Пошаговый план от старшей школы до зачисления</p>
          {timeline.map((period, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${period.color}`}>{period.grade}</span>
              </div>
              <div className="p-4 space-y-2">
                {period.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-1.5" />
                    <span className="text-sm text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TESTS ── */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          {/* SAT vs ACT */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'SAT', emoji: '📐', color: 'bg-blue-50 border-blue-200', score: '400–1600', sections: ['Math (800)', 'Reading+Writing (800)'], time: '2 ч. 14 мин.', orgs: 'College Board',
                tips: ['Лучше для тех, кто силён в математике', 'Подготовка через Khan Academy (бесплатно)', 'Можно пересдавать — засчитывается лучший'], link: 'lessons' },
              { name: 'ACT', emoji: '📝', color: 'bg-green-50 border-green-200', score: '1–36', sections: ['English', 'Math', 'Reading', 'Science'], time: '2 ч. 55 мин.', orgs: 'ACT Inc.',
                tips: ['Лучше для тех, кто быстро читает', 'Включает раздел Science (не на SAT)', 'Superscoring: лучшие баллы из разных попыток'], link: 'lessons' },
            ].map((test, i) => (
              <div key={i} className={`${test.color} border rounded-2xl p-4`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{test.emoji}</span>
                  <div>
                    <h3 className="font-black text-gray-900">{test.name}</h3>
                    <p className="text-xs text-gray-500">{test.orgs}</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Баллы:</span><span className="font-bold">{test.score}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Время:</span><span className="font-bold">{test.time}</span></div>
                </div>
                <div className="mb-3">
                  <p className="text-[10px] text-gray-500 mb-1">Разделы:</p>
                  <div className="flex flex-wrap gap-1">
                    {test.sections.map((s, j) => <span key={j} className="text-[10px] bg-white px-2 py-0.5 rounded-full text-gray-600">{s}</span>)}
                  </div>
                </div>
                <div className="space-y-1">
                  {test.tips.map((tip, j) => <div key={j} className="text-[10px] text-gray-600 flex items-start gap-1"><span className="text-blue-400 flex-shrink-0">•</span>{tip}</div>)}
                </div>
              </div>
            ))}
          </div>

          {/* AP Exams */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎓</span>
              <div>
                <p className="text-sm font-bold text-gray-900">AP Exams (Advanced Placement)</p>
                <p className="text-xs text-gray-400">Экзамены уровня первого курса вуза — сдаются в мае</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { score: '5', meaning: 'Extremely well qualified — зачтут как кредит', color: 'bg-green-100 text-green-700' },
                { score: '4', meaning: 'Well qualified — большинство вузов зачтут', color: 'bg-blue-100 text-blue-700' },
                { score: '3', meaning: 'Qualified — некоторые вузы зачтут', color: 'bg-yellow-100 text-yellow-700' },
                { score: '1–2', meaning: 'Не зачтут, но сам факт сдачи AP виден в заявке', color: 'bg-gray-100 text-gray-500' },
              ].map((s, i) => (
                <div key={i} className={`${s.color} rounded-xl p-2.5`}>
                  <p className="font-black text-lg leading-none">{s.score}</p>
                  <p className="text-[10px] mt-0.5 leading-tight">{s.meaning}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
              <p className="text-xs font-semibold text-amber-800 mb-1">Рекомендуемые AP для международных студентов:</p>
              <div className="flex flex-wrap gap-1">
                {['Calculus BC', 'Physics C', 'Chemistry', 'Computer Science A', 'Statistics', 'English Language'].map((ap, i) => (
                  <span key={i} className="text-[10px] bg-white border border-amber-200 px-2 py-0.5 rounded-full text-amber-700">{ap}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Test-optional */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle size={16} className="text-violet-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-gray-900">Test-Optional вузы — стоит ли подавать SAT?</p>
            </div>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Большинство топ-вузов (Harvard, MIT, Yale, Stanford и др.) сейчас test-optional. Это значит, SAT <strong>не обязателен</strong>, но если у тебя высокий балл — лучше подать. Если балл ниже 25-й перцентили вуза — лучше не подавать.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-50 rounded-xl p-2.5 border border-green-100">
                <p className="font-semibold text-green-800 mb-1">✓ Подай SAT, если:</p>
                <div className="space-y-0.5 text-green-700">
                  <div>Балл выше 75-й перцентили вуза</div>
                  <div>Слабее в других аспектах заявки</div>
                  <div>Подаёшь в merit-aid вузы</div>
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-2.5 border border-red-100">
                <p className="font-semibold text-red-800 mb-1">✗ Не подавай SAT, если:</p>
                <div className="space-y-0.5 text-red-700">
                  <div>Балл ниже 25-й перцентили</div>
                  <div>Только одна попытка, нет времени пересдать</div>
                  <div>Сильное портфолио без теста</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COMMON APP ── */}
      {activeTab === 'application' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
            <div className="text-2xl flex-shrink-0">📋</div>
            <div>
              <p className="text-sm font-bold text-blue-900">Что такое Common App?</p>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                Единая онлайн-платформа для подачи в 1000+ вузов США. Ты заполняешь профиль один раз — анкету, эссе, активности — и рассылаешь в выбранные вузы. Некоторые вузы (MIT, Georgetown) используют собственные системы.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Разделы Common App</p>
            <div className="space-y-2">
              {[
                { title: 'Profile', emoji: '👤', desc: 'Личные данные, гражданство, школа. Заполняется один раз для всех вузов.', tip: null },
                { title: 'Activities (10 позиций)', emoji: '🏆', desc: 'Самый важный раздел после эссе. Каждая позиция: название, роль, описание (150 символов!), часов в неделю, недель в году.', tip: 'Ставь самую значимую активность на первое место. 150 символов — каждое слово на счету.' },
                { title: 'Honors (5 позиций)', emoji: '🥇', desc: 'Олимпиады, конкурсы, стипендии, именные награды. Только внешние награды, не школьные грамоты.', tip: 'Указывай уровень: National, International, State/Regional, School.' },
                { title: 'Common App Essay', emoji: '✍️', desc: '650 слов, один из 7 промптов. Эта же работа идёт во все вузы, куда ты подаёшь.', tip: 'Не перечитывай эссе тысячу раз — дай прочитать человеку, который тебя не знает.' },
                { title: 'Supplemental Essays', emoji: '📝', desc: 'Уникальные эссе для каждого вуза. От 100 до 650 слов. «Почему наш вуз?» — самый частый вопрос.', tip: 'Упоминай конкретные курсы, профессоров, программы — покажи, что ты изучил вуз.' },
                { title: 'School Report + Рекомендации', emoji: '✉️', desc: 'Counselor + 2 учителя заполняют формы напрямую в Common App. Ты только указываешь их email.', tip: 'Дай учителям бриф: почему этот вуз, твои цели, совместные достижения.' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl flex-shrink-0">{s.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
                      {s.tip && (
                        <div className="mt-2 flex items-start gap-1.5 bg-violet-50 rounded-lg px-2.5 py-1.5">
                          <Sparkles size={11} className="text-violet-500 flex-shrink-0 mt-0.5" />
                          <p className="text-[10px] text-violet-700">{s.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2">
            <Clock size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800"><span className="font-semibold">Common App открывается 1 августа.</span> Начни заполнять профиль и Activities Section сразу — это займёт несколько недель даже без эссе.</p>
          </div>
        </div>
      )}

      {/* ── ESSAYS ── */}
      {activeTab === 'essays' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-sm font-bold text-gray-900 mb-1">Common App Essay — 7 промптов</p>
            <p className="text-xs text-gray-400 mb-3">650 слов · Один текст для всех вузов · Выбери любой промпт</p>
            <div className="space-y-2">
              {essayPrompts.map(p => (
                <div key={p.number} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button onClick={() => setExpandedPrompt(expandedPrompt === p.number ? null : p.number)}
                    className="w-full flex items-start gap-3 p-3 text-left cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{p.number}</span>
                    <p className="text-xs text-gray-700 flex-1 leading-snug italic">«{p.prompt.slice(0, 90)}…»</p>
                    {expandedPrompt === p.number
                      ? <ChevronUp size={14} className="text-gray-400 flex-shrink-0" />
                      : <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />}
                  </button>
                  {expandedPrompt === p.number && (
                    <div className="px-4 pb-3 border-t border-gray-50 pt-2 space-y-2">
                      <p className="text-xs text-gray-600 italic leading-relaxed">«{p.prompt}»</p>
                      <div className="flex items-start gap-2 bg-violet-50 rounded-lg px-3 py-2">
                        <Sparkles size={12} className="text-violet-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-violet-700 leading-relaxed">{p.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Writing tips */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-sm font-bold text-gray-900 mb-3">Общие советы по написанию</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { emoji: '✅', text: 'Начинай с конкретной сцены, а не абстрактного утверждения' },
                { emoji: '✅', text: 'Пиши так, как говоришь — admissions officers чувствуют шаблон' },
                { emoji: '✅', text: 'Сосредоточься на одном моменте, а не всей жизни' },
                { emoji: '✅', text: 'Дай прочитать кому-то, кто не знает тебя хорошо' },
                { emoji: '❌', text: 'Не начинай с «My name is…» или «Since I was young…»' },
                { emoji: '❌', text: 'Не пересказывай резюме — для этого есть Activities Section' },
                { emoji: '❌', text: 'Не пиши о теме, которая кажется «правильной»' },
                { emoji: '❌', text: 'Не используй ChatGPT как автора — детектируют и отклоняют' },
              ].map((t, i) => (
                <div key={i} className={`rounded-xl p-2.5 text-xs leading-snug ${t.emoji === '✅' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {t.emoji} {t.text}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-900">Напиши эссе прямо сейчас</p>
              <p className="text-xs text-emerald-700 mt-0.5">ИИ-помощник платформы поможет со структурой</p>
            </div>
            <ExternalLink size={16} className="text-emerald-600 flex-shrink-0" />
          </div>
        </div>
      )}

      {/* ── FINANCE ── */}
      {activeTab === 'finance' && (
        <div className="space-y-4">
          {financeSections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button onClick={() => setExpandedFinance(expandedFinance === i ? null : i)}
                className="w-full flex items-center gap-3 p-4 cursor-pointer text-left hover:bg-gray-50 transition-colors">
                <span className="text-2xl">{section.emoji}</span>
                <p className="text-sm font-bold text-gray-900 flex-1">{section.title}</p>
                {expandedFinance === i ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
              </button>
              {expandedFinance === i && (
                <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-2.5">
                  {section.content.map((item, j) => (
                    <div key={j} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-800">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.note}</p>
                      </div>
                      <span className="text-sm font-black text-indigo-600 flex-shrink-0 whitespace-nowrap">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-4 text-white">
            <p className="text-sm font-bold mb-2">💡 Главный лайфхак по финансам</p>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Некоторые Liberal Arts Colleges (Amherst, Williams, Bowdoin, Vassar) дают <strong>более щедрую помощь</strong>, чем Ivy League, и при этом need-blind для международных. Не смотри только на Гарвард.
            </p>
          </div>
        </div>
      )}

      {/* ── UNIVERSITIES ── */}
      {activeTab === 'universities' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-400">Нажми на вуз — увидишь подробности и советы</p>
          {universities.map(uni => {
            const open = expandedUni === uni.name;
            return (
              <div key={uni.name} className={`bg-white rounded-2xl border transition-all ${open ? `${uni.color} border-2` : 'border-gray-100'}`}>
                <button onClick={() => setExpandedUni(open ? null : uni.name)}
                  className="w-full flex items-center gap-3 p-4 cursor-pointer text-left">
                  <span className="text-2xl flex-shrink-0">{uni.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{uni.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${uni.badge}`}>{uni.acceptance}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{uni.city} · SAT {uni.sat}</p>
                  </div>
                  {open ? <ChevronUp size={14} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />}
                </button>

                {open && (
                  <div className="px-4 pb-4 border-t border-current/10 pt-3 space-y-3">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { label: 'Принятых', value: uni.acceptance },
                        { label: 'SAT Med.', value: uni.sat.split('–')[0] + '+' },
                        { label: 'ACT Med.', value: uni.act.split('–')[0] + '+' },
                        { label: 'Помощь', value: uni.aid },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/60 rounded-xl p-2">
                          <p className="text-xs font-black text-gray-800 leading-tight">{stat.value}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-500 mb-1.5 font-semibold">Популярные программы:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {uni.programs.map((p, i) => (
                          <span key={i} className="text-[10px] bg-white px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 font-medium">{p}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                      <Sparkles size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 leading-relaxed">{uni.tip}</p>
                    </div>
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

export default USAdmissions;
