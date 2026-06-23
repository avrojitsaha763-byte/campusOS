"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Code, 
  Palette, 
  Music, 
  Brain, 
  CheckCircle2,
  RefreshCcw,
  Star
} from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { GlowButton } from '../../../components/ui/GlowButton';
import { MatchStack } from '../../../components/ui/MatchStack';
import { cn } from '../../../lib/utils';

export default function SkillSwapPage() {
  const [learning, setLearning] = useState('');
  const [teaching, setTeaching] = useState('');
  const [mentors, setMentors] = useState<any[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsMatching(true);
      try {
        const res = await fetch('http://localhost:3007/matches/find', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ learningObjective: learning || 'Systems' })
        });
        const json = await res.json();
        if (json.success) {
          setMentors(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch matches:', err);
      } finally {
        setIsMatching(false);
      }
    };

    const timer = setTimeout(fetchMatches, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [learning]);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-neon-purple mb-3"
          >
            <Zap className="w-5 h-5 fill-neon-purple/20 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-space text-gray-500">TITAN COLLABORATION</span>
          </motion.div>
          <h1 className="text-4xl font-bold font-space text-white tracking-tight">Intellectual <span className="text-neon-purple glow-text">SkillSwap</span><span className="text-primary">.</span></h1>
          <p className="text-gray-400 mt-2 text-lg font-medium leading-relaxed max-w-xl">
            Trade your knowledge. Every session is an investment in the campus-wide intelligence network.
          </p>
        </div>
        <GlowButton className="gap-2 px-10 py-5 bg-neon-purple hover:bg-purple-600 rounded-[2rem] text-sm group">
           <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" /> Mint Skill Profile
        </GlowButton>
      </header>

      {/* Discovery Stack (The core of the redesign) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Swippable Match Engine */}
        <div className="lg:col-span-6">
           <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-3">
               <Sparkles className="w-5 h-5 text-neon-purple animate-pulse" />
              <h2 className="text-xl font-bold text-white font-space uppercase tracking-[0.2em] leading-none">Discovery Stack</h2>
             </div>
             <span className="text-[10px] text-gray-700 font-mono">{isMatching ? 'SYNCING_NEURAL_PATH...' : 'SECTOR_LATENCY: 12ms'}</span>
           </div>
           {mentors.length > 0 ? (
             <MatchStack mentors={mentors} />
           ) : (
             <div className="h-[400px] flex items-center justify-center border border-white/5 bg-white/[0.02] rounded-3xl text-gray-600 font-space tracking-widest text-[10px]">INITIALIZING_MATCH_ENGINE...</div>
           )}
        </div>

        {/* Intelligence Filters & Profile */}
        <div className="lg:col-span-6 space-y-8">
          <TitanCard className="p-10 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 relative overflow-hidden group min-h-[450px]">
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-10">
                 <RefreshCcw className="w-5 h-5 text-neon-purple animate-spin-slow" />
                 <h2 className="text-xl font-bold text-white font-space uppercase tracking-widest leading-none">Match Adjustments</h2>
               </div>
               
               <div className="space-y-8">
                 <div className="relative group/input">
                    <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-3 block font-space">Learning Objective</label>
                    <input 
                      value={learning}
                      onChange={(e) => setLearning(e.target.value)}
                      type="text" 
                      placeholder="e.g. Distributed Systems Architecture" 
                      className="w-full bg-white/[0.04] border border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:outline-none focus:border-neon-purple/50 focus:bg-white/[0.06] transition-all font-medium text-lg"
                    />
                    <Code className="absolute right-6 top-12 w-6 h-6 text-gray-700 group-focus-within/input:text-neon-purple transition-colors" />
                 </div>

                 <div className="relative group/input">
                    <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-3 block font-space">Offer Proficiency</label>
                    <input 
                      value={teaching}
                      onChange={(e) => setTeaching(e.target.value)}
                      type="text" 
                      placeholder="e.g. Cinema 4D, Advanced Typography" 
                      className="w-full bg-white/[0.04] border border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:outline-none focus:border-neon-purple/50 focus:bg-white/[0.06] transition-all font-medium text-lg"
                    />
                    <Palette className="absolute right-6 top-12 w-6 h-6 text-gray-700 group-focus-within/input:text-neon-purple transition-colors" />
                 </div>
               </div>

               <div className="mt-12 flex flex-wrap gap-3">
                  {['High Aura', 'Elite Sector', 'Instant Verification', 'System Lab'].map(tag => (
                    <button key={tag} className="px-5 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-bold text-gray-600 hover:text-white hover:border-neon-purple/50 transition-all font-space uppercase tracking-[0.1em]">
                      {tag}
                    </button>
                  ))}
               </div>
             </div>

             {/* Background Aura */}
             <div className="absolute top-[-40%] right-[-20%] w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] animate-breath" />
          </TitanCard>

          <AdaptiveWidget variant="bioluminescent" title="Neural Synchronicity Relay" className="p-10">
             <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-neon-purple/20 flex items-center justify-center border border-neon-purple/30 animate-pulse">
                   <Zap className="w-8 h-8 text-neon-purple glow-text" />
                </div>
                <div className="flex-1">
                   <h3 className="text-2xl font-bold text-white mb-2 font-space">Optimal Match Detected</h3>
                   <p className="text-gray-400 font-medium leading-relaxed mb-6">
                      An 98.4% intellectual match was found for your current sync parameter. **David L.** is currently active in the Systems Lab sector.
                   </p>
                   <GlowButton className="px-8 py-3 bg-white text-black hover:bg-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest">Connect Channel</GlowButton>
                </div>
             </div>
          </AdaptiveWidget>
        </div>

      </div>

      {/* Global Ranking HUD */}
      <TitanCard className="p-12 mt-12 bg-surface-glass border-white/5 relative overflow-hidden group">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div>
               <h3 className="text-3xl font-bold text-white font-space tracking-tight mb-2 uppercase">Titan Aura Leaderboard</h3>
               <p className="text-gray-500 font-medium">Global Ranking of the most influential intellectuals across all campus sectors.</p>
            </div>
            <GlowButton variant="secondary" className="px-8 py-4 border-white/10 text-xs font-bold uppercase tracking-[0.2em] font-space">Enter Hall of Fame</GlowButton>
         </div>
         
         {/* Perspective Scanlines */}
         <div className="absolute inset-x-0 bottom-0 h-[100px] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_0%,rgba(168,85,247,0.05)_100%)]" />
      </TitanCard>
    </div>
  );
}
