import { useState, useEffect } from 'react';
import { db, ref, onValue, set, update } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export const useCustomization = () => {
  const { user } = useAuth();
  const [selectedChar, setSelectedChar] = useState('char0');
  const [equippedHair, setEquippedHair] = useState<string | null>(null);
  const [equippedShirt, setEquippedShirt] = useState<string | null>(null);
  const [equippedPants, setEquippedPants] = useState<string | null>(null);
  const [equippedFace, setEquippedFace] = useState<string[]>([]);

  // 1. Initial Load (LocalStorage while Auth is loading or offline)
  useEffect(() => {
    setSelectedChar(localStorage.getItem('lumina_char') || 'char0');
    setEquippedHair(localStorage.getItem('lumina_equipped_hair') || null);
    setEquippedShirt(localStorage.getItem('lumina_equipped_shirt') || null);
    setEquippedPants(localStorage.getItem('lumina_equipped_pants') || null);
    try {
      const savedFace = localStorage.getItem('lumina_equipped_face');
      setEquippedFace(savedFace ? JSON.parse(savedFace) : []);
    } catch {
      setEquippedFace([]);
    }
  }, []);

  // 2. Cloud Sync & Migration
  useEffect(() => {
    if (!user) return;

    const customizationRef = ref(db, `users/${user.uid}/customization`);
    
    // Subscribe to cloud changes
    const unsubscribe = onValue(customizationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSelectedChar(data.char || 'char0');
        setEquippedHair(data.hair || null);
        setEquippedShirt(data.shirt || null);
        setEquippedPants(data.pants || null);
        setEquippedFace(data.face || []);
      } else {
        // Migration: If no cloud data, upload local data
        const localData = {
          char: localStorage.getItem('lumina_char') || 'char0',
          hair: localStorage.getItem('lumina_equipped_hair') || null,
          shirt: localStorage.getItem('lumina_equipped_shirt') || null,
          pants: localStorage.getItem('lumina_equipped_pants') || null,
          face: JSON.parse(localStorage.getItem('lumina_equipped_face') || '[]')
        };
        set(customizationRef, localData);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const updateChar = (c: string) => {
    setSelectedChar(c);
    localStorage.setItem('lumina_char', c);
    if (user) {
      update(ref(db, `users/${user.uid}/customization`), { char: c });
    }
  };

  const updateHair = (h: string | null) => {
    setEquippedHair(h);
    if (h) localStorage.setItem('lumina_equipped_hair', h);
    else localStorage.removeItem('lumina_equipped_hair');
    if (user) {
      update(ref(db, `users/${user.uid}/customization`), { hair: h });
    }
  };

  const updateShirt = (s: string | null) => {
    setEquippedShirt(s);
    if (s) localStorage.setItem('lumina_equipped_shirt', s);
    else localStorage.removeItem('lumina_equipped_shirt');
    if (user) {
      update(ref(db, `users/${user.uid}/customization`), { shirt: s });
    }
  };

  const updatePants = (p: string | null) => {
    setEquippedPants(p);
    if (p) localStorage.setItem('lumina_equipped_pants', p);
    else localStorage.removeItem('lumina_equipped_pants');
    if (user) {
      update(ref(db, `users/${user.uid}/customization`), { pants: p });
    }
  };

  const updateFace = (f: string | null) => {
    let newFaces = [...equippedFace];
    if (f === null) {
      newFaces = [];
      localStorage.removeItem('lumina_equipped_face');
    } else {
      const index = newFaces.indexOf(f);
      if (index > -1) {
        newFaces.splice(index, 1);
      } else if (newFaces.length < 2) {
        newFaces.push(f);
      }
      localStorage.setItem('lumina_equipped_face', JSON.stringify(newFaces));
    }
    
    setEquippedFace(newFaces);
    if (user) {
      update(ref(db, `users/${user.uid}/customization`), { face: newFaces });
    }
  };

  return {
    selectedChar,
    equippedHair,
    equippedShirt,
    equippedPants,
    equippedFace,
    updateChar,
    updateHair,
    updateShirt,
    updatePants,
    updateFace
  };
};
