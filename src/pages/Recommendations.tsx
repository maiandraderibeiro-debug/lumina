import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ExternalLink, Youtube, Filter, Brain, Beaker, GraduationCap, Compass } from 'lucide-react';
import { staggerContainer, fadeUp } from '../styles/animations';

interface VideoRec {
  id: string;
  title: string;
  channel: string;
  subject: string;
  exam: string;
  duration: string;
  color: string;
  icon: React.ReactNode;
}

const CATEGORIES = [
  { id: 'Todos', icon: <Compass size={16} /> },
  { id: 'Matemática', icon: <Beaker size={16} /> },
  { id: 'Português', icon: <GraduationCap size={16} /> },
  { id: 'Biologia', icon: <Brain size={16} /> },
  { id: 'Química', icon: <Beaker size={16} /> },
  { id: 'Física', icon: <Beaker size={16} /> },
  { id: 'História', icon: <GraduationCap size={16} /> },
  { id: 'Foco', icon: <Filter size={16} /> }
];

const videos: VideoRec[] = [
  { 
    id: 'fo-FABn1zr8', 
    title: 'Pomodoro Timer 25/5 - Estude com o Federal Online', 
    channel: 'Federal Online',
    subject: 'Foco', 
    exam: 'Geral',
    duration: '2:00:00',
    color: 'bg-lumina-accent',
    icon: <Filter size={14} />
  },
  { 
    id: 'Voaseu31krA', 
    title: 'Equação Quadrática: O Método Proibido!', 
    channel: 'Matemática Rio',
    subject: 'Matemática', 
    exam: 'ENEM',
    duration: '45:20',
    color: 'bg-blue-500',
    icon: <Beaker size={14} />
  },
  { 
    id: '1C88RhbZjgg', 
    title: 'Orações Subordinadas Adjetivas: Tudo o que você precisa saber', 
    channel: 'Professor Noslen',
    subject: 'Português', 
    exam: 'Vestibular',
    duration: '52:10',
    color: 'bg-orange-500',
    icon: <GraduationCap size={14} />
  },
  { 
    id: 'n0e75nRstcU', 
    title: 'Figuras de Linguagem: Aprenda de Vez!', 
    channel: 'Professor Noslen',
    subject: 'Português', 
    exam: 'ENEM',
    duration: '42:30',
    color: 'bg-orange-600',
    icon: <GraduationCap size={14} />
  },
  { 
    id: 'yUpRa62vcSI', 
    title: 'Crase: Aula 01 - O Guia Definitivo', 
    channel: 'Professor Noslen',
    subject: 'Português', 
    exam: 'Geral',
    duration: '38:15',
    color: 'bg-orange-400',
    icon: <GraduationCap size={14} />
  },
  { 
    id: '4ZJnTqTk4_Y', 
    title: 'Concordância Verbal: Regras Essenciais', 
    channel: 'Professor Noslen',
    subject: 'Português', 
    exam: 'ENEM',
    duration: '25:50',
    color: 'bg-orange-700',
    icon: <GraduationCap size={14} />
  },
  { 
    id: 'XsN0e_xPyNI', 
    title: 'Interpretação de Texto: Revisão ENEM', 
    channel: 'Professor Noslen',
    subject: 'Português', 
    exam: 'ENEM',
    duration: '31:20',
    color: 'bg-orange-300',
    icon: <GraduationCap size={14} />
  },
  { 
    id: 'Xi8Vj7aDcvg', 
    title: 'Primeira Guerra Mundial: Aula Completa', 
    channel: 'Débora Aladim',
    subject: 'História', 
    exam: 'ENEM',
    duration: '32:45',
    color: 'bg-yellow-500',
    icon: <GraduationCap size={14} />
  },
  { 
    id: 'Nir4-ql0U6s', 
    title: 'Brasil Império: O Reinado de D. Pedro II', 
    channel: 'Débora Aladim',
    subject: 'História', 
    exam: 'ENEM',
    duration: '22:15',
    color: 'bg-yellow-600',
    icon: <GraduationCap size={14} />
  },
  { 
    id: 'vzl2yMcI0Mo', 
    title: 'Modelo de Redação Nota 1000: Passo a Passo', 
    channel: 'Débora Aladim',
    subject: 'Português', 
    exam: 'ENEM',
    duration: '18:10',
    color: 'bg-orange-400',
    icon: <GraduationCap size={14} />
  },
  { 
    id: 'PuXZdBysm2A', 
    title: 'Química Discursiva UERJ - Correção e Dicas', 
    channel: 'Foco Medicina',
    subject: 'Química', 
    exam: 'UERJ',
    duration: '45:15',
    color: 'bg-red-500',
    icon: <Beaker size={14} />
  },
  { 
    id: '2bo6x1VkSNM', 
    title: 'Alavanca Interfixa: Nunca mais erre no Equilíbrio', 
    channel: 'FISICATOTAL',
    subject: 'Física', 
    exam: 'ENEM',
    duration: '18:30',
    color: 'bg-green-600',
    icon: <Beaker size={14} />
  },
  { 
    id: 'WSBHMdIFNNw', 
    title: 'Metodologia de Estudo para Medicina na UERJ', 
    channel: 'Foco Medicina',
    subject: 'Foco', 
    exam: 'Medicina',
    duration: '12:05',
    color: 'bg-pink-500',
    icon: <Filter size={14} />
  },
  { 
    id: 'R9K1u9Fq3iQ', 
    title: 'Raciocínio Lógico Matemático do ZERO', 
    channel: 'Felippe Loureiro',
    subject: 'Matemática', 
    exam: 'Concursos/ENEM',
    duration: '1:45:20',
    color: 'bg-indigo-500',
    icon: <Beaker size={14} />
  },
  { 
    id: 'zP0T6PqRk04', 
    title: 'Entenda Tabela Verdade de uma vez por TODAS!', 
    channel: 'Felippe Loureiro',
    subject: 'Matemática', 
    exam: 'Geral',
    duration: '32:15',
    color: 'bg-indigo-400',
    icon: <Beaker size={14} />
  },
  { 
    id: 'f_Wq9f6JtD0', 
    title: 'Análise Combinatória: Combinação e Arranjo', 
    channel: 'Felippe Loureiro',
    subject: 'Matemática', 
    exam: 'ENEM/Concursos',
    duration: '45:10',
    color: 'bg-indigo-600',
    icon: <Beaker size={14} />
  },
  { 
    id: 'zjXqCOwef5A', 
    title: 'Cronograma Individual 2026 - Organize seus Estudos', 
    channel: 'Federal Online',
    subject: 'Foco', 
    exam: 'Geral',
    duration: '15:20',
    color: 'bg-yellow-400',
    icon: <Filter size={14} />
  }
];

const Recommendations: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const openVideo = (id: string) => {
    window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
  };

  const filteredVideos = videos.filter(v => {
    if (activeFilter === 'Todos') return true;
    if (activeFilter === 'Federal') return v.exam === 'Federal';
    if (activeFilter === 'Medicina') return v.exam === 'Medicina' || v.exam === 'UERJ';
    return v.subject === activeFilter;
  });

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="min-h-screen bg-lumina-bg-primary pb-36">
      
      {/* Dynamic Header */}
      <div className="px-6 pt-12 mb-8 bg-lumina-bg-primary sticky top-0 z-30 pb-4 border-b border-lumina-border/10">
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-lumina-accent rounded-xl flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Youtube size={22} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-lumina-text-main border-b-4 border-lumina-accent">Gabaritando.</h2>
        </motion.div>

        {/* Filter Bar */}
        <motion.div variants={fadeUp} className="flex gap-3 overflow-x-auto pb-4 scrollbar-none -mx-6 px-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 font-display font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                activeFilter === cat.id 
                  ? 'bg-lumina-accent border-lumina-border text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-white border-lumina-border text-lumina-text-main hover:bg-lumina-bg-secondary'
              }`}
            >
              {cat.icon}
              {cat.id}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="px-6 space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((vid, i) => (
            <motion.div 
              key={vid.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white border-[3px] border-lumina-border rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(109,40,217,0.2)] transition-all cursor-pointer group"
              onClick={() => openVideo(vid.id)}
            >
              {/* Thumbnail Container */}
              <div className="relative h-52 bg-lumina-bg-secondary overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                  alt={vid.title} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('mqdefault.jpg')) {
                      target.src = `https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                   <div className="w-full flex justify-between items-center">
                      <div className={`px-4 py-1.5 ${vid.color} border-2 border-lumina-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full font-display font-black text-[10px] uppercase tracking-widest text-lumina-text-main flex items-center gap-2 group-hover:scale-110 transition-transform`}>
                        {vid.icon}
                        {vid.subject}
                      </div>
                      <div className="bg-black/80 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-md text-[10px] font-display font-bold">
                        {vid.duration}
                      </div>
                   </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-lumina-accent/20 backdrop-blur-[1px]">
                   <div className="w-16 h-16 bg-white border-[3px] border-lumina-border rounded-full flex items-center justify-center shadow-xl">
                      <Play size={24} fill="#6D28D9" className="text-lumina-accent ml-1" />
                   </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6">
                <div className="flex items-center gap-2 md-2 mb-2">
                   <span className="text-[10px] font-display font-black text-lumina-accent uppercase tracking-tighter opacity-70 italic">{vid.channel}</span>
                   <span className="w-1 h-1 bg-lumina-border rounded-full" />
                   <span className="text-[10px] font-display font-black text-lumina-text-sub uppercase tracking-tighter">{vid.exam}</span>
                </div>
                <h3 className="text-lumina-text-main font-display font-black text-2xl leading-[1.1] tracking-tight group-hover:text-lumina-accent transition-colors">
                  {vid.title}
                </h3>
                <div className="flex items-center justify-end mt-4">
                   <div className="flex items-center gap-2 text-xs font-sans font-bold text-lumina-text-sub opacity-50 group-hover:opacity-100 transition-opacity">
                     <span>Ver Aulão</span>
                     <ExternalLink size={14} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredVideos.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
            <div className="w-20 h-20 bg-lumina-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-lumina-border">
              <Compass size={32} className="text-lumina-border animate-spin-slow" />
            </div>
            <p className="font-display font-black text-lumina-text-sub uppercase tracking-widest text-sm">Nenhuma aula encontrada nesta categoria.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Recommendations;
