import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { CareerPath } from '../context/AppContext';
import { ChevronRight, ChevronLeft, Sparkles, MapPin, Star } from 'lucide-react';

const interestOptions = [
  { id: 'tech', emoji: '💻', label: 'Программирование и IT', path: 'it' as CareerPath },
  { id: 'medicine', emoji: '🏥', label: 'Медицина и здоровье', path: 'medicine' as CareerPath },
  { id: 'business', emoji: '💼', label: 'Бизнес и финансы', path: 'business' as CareerPath },
  { id: 'science', emoji: '🔬', label: 'Наука и исследования', path: 'science' as CareerPath },
  { id: 'design', emoji: '🎨', label: 'Дизайн и творчество', path: 'design' as CareerPath },
  { id: 'law', emoji: '⚖️', label: 'Право и общество', path: 'law' as CareerPath },
  { id: 'math', emoji: '📐', label: 'Математика и физика', path: 'science' as CareerPath },
  { id: 'languages', emoji: '🌐', label: 'Языки и культуры', path: 'law' as CareerPath },
];

const destinationOptions = [
  { id: 'kz', emoji: '🇰🇿', label: 'Казахстан', sub: 'NU, KIMEP, КазНУ' },
  { id: 'eu', emoji: '🇪🇺', label: 'Европа', sub: 'Нидерланды, Германия, Чехия' },
  { id: 'uk', emoji: '🇬🇧', label: 'Великобритания', sub: 'Edinburgh, Manchester' },
  { id: 'ru', emoji: '🇷🇺', label: 'Россия', sub: 'МГУ, МФТИ, Питер' },
  { id: 'any', emoji: '🌍', label: 'Пока не знаю', sub: 'Помогите мне разобраться' },
];

const Onboarding: React.FC = () => {
  const { state, completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [city, setCity] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [destination, setDestination] = useState('');

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const derivedPath: CareerPath = (() => {
    if (!selectedInterests.length) return null;
    const first = interestOptions.find(o => o.id === selectedInterests[0]);
    return first?.path ?? null;
  })();

  const handleFinish = () => {
    completeOnboarding({
      city,
      interests: selectedInterests,
      dreamDestination: destination,
      careerPath: derivedPath,
    });
  };

  const steps = [
    // Step 0: Welcome
    <div className="text-center space-y-6">
      <div className="text-6xl animate-bounce">👋</div>
      <div>
        <h2 className="text-2xl font-black text-gray-900">Привет, {state.user.name.split(' ')[0]}!</h2>
        <p className="text-gray-500 mt-2 text-base leading-relaxed">
          Добро пожаловать в EduPath — твой личный помощник на пути к мечте.<br />
          Ответь на пару вопросов, и мы составим твой персональный план.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        {[
          { emoji: '🎯', text: 'Персональный план поступления' },
          { emoji: '📚', text: 'Подборка уроков под тебя' },
          { emoji: '🏆', text: 'Конкурсы по интересам' },
        ].map((item, i) => (
          <div key={i} className="bg-violet-50 rounded-2xl p-3 text-center border border-violet-100">
            <div className="text-2xl mb-1">{item.emoji}</div>
            <p className="text-xs text-gray-600 leading-tight">{item.text}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400">Займёт ~2 минуты · Можно изменить позже</p>
    </div>,

    // Step 1: City
    <div className="space-y-5">
      <div className="text-center">
        <div className="text-4xl mb-3">📍</div>
        <h2 className="text-xl font-black text-gray-900">Из какого ты города?</h2>
        <p className="text-sm text-gray-400 mt-1">Поможем найти возможности рядом с тобой</p>
      </div>
      <div className="relative">
        <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Например: Алматы, Нур-Султан, Атырау..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {['Алматы', 'Нур-Султан', 'Шымкент', 'Атырау', 'Актобе', 'Павлодар'].map(c => (
          <button key={c} onClick={() => setCity(c)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-all cursor-pointer ${city === c ? 'bg-violet-600 text-white border-violet-600' : 'border-gray-200 text-gray-600 hover:border-violet-300'}`}>
            {c}
          </button>
        ))}
      </div>
    </div>,

    // Step 2: Interests
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2">🧭</div>
        <h2 className="text-xl font-black text-gray-900">Что тебя больше всего интересует?</h2>
        <p className="text-sm text-gray-400 mt-1">Выбери до 3 тем — это поможет найти твой путь</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {interestOptions.map(opt => {
          const selected = selectedInterests.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggleInterest(opt.id)}
              className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                selected ? 'border-violet-500 bg-violet-50' : 'border-gray-100 bg-white hover:border-violet-200'
              }`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className={`text-sm font-medium leading-tight ${selected ? 'text-violet-700' : 'text-gray-700'}`}>
                {opt.label}
              </span>
              {selected && <span className="ml-auto w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-center text-gray-400">{selectedInterests.length}/3 выбрано</p>
    </div>,

    // Step 3: Destination
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2">🌍</div>
        <h2 className="text-xl font-black text-gray-900">Куда мечтаешь поступить?</h2>
        <p className="text-sm text-gray-400 mt-1">Подберём подходящие вузы и стратегию</p>
      </div>
      <div className="space-y-2">
        {destinationOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => setDestination(opt.id)}
            className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
              destination === opt.id ? 'border-violet-500 bg-violet-50' : 'border-gray-100 bg-white hover:border-violet-200'
            }`}
          >
            <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
            <div className="flex-1">
              <p className={`font-semibold text-sm ${destination === opt.id ? 'text-violet-700' : 'text-gray-800'}`}>{opt.label}</p>
              <p className="text-xs text-gray-400">{opt.sub}</p>
            </div>
            {destination === opt.id && <span className="w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>}
          </button>
        ))}
      </div>
    </div>,

    // Step 4: Result
    <div className="text-center space-y-5">
      <div className="text-5xl">🎉</div>
      <div>
        <h2 className="text-2xl font-black text-gray-900">Твой путь готов!</h2>
        <p className="text-gray-500 mt-1 text-sm">На основе твоих ответов мы подобрали план</p>
      </div>
      {derivedPath && (
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-5 text-white text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{
              { it: '💻', medicine: '🏥', business: '💼', science: '🔬', design: '🎨', law: '⚖️' }[derivedPath]
            }</span>
            <div>
              <p className="text-xs text-violet-200">Твоё направление</p>
              <p className="text-lg font-black">
                {{ it: 'IT и Технологии', medicine: 'Медицина', business: 'Бизнес', science: 'Наука', design: 'Дизайн', law: 'Право' }[derivedPath]}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { icon: '📚', label: 'Уроки под тебя' },
              { icon: '🏆', label: 'Конкурсы по пути' },
              { icon: '🎓', label: 'Вузы-цели' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-2">
                <div className="text-lg">{item.icon}</div>
                <p className="text-[11px] text-violet-200 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {city && (
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 justify-center">
          <MapPin size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">Ты из <span className="font-semibold text-gray-800">{city}</span> — найдём возможности рядом</span>
        </div>
      )}
      <div className="flex items-center gap-2 bg-yellow-50 rounded-xl px-4 py-2.5">
        <Star size={14} className="text-yellow-500 fill-yellow-400" />
        <span className="text-sm text-gray-600">+100 XP за прохождение анкеты!</span>
      </div>
    </div>,
  ];

  const canNext = [
    true,
    city.trim().length > 0,
    selectedInterests.length > 0,
    destination.length > 0,
    true,
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="p-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'bg-violet-500' : 'bg-gray-200'} ${i === step ? 'w-6' : 'w-1.5'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-400">{step + 1} / {steps.length}</span>
          </div>

          {/* Content */}
          <div className="min-h-64">
            {steps[step]}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(p => p - 1)}
                className="w-10 h-11 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 cursor-pointer transition-colors flex-shrink-0"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <button
              onClick={() => step < steps.length - 1 ? setStep(p => p + 1) : handleFinish()}
              disabled={!canNext[step]}
              className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            >
              {step === steps.length - 1 ? (
                <><Sparkles size={16} /> Начать мой путь</>
              ) : (
                <>Далее <ChevronRight size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
