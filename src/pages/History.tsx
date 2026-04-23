import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Trash2, Calendar as CalendarIcon, Send } from 'lucide-react';
import { staggerContainer, fadeUp } from '../styles/animations';
import { useSchedule } from '../hooks/useSchedule';

const History: React.FC = () => {
  const { schedule, addTask, removeTask, toggleTask, addDay } = useSchedule();
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [taskText, setTaskText] = useState("");
  const [newDayLabel, setNewDayLabel] = useState("");
  const [showAddDay, setShowAddDay] = useState(false);

  const handleAddTask = (dayId: string) => {
    if (!taskText.trim()) return;
    addTask(dayId, taskText);
    setTaskText("");
    setActiveInput(null);
  };

  const handleAddDay = () => {
    if (!newDayLabel.trim()) return;
    addDay(newDayLabel);
    setNewDayLabel("");
    setShowAddDay(false);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="min-h-screen bg-lumina-bg-primary pb-32">
      <div className="px-6 relative">
        <div className="flex justify-between items-center mb-10 mr-[-24px] mt-6">
          <motion.h2 variants={fadeUp} className="text-5xl font-display font-black tracking-tighter text-lumina-text-main">Agenda.</motion.h2>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAddDay(!showAddDay)}
            className="p-4 bg-lumina-bg-secondary border-2 border-lumina-border rounded-full text-lumina-accent shadow-lg shadow-lumina-accent/10"
          >
            <CalendarIcon size={24} />
          </motion.button>
        </div>

        <AnimatePresence>
          {showAddDay && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-lumina-bg-secondary border-2 border-lumina-accent p-6 rounded-[2rem] flex flex-col gap-4 shadow-xl">
                 <input 
                  type="text" value={newDayLabel} onChange={e => setNewDayLabel(e.target.value)}
                  placeholder="Nome do dia (ex: Sábado)"
                  className="w-full bg-lumina-bg-primary border border-lumina-border p-4 rounded-full font-display font-bold uppercase tracking-widest text-xs outline-none focus:border-lumina-accent"
                />
                <button 
                  onClick={handleAddDay}
                  className="w-full py-4 bg-lumina-accent text-white rounded-full font-display font-black uppercase tracking-widest text-sm"
                >
                  Adicionar Bloco
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative border-l-2 border-lumina-border ml-4 space-y-12 pb-12">
          {schedule.map((block, i) => (
            <motion.div key={block.id} variants={fadeUp} className="relative pl-8">
              <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-[#E9D5FF] ${block.active ? 'bg-lumina-accent' : 'bg-lumina-bg-secondary'}`} />
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-display font-bold text-2xl ${block.active ? 'text-lumina-text-main' : 'text-lumina-accent-hover'}`}>{block.label}</h3>
                <button 
                  onClick={() => setActiveInput(activeInput === block.id ? null : block.id)}
                  className="p-2 bg-lumina-bg-secondary rounded-full border border-lumina-border text-lumina-accent hover:bg-lumina-accent hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <AnimatePresence>
                {activeInput === block.id && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4 flex gap-2">
                    <input 
                      type="text" value={taskText} onChange={e => setTaskText(e.target.value)}
                      placeholder="Nova tarefa..."
                      className="flex-1 bg-lumina-bg-secondary border border-lumina-border px-4 py-2 rounded-full text-sm font-sans outline-none focus:border-lumina-accent"
                      autoFocus
                    />
                    <button onClick={() => handleAddTask(block.id)} className="p-2 bg-lumina-accent text-white rounded-full shadow-lg">
                      <Send size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                {(block.tasks || []).map((task, j) => (
                  <motion.div 
                    key={j} 
                    layout
                    className={`bg-lumina-bg-secondary border border-lumina-border p-5 rounded-[1.5rem] shadow-sm flex items-center justify-between group transition-all ${task.completed ? 'opacity-50 grayscale' : ''}`}
                  >
                    <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleTask(block.id, j)}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${task.completed ? 'bg-lumina-accent border-lumina-accent' : 'bg-lumina-bg-primary border-lumina-border'}`}>
                        {task.completed && <Check size={16} className="text-white" />}
                      </div>
                      <span className={`font-sans font-medium text-lumina-text-sub ${task.completed ? 'line-through opacity-70' : ''}`}>{task.text}</span>
                    </div>
                    <button 
                      onClick={() => removeTask(block.id, j)}
                      className="p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
                {(!block.tasks || block.tasks.length === 0) && (
                  <p className="text-center py-4 text-xs font-sans italic text-lumina-text-sub opacity-50">Nenhuma tarefa para este dia.</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default History;
