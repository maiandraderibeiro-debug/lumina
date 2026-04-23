import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Users, X, Share2, MessageCircle, Send } from 'lucide-react';
import { db, ref, onValue, set, push, serverTimestamp, onDisconnect } from '../lib/firebase';
import { staggerContainer, fadeUp } from '../styles/animations';
import Mascot from '../components/Mascot';
import { UserData } from '../types';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<Record<string, any>>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  
  const user: UserData = JSON.parse(localStorage.getItem('lumina_user') || '{}');
  const userId = user.contact || Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = ref(db, `rooms/${roomId}/users/${userId}`);
    const presenceRef = ref(db, `rooms/${roomId}/users/${userId}`);
    
    // Set user presence
    set(presenceRef, {
      username: user.username || 'Estudante',
      avatar: user.avatar || null,
      customization: {
        char: localStorage.getItem('lumina_char') || 'char0',
        hair: localStorage.getItem('lumina_equipped_hair'),
        shirt: localStorage.getItem('lumina_equipped_shirt'),
        pants: localStorage.getItem('lumina_equipped_pants'),
        face: JSON.parse(localStorage.getItem('lumina_equipped_face') || '[]')
      },
      lastActive: serverTimestamp()
    });

    onDisconnect(presenceRef).remove();

    // Listen for users
    const usersListRef = ref(db, `rooms/${roomId}/users`);
    const unsubscribeUsers = onValue(usersListRef, (snapshot) => {
      setUsers(snapshot.val() || {});
    });

    // Listen for messages
    const chatRef = ref(db, `rooms/${roomId}/messages`);
    const unsubscribeChat = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data).sort((a: any, b: any) => a.timestamp - b.timestamp));
      }
    });

    return () => {
      unsubscribeUsers();
      unsubscribeChat();
      set(presenceRef, null);
    };
  }, [roomId, userId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const chatRef = ref(db, `rooms/${roomId}/messages`);
    push(chatRef, {
      sender: user.username || 'Estudante',
      text: newMessage,
      timestamp: serverTimestamp(),
      userId
    });
    setNewMessage("");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link da sala copiado!");
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="min-h-screen bg-lumina-bg-primary flex flex-col pt-8 pb-32">
      <div className="px-6 flex justify-between items-center mb-8">
        <button onClick={() => navigate('/dashboard')} className="p-3 bg-lumina-bg-secondary rounded-full border border-lumina-border text-lumina-accent">
          <X size={20} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-display font-black text-lumina-text-main uppercase tracking-tighter">Sala de Estudo</h2>
          <span className="text-xs font-sans font-bold text-lumina-accent uppercase tracking-widest">#{roomId}</span>
        </div>
        <button onClick={copyLink} className="p-3 bg-lumina-accent text-white rounded-full shadow-lg shadow-lumina-accent/40">
          <Share2 size={20} />
        </button>
      </div>

      <div className="flex-1 px-6 overflow-y-auto space-y-8 scrollbar-none">
        {/* User Mascots Grid */}
        <div className="grid grid-cols-2 gap-6">
          <AnimatePresence>
            {Object.entries(users).map(([id, u]: [string, any]) => (
              <motion.div 
                key={id} 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center bg-lumina-bg-secondary/40 border border-lumina-border/30 p-4 rounded-[2.5rem] relative"
              >
                <div className="w-24 h-24 relative mb-2">
                  <Mascot 
                    isActive={true}
                    selectedChar={u.customization?.char || 'char0'}
                    equippedHair={u.customization?.hair}
                    equippedShirt={u.customization?.shirt}
                    equippedPants={u.customization?.pants}
                    equippedFace={u.customization?.face}
                    scale={0.6}
                  />
                </div>
                <span className="text-xs font-display font-black text-lumina-text-main uppercase tracking-widest">{u.username}</span>
                {id === userId && <span className="absolute -top-2 -right-2 bg-lumina-accent text-[8px] text-white font-black px-2 py-1 rounded-full border border-white">VOCÊ</span>}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Chat Section Placeholder */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4 text-lumina-text-sub font-display font-bold uppercase tracking-widest text-xs">
            <MessageCircle size={14} /> Chat da Sala
          </div>
          <div className="bg-lumina-bg-secondary border border-lumina-border rounded-[2rem] p-4 h-64 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-none">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.userId === userId ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] font-bold text-lumina-accent uppercase mb-1">{m.sender}</span>
                  <div className={`px-4 py-2 rounded-[1.2rem] max-w-[80%] font-sans text-sm ${m.userId === userId ? 'bg-lumina-accent text-white rounded-tr-none' : 'bg-lumina-bg-primary text-lumina-text-main rounded-tl-none border border-lumina-border'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Diga oi..."
                className="flex-1 bg-lumina-bg-primary border border-lumina-border rounded-full px-4 text-sm font-sans outline-none focus:border-lumina-accent"
              />
              <button type="submit" className="p-3 bg-lumina-accent text-white rounded-full">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Room;
