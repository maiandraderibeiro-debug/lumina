import React from 'react';
import { motion } from 'motion/react';
import { Timer, BookOpen, ShoppingCart, Calendar, User } from 'lucide-react';
import { Screen } from '../types';

interface NavbarProps {
  active: Screen;
  onNavigate: (s: Screen) => void;
}

const Navbar: React.FC<NavbarProps> = ({ active, onNavigate }) => (
  <motion.div 
    initial={{ y: 100 }} animate={{ y: 0 }}
    className="absolute bottom-6 left-6 right-6 bg-lumina-bg-secondary/80 backdrop-blur-xl border border-lumina-border/50 rounded-full flex justify-between items-center py-4 px-6 z-50 shadow-2xl"
  >
    {[
      { id: 'dashboard', Icon: Timer },
      { id: 'recommendations', Icon: BookOpen },
      { id: 'store', Icon: ShoppingCart },
      { id: 'history', Icon: Calendar },
      { id: 'profile', Icon: User }
    ].map(({ id, Icon }) => {
      const isActive = active === id;
      return (
        <button key={id} onClick={() => onNavigate(id as Screen)} className="relative group">
          {isActive && (
            <motion.div layoutId="nav-pill" className="absolute inset-[-10px] bg-lumina-accent rounded-full z-0" />
          )}
          <Icon size={24} className={`relative z-10 transition-colors ${isActive ? 'text-lumina-bg-primary' : 'text-lumina-accent-hover group-hover:text-lumina-text-main'}`} strokeWidth={isActive ? 2.5 : 2} />
        </button>
      )
    })}
  </motion.div>
);

export default Navbar;
