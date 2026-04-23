import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

// Types
import { Screen } from './types';

// Components
import Header from './components/Header';
import Navbar from './components/Navbar';

// Pages
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CharSelect from './pages/CharSelect';
import Recommendations from './pages/Recommendations';
import History from './pages/History';
import Store from './pages/Store';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Room from './pages/Room';

// Hooks
import { useTimer } from './hooks/useTimer';
import { useCustomization } from './hooks/useCustomization';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const hasUser = !!user;

  const { 
    timeLeft, initialTime, isActive, handleTogglePlay, handleSaveTimer, handleReset 
  } = useTimer();

  const {
    selectedChar, equippedHair, equippedShirt, equippedPants, equippedFace,
    updateChar, updateHair, updateShirt, updatePants, updateFace
  } = useCustomization();

  const [prevScreen, setPrevScreen] = useState<string>('/dashboard');

  const showHeaderNav = !['/', '/login', '/register', '/settings'].includes(location.pathname);
  
  // Map pathname to Screen for Navbar/Header logic
  const currentScreen = (location.pathname.split('/')[1] || 'splash') as Screen;

  const handleNavigate = (s: Screen) => {
    if (s === 'splash') navigate('/');
    else navigate(`/${s}`);
  };

  const openSettings = () => {
    setPrevScreen(location.pathname);
    navigate('/settings');
  };

  const handleLogout = async () => {
    try {
      const { auth, signOut } = await import('./lib/firebase');
      await signOut(auth);
      navigate('/login');
    } catch (e) {
      console.error("Erro ao sair:", e);
      navigate('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-lumina-bg-primary relative overflow-hidden sm:border-x sm:border-lumina-border shadow-[#2B124C]/25 shadow-2xl">
      {showHeaderNav && (
        <Header 
          onSettings={openSettings} 
          screen={currentScreen} 
          onNavigate={handleNavigate} 
        />
      )}
      
      <div className="flex-1 overflow-y-auto scrollbar-none relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-lumina-bg-primary z-[100]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-lumina-border border-t-lumina-accent rounded-full animate-spin" />
              <span className="font-display font-black text-lumina-accent uppercase tracking-widest text-xs">Carregando Foco...</span>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={hasUser ? <Navigate to="/dashboard" /> : <Splash onNext={handleNavigate} />} />
            <Route path="/login" element={<Login onNext={handleNavigate} />} />
            <Route path="/register" element={<Register onNext={handleNavigate} />} />
            
            <Route path="/dashboard" element={
              <Dashboard 
                onNavigate={handleNavigate}
                timeLeft={timeLeft}
                initialTime={initialTime}
                isActive={isActive}
                handleTogglePlay={handleTogglePlay}
                handleSaveTimer={handleSaveTimer}
                selectedChar={selectedChar}
                onSelectChar={updateChar}
                onReset={handleReset}
                equippedHair={equippedHair}
                equippedShirt={equippedShirt}
                equippedPants={equippedPants}
                equippedFace={equippedFace}
                onCreateRoom={(id) => navigate(`/room/${id}`)}
              />
            } />
            
            <Route path="/charSelect" element={
              <CharSelect 
                onBack={() => navigate('/dashboard')}
                selectedChar={selectedChar}
                onSelect={updateChar}
              />
            } />

            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/history" element={<History />} />
            
            <Route path="/store" element={
              <Store 
                equippedHair={equippedHair}
                onEquipHair={updateHair}
                equippedShirt={equippedShirt}
                onEquipShirt={updateShirt}
                equippedPants={equippedPants}
                onEquipPants={updatePants}
                equippedFace={equippedFace}
                onEquipFace={updateFace}
              />
            } />

            <Route path="/profile" element={<Profile onNavigate={handleNavigate} />} />
            
            <Route path="/room/:roomId" element={<Room />} />

            <Route path="/settings" element={
              <Settings 
                onBack={() => navigate(prevScreen)} 
                onLogout={handleLogout} 
              />
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
        )}
      </div>

      {showHeaderNav && (
        <Navbar 
          active={currentScreen} 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
