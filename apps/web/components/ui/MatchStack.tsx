"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Star, X, Check, Info } from 'lucide-react';
import { TitanCard } from './TitanCard';
import { cn } from '../../lib/utils';

interface Mentor {
  id: number;
  name: string;
  skill: string;
  tags: string[];
  rating: number;
  aura: string;
  glow: string;
  bio: string;
}

interface MatchStackProps {
  mentors: Mentor[];
}

export const MatchStack = ({ mentors: initialMentors }: MatchStackProps) => {
  const [mentors, setMentors] = useState(initialMentors);

  const handleSwipe = (id: number, direction: 'left' | 'right') => {
    setMentors((prev) => prev.filter((m) => m.id !== id));
    console.log(`Swiped ${direction} on mentor ${id}`);
  };

  return (
    <div className="relative w-full max-w-md h-[600px] mx-auto mt-8">
      <AnimatePresence>
        {mentors.map((mentor, index) => (
          <SwipeCard
            key={mentor.id}
            mentor={mentor}
            isTop={index === mentors.length - 1}
            onSwipe={(dir) => handleSwipe(mentor.id, dir)}
          />
        ))}
      </AnimatePresence>
      
      {mentors.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/[0.02] border border-white/5 rounded-[3rem]">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-4xl animate-pulse">🧠</div>
          <h3 className="text-2xl font-bold text-white mb-2 font-space">Neural Exhaustion</h3>
          <p className="text-gray-500 font-medium">No more matches in your current sector. Try broadening your sync parameters.</p>
        </div>
      )}
    </div>
  );
};

interface SwipeCardProps {
  mentor: Mentor;
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwipeCard = ({ mentor, isTop, onSwipe }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const colorRight = useTransform(x, [0, 150], ["rgba(34, 211, 238, 0)", "rgba(34, 211, 238, 0.2)"]);
  const colorLeft = useTransform(x, [0, -150], ["rgba(239, 68, 68, 0)", "rgba(239, 68, 68, 0.2)"]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) onSwipe('right');
    else if (info.offset.x < -100) onSwipe('left');
  };

  if (!isTop) {
      return (
        <div className="absolute inset-0 pointer-events-none transform scale-95 translate-y-4 opacity-50 transition-all duration-500">
            <TitanCard glowColor={mentor.glow} className={cn("h-full w-full p-0 overflow-hidden border", mentor.aura)}>
                <div className="h-full w-full bg-slate-900/40" />
            </TitanCard>
        </div>
      )
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing z-50"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <TitanCard 
        glowColor={mentor.glow}
        className={cn("h-full w-full p-0 overflow-hidden border flex flex-col relative", mentor.aura)}
      >
        {/* Dynamic Overlay Glow based on Swipe Direction */}
        <motion.div className="absolute inset-0 pointer-events-none z-10" style={{ backgroundColor: colorRight }} />
        <motion.div className="absolute inset-0 pointer-events-none z-10" style={{ backgroundColor: colorLeft }} />

        {/* Card Header (Visual) */}
        <div className="h-2/3 bg-white/[0.03] relative flex items-center justify-center group">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80 z-10" />
           
           <div className="relative z-20">
              <div className="w-40 h-40 rounded-[3rem] bg-surface-glass border border-white/10 flex items-center justify-center text-6xl font-bold text-white shadow-2xl animate-float">
                {mentor.name[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-slate-900 rounded-full z-30" />
           </div>

           {/* Aura Particles */}
           <div className="absolute inset-x-0 bottom-0 h-32 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent animate-pulse" />
        </div>

        {/* Card Content (Details) */}
        <div className="flex-1 p-8 relative z-20 flex flex-col pt-0">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] font-space">Titan Registered</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 rounded-md">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span className="text-[10px] font-bold text-white">{mentor.rating}</span>
                    </div>
                </div>
                <h3 className="text-3xl font-bold text-white font-space tracking-tight">{mentor.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{mentor.skill}</p>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-6 font-medium">
               {mentor.bio || "Ex-Google intern, currently leading the Distributed Systems lab. Passionate about helping Titans bridge the gap between theory and code."}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
                {mentor.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-lg text-[9px] font-bold text-gray-400 tracking-widest uppercase">
                      {tag}
                   </span>
                ))}
            </div>
            
            {/* Action Indicators (HUD style) */}
            <div className="absolute bottom-8 right-8 pointer-events-none opacity-20 flex gap-4">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold">X</div>
                    <span className="text-[8px] font-bold font-mono">PASS</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary">&#10003;</div>
                    <span className="text-[8px] font-bold font-mono text-primary">SYNC</span>
                </div>
            </div>
        </div>
      </TitanCard>
    </motion.div>
  );
};
