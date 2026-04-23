import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Plus, ChevronRight, Check } from 'lucide-react';
import { staggerContainer, fadeUp } from '../styles/animations';

interface StoreProps {
  onEquipHair: (h: string | null) => void;
  equippedHair: string | null;
  onEquipShirt: (s: string | null) => void;
  equippedShirt: string | null;
  onEquipPants: (p: string | null) => void;
  equippedPants: string | null;
  onEquipFace: (f: string | null) => void;
  equippedFace: string[] | null;
}

const Store: React.FC<StoreProps> = ({ 
  onEquipHair, 
  equippedHair, 
  onEquipShirt, 
  equippedShirt,
  onEquipPants,
  equippedPants,
  onEquipFace,
  equippedFace
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const hairs = [
    { id: 'hair1', name: 'Bob Style' },
    { id: 'hair2', name: 'Afro Shine' },
    { id: 'hair3', name: 'Espetado' },
    { id: 'hair4', name: 'Cacheado' },
    { id: 'hair5', name: 'Liso Moderno' },
  ];

  const shirts = [
    { id: 'shirt1', name: 'T-Shirt Clean' },
    { id: 'shirt2', name: 'Moletom Cool' },
    { id: 'shirt3', name: 'Social Slim' },
  ];

  const pantsItems = [
    { id: 'pants1', name: 'Cargo Pants' },
    { id: 'pants2', name: 'Saia Urban' },
    { id: 'pants3', name: 'Calça Street' },
    { id: 'pants4', name: 'Jogger Vibe' },
  ];

  const faces = [
    { id: 'face2', name: 'Curioso' },
    { id: 'face3', name: 'Animado' },
    { id: 'face4', name: 'Focado' },
    { id: 'face5', name: 'Tranquilo' },
    { id: 'face6', name: 'Mistério' },
    { id: 'face7', name: 'Fofo' },
    { id: 'face8', name: 'Surpresa' },
    { id: 'face9', name: 'Piscada' },
    { id: 'face10', name: 'Sono' },
    { id: 'face11', name: 'Pensativo' },
    { id: 'face12', name: 'Sorriso+' },
    { id: 'face13', name: 'Tímido' },
    { id: 'face14', name: 'Sério' },
    { id: 'face15', name: 'Dúvida' },
    { id: 'face16', name: 'Calmo' },
    { id: 'face17', name: 'Brilho' },
  ];

  if (activeCategory === 'Cabelo') {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="min-h-screen bg-lumina-bg-primary pb-32">
        <div className="px-6 pt-6 flex items-center gap-4 mb-8">
           <button onClick={() => setActiveCategory(null)} className="p-3 bg-lumina-bg-secondary rounded-full border border-lumina-border text-lumina-accent shadow-sm active:scale-90 transition-transform">
             <ChevronRight className="rotate-180" size={20} />
           </button>
           <h2 className="text-4xl font-display font-black tracking-tighter text-lumina-text-main uppercase">Cabelos</h2>
        </div>

        <div className="px-6 grid grid-cols-2 gap-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onEquipHair(null)}
            className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
              equippedHair === null ? 'bg-white border-lumina-accent shadow-xl shadow-lumina-accent/20' : 'bg-lumina-bg-secondary/40 border-lumina-border/20'
            }`}
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-lumina-border flex items-center justify-center text-lumina-text-sub font-display font-bold">Nenhum</div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-lumina-text-sub">Sem Cabelo</span>
          </motion.button>

          {hairs.map((hair) => (
            <motion.button 
              key={hair.id} 
              whileTap={{ scale: 0.95 }}
              onClick={() => onEquipHair(hair.id)}
              className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
                equippedHair === hair.id 
                  ? 'bg-white border-lumina-accent shadow-xl shadow-lumina-accent/20' 
                  : 'bg-lumina-bg-secondary/40 border-lumina-border/20'
              }`}
            >
              {equippedHair === hair.id && (
                <div className="absolute top-2 right-2 bg-lumina-accent text-white p-1 rounded-full shadow-lg z-10">
                  <Check size={12} strokeWidth={4} />
                </div>
              )}
              <div className="w-20 h-20 bg-lumina-bg-primary/50 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
                <img src={`/assets/hairs/${hair.id}.png`} className="w-full h-full object-contain scale-[2] transition-transform" alt={hair.name} />
              </div>
              <span className={`font-display font-bold text-xs uppercase tracking-widest text-center ${equippedHair === hair.id ? 'text-lumina-accent' : 'text-lumina-text-sub'}`}>
                {hair.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  if (activeCategory === 'Camisas') {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="min-h-screen bg-lumina-bg-primary pb-32">
        <div className="px-6 pt-6 flex items-center gap-4 mb-8">
           <button onClick={() => setActiveCategory(null)} className="p-3 bg-lumina-bg-secondary rounded-full border border-lumina-border text-lumina-accent shadow-sm active:scale-90 transition-transform">
             <ChevronRight className="rotate-180" size={20} />
           </button>
           <h2 className="text-4xl font-display font-black tracking-tighter text-lumina-text-main uppercase">Camisas</h2>
        </div>

        <div className="px-6 grid grid-cols-2 gap-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onEquipShirt(null)}
            className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
              equippedShirt === null ? 'bg-white border-lumina-accent shadow-xl shadow-lumina-accent/20' : 'bg-lumina-bg-secondary/40 border-lumina-border/20'
            }`}
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-lumina-border flex items-center justify-center text-lumina-text-sub font-display font-bold">Nenhum</div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-lumina-text-sub">Sem Camisa</span>
          </motion.button>

          {shirts.map((shirt) => (
            <motion.button 
              key={shirt.id} 
              whileTap={{ scale: 0.95 }}
              onClick={() => onEquipShirt(shirt.id)}
              className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
                equippedShirt === shirt.id 
                  ? 'bg-white border-lumina-accent shadow-xl shadow-lumina-accent/20' 
                  : 'bg-lumina-bg-secondary/40 border-lumina-border/20'
              }`}
            >
              {equippedShirt === shirt.id && (
                <div className="absolute top-2 right-2 bg-lumina-accent text-white p-1 rounded-full shadow-lg z-10">
                  <Check size={12} strokeWidth={4} />
                </div>
              )}
              <div className="w-20 h-20 bg-lumina-bg-primary/50 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
                <img src={`/assets/clothes/shirts/${shirt.id}.png`} className="w-full h-full object-contain scale-[2] transition-transform" alt={shirt.name} />
              </div>
              <span className={`font-display font-bold text-xs uppercase tracking-widest text-center ${equippedShirt === shirt.id ? 'text-lumina-accent' : 'text-lumina-text-sub'}`}>
                {shirt.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  if (activeCategory === 'Calças') {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="min-h-screen bg-lumina-bg-primary pb-32">
        <div className="px-6 pt-6 flex items-center gap-4 mb-8">
           <button onClick={() => setActiveCategory(null)} className="p-3 bg-lumina-bg-secondary rounded-full border border-lumina-border text-lumina-accent shadow-sm active:scale-90 transition-transform">
             <ChevronRight className="rotate-180" size={20} />
           </button>
           <h2 className="text-4xl font-display font-black tracking-tighter text-lumina-text-main uppercase">Calças ({pantsItems.length})</h2>
        </div>

        <div className="px-6 grid grid-cols-2 gap-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onEquipPants(null)}
            className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
              equippedPants === null ? 'bg-white border-lumina-accent shadow-xl shadow-lumina-accent/20' : 'bg-lumina-bg-secondary/40 border-lumina-border/20'
            }`}
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-lumina-border flex items-center justify-center text-lumina-text-sub font-display font-bold">Nenhum</div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-lumina-text-sub">Sem Calça</span>
          </motion.button>

          {pantsItems.map((pant) => (
            <motion.button 
              key={pant.id} 
              whileTap={{ scale: 0.95 }}
              onClick={() => onEquipPants(pant.id)}
              className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
                equippedPants === pant.id 
                  ? 'bg-white border-lumina-accent shadow-xl shadow-lumina-accent/20' 
                  : 'bg-lumina-bg-secondary/40 border-lumina-border/20'
              }`}
            >
              {equippedPants === pant.id && (
                <div className="absolute top-2 right-2 bg-lumina-accent text-white p-1 rounded-full shadow-lg z-10">
                  <Check size={12} strokeWidth={4} />
                </div>
              )}
              <div className="w-20 h-20 bg-lumina-bg-primary/50 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
                <img src={`/assets/clothes/pants/${pant.id}.png`} className="w-full h-full object-contain scale-[2] transition-transform" alt={pant.name} />
              </div>
              <span className={`font-display font-bold text-xs uppercase tracking-widest text-center ${equippedPants === pant.id ? 'text-lumina-accent' : 'text-lumina-text-sub'}`}>
                {pant.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  if (activeCategory === 'Rostinho') {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="min-h-screen bg-lumina-bg-primary pb-32">
        <div className="px-6 pt-6 flex items-center gap-4 mb-8">
           <button onClick={() => setActiveCategory(null)} className="p-3 bg-lumina-bg-secondary rounded-full border border-lumina-border text-lumina-accent shadow-sm active:scale-90 transition-transform">
             <ChevronRight className="rotate-180" size={20} />
           </button>
           <h2 className="text-4xl font-display font-black tracking-tighter text-lumina-text-main uppercase">Rostinho</h2>
        </div>

        <div className="px-6 grid grid-cols-2 gap-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onEquipFace(null)}
            className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
              equippedFace?.length === 0 ? 'bg-white border-lumina-accent shadow-xl shadow-lumina-accent/20' : 'bg-lumina-bg-secondary/40 border-lumina-border/20'
            }`}
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-lumina-border flex items-center justify-center text-lumina-text-sub font-display font-bold">Base</div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-lumina-text-sub">Filtro Original</span>
          </motion.button>

          {faces.map((face) => (
            <motion.button 
              key={face.id} 
              whileTap={{ scale: 0.95 }}
              onClick={() => onEquipFace(face.id)}
              className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
                equippedFace?.includes(face.id) 
                  ? 'bg-white border-lumina-accent shadow-xl shadow-lumina-accent/20' 
                  : 'bg-lumina-bg-secondary/40 border-lumina-border/20'
              }`}
            >
              {equippedFace?.includes(face.id) && (
                <div className="absolute top-2 right-2 bg-lumina-accent text-white p-1 rounded-full shadow-lg z-10">
                  <Check size={12} strokeWidth={4} />
                </div>
              )}
              <div className="w-20 h-20 bg-lumina-bg-primary/50 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
                <img src={`/assets/faces/${face.id}.png`} className="w-full h-full object-contain scale-[2] transition-transform" alt={face.name} />
              </div>
              <span className={`font-display font-bold text-xs uppercase tracking-widest text-center ${equippedFace?.includes(face.id) ? 'text-lumina-accent' : 'text-lumina-text-sub'}`}>
                {face.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="min-h-screen bg-lumina-bg-primary pb-32">
      <div className="px-6 pt-6 text-center mb-12">
        <motion.h2 variants={fadeUp} className="text-6xl font-display font-black tracking-tighter text-lumina-text-main leading-none mb-2">Loja.</motion.h2>
        <motion.p variants={fadeUp} className="text-lumina-accent font-sans text-lg">Personalize seu Lumini.</motion.p>
      </div>
      
      <div className="px-6 grid grid-cols-2 gap-4">
        {[
          { id: 'Camisas', label: 'Camisas' },
          { id: 'Calças', label: 'Calças' },
          { id: 'Rostinho', label: 'Rostinho' },
          { id: 'Cabelo', label: 'Cabelo' },
          { id: 'Pets', label: 'Pets' }
        ].map((cat, i) => (
          <motion.button 
            key={i} 
            variants={fadeUp} 
            onClick={() => setActiveCategory(cat.id)}
            className="bg-lumina-bg-secondary border border-lumina-border rounded-[2.5rem] aspect-square p-6 relative overflow-hidden group shadow-sm hover:shadow-xl hover:border-lumina-accent/30 transition-all text-left"
          >
            <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-20 transition-opacity text-lumina-accent">
              <ShoppingCart size={100} />
            </div>
            <div className="flex flex-col h-full justify-between relative z-10">
               <div className="w-10 h-10 bg-lumina-accent rounded-full flex items-center justify-center shadow-lg shadow-lumina-accent/20">
                  <Plus size={20} className="text-white" />
               </div>
               <div>
                 <span className="inline-block bg-lumina-bg-primary text-lumina-accent text-[10px] font-black font-display px-2 py-1 rounded-full mb-2 uppercase tracking-widest border border-lumina-border">Novo</span>
                 <h3 className="text-lumina-text-main font-display font-black text-2xl uppercase tracking-tighter">{cat.label}</h3>
               </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Store;
