import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Bell, Accessibility, User, HelpCircle, LogOut } from 'lucide-react';
import { auth, db, signOut, ref, onValue, update } from '../lib/firebase';
import { Screen, UserData } from '../types';
import { useAuth } from '../context/AuthContext';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, onLogout }) => {
  const { user: authUser } = useAuth();
  const [activeView, setActiveView] = useState<'list' | 'account'>('list');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!authUser) return;
    const profileRef = ref(db, `users/${authUser.uid}/profile`);
    return onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsername(data.username || "");
        setContact(data.email || "");
      }
    });
  }, [authUser]);

  const handleSaveAccount = () => {
    if (!authUser) return;
    update(ref(db, `users/${authUser.uid}/profile`), {
      username,
      email: contact
    });
    setActiveView('list');
  };

  const handleRealLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  if (activeView === 'account') {
    return (
      <div className="min-h-screen bg-lumina-bg-secondary text-lumina-text-main px-6 pt-16 pb-32">
        <button onClick={() => setActiveView('list')} className="w-12 h-12 bg-lumina-bg-primary rounded-full flex items-center justify-center mb-8 border border-lumina-border text-lumina-accent">
          <ChevronRight className="rotate-180" size={24} />
        </button>
        <h2 className="text-4xl font-display font-black tracking-tighter mb-8 text-lumina-text-main">Sua Conta.</h2>
        
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" value={username} onChange={e => setUsername(e.target.value)}
              className="w-full p-6 pb-2 pt-8 bg-lumina-bg-primary border-2 border-lumina-border rounded-[1.5rem] outline-none font-sans"
            />
            <span className="absolute left-6 top-3 text-xs font-bold text-lumina-text-sub uppercase">Nome</span>
          </div>
          <div className="relative">
            <input 
              type="text" value={contact} onChange={e => setContact(e.target.value)} disabled
              className="w-full p-6 pb-2 pt-8 bg-lumina-bg-primary border-2 border-lumina-border rounded-[1.5rem] outline-none font-sans opacity-50"
            />
            <span className="absolute left-6 top-3 text-xs font-bold text-lumina-text-sub uppercase">Email (Sempre Online)</span>
          </div>
          <div className="relative">
            <input 
              type="password" value="********" disabled
              className="w-full p-6 pb-2 pt-8 bg-lumina-bg-primary border-2 border-lumina-border rounded-[1.5rem] outline-none font-sans opacity-50"
            />
            <span className="absolute left-6 top-3 text-xs font-bold text-lumina-text-sub uppercase">Senha</span>
            <p className="px-2 pt-2 text-[10px] text-lumina-accent font-bold italic">Edição de senha via Firebase console por segurança.</p>
          </div>
          
          <button 
            onClick={handleSaveAccount}
            className="w-full py-5 bg-lumina-accent text-lumina-bg-primary rounded-[2rem] font-display font-bold text-lg shadow-xl mt-4"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lumina-bg-secondary text-lumina-text-main px-6 pt-16 pb-32 relative">
      <button onClick={onBack} className="w-12 h-12 bg-lumina-bg-primary rounded-full flex items-center justify-center mb-8 border border-lumina-border text-lumina-accent hover:bg-lumina-border">
        <X size={24} />
      </button>
      <h2 className="text-5xl font-display font-black tracking-tighter mb-12 text-lumina-text-main">Settings.</h2>
      
      <div className="space-y-4">
        {[
          { t: 'Notificações', i: Bell, action: null },
          { t: 'Acessibilidade', i: Accessibility, action: null },
          { t: 'Conta', i: User, action: () => setActiveView('account') },
          { t: 'Sobre', i: HelpCircle, action: null }
        ].map((item, idx) => (
          <button 
            key={idx} 
            onClick={() => item.action && item.action()}
            className="w-full flex items-center justify-between p-5 bg-lumina-bg-primary border border-lumina-border rounded-[1.5rem] active:scale-95 transition-transform text-lumina-text-sub"
          >
             <div className="flex items-center gap-4">
               <div className="p-2 bg-lumina-bg-secondary rounded-full"><item.i size={20} className="text-lumina-accent" /></div>
               <span className="font-display font-bold text-lg">{item.t}</span>
             </div>
             <ChevronRight size={20} className="text-lumina-accent" />
          </button>
        ))}
      </div>

      <div className="mt-20">
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-5 text-red-100 font-display font-bold text-lg border-2 border-red-400/40 rounded-[2rem] bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
        >
          Sair da Conta
        </button>
      </div>

      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-lumina-text-main/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-lumina-bg-primary p-8 rounded-[2.5rem] border-4 border-lumina-border shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogOut size={40} className="text-red-600" />
              </div>
              <h3 className="text-3xl font-display font-black text-lumina-text-main mb-2">Tem certeza?</h3>
              <p className="text-lumina-text-sub font-sans mb-8">Você precisará fazer login novamente para acessar seu foco.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={handleRealLogout}
                  className="w-full py-4 bg-red-600 text-white rounded-[1.5rem] font-display font-bold text-lg hover:bg-red-700 transition-colors"
                >
                  Sim, Sair agora
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-4 bg-lumina-bg-secondary text-lumina-text-main rounded-[1.5rem] font-display font-bold text-lg"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
