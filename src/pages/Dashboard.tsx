import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Edit2, Play, Pause, Menu, Users } from 'lucide-react';
import { Screen } from '../types';
import { staggerContainer, fadeUp } from '../styles/animations';
import Mascot from '../components/Mascot';

interface DashboardProps {
  onNavigate: (s: Screen) => void;
  timeLeft: number;
  initialTime: number;
  isActive: boolean;
  handleTogglePlay: () => boolean;
  handleSaveTimer: (m: number) => void;
  selectedChar: string;
  onSelectChar: (c: string) => void;
  onReset: () => void;
  onEquipHair: string | null;
  equippedHair: string | null;
  equippedShirt: string | null;
  equippedPants: string | null;
  equippedFace: string[] | null;
  onCreateRoom: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onNavigate, timeLeft, initialTime, isActive, handleTogglePlay, handleSaveTimer, selectedChar, onSelectChar, onReset, equippedHair, equippedShirt, equippedPants, equippedFace, onCreateRoom 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleSave = () => {
    const min = parseInt(inputVal) || 1;
    handleSaveTimer(min);
    setIsEditing(false);
  };

  const generateRoom = () => {
    const id = Math.random().toString(36).substring(2, 7).toUpperCase();
    onCreateRoom(id);
  };

  const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');
  const progressOffset = initialTime > 0 ? 283 - (283 * (timeLeft / initialTime)) : 283;

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="min-h-screen bg-lumina-bg-primary pb-32">
      <div className="px-6 pt-4 flex flex-col h-full">
        
        {/* Timer Section */}
        <motion.div variants={fadeUp} className="relative flex flex-col items-center justify-center pt-16 pb-2 min-h-[280px]">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-[120px] font-display font-black tracking-tighter text-lumina-accent overflow-hidden">FOCUS</span>
          </div>
          
          <div className="relative z-10 text-center flex flex-col items-center mt-2">
            {isEditing ? (
              <div className="flex flex-col items-center gap-4">
                <input 
                  type="number" 
                  value={inputVal} 
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-32 text-center text-[70px] leading-none font-display font-bold tracking-tighter text-lumina-text-sub bg-transparent border-b-4 border-lumina-accent outline-none"
                  autoFocus
                />
                <button onClick={handleSave} className="bg-lumina-accent text-lumina-bg-primary px-6 py-2 rounded-full font-display font-bold hover:bg-lumina-accent-hover text-sm mt-4">
                  Salvar
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-[90px] leading-none font-display font-bold tracking-tighter text-lumina-text-main tabular-nums">
                  {m}<span className={`text-lumina-accent opacity-80 ${isActive ? 'animate-pulse' : ''}`}>:</span>{s}
                </h1>
                
                <div className="flex items-center gap-4 mt-6">
                  <button 
                    onClick={onReset}
                    className="p-3 rounded-full bg-lumina-bg-secondary text-lumina-text-sub border border-lumina-border hover:bg-lumina-border transition-colors shadow-sm active:rotate-[-45deg] transition-transform"
                    title="Resetar"
                  >
                    <RotateCcw size={20} />
                  </button>
                  <button 
                    onClick={() => { setIsEditing(true); }}
                    className="p-3 rounded-full bg-lumina-bg-secondary text-lumina-accent border border-lumina-border hover:bg-lumina-border transition-colors shadow-sm"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button 
                    onClick={() => {
                      if (handleTogglePlay()) setIsEditing(true);
                    }}
                    className="p-5 rounded-full bg-lumina-accent text-white shadow-xl shadow-lumina-accent/40 hover:bg-lumina-accent-hover transition-all active:scale-95"
                  >
                    {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                  </button>
                </div>
              </>
            )}
          </div>
          
          {!isEditing && (
            <svg className="absolute w-[300px] h-[300px] -z-10 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-lumina-border)" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
              <motion.circle 
                initial={{ strokeDashoffset: 283 }} 
                animate={{ strokeDashoffset: progressOffset }} 
                transition={{ duration: 0.5 }}
                cx="50" cy="50" r="45" fill="none" stroke="var(--color-lumina-accent)" strokeWidth="5" strokeDasharray="283" strokeLinecap="round" 
              />
            </svg>
          )}
        </motion.div>
        
        {/* Mascot Section */}
        <motion.div variants={fadeUp} className="flex-1 flex flex-col items-center justify-center -mt-6 mb-2 overflow-visible">
           <div className="relative group cursor-pointer translate-y-4" onClick={() => onNavigate('charSelect')}>
              <div className="w-96 h-96 relative flex items-center justify-center p-0 mx-[-24px]">
                <Mascot 
                  isActive={isActive}
                  selectedChar={selectedChar}
                  equippedFace={equippedFace}
                  equippedHair={equippedHair}
                  equippedPants={equippedPants}
                  equippedShirt={equippedShirt}
                />
              </div>
              <div className="mt-8 flex flex-col items-center gap-4">
                <button 
                  onClick={() => onNavigate('charSelect')}
                  className="bg-lumina-bg-secondary/90 backdrop-blur-md border border-lumina-border px-8 py-3 rounded-full shadow-xl text-sm font-display font-black text-lumina-accent flex items-center gap-2 mx-auto w-fit active:scale-95 transition-transform uppercase tracking-[0.2em]"
                >
                  Trocar Lumini <Menu size={18} className="rotate-90" />
                </button>

                <button 
                  onClick={generateRoom}
                  className="bg-lumina-accent text-white px-8 py-4 rounded-[2rem] shadow-xl shadow-lumina-accent/30 text-lg font-display font-black flex items-center gap-3 active:scale-95 transition-all uppercase tracking-widest border-4 border-white"
                >
                  <Users size={20} /> Estudar em Grupo
                </button>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
