import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ContentGenerator from './components/ContentGenerator';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SubscriptionModal from './components/SubscriptionModal';
import AnimatedBackground from './components/AnimatedBackground';
import { Tool, ToolId } from './types';
import { TOOLS } from './constants';

enum AppState {
  LANDING,
  LOGIN,
  REGISTER,
  AUTHENTICATED,
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [activeToolId, setActiveToolId] = useState<ToolId>(ToolId.BLOG_TITLE);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [targetPremiumTool, setTargetPremiumTool] = useState<ToolId | null>(null);

  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('datatronGenieSubscription') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('datatronGenieSubscription', String(isSubscribed));
  }, [isSubscribed]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const toolIdFromHash = hash.replace('#/tool/', '') as ToolId;

      if (Object.values(ToolId).includes(toolIdFromHash)) {
        setActiveToolId(toolIdFromHash);
      } else {
        window.location.replace(`#/tool/${ToolId.BLOG_TITLE}`);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSelectTool = (toolId: ToolId) => {
    const targetTool = TOOLS.find((t) => t.id === toolId);
    if (targetTool?.isPremium && !isSubscribed) {
      setTargetPremiumTool(toolId);
      setShowSubscriptionModal(true);
    } else {
      window.location.hash = `#/tool/${toolId}`;
    }
  };

  const activeTool = TOOLS.find((tool) => tool.id === activeToolId) as Tool;

  const handleLogout = () => {
    setAppState(AppState.LANDING);
  };

  const handleLoginSuccess = () => {
    setAppState(AppState.AUTHENTICATED);
  };

  const handleGetStarted = () => {
    setAppState(AppState.LOGIN);
  };

  const handleShowRegister = () => {
    setAppState(AppState.REGISTER);
  };

  const handleShowLogin = () => {
    setAppState(AppState.LOGIN);
  };

  const handleRegisterSuccess = () => {
    alert('Registration successful! 🎉 Please log in.');
    setAppState(AppState.LOGIN);
  };

  const handleBackToLanding = () => {
    setAppState(AppState.LANDING);
  };

  const handleSubscribeSuccess = () => {
    setIsSubscribed(true);
    setShowSubscriptionModal(false);
    if (targetPremiumTool) {
      window.location.hash = `#/tool/${targetPremiumTool}`;
      setTargetPremiumTool(null);
    }
  };

  let content;
  if (appState === AppState.LANDING) {
    content = <LandingPage onGetStarted={handleGetStarted} />;
  } else if (appState === AppState.LOGIN) {
    content = (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onShowRegister={handleShowRegister}
        onBack={handleBackToLanding}
      />
    );
  } else if (appState === AppState.REGISTER) {
    content = (
      <RegisterPage
        onRegisterSuccess={handleRegisterSuccess}
        onShowLogin={handleShowLogin}
        onBack={handleBackToLanding}
      />
    );
  } else {
    content = (
      <>
        {showSubscriptionModal && (
          <SubscriptionModal
            onClose={() => setShowSubscriptionModal(false)}
            onSubscribe={handleSubscribeSuccess}
          />
        )}
        <div className="h-screen w-screen text-white flex overflow-hidden">
          <Sidebar
            activeToolId={activeToolId}
            onSelectTool={handleSelectTool}
            onLogout={handleLogout}
            isSubscribed={isSubscribed}
          />
          <main className="flex-1 flex flex-col overflow-hidden">
            <Header activeTool={activeTool} />
            <ContentGenerator key={activeToolId} activeTool={activeTool} />
          </main>
        </div>
      </>
    );
  }

  return (
    <div className="relative isolate">
      <AnimatedBackground />
      <div className="relative z-10">{content}</div>
    </div>
  );
};

export default App;
