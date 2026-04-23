import React from 'react';
import { motion } from 'motion/react';
import { Screen } from '../types';
import { staggerContainer, fadeUp } from '../styles/animations';

interface SplashScreenProps {
  onNext: (screen: Screen) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onNext }) => (
  <motion.div 
    initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.95 }}
    variants={staggerContainer}
    className="flex flex-col items-center justify-between min-h-screen bg-lumina-bg-primary text-lumina-text-main p-6 pt-24"
  >
    <div className="flex flex-col items-center w-full">
      <motion.div variants={fadeUp} className="relative w-40 h-40 mb-8">
        <div className="absolute inset-0 bg-lumina-border rounded-full blur-[60px] opacity-60 animate-pulse" />
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#2B124C" />
            </linearGradient>
          </defs>
          <motion.path 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
            d="M50 5 Q58 42 95 50 Q58 58 50 95 Q42 58 5 50 Q42 42 50 5 Z" 
            fill="url(#logoGrad)" 
          />
        </svg>
      </motion.div>
      <motion.h1 variants={fadeUp} className="text-7xl font-display font-bold tracking-tighter text-lumina-text-main mb-2 leading-none">
        LUMINA.
      </motion.h1>
      <motion.p variants={fadeUp} className="text-xl font-sans text-lumina-text-sub max-w-[200px] text-center leading-tight">
        Seu foco, moldado para você.
      </motion.p>
    </div>

    <motion.div variants={fadeUp} className="w-full space-y-3 pb-8 z-10">
      <motion.button 
        whileTap={{ scale: 0.96 }}
        onClick={() => onNext('login')}
        className="w-full py-5 bg-lumina-accent text-lumina-bg-primary rounded-[2rem] text-xl font-display font-medium shadow-[0_8px_30px_rgba(109,40,217,0.4)]"
      >
        Entrar
      </motion.button>
      <motion.button 
        whileTap={{ scale: 0.96 }}
        onClick={() => onNext('register')}
        className="w-full py-5 bg-lumina-bg-secondary text-lumina-text-main rounded-[2rem] text-xl font-display font-medium border-2 border-lumina-border hover:bg-lumina-border transition-colors"
      >
        Criar nova conta
      </motion.button>
    </motion.div>
  </motion.div>
);

export default SplashScreen;
