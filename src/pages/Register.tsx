import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db, createUserWithEmailAndPassword, ref, set } from '../lib/firebase';
import { Screen } from '../types';
import { staggerContainer, fadeUp } from '../styles/animations';

interface RegisterProps {
  onNext: (screen: Screen) => void;
}

const Register: React.FC<RegisterProps> = ({ onNext }) => {
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!username || !contact || !password) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Atenção: As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, contact, password);
      const uid = userCredential.user.uid;
      
      // Initialize Cloud Profile
      await set(ref(db, `users/${uid}/profile`), {
        username,
        email: contact,
        points: 0,
        level: 1,
        createdAt: new Date().toISOString()
      });

      onNext('profile');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("Este email já está em uso.");
      } else if (err.code === 'auth/weak-password') {
        setError("A senha é muito fraca (mínimo 6 caracteres).");
      } else {
        setError("Erro ao criar conta. Tente novamente.");
      }
    }
  };

  return (
    <motion.div 
      initial="hidden" animate="visible" exit={{ opacity: 0 }} variants={staggerContainer}
      className="flex flex-col min-h-screen bg-lumina-bg-primary p-6 pt-16 overflow-y-auto"
    >
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-5xl font-display font-bold tracking-tighter text-lumina-text-main leading-[1.1]">
          Criar<br/>Conta.
        </h1>
        <p className="text-lumina-text-sub font-sans mt-2">Faça parte do foco do Lumina.</p>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-4 w-full mb-8">
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-bold font-sans px-2">
            ⚠️ {error}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="relative">
          <input 
            type="text" placeholder="Luara" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-6 pb-2 pt-8 bg-lumina-bg-secondary border-2 border-lumina-border focus:border-lumina-accent text-lumina-text-main placeholder-[#8B5CF6] outline-none text-lg rounded-[1.5rem] font-sans transition-all peer"
          />
          <span className="absolute left-6 top-3 text-xs font-bold font-display uppercase tracking-wider text-lumina-text-sub peer-focus:text-lumina-text-main transition-colors">Nome de Usuário</span>
        </motion.div>
        <motion.div variants={fadeUp} className="relative">
          <input 
            type="text" placeholder="seu@email.com ou (11) 99999-9999" 
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-6 pb-2 pt-8 bg-lumina-bg-secondary border-2 border-lumina-border focus:border-lumina-accent text-lumina-text-main placeholder-[#8B5CF6] outline-none text-lg rounded-[1.5rem] font-sans transition-all peer"
          />
          <span className="absolute left-6 top-3 text-xs font-bold font-display uppercase tracking-wider text-lumina-text-sub peer-focus:text-lumina-text-main transition-colors">Email / Telefone</span>
        </motion.div>
        <motion.div variants={fadeUp} className="relative">
          <input 
            type="password" placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-6 pb-2 pt-8 bg-lumina-bg-secondary border-2 border-lumina-border focus:border-lumina-accent text-lumina-text-main placeholder-[#8B5CF6] outline-none text-lg rounded-[1.5rem] font-sans transition-all peer"
          />
          <span className="absolute left-6 top-3 text-xs font-bold font-display uppercase tracking-wider text-lumina-text-sub peer-focus:text-lumina-text-main transition-colors">Senha</span>
        </motion.div>
        <motion.div variants={fadeUp} className="relative">
          <input 
            type="password" placeholder="••••••••" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-6 pb-2 pt-8 bg-lumina-bg-secondary border-2 border-lumina-border focus:border-lumina-accent text-lumina-text-main placeholder-[#8B5CF6] outline-none text-lg rounded-[1.5rem] font-sans transition-all peer"
          />
          <span className="absolute left-6 top-3 text-xs font-bold font-display uppercase tracking-wider text-lumina-text-sub peer-focus:text-lumina-text-main transition-colors">Confirmar Senha</span>
        </motion.div>

        <motion.div variants={fadeUp} className="pt-6">
          <motion.button 
            whileTap={{ scale: 0.96 }}
            onClick={handleCreate}
            className="w-full py-5 bg-lumina-accent text-lumina-bg-primary rounded-[2rem] text-xl font-display font-bold shadow-xl shadow-lumina-accent/40 flex items-center justify-center gap-3"
          >
            Criar
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp} className="relative mt-8 mb-4 flex items-center justify-center">
           <div className="absolute inset-x-0 h-px bg-lumina-border"></div>
           <span className="relative bg-lumina-bg-primary px-4 font-sans text-sm font-bold text-lumina-accent-hover uppercase tracking-widest">OU</span>
        </motion.div>

        <motion.div variants={fadeUp}>
          <motion.button 
            whileTap={{ scale: 0.96 }}
            onClick={() => onNext('profile')}
            className="w-full py-4 bg-lumina-surface-light text-lumina-text-main border-2 border-lumina-border rounded-[2rem] text-lg font-display font-bold flex items-center justify-center gap-3 hover:bg-lumina-bg-secondary shadow-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Criar com Google
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-6 pb-8">
           <button onClick={() => onNext('login')} className="text-lumina-accent font-sans font-bold hover:underline">Já tenho conta. Fazer Login</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
