import React, { useState } from 'react';
import { FileText, ChevronRight, ChevronLeft, Sparkles, Copy, RefreshCw, Check } from 'lucide-react';

type EssayType = 'motivation' | 'personal' | 'research' | 'scholarship';

interface EssayTypeConfig {
  id: EssayType;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const essayTypes: EssayTypeConfig[] = [
  { id: 'motivation', title: 'Мотивационное письмо', description: 'Для поступления в вуз или программу', icon: '🎓', color: 'bg-violet-50 border-violet-200' },
  { id: 'personal', title: 'Личное эссе', description: 'Common App / QuestBridge стиль', icon: '✍️', color: 'bg-blue-50 border-blue-200' },
  { id: 'research', title: 'Исследовательское эссе', description: 'Для научных конкурсов', icon: '🔬', color: 'bg-teal-50 border-teal-200' },
  { id: 'scholarship', title: 'Стипендиальное эссе', description: 'Для грантов и стипендий', icon: '💡', color: 'bg-yellow-50 border-yellow-200' },
];

interface Question {
  id: string;
  question: string;
  hint: string;
  answer: string;
}

const questionSets: Record<EssayType, Question[]> = {
  motivation: [
    { id: 'name', question: 'Как тебя зовут и в какой класс ты ходишь?', hint: 'Пример: Меня зовут Алишер, я учусь в 11 классе', answer: '' },
    { id: 'university', question: 'В какой вуз или программу ты подаёшь заявку?', hint: 'Назарбаев Университет, программа Computer Science', answer: '' },
    { id: 'why', question: 'Почему ты хочешь поступить именно в этот вуз?', hint: 'Что тебя привлекает: программа, профессора, среда?', answer: '' },
    { id: 'passion', question: 'Что тебя больше всего вдохновляет в твоей области?', hint: 'Какой момент или событие зажгло в тебе интерес?', answer: '' },
    { id: 'achievements', question: 'Назови 2-3 своих главных достижения', hint: 'Олимпиады, хакатоны, проекты, исследования', answer: '' },
    { id: 'skills', question: 'Какие навыки ты развил и как они связаны с целью?', hint: 'Программирование, лидерство, аналитика...', answer: '' },
    { id: 'future', question: 'Чего ты хочешь достичь через 10 лет?', hint: 'Твоя глобальная цель или вклад в общество', answer: '' },
  ],
  personal: [
    { id: 'story', question: 'Расскажи историю, которая определила кто ты есть', hint: 'Событие, человек или момент, изменивший тебя', answer: '' },
    { id: 'challenge', question: 'Какой самый большой вызов ты преодолел?', hint: 'И что ты вынес из этого опыта?', answer: '' },
    { id: 'unique', question: 'Что делает тебя уникальным среди других абитуриентов?', hint: 'Твоя суперсила или нестандартный взгляд', answer: '' },
    { id: 'community', question: 'Как ты влияешь на своё сообщество?', hint: 'Школа, город, онлайн-сообщество', answer: '' },
    { id: 'values', question: 'Какие 3 ценности направляют твои решения?', hint: 'Честность, любопытство, устойчивость...', answer: '' },
  ],
  research: [
    { id: 'topic', question: 'Какую тему ты исследуешь?', hint: 'Чёткое название темы исследования', answer: '' },
    { id: 'problem', question: 'Какую проблему решает твоё исследование?', hint: 'Почему это важно для науки или общества?', answer: '' },
    { id: 'hypothesis', question: 'Какова твоя гипотеза или исследовательский вопрос?', hint: 'Что ты хочешь доказать или выяснить?', answer: '' },
    { id: 'method', question: 'Какой метод исследования ты используешь?', hint: 'Эксперимент, опрос, анализ данных...', answer: '' },
    { id: 'result', question: 'Каковы предварительные результаты или ожидаемый вклад?', hint: 'Что нового привнесёт твоё исследование?', answer: '' },
  ],
  scholarship: [
    { id: 'who', question: 'Коротко: кто ты и чем занимаешься?', hint: '2-3 предложения о себе', answer: '' },
    { id: 'need', question: 'Почему тебе нужна эта стипендия?', hint: 'Финансовая ситуация или возможность для роста', answer: '' },
    { id: 'impact', question: 'Как эта стипендия изменит твой путь?', hint: 'Конкретные планы и цели', answer: '' },
    { id: 'give_back', question: 'Как ты планируешь вернуть обществу?', hint: 'Твоя социальная миссия', answer: '' },
  ],
};

const generateEssay = (type: EssayType, answers: Record<string, string>): string => {
  if (type === 'motivation') {
    const name = answers.name || 'Я';
    const uni = answers.university || 'данного университета';
    const why = answers.why || 'уникальные образовательные возможности';
    const passion = answers.passion || 'глубокий интерес к выбранной области';
    const achievements = answers.achievements || 'участие в олимпиадах и конкурсах';
    const skills = answers.skills || 'аналитическое мышление и командная работа';
    const future = answers.future || 'внести вклад в развитие своей области';

    return `${name} — студент, для которого образование является не просто ступенью карьеры, но фундаментом для изменения мира.

С самого начала моего академического пути меня отличало ${passion}. Этот интерес не появился случайно — он рождался через каждый вызов, каждую победу и каждое поражение, которые сформировали моё видение будущего.

За годы обучения мне удалось добиться значимых результатов: ${achievements}. Каждое из этих достижений научило меня не только конкретным знаниям, но и тому, как работать в условиях давления, искать нестандартные решения и, главное, никогда не останавливаться на достигнутом.

Я выбираю ${uni} по одной простой, но глубокой причине: ${why}. Здесь я вижу среду, которая не просто обучает, но и трансформирует — превращает любопытных студентов в лидеров, способных решать реальные проблемы.

За эти годы я развил ключевые компетенции: ${skills}. Именно эти навыки позволят мне не просто успешно завершить программу, но и стать ценным участником академического сообщества вуза.

Моя долгосрочная цель — ${future}. Я убеждён, что именно образование в вашем университете даст мне инструменты, наставников и сеть, необходимые для воплощения этой амбиции в реальность.

Буду рад стать частью вашего сообщества и внести свой вклад в его развитие.`;
  }

  if (type === 'personal') {
    const story = answers.story || 'определяющий опыт';
    const challenge = answers.challenge || 'серьёзное испытание';
    const unique = answers.unique || 'уникальный взгляд на мир';
    const values = answers.values || 'честность, любопытство и стойкость';

    return `Есть момент, который я помню с абсолютной ясностью: ${story}.

Именно тогда я понял, что не все проблемы решаются стандартными методами. Этот урок пришлось усвоить через ${challenge}. Трудности не сломили меня — они закалили и научили смотреть на препятствия как на возможности для роста.

Что делает меня мной? Прежде всего — ${unique}. Я не пытаюсь быть как все, потому что понимаю: мир меняют те, кто осмеливается думать иначе.

Мои действия направляют три ценности: ${values}. Они — не просто слова, а компас, который помогает принимать решения даже в самых сложных ситуациях.

Я прихожу в ваш университет не с пустыми руками, а с историей, которая ещё пишется — и с желанием написать самые захватывающие её главы здесь.`;
  }

  return `Данный тип эссе сгенерирован на основе ваших ответов. Продолжайте заполнять все поля для получения полного текста.`;
};

const EssayWriter: React.FC = () => {
  const [selectedType, setSelectedType] = useState<EssayType | null>(null);
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [generatedEssay, setGeneratedEssay] = useState('');
  const [copied, setCopied] = useState(false);

  const startEssay = (type: EssayType) => {
    setSelectedType(type);
    setQuestions(questionSets[type].map(q => ({ ...q, answer: '' })));
    setStep(1);
    setGeneratedEssay('');
  };

  const updateAnswer = (id: string, value: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, answer: value } : q));
  };

  const handleGenerate = () => {
    if (!selectedType) return;
    const answers: Record<string, string> = {};
    questions.forEach(q => { answers[q.id] = q.answer; });
    setGeneratedEssay(generateEssay(selectedType, answers));
    setStep(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEssay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filledCount = questions.filter(q => q.answer.trim().length > 0).length;

  if (step === 0) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 text-white">
          <h2 className="text-xl font-bold mb-1">✍️ Помощник по эссе</h2>
          <p className="text-purple-100 text-sm">Отвечай на вопросы — ИИ создаст твоё уникальное эссе</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Выбери тип эссе</h3>
          <div className="grid grid-cols-2 gap-4">
            {essayTypes.map(type => (
              <button
                key={type.id}
                onClick={() => startEssay(type.id)}
                className={`text-left p-5 rounded-2xl border-2 hover:border-violet-400 hover:shadow-md transition-all cursor-pointer ${type.color}`}
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">{type.title}</h4>
                <p className="text-xs text-gray-500">{type.description}</p>
                <div className="mt-3 flex items-center gap-1 text-violet-600 text-xs font-medium">
                  <span>Начать</span>
                  <ChevronRight size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5">
          <h4 className="font-semibold text-gray-900 mb-2">Как это работает?</h4>
          <div className="space-y-2">
            {[
              'Выбери тип эссе, который тебе нужен',
              'Ответь на персональные вопросы о себе',
              'ИИ создаст структурированное эссе',
              'Отредактируй и адаптируй под себя',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-violet-100 text-violet-700 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep(0)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
            <ChevronLeft size={18} className="text-gray-500" />
          </button>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {essayTypes.find(t => t.id === selectedType)?.title}
            </h3>
            <p className="text-xs text-gray-400">Заполнено {filledCount} из {questions.length} вопросов</p>
          </div>
          <div className="text-sm font-medium text-violet-600">{Math.round((filledCount / questions.length) * 100)}%</div>
        </div>

        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${(filledCount / questions.length) * 100}%` }}
          />
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start gap-2 mb-2">
                <span className="w-6 h-6 bg-violet-100 text-violet-700 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <label className="text-sm font-medium text-gray-900">{q.question}</label>
              </div>
              <textarea
                value={q.answer}
                onChange={e => updateAnswer(q.id, e.target.value)}
                placeholder={q.hint}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none text-gray-700 placeholder-gray-300"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-violet-200"
        >
          <Sparkles size={18} />
          Сгенерировать эссе
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep(1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
          <ChevronLeft size={18} className="text-gray-500" />
        </button>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Твоё эссе готово ✨</h3>
          <p className="text-xs text-gray-400">Отредактируй и адаптируй под себя</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-medium text-gray-600 cursor-pointer transition-colors">
            {copied ? <><Check size={13} className="text-green-500" /> Скопировано</> : <><Copy size={13} /> Копировать</>}
          </button>
          <button onClick={() => startEssay(selectedType!)} className="flex items-center gap-1.5 px-3 py-2 bg-violet-50 hover:bg-violet-100 rounded-xl text-xs font-medium text-violet-700 cursor-pointer transition-colors">
            <RefreshCw size={13} /> Пересоздать
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-violet-600" />
            <span className="text-sm font-medium text-gray-700">{essayTypes.find(t => t.id === selectedType)?.title}</span>
          </div>
          <span className="text-xs text-gray-400">{generatedEssay.split(' ').length} слов</span>
        </div>
        <textarea
          value={generatedEssay}
          onChange={e => setGeneratedEssay(e.target.value)}
          rows={18}
          className="w-full p-5 text-sm text-gray-700 leading-relaxed focus:outline-none resize-none rounded-b-2xl"
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-yellow-800 mb-1">💡 Совет редактора</p>
        <p className="text-xs text-yellow-700">Это черновик на основе твоих ответов. Обязательно добавь личных историй, конкретных деталей и своего голоса. Лучшие эссе звучат как разговор, а не как шаблон.</p>
      </div>
    </div>
  );
};

export default EssayWriter;
