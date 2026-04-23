import React from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

interface CharSelectionPageProps {
  onBack: () => void;
  onSelect: (c: string) => void;
  selectedChar: string;
}

const CharSelectionPage: React.FC<CharSelectionPageProps> = ({ 
  onBack, onSelect, selectedChar 
}) => {
  const characters = ['char0', 'char1', 'char2', 'char3', 'char4'];
  const names = ['Lume Original', 'Solaris Glow', 'Midnight Void', 'Frost Byte', 'Cyber Aura'];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full bg-lumina-bg-primary absolute inset-0 z-[100]"
    >
      <div className="pt-12 pb-6 px-6 flex items-center justify-between sticky top-0 bg-lumina-bg-primary/95 backdrop-blur-md z-10 border-b border-lumina-border/20">
        <button onClick={onBack} className="p-3 bg-lumina-bg-secondary rounded-full border border-lumina-border text-lumina-text-sub">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-display font-black text-lumina-text-main uppercase tracking-tighter">Skins do Lumini</h2>
        <div className="w-10 h-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-none pb-40">
        <div className="grid grid-cols-2 gap-4">
          {characters.map((char, i) => (
            <motion.button 
              key={char} 
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(char)}
              className={`p-5 rounded-[2.5rem] border-3 transition-all flex flex-col items-center gap-4 relative overflow-hidden ${
                selectedChar === char 
                  ? 'bg-white border-lumina-accent shadow-2xl shadow-lumina-accent/20' 
                  : 'bg-lumina-bg-secondary/40 border-lumina-border/20 hover:border-lumina-border/60'
              }`}
            >
              {selectedChar === char && (
                <div className="absolute top-4 right-4 bg-lumina-accent text-white p-1 rounded-full shadow-lg">
                  <Check size={14} strokeWidth={4} />
                </div>
              )}
              <div className="w-28 h-28 relative">
                <div className={`absolute inset-0 rounded-full blur-2xl opacity-30 ${selectedChar === char ? 'bg-lumina-accent' : 'bg-transparent'}`} />
                <img src={`/characters/${char}.png`} className="w-full h-full object-contain relative z-10 p-2" alt={names[i]} />
              </div>
              <span className={`font-display font-black text-xs uppercase tracking-widest text-center ${selectedChar === char ? 'text-lumina-accent' : 'text-lumina-text-sub opacity-70'}`}>
                {names[i]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-8 pt-12 bg-gradient-to-t from-lumina-bg-primary via-lumina-bg-primary/95 to-transparent z-20">
         <button 
          onClick={onBack}
          className="w-full py-5 bg-lumina-accent text-lumina-bg-primary rounded-[2.5rem] text-xl font-display font-black shadow-2xl shadow-lumina-accent/40 active:scale-95 transition-all uppercase tracking-widest"
         >
           Confirmar Skin
         </button>
      </div>
    </motion.div>
  );
};

export default CharSelectionPage;
