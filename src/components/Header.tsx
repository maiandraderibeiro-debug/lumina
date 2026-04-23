import React from 'react';
import { motion } from 'motion/react';
import { Plus, ShoppingCart, Menu } from 'lucide-react';
import { Screen } from '../types';

interface HeaderProps {
  onSettings: () => void;
  screen: Screen;
  onNavigate: (s: Screen) => void;
}

const Header: React.FC<HeaderProps> = ({ onSettings, screen, onNavigate }) => {
  const isDash = screen === 'dashboard';
  
  return (
    <div className={`bg-lumina-bg-primary pt-8 pb-4 px-6 flex justify-between items-center sticky top-0 z-40 transition-all ${isDash ? 'border-b border-lumina-border/30' : ''}`}>
      <div className="flex items-center gap-2">
        {isDash ? (
          <div className="flex items-center gap-2 bg-lumina-bg-secondary px-4 py-2 rounded-full border border-lumina-border shadow-sm">
             <div className="w-6 h-6 bg-lumina-accent rounded-full flex items-center justify-center">
               <Plus size={14} className="text-white" />
             </div>
             <span className="font-display font-black text-lumina-text-main text-xs uppercase tracking-tight">Lvl. 12</span>
           </div>
        ) : (
          <>
            <svg viewBox="0 0 100 100" className="w-8 h-8">
               <path d="M50 5 Q58 42 95 50 Q58 58 50 95 Q42 58 5 50 Q42 42 50 5 Z" fill="#6D28D9" />
            </svg>
            <h1 className="text-xl font-display font-bold tracking-tight text-lumina-text-main uppercase">Lumina</h1>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {isDash && (
           <button 
            onClick={() => onNavigate('store')}
            className="p-2.5 bg-lumina-bg-secondary rounded-full border border-lumina-border text-lumina-accent shadow-sm active:scale-90 transition-transform"
           >
             <ShoppingCart size={20} strokeWidth={2.5} />
           </button>
        )}
        <motion.button whileTap={{ scale: 0.9 }} onClick={onSettings} className="p-3 bg-lumina-bg-secondary border border-lumina-border rounded-full text-lumina-text-sub shadow-sm transition-colors hover:bg-lumina-border">
          <Menu size={20} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
