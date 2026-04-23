import React from 'react';
import { motion } from 'motion/react';

interface MascotProps {
  isActive: boolean;
  selectedChar: string;
  equippedHair: string | null;
  equippedShirt: string | null;
  equippedPants: string | null;
  equippedFace: string[] | null;
  scale?: number;
}

const Mascot: React.FC<MascotProps> = ({ 
  isActive, 
  selectedChar, 
  equippedHair, 
  equippedShirt, 
  equippedPants, 
  equippedFace,
  scale = 1
}) => {
  return (
    <motion.div 
      animate={isActive ? { 
        y: [0, -25, 0],
        scale: [1 * scale, 1.05 * scale, 1 * scale]
      } : { scale: 1 * scale }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="w-full h-full relative flex items-center justify-center p-0"
    >
      <div className="absolute inset-0 bg-lumina-accent/15 rounded-full blur-[140px]" />
      <div className="relative w-full h-full">
        <img 
          src={`/characters/${selectedChar}.png`} 
          className="w-full h-full object-contain filter drop-shadow-[0_40px_70px_rgba(109,40,217,0.5)] relative z-10" 
          alt="Mascot" 
        />
        {equippedHair && (
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={`/assets/hairs/${equippedHair}.png`} 
            className="absolute inset-0 w-full h-full object-contain z-40 pointer-events-none"
            alt="Hair"
          />
        )}
        {equippedShirt && (
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={`/assets/clothes/shirts/${equippedShirt}.png`} 
            className="absolute inset-0 w-full h-full object-contain z-30 pointer-events-none"
            alt="Shirt"
          />
        )}
        {equippedPants && (
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={`/assets/clothes/pants/${equippedPants}.png`} 
            className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
            alt="Pants"
          />
        )}
        {equippedFace && equippedFace.map((faceId, idx) => (
          <motion.img 
            key={`${faceId}-${idx}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={`/assets/faces/${faceId}.png`} 
            className="absolute inset-0 w-full h-full object-contain z-50 pointer-events-none"
            alt={`Face ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Mascot;
