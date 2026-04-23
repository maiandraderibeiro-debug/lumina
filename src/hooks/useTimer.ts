import { useState, useEffect, useRef } from 'react';
import { db, ref, set, update, onValue } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export const useTimer = () => {
  const { user } = useAuth();
  const [initialTime, setInitialTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  // 1. Initial Load from Local (Quick start)
  useEffect(() => {
    const savedActive = localStorage.getItem('lumina_timer_active') === 'true';
    const savedInitial = parseInt(localStorage.getItem('lumina_timer_initial') || '0');
    if (savedInitial > 0) setInitialTime(savedInitial);
    
    if (savedActive) {
      const savedEndTime = localStorage.getItem('lumina_timer_end');
      if (savedEndTime) {
        const remaining = Math.ceil((parseInt(savedEndTime) - Date.now()) / 1000);
        if (remaining > 0) {
          setTimeLeft(remaining);
          setIsActive(true);
          startTimerLogic(remaining, parseInt(savedEndTime));
        }
      }
    } else if (savedInitial > 0) {
      setTimeLeft(savedInitial);
    }
  }, []);

  // 2. Cloud Sync
  useEffect(() => {
    if (!user) return;

    const cloudTimerRef = ref(db, `users/${user.uid}/timer`);
    const unsubscribe = onValue(cloudTimerRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      if (data.active && data.endTime) {
        const now = Date.now();
        const remaining = Math.ceil((data.endTime - now) / 1000);
        
        if (remaining > 0) {
          setInitialTime(data.initial || 0);
          setTimeLeft(remaining);
          setIsActive(true);
          startTimerLogic(remaining, data.endTime);
        } else {
          setIsActive(false);
          setTimeLeft(0);
        }
      } else {
        setIsActive(false);
        if (data.initial) {
          setInitialTime(data.initial);
          setTimeLeft(data.initial);
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  const startTimerLogic = (remainingSeconds: number, endTime: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    endTimeRef.current = endTime;
    
    timerRef.current = window.setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTimeRef.current! - now) / 1000));
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        endTimeRef.current = null;
        setIsActive(false);
        if (user) {
          update(ref(db, `users/${user.uid}/timer`), { active: false });
        }
        playDing();
      }
    }, 200);
  };

  const playDing = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.start(); osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  };

  const stopTimerLogic = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (endTimeRef.current) {
       const now = Date.now();
       setTimeLeft(Math.max(0, Math.ceil((endTimeRef.current - now) / 1000)));
    }
    endTimeRef.current = null;
  };
  
  const handleReset = () => {
    stopTimerLogic();
    setIsActive(false);
    setTimeLeft(0);
    setInitialTime(0);
    if (user) {
      set(ref(db, `users/${user.uid}/timer`), { active: false, initial: 0, endTime: null });
    }
  };

  const handleTogglePlay = () => {
    if (initialTime === 0) return true; 

    if (!isActive) {
      const startAt = timeLeft === 0 ? initialTime : timeLeft;
      const endTime = Date.now() + startAt * 1000;
      
      setIsActive(true);
      startTimerLogic(startAt, endTime);

      if (user) {
        update(ref(db, `users/${user.uid}/timer`), { active: true, endTime, initial: initialTime });
      }
    } else {
      setIsActive(false);
      stopTimerLogic();
      if (user) {
        update(ref(db, `users/${user.uid}/timer`), { active: false });
      }
    }
    return false;
  };

  const handleSaveTimer = (mins: number) => {
    const secs = mins * 60;
    setInitialTime(secs);
    setTimeLeft(secs);
    stopTimerLogic();
    setIsActive(false);
    if (user) {
      update(ref(db, `users/${user.uid}/timer`), { initial: secs, active: false });
    }
  };

  return {
    initialTime,
    timeLeft,
    isActive,
    handleTogglePlay,
    handleSaveTimer,
    handleReset
  };
};
