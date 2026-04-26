import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap, BookOpen, Trophy, Users, FileText, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  { icon: <Trophy size={14} />, text: 'Какие олимпиады подходят для 11 класса?' },
  { icon: <BookOpen size={14} />, text: 'Как подготовиться к SAT за 3 месяца?' },
  { icon: <FileText size={14} />, text: 'Помоги составить мотивационное письмо' },
  { icon: <Users size={14} />, text: 'Как найти команду для хакатона?' },
  { icon: <Zap size={14} />, text: 'Мои интересы: математика, AI. Что посоветуешь?' },
  { icon: <Sparkles size={14} />, text: 'Как улучшить своё портфолио?' },
];

const aiResponses: Record<string, string> = {
  default: `Привет! Я твой персональный ИИ-навигатор для поступления в вуз. 🎓

Я могу помочь тебе с:
• **Выбором конкурсов и олимпиад** — подберу подходящие по твоим интересам
• **Подготовкой к тестам** — SAT, IELTS, ЕНТ, NUET стратегии
• **Написанием эссе** — мотивационные письма, эссе для поступления
• **Построением портфолио** — что добавить, что улучшить
• **Поиском команды** — советы по нетворкингу и командной работе

Напиши мне, с чего хочешь начать! 💡`,

  олимпиад: `Для ученика 11 класса рекомендую следующие олимпиады:

**Математика:**
🏆 IYMC (International Youth Math Challenge) — онлайн, начальный уровень
🏆 AMC 10/12 — американская олимпиада, отлично для портфолио

**Наука:**
🔬 Google Science Fair — $50,000 приз, требует исследовательский проект
🔬 ISEF — крупнейший научный конкурс для школьников

**Технологии:**
💻 Kazakhstan National Hackathon — очный, Алматы (20 мая)
💻 Google Code Jam — для любителей программирования

**Мой совет:** Начни с 1-2 конкурсов, в которых чувствуешь себя уверенно. Лучше глубокое участие, чем много поверхностных попыток.

Хочешь узнать подробнее о каком-то конкурсе? 🎯`,

  SAT: `Стратегия подготовки к SAT за 3 месяца:

**Месяц 1 — Диагностика и основы:**
📚 Пройди пробный тест для определения слабых мест
📚 Сфокусируйся на алгебре и основах грамматики
📚 15-20 минут чтения академических текстов ежедневно

**Месяц 2 — Интенсивная практика:**
✏️ 2-3 полных практических теста
✏️ Разбор ошибок — каждая ошибка это урок
✏️ Словарный запас: 10 новых слов в день

**Месяц 3 — Финальная подготовка:**
🎯 Еженедельные симуляции в условиях реального теста
🎯 Работа над скоростью — тайм-менеджмент критически важен
🎯 Отдых за 2 дня до экзамена!

**Целевой балл:** Для топ-вузов нужно 1500+, для хороших — 1350+

Есть конкретный раздел, с которым нужна помощь? 📖`,

  мотивационное: `Структура мотивационного письма-победителя:

**1. Открывающий крюк (2-3 предложения)**
Начни с яркой истории или момента, который изменил твой взгляд. Избегай клише вроде "С детства я мечтал..."

**2. Твоя история (1 абзац)**
Расскажи о своём пути — что тебя сформировало, какие вызовы ты преодолел.

**3. Достижения (1-2 абзаца)**
Конкретные примеры с цифрами и результатами:
❌ "Участвовал в хакатоне"
✅ "Занял 2 место из 200 участников в хакатоне, разработав AI-решение для..."

**4. Почему этот вуз (1 абзац)**
Покажи, что ты исследовал программу. Упомяни конкретных профессоров, исследования, программы.

**5. Заключение**
Свяжи прошлое с будущим — как вуз поможет тебе достичь целей.

Хочешь, я задам тебе вопросы и помогу составить персональное письмо? 📝`,

  команду: `Как найти отличную команду для хакатона:

**На платформе EduPath:**
🔍 Используй раздел "Найти команду" — там 50+ активных участников
🔍 Фильтруй по навыкам и интересам

**Онлайн-ресурсы:**
💬 Telegram-группы казахстанских студентов
💬 DevPost — международный поиск команд для хакатонов

**Советы по формированию команды:**
✅ Идеальная команда: 1 разработчик + 1 дизайнер + 1 питчер
✅ Ищи не лучших, а совместимых
✅ Проведи мини-тест — реши небольшую задачу вместе перед регистрацией

**Как представиться:**
"Привет! Я [имя], участвую в [конкурс]. Ищу команду, умею [навыки]. Мои прошлые проекты: [примеры]."

Хочешь, создам для тебя профиль для поиска команды? 🤝`,

  портфолио: `Как создать сильное портфолио для топ-вузов:

**Что обязательно должно быть:**
📌 2-3 значимых достижения (олимпиады, конкурсы, проекты)
📌 1-2 исследовательских проекта или научных работы
📌 Волонтёрство или социальный проект
📌 Лидерские роли (капитан команды, организатор)

**Что добавит баллов:**
⭐ Международные сертификаты (IELTS, SAT)
⭐ Публикации или выступления
⭐ Стажировки или исследовательские программы
⭐ Уникальный проект, решающий реальную проблему

**Типичные ошибки:**
❌ "Много всего, но ничего глубокого"
❌ Отсутствие нарратива — достижения должны рассказывать историю
❌ Клубы без результатов

**Твой план:**
1. Выбери 1-2 области, которые тебя вдохновляют
2. Иди глубоко, а не широко
3. Каждый год — одно значимое новое достижение

Давай проанализируем твоё текущее портфолио? 📊`,
};

const getResponse = (message: string): string => {
  const lower = message.toLowerCase();
  if (lower.includes('олимпиад') || lower.includes('конкурс')) return aiResponses.олимпиад;
  if (lower.includes('sat') || lower.includes('подготовит')) return aiResponses.SAT;
  if (lower.includes('мотивационн') || lower.includes('письм') || lower.includes('эссе')) return aiResponses.мотивационное;
  if (lower.includes('команд')) return aiResponses.команду;
  if (lower.includes('портфолио')) return aiResponses.портфолио;
  return aiResponses.default;
};

const formatMessage = (text: string) => {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-bold text-gray-900 mt-3 mb-1">{line.slice(2, -2)}</p>;
    }
    if (line.startsWith('**') && line.includes('**')) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-gray-700">
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-gray-900">{p}</strong> : p)}
        </p>
      );
    }
    if (line === '') return <br key={i} />;
    return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>;
  });
};

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: aiResponses.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getResponse(text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      {/* Suggested prompts */}
      <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-400 mb-2">Быстрые вопросы:</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {suggestedPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => sendMessage(p.text)}
              className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 hover:border-violet-300 hover:bg-violet-50 text-gray-600 hover:text-violet-700 px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer"
            >
              <span className="text-violet-500">{p.icon}</span>
              {p.text}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'assistant'
                ? 'bg-gradient-to-br from-violet-500 to-indigo-600'
                : 'bg-gradient-to-br from-gray-700 to-gray-900'
            }`}>
              {msg.role === 'assistant' ? (
                <Sparkles size={14} className="text-white" />
              ) : (
                <span className="text-white text-xs font-bold">АС</span>
              )}
            </div>
            <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-violet-600 text-white rounded-tr-sm'
                  : 'bg-white border border-gray-100 shadow-sm rounded-tl-sm'
              }`}>
                {msg.role === 'assistant' ? (
                  <div className="space-y-0.5">{formatMessage(msg.content)}</div>
                ) : (
                  msg.content
                )}
              </div>
              <span className="text-xs text-gray-300">
                {msg.timestamp.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-100 bg-white">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Задай вопрос ИИ-навигатору..."
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-11 h-11 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
