import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { auth, signInWithEmailAndPassword } from '../lib/firebase';
import { Screen } from '../types';
import { staggerContainer, fadeUp } from '../styles/animations';

interface LoginProps {
  onNext: (screen: Screen) => void;
}

const Login: React.FC<LoginProps> = ({ onNext }) => {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, contact, password);
      onNext('profile');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError("Conta não existe. Crie agora!");
      } else if (err.code === 'auth/wrong-password') {
        setError("Senha incorreta.");
      } else {
        setError("Erro ao entrar. Tente novamente.");
      }
    }
  };

  return (
    <motion.div 
      initial="hidden" animate="visible" exit={{ opacity: 0 }} variants={staggerContainer}
      className="flex flex-col min-h-screen bg-lumina-bg-primary p-6 pt-24"
    >
      <motion.div variants={fadeUp} className="mb-12">
        <div className="w-16 h-16 mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 5 Q58 42 95 50 Q58 58 50 95 Q42 58 5 50 Q42 42 50 5 Z" fill="#6D28D9" />
          </svg>
        </div>
        <h1 className="text-6xl font-display font-bold tracking-tighter text-lumina-text-main leading-[1.1]">
          Foco.<br/>Voltar.
        </h1>
        <p className="text-lumina-text-sub font-sans mt-2">Pronto para mais um ciclo de estudos?</p>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-4 w-full mt-auto mb-[20vh]">
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-bold font-sans px-2">
            ⚠️ {error}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="relative">
          <input 
            type="text" placeholder="seu@email.com" 
            value={contact} onChange={e => setContact(e.target.value)}
            autoComplete="off"
            className="w-full p-6 pb-2 pt-8 bg-lumina-bg-secondary border-2 border-lumina-border focus:border-lumina-accent text-lumina-text-main placeholder-[#8B5CF6] outline-none text-lg rounded-[1.5rem] font-sans transition-all peer"
          />
          <span className="absolute left-6 top-3 text-xs font-bold font-display uppercase tracking-wider text-lumina-text-sub peer-focus:text-lumina-text-main transition-colors">Seu Email / Telefone</span>
        </motion.div>
        
        <motion.div variants={fadeUp} className="relative">
          <input 
            type={showPassword ? "text" : "password"} placeholder="••••••••" 
            value={password} onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full p-6 pb-2 pt-8 pr-14 bg-lumina-bg-secondary border-2 border-lumina-border focus:border-lumina-accent text-lumina-text-main placeholder-[#8B5CF6] outline-none text-lg rounded-[1.5rem] font-sans transition-all peer"
          />
          <span className="absolute left-6 top-3 text-xs font-bold font-display uppercase tracking-wider text-lumina-text-sub peer-focus:text-lumina-text-main transition-colors">Senha Secreta</span>
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 bottom-4 px-3 py-1 bg-lumina-accent/20 border border-lumina-accent text-lumina-accent text-[10px] font-black rounded-lg z-50 hover:bg-lumina-accent hover:text-white transition-all uppercase tracking-tighter"
          >
            {showPassword ? "Esconder" : "Ver"}
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="pt-6 pb-4">
          <motion.button 
            whileTap={{ scale: 0.96 }}
            onClick={handleLogin}
            className="w-full py-5 bg-lumina-accent text-lumina-bg-primary rounded-[2rem] text-xl font-display font-medium shadow-xl shadow-lumina-accent/40 flex items-center justify-center gap-3"
          >
            Acessar <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-2 pb-8">
           <button onClick={() => onNext('register')} className="text-lumina-accent font-sans font-bold hover:underline">Ainda não tem conta? Criar agora</button>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default Login;
