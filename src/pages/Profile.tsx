import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon } from 'lucide-react';
import { db, ref, onValue, set } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Screen, UserData } from '../types';
import { staggerContainer, fadeUp } from '../styles/animations';

interface ProfileProps {
  onNavigate: (s: Screen) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!authUser) return;

    const profileRef = ref(db, `users/${authUser.uid}/profile`);
    const unsubscribe = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUser(data);
      }
    });

    return () => unsubscribe();
  }, [authUser]);

  const displayUsername = user?.username || (authUser?.email ? authUser.email.split('@')[0] : 'Estudante');
  const defaultAvatar = "https://picsum.photos/seed/user88/600/600";
  const defaultBanner = "https://picsum.photos/seed/cover88/600/600";
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (file && authUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Str = reader.result as string;
        set(ref(db, `users/${authUser.uid}/profile/${type}`), base64Str);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="min-h-screen bg-lumina-bg-primary pb-32">
      <motion.div variants={fadeUp} className="mx-6 mt-4 h-64 bg-lumina-border rounded-[2rem] overflow-hidden relative shadow-lg group">
        <img src={user?.banner || defaultBanner} className="w-full h-full object-cover opacity-60 mix-blend-multiply" alt="Cover" />
        <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full">Alterar Banner</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'banner')} />
        </label>
      </motion.div>

      <div className="px-6 -mt-16 relative z-10">
        <motion.div variants={fadeUp} className="bg-lumina-bg-secondary rounded-[2rem] p-6 shadow-xl shadow-[#C084FC]/30 border border-lumina-border text-center pt-16 relative">
          
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 group">
             <div className="w-32 h-32 rounded-full border-4 border-lumina-bg-secondary overflow-hidden bg-lumina-bg-primary shadow-lg relative">
               <img src={user?.avatar || defaultAvatar} className="w-full h-full object-cover" alt="Avatar" />
               <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded-full">Alterar</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'avatar')} />
               </label>
             </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-lumina-text-main tracking-tight mt-2 capitalize">{displayUsername}</h2>
          <div className="w-16 h-1 bg-lumina-accent mt-4 mx-auto rounded-full opacity-30" />
        
        <div className="flex justify-center gap-8 border-y border-lumina-border py-6 my-6">
           <div className="text-center">
             <div className="text-3xl font-display font-black text-lumina-accent-hover">LV.{user?.level || 1}</div>
             <div className="text-xs font-sans font-bold text-lumina-text-sub uppercase tracking-wider mt-1">Nível</div>
           </div>
           <div className="w-px bg-lumina-border" />
           <div className="text-center">
             <div className="text-3xl font-display font-black text-lumina-accent">{user?.points || 0}</div>
             <div className="text-xs font-sans font-bold text-lumina-text-sub uppercase tracking-wider mt-1">Pontos</div>
           </div>
        </div>

        <button className="w-full py-4 bg-lumina-accent text-lumina-bg-primary rounded-[1.5rem] font-display font-bold text-lg flex items-center justify-center gap-2 hover:bg-lumina-accent-hover">
          Suas Estatísticas <UserIcon size={18} />
        </button>
      </motion.div>
    </div>
  </motion.div>
  );
};

export default Profile;
