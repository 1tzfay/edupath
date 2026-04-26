import React, { useState } from 'react';
import { opportunities } from '../data/opportunities';
import { useApp } from '../context/AppContext';
import type { CustomOpportunity } from '../context/AppContext';
import {
  Search, Calendar, MapPin, Trophy, Zap, BookOpen, Microscope,
  Star, ExternalLink, Bookmark, Plus, X, Trash2, CheckCircle, Sparkles
} from 'lucide-react';

const typeConfig = {
  hackathon:   { label: 'Хакатон',       color: 'bg-orange-100 text-orange-700', icon: <Zap size={12} /> },
  olympiad:    { label: 'Олимпиада',      color: 'bg-blue-100 text-blue-700',     icon: <Trophy size={12} /> },
  competition: { label: 'Конкурс',        color: 'bg-purple-100 text-purple-700', icon: <Star size={12} /> },
  research:    { label: 'Исследование',   color: 'bg-teal-100 text-teal-700',     icon: <Microscope size={12} /> },
  program:     { label: 'Программа',      color: 'bg-green-100 text-green-700',   icon: <BookOpen size={12} /> },
};

const difficultyConfig = {
  beginner:     { label: 'Начальный',    color: 'text-green-600 bg-green-50' },
  intermediate: { label: 'Средний',      color: 'text-yellow-600 bg-yellow-50' },
  advanced:     { label: 'Продвинутый',  color: 'text-red-600 bg-red-50' },
};

// ─── Create modal ─────────────────────────────────────────────────────────────
interface CreateModalProps { onClose: () => void; onSave: (opp: CustomOpportunity) => void; }

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '', type: 'hackathon' as CustomOpportunity['type'],
    deadline: '', location: '', description: '', prize: '', tags: '',
  });
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!form.title.trim()) { setError('Введи название'); return; }
    if (!form.deadline) { setError('Укажи дедлайн'); return; }
    onSave({
      id: `custom-${Date.now()}`,
      title: form.title.trim(),
      type: form.type,
      deadline: form.deadline,
      location: form.location.trim() || 'Онлайн',
      description: form.description.trim() || '—',
      prize: form.prize.trim() || undefined,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      participated: false,
      addedToPortfolio: false,
    });
  };

  const set = (k: string, v: string) => { setError(''); setForm(f => ({ ...f, [k]: v })); };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-base">Добавить мероприятие</h3>
            <p className="text-violet-200 text-xs mt-0.5">Оно появится в твоём списке и портфолио</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Название *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="Например: Городской хакатон по AI"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Тип</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 appearance-none bg-white cursor-pointer">
                <option value="hackathon">Хакатон</option>
                <option value="olympiad">Олимпиада</option>
                <option value="competition">Конкурс</option>
                <option value="research">Исследование</option>
                <option value="program">Программа</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Дедлайн *</label>
              <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Место</label>
              <input value={form.location} onChange={e => set('location', e.target.value)}
                placeholder="Алматы / Онлайн"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Приз (необязательно)</label>
              <input value={form.prize} onChange={e => set('prize', e.target.value)}
                placeholder="₸100,000 / Медаль"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Описание</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              placeholder="Кратко: о чём мероприятие, кто может участвовать"
              rows={2}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none" />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Теги (через запятую)</label>
            <input value={form.tags} onChange={e => set('tags', e.target.value)}
              placeholder="AI, программирование, математика"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
          </div>

          {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer">
              Отмена
            </button>
            <button onClick={handleSave} className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 cursor-pointer transition-colors">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Participate toast ────────────────────────────────────────────────────────
interface ParticipateToastProps { title: string; onConfirm: () => void; onDismiss: () => void; }

const ParticipateToast: React.FC<ParticipateToastProps> = ({ title, onConfirm, onDismiss }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-4 min-w-80">
    <Sparkles size={18} className="text-violet-400 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm font-semibold">Добавить в портфолио?</p>
      <p className="text-xs text-gray-400 mt-0.5 truncate">«{title}»</p>
    </div>
    <div className="flex gap-2">
      <button onClick={onDismiss} className="text-xs text-gray-400 hover:text-white cursor-pointer px-2">Нет</button>
      <button onClick={onConfirm} className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg cursor-pointer font-medium transition-colors">
        Добавить
      </button>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const Opportunities: React.FC = () => {
  const { state, addCustomOpportunity, removeCustomOpportunity, markParticipated } = useApp();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [showCreate, setShowCreate] = useState(false);
  const [participateToast, setParticipateToast] = useState<{ id: string; title: string } | null>(null);
  const [tab, setTab] = useState<'all' | 'mine'>('all');

  const { customOpportunities } = state;

  const handleSaveCustom = (opp: CustomOpportunity) => {
    addCustomOpportunity(opp);
    setShowCreate(false);
    setTab('mine');
  };

  const handleParticipate = (id: string, title: string) => {
    setParticipateToast({ id, title });
  };

  const confirmParticipate = () => {
    if (!participateToast) return;
    markParticipated(participateToast.id);
    setParticipateToast(null);
  };

  const filtered = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.description.toLowerCase().includes(search.toLowerCase()) ||
      opp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === 'all' || opp.type === selectedType;
    const matchesDiff = selectedDifficulty === 'all' || opp.difficulty === selectedDifficulty;
    return matchesSearch && matchesType && matchesDiff;
  });

  const filteredCustom = customOpportunities.filter(opp =>
    opp.title.toLowerCase().includes(search.toLowerCase()) ||
    opp.description.toLowerCase().includes(search.toLowerCase())
  );

  const featured = opportunities.filter(o => o.isFeatured);
  const toggleSave = (id: string) => setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="p-6 space-y-5">

      {/* Featured */}
      {tab === 'all' && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Рекомендовано для тебя</p>
          <div className="grid grid-cols-3 gap-4">
            {featured.map(opp => {
              const tc = typeConfig[opp.type];
              return (
                <div key={opp.id} className="relative bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-4 text-white overflow-hidden hover:opacity-95 transition-opacity cursor-pointer">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-4 translate-x-4 pointer-events-none" />
                  <div className="relative">
                    {opp.isNew && <span className="inline-block bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full mb-1.5 font-medium">Новое</span>}
                    <h4 className="font-bold text-sm mb-1 leading-tight">{opp.title}</h4>
                    <p className="text-violet-200 text-xs mb-2.5 line-clamp-2">{opp.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-lg">{tc.label}</span>
                      {opp.prize && <span className="text-yellow-300 font-bold text-xs">{opp.prize}</span>}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5 text-violet-200 text-[10px]">
                      <Calendar size={10} /><span>до {opp.deadline}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabs + Search + Create */}
      <div className="flex gap-3 items-center">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button onClick={() => setTab('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${tab === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
            Все ({opportunities.length})
          </button>
          <button onClick={() => setTab('mine')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${tab === 'mine' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
            Мои
            {customOpportunities.length > 0 && (
              <span className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${tab === 'mine' ? 'bg-violet-100 text-violet-700' : 'bg-gray-200 text-gray-500'}`}>
                {customOpportunities.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
        </div>

        {tab === 'all' && (
          <>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
              className="pl-3 pr-7 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 appearance-none cursor-pointer">
              <option value="all">Все типы</option>
              <option value="hackathon">Хакатоны</option>
              <option value="olympiad">Олимпиады</option>
              <option value="competition">Конкурсы</option>
              <option value="research">Исследования</option>
              <option value="program">Программы</option>
            </select>
            <select value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)}
              className="pl-3 pr-7 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 appearance-none cursor-pointer">
              <option value="all">Любой уровень</option>
              <option value="beginner">Начальный</option>
              <option value="intermediate">Средний</option>
              <option value="advanced">Продвинутый</option>
            </select>
          </>
        )}

        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors flex-shrink-0">
          <Plus size={16} /> Добавить
        </button>
      </div>

      {/* ── MY EVENTS TAB ── */}
      {tab === 'mine' && (
        <div>
          {customOpportunities.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
              <div className="text-4xl mb-3">📌</div>
              <h3 className="font-semibold text-gray-700 mb-1">Здесь будут твои мероприятия</h3>
              <p className="text-sm text-gray-400 mb-4">Нашёл интересный конкурс или хакатон?<br/>Добавь его сюда — мы напомним о дедлайне</p>
              <button onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer hover:bg-violet-700 transition-colors">
                <Plus size={16} /> Добавить первое
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCustom.map(opp => {
                const tc = typeConfig[opp.type];
                return (
                  <div key={opp.id} className={`bg-white rounded-2xl border p-4 transition-all ${opp.participated ? 'border-green-200 bg-green-50/30' : 'border-violet-200'}`}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${tc.color}`}>
                            {tc.icon} {tc.label}
                          </span>
                          <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">Моё</span>
                          {opp.participated && (
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
                              <CheckCircle size={9} /> В портфолио
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm">{opp.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{opp.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                          <div className="flex items-center gap-1"><Calendar size={10} />{opp.deadline}</div>
                          <div className="flex items-center gap-1"><MapPin size={10} />{opp.location}</div>
                          {opp.prize && <span className="text-green-600 font-medium">{opp.prize}</span>}
                        </div>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        {!opp.participated && (
                          <button onClick={() => handleParticipate(opp.id, opp.title)}
                            className="text-xs bg-violet-600 text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-violet-700 transition-colors font-medium">
                            Участвовал
                          </button>
                        )}
                        <button onClick={() => removeCustomOpportunity(opp.id)}
                          className="w-7 h-7 bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    {opp.tags.length > 0 && (
                      <div className="flex gap-1 mt-2.5 pt-2.5 border-t border-gray-100">
                        {opp.tags.map((t, i) => (
                          <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── ALL EVENTS TAB ── */}
      {tab === 'all' && (
        <div>
          <p className="text-xs text-gray-400 mb-3">Найдено: {filtered.length} возможностей</p>
          <div className="grid grid-cols-2 gap-4">
            {filtered.map(opp => {
              const tc = typeConfig[opp.type];
              const dc = difficultyConfig[opp.difficulty];
              return (
                <div key={opp.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-violet-200 hover:shadow-sm transition-all group">
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${tc.color}`}>
                          {tc.icon} {tc.label}
                        </span>
                        {opp.isNew && <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">Новое</span>}
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900 group-hover:text-violet-700 transition-colors leading-tight">{opp.title}</h4>
                    </div>
                    <button onClick={() => toggleSave(opp.id)}
                      className={`ml-2 p-1.5 rounded-lg cursor-pointer flex-shrink-0 ${saved.has(opp.id) ? 'text-violet-600 bg-violet-50' : 'text-gray-300 hover:text-gray-400'}`}>
                      <Bookmark size={14} fill={saved.has(opp.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2.5 line-clamp-2">{opp.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
                    <div className="flex items-center gap-1"><Calendar size={10} />{opp.deadline}</div>
                    <div className="flex items-center gap-1"><MapPin size={10} />{opp.location}</div>
                  </div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex gap-1">
                      {opp.tags.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${dc.color}`}>{dc.label}</span>
                      {opp.prize && <span className="text-xs font-bold text-green-600">{opp.prize}</span>}
                    </div>
                  </div>
                  <button className="w-full py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                    Подробнее <ExternalLink size={11} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals & toasts */}
      {showCreate && <CreateModal onClose={() => setShowCreate(false)} onSave={handleSaveCustom} />}
      {participateToast && (
        <ParticipateToast
          title={participateToast.title}
          onConfirm={confirmParticipate}
          onDismiss={() => setParticipateToast(null)}
        />
      )}
    </div>
  );
};

export default Opportunities;
