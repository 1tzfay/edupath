import React, { useState } from 'react';
import { useApp, careerConfig } from '../context/AppContext';
import type { CareerPath } from '../context/AppContext';
import { CheckCircle, Users, Zap, Lock, ChevronRight, Star, Trophy, BookOpen } from 'lucide-react';

// ─── Quiz ─────────────────────────────────────────────────────────────────────
interface QuizQuestion {
  text: string;
  emoji: string;
  options: { label: string; path: CareerPath }[];
}

const questions: QuizQuestion[] = [
  {
    text: 'Пятница вечер, ты свободен. Чем занимаешься?',
    emoji: '🌆',
    options: [
      { label: '💻 Изучаю новый язык программирования', path: 'it' },
      { label: '🔬 Читаю о последних открытиях в науке', path: 'science' },
      { label: '📊 Слушаю подкаст об инвестициях', path: 'business' },
      { label: '🎨 Рисую или создаю что-то новое', path: 'design' },
    ],
  },
  {
    text: 'В твоей школе объявили новый клуб. Ты запишешься в...',
    emoji: '📋',
    options: [
      { label: '🤖 Robotics & AI клуб', path: 'it' },
      { label: '🏥 Медицинский кружок', path: 'medicine' },
      { label: '⚖️ Дебатный клуб', path: 'law' },
      { label: '🔬 Научное общество', path: 'science' },
    ],
  },
  {
    text: 'Ты стал миллиардером. Куда вложишь деньги?',
    emoji: '💰',
    options: [
      { label: '🚀 В стартап, который изменит технологии', path: 'it' },
      { label: '💊 В разработку нового лекарства', path: 'medicine' },
      { label: '📈 В финансовые рынки', path: 'business' },
      { label: '🎬 В творческую студию', path: 'design' },
    ],
  },
  {
    text: 'Какой тип задачи тебе нравится решать?',
    emoji: '🧩',
    options: [
      { label: '🔢 Логические и математические', path: 'science' },
      { label: '👥 Задачи, связанные с людьми', path: 'law' },
      { label: '⚙️ Технические и системные', path: 'it' },
      { label: '🌿 Биологические и природные', path: 'medicine' },
    ],
  },
  {
    text: 'Твой любимый тип проектов в школе:',
    emoji: '📚',
    options: [
      { label: '💻 Создать сайт или приложение', path: 'it' },
      { label: '🧪 Провести научный опыт', path: 'science' },
      { label: '🎤 Выступить с презентацией-питчем', path: 'business' },
      { label: '✍️ Написать эссе или репортаж', path: 'law' },
    ],
  },
  {
    text: 'Какой фильм/сериал ты бы посмотрел с удовольствием?',
    emoji: '🎬',
    options: [
      { label: '🤖 «Мир Дикого Запада» — про ИИ', path: 'it' },
      { label: '🏥 «Доктор Хаус» — медицинская драма', path: 'medicine' },
      { label: '💼 «Форс-мажоры» — про юристов', path: 'law' },
      { label: '🌌 «Интерстеллар» — наука и космос', path: 'science' },
    ],
  },
];

// ─── Clubs ────────────────────────────────────────────────────────────────────
interface Club {
  id: string;
  name: string;
  emoji: string;
  path: CareerPath;
  members: number;
  description: string;
  activities: string[];
  xpBonus: number;
}

const clubs: Club[] = [
  {
    id: 'it-club',
    name: 'Будущие разработчики',
    emoji: '💻',
    path: 'it',
    members: 143,
    description: 'Хакатоны, код-ревью, совместные проекты. Учимся строить продукты с нуля.',
    activities: ['Еженедельный код-ревью', 'Командные хакатоны', 'Мастер-классы от разработчиков'],
    xpBonus: 50,
  },
  {
    id: 'medicine-club',
    name: 'Будущие врачи',
    emoji: '🏥',
    path: 'medicine',
    members: 97,
    description: 'Изучаем медицину, участвуем в научных конкурсах, разбираем кейсы.',
    activities: ['Разбор клинических кейсов', 'Олимпиады по биологии', 'Встречи с врачами'],
    xpBonus: 50,
  },
  {
    id: 'business-club',
    name: 'Молодые предприниматели',
    emoji: '💼',
    path: 'business',
    members: 118,
    description: 'Бизнес-кейсы, питчи идей, инвест-игры и деловые симуляции.',
    activities: ['Бизнес-кейс чемпионаты', 'Pitch-сессии', 'Инвест-симулятор'],
    xpBonus: 50,
  },
  {
    id: 'science-club',
    name: 'Исследователи',
    emoji: '🔬',
    path: 'science',
    members: 85,
    description: 'Проводим исследования, участвуем в Science Fair, публикуем работы.',
    activities: ['Совместные научные проекты', 'Google Science Fair', 'Научные дискуссии'],
    xpBonus: 50,
  },
  {
    id: 'design-club',
    name: 'Творческая мастерская',
    emoji: '🎨',
    path: 'design',
    members: 76,
    description: 'UI/UX, иллюстрация, бренд-дизайн. Создаём портфолио вместе.',
    activities: ['Дизайн-спринты', 'Портфолио-ревью', 'Проекты для НКО'],
    xpBonus: 50,
  },
  {
    id: 'law-club',
    name: 'Дебаты и право',
    emoji: '⚖️',
    path: 'law',
    members: 62,
    description: 'Дебаты, модель ООН, анализ права и международных отношений.',
    activities: ['Дебатные турниры', 'Модель ООН (MUN)', 'Правовые кейсы'],
    xpBonus: 50,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const CareerOrientation: React.FC = () => {
  const { state, setCareerPath, completeCareerTest } = useApp();
  const [tab, setTab] = useState<'test' | 'result' | 'clubs'>('test');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [testDone, setTestDone] = useState(state.career.testCompleted);

  const handleAnswer = (path: CareerPath) => {
    if (!path) return;
    const newScores = { ...scores, [path]: (scores[path] || 0) + 1 };
    setScores(newScores);
    if (currentQ < questions.length - 1) {
      setCurrentQ(p => p + 1);
    } else {
      // Calculate result
      const top = Object.entries(newScores).sort(([, a], [, b]) => b - a)[0][0] as CareerPath;
      setCareerPath(top);
      completeCareerTest();
      setTestDone(true);
      setTab('result');
    }
  };

  const resultPath = state.career.path;
  const resultConfig = resultPath ? careerConfig[resultPath] : null;

  const recommendedClubs = resultPath ? clubs.filter(c => c.path === resultPath) : [];
  const otherClubs = resultPath ? clubs.filter(c => c.path !== resultPath) : clubs;

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8 pointer-events-none" />
        <div className="relative">
          <p className="text-xs text-indigo-200 mb-1">🧭 Профориентация</p>
          <h2 className="text-xl font-black mb-1">Найди свой путь</h2>
          <p className="text-indigo-200 text-sm">
            {testDone && resultConfig
              ? `Твоё направление: ${resultConfig.emoji} ${resultConfig.label}`
              : 'Пройди тест — узнай свою сильную сторону и подходящие специальности'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        {([
          { id: 'test', label: '🧪 Тест' },
          { id: 'result', label: '🎯 Результат' },
          { id: 'clubs', label: '👥 Клубы' },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              tab === t.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TEST TAB ── */}
      {tab === 'test' && (
        <div>
          {!testDone ? (
            <div className="space-y-5">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Вопрос {currentQ + 1} из {questions.length}</span>
                  <span>{Math.round(((currentQ) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${(currentQ / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="text-3xl mb-3">{questions[currentQ].emoji}</div>
                <h3 className="text-base font-bold text-gray-900 mb-4">{questions[currentQ].text}</h3>
                <div className="space-y-2.5">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.path)}
                      className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 border border-transparent rounded-xl text-sm text-gray-700 font-medium transition-all cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-center text-gray-400">Нет правильных или неправильных ответов — просто выбери то, что ближе тебе</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Тест пройден!</h3>
              <p className="text-sm text-gray-500 mb-4">Твой результат уже сохранён</p>
              <button
                onClick={() => setTab('result')}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium cursor-pointer hover:bg-indigo-700"
              >
                Посмотреть результат →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── RESULT TAB ── */}
      {tab === 'result' && (
        <div className="space-y-4">
          {!testDone ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <Lock size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-700">Сначала пройди тест</p>
              <p className="text-sm text-gray-400 mt-1">Результат появится после завершения</p>
              <button onClick={() => setTab('test')} className="mt-4 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium cursor-pointer">
                Пройти тест
              </button>
            </div>
          ) : resultConfig && resultPath ? (
            <>
              {/* Main result card */}
              <div className={`${resultConfig.bg} ${resultConfig.border} border-2 rounded-2xl p-5`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{resultConfig.emoji}</div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Твоё направление</p>
                    <h3 className={`text-xl font-black ${resultConfig.color}`}>{resultConfig.label}</h3>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1.5">🎓 Подходящие специальности</p>
                    <div className="flex flex-wrap gap-1.5">
                      {resultConfig.programs.map((p, i) => (
                        <span key={i} className="text-xs bg-white/70 border border-current/20 px-2.5 py-1 rounded-full font-medium text-gray-700">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1.5">📚 Рекомендованные уроки</p>
                    <div className="flex flex-wrap gap-1.5">
                      {resultConfig.lessonCategories.map((l, i) => (
                        <span key={i} className="text-xs bg-white px-2.5 py-1 rounded-full border border-gray-200 text-gray-600">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* University recommendations */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">🏛️ Вузы для твоего пути</p>
                <div className="space-y-2.5">
                  {(resultPath === 'it' ? [
                    { name: 'Nazarbayev University', country: '🇰🇿', program: 'Computer Science', type: 'Топ в KZ' },
                    { name: 'TU Delft', country: '🇳🇱', program: 'Software Engineering', type: 'Топ в Европе' },
                    { name: 'ITMO University', country: '🇷🇺', program: 'Информатика', type: 'Топ в RU' },
                  ] : resultPath === 'medicine' ? [
                    { name: 'Kazakh NMU', country: '🇰🇿', program: 'Медицина (ЕНТ)', type: 'В Казахстане' },
                    { name: 'Jagiellonian University', country: '🇵🇱', program: 'Medicine (English)', type: 'В Европе' },
                    { name: 'Sechenov University', country: '🇷🇺', program: 'Лечебное дело', type: 'В России' },
                  ] : resultPath === 'business' ? [
                    { name: 'KIMEP University', country: '🇰🇿', program: 'Business Administration', type: 'В Казахстане' },
                    { name: 'Rotterdam School of Mgmt', country: '🇳🇱', program: 'Business', type: 'В Европе' },
                    { name: 'НИУ ВШЭ', country: '🇷🇺', program: 'Экономика', type: 'В России' },
                  ] : [
                    { name: 'Nazarbayev University', country: '🇰🇿', program: resultConfig.programs[0], type: 'В Казахстане' },
                    { name: 'University of Edinburgh', country: '🇬🇧', program: resultConfig.programs[1] || resultConfig.programs[0], type: 'В UK' },
                    { name: 'МГУ', country: '🇷🇺', program: resultConfig.programs[0], type: 'В России' },
                  ]).map((uni, i) => (
                    <div key={i} className="flex items-center gap-3 py-1">
                      <span className="text-xl">{uni.country}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{uni.name}</p>
                        <p className="text-xs text-gray-400">{uni.program}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{uni.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next steps */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                <p className="text-sm font-semibold text-indigo-900 mb-2">🚀 Следующие шаги</p>
                <div className="space-y-2">
                  {[
                    { icon: <BookOpen size={14} />, text: `Начни уроки по ${resultConfig.lessonCategories[0]}`, action: 'lessons' },
                    { icon: <Trophy size={14} />, text: 'Найди подходящие конкурсы', action: 'opportunities' },
                    { icon: <Users size={14} />, text: 'Вступи в клуб по направлению', action: 'clubs' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-indigo-700">
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span>{item.text}</span>
                      {item.action === 'clubs' && (
                        <button onClick={() => setTab('clubs')} className="ml-auto text-xs text-indigo-500 hover:text-indigo-700 cursor-pointer flex items-center gap-0.5">
                          Открыть <ChevronRight size={11} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* ── CLUBS TAB ── */}
      {tab === 'clubs' && (
        <div className="space-y-4">
          {recommendedClubs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star size={14} className="text-yellow-500 fill-yellow-400" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Рекомендовано для тебя</p>
              </div>
              {recommendedClubs.map(club => <ClubCard key={club.id} club={club} />)}
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Все клубы</p>
            {(recommendedClubs.length > 0 ? otherClubs : clubs).map(club => <ClubCard key={club.id} club={club} />)}
          </div>
        </div>
      )}
    </div>
  );
};

const ClubCard: React.FC<{ club: Club }> = ({ club }) => {
  const { state, joinClub, leaveClub } = useApp();
  const joined = state.career.joinedClubs.includes(club.id);

  return (
    <div className={`bg-white rounded-2xl border p-4 mb-3 transition-all ${joined ? 'border-indigo-200 shadow-sm' : 'border-gray-100'}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl">{club.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 text-sm">{club.name}</h4>
            {joined && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">Участник</span>}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Users size={11} className="text-gray-400" />
            <span className="text-xs text-gray-400">{club.members + (joined ? 1 : 0)} участников</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
            <Zap size={10} />
            <span>+{club.xpBonus} XP</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3">{club.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {club.activities.map((a, i) => (
          <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">{a}</span>
        ))}
      </div>

      <button
        onClick={() => joined ? leaveClub(club.id) : joinClub(club.id)}
        className={`w-full py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
          joined
            ? 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {joined ? 'Покинуть клуб' : 'Вступить в клуб'}
      </button>
    </div>
  );
};

export default CareerOrientation;
