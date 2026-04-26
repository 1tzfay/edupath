import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Onboarding from './components/Onboarding';
import Dashboard from './pages/Dashboard';
import Opportunities from './pages/Opportunities';
import Lessons from './pages/Lessons';
import AIAssistant from './pages/AIAssistant';
import Portfolio from './pages/Portfolio';
import TeamFinder from './pages/TeamFinder';
import EssayWriter from './pages/EssayWriter';
import Leaderboard from './pages/Leaderboard';
import CareerOrientation from './pages/CareerOrientation';
import AdmissionGuide from './pages/AdmissionGuide';
import USAdmissions from './pages/USAdmissions';
import './index.css';

const pageConfig: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Главная', subtitle: 'Твой персональный путь' },
  career: { title: 'Профориентация', subtitle: 'Найди своё направление' },
  guide: { title: 'Гайд по поступлению', subtitle: 'От нуля до заявки — шаг за шагом' },
  usa: { title: 'Поступление в США 🇺🇸', subtitle: 'Common App, SAT, Ivy League и финансовая помощь' },
  opportunities: { title: 'Возможности', subtitle: 'Хакатоны, олимпиады и программы' },
  lessons: { title: 'Уроки', subtitle: 'SAT, IELTS, ЕНТ, NUET и предметы' },
  ai: { title: 'ИИ-ассистент', subtitle: 'Персональный навигатор поступления' },
  portfolio: { title: 'Портфолио', subtitle: 'Твои достижения и навыки' },
  teams: { title: 'Найти команду', subtitle: 'Объединяйся для конкурсов' },
  essay: { title: 'Эссе-помощник', subtitle: 'Мотивационные и личные эссе' },
  leaderboard: { title: 'Рейтинг', subtitle: 'Соревнование и результаты поступления' },
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { state } = useApp();
  const page = pageConfig[currentPage] || pageConfig.dashboard;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
      case 'career': return <CareerOrientation />;
      case 'guide': return <AdmissionGuide />;
      case 'usa': return <USAdmissions />;
      case 'opportunities': return <Opportunities />;
      case 'lessons': return <Lessons />;
      case 'ai': return <AIAssistant />;
      case 'portfolio': return <Portfolio />;
      case 'teams': return <TeamFinder />;
      case 'essay': return <EssayWriter />;
      case 'leaderboard': return <Leaderboard />;
      default: return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Onboarding overlay */}
      {!state.onboarding.completed && <Onboarding />}

      <Sidebar
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(p => !p)}
      />
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {currentPage !== 'ai' && (
          <Header title={page.title} subtitle={page.subtitle} />
        )}
        <div className="flex-1 overflow-y-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
