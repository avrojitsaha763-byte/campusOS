"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Plus, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { TitanCard } from '../../../components/ui/TitanCard';
import { GlowButton } from '../../../components/ui/GlowButton';
import { AdaptiveWidget } from '../../../components/ui/AdaptiveWidget';
import { cn } from '../../../lib/utils';

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState('Feed');
  const [feed, setFeed] = useState([
    {
      id: 'post_1',
      author: 'Campus Admin',
      avatar: '🎓',
      type: 'Announcement',
      content: "Final exams scheduled for next week. Please check the portal for room assignments and hall tickets.",
      timestamp: '2h ago',
      likes: 124,
      isOfficial: true,
      hasLiked: false
    },
    {
      id: 'post_2',
      author: 'Rohan Sharma',
      avatar: '👤',
      type: 'Lost & Found',
      content: "Lost my Apple AirPods case near the library today. If found, please dm me. Reward included!",
      timestamp: '5h ago',
      likes: 12,
      isOfficial: false,
      hasLiked: false
    },
    {
      id: 'post_3',
      author: 'Music Club',
      avatar: '🎶',
      type: 'Event',
      content: "Unplugged Night tonight at 7 PM in the amphitheater. Food stalls and live covers! 🎤🔥",
      timestamp: '8h ago',
      likes: 88,
      isOfficial: false,
      hasLiked: true
    }
  ]);

  const toggleLike = (id: string) => {
    setFeed(prev => prev.map(post => 
      post.id === id 
        ? { ...post, likes: post.hasLiked ? post.likes - 1 : post.likes + 1, hasLiked: !post.hasLiked }
        : post
    ));
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-neon-purple mb-3"
          >
            <Zap className="w-5 h-5 fill-neon-purple/20 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-space text-gray-500">Titan Communications</span>
          </motion.div>
          <h1 className="text-4xl font-bold font-space text-white tracking-tight">Social <span className="text-neon-purple glow-text">Hub</span><span className="text-primary">.</span></h1>
          <p className="text-gray-400 mt-2 text-lg font-medium">Connect, share, and stay updated with campus life.</p>
        </div>
        <GlowButton 
          onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
            detail: { message: 'Opening secure decentralised feed composer...', type: 'info' } 
          }))}
          className="gap-2 px-8 py-4 bg-neon-purple/20 border-neon-purple/30 hover:bg-neon-purple/40"
        >
           <Plus className="w-5 h-5" /> Dispatch Update
        </GlowButton>
      </header>

      <nav className="flex items-center gap-4 border-b border-white/5 pb-1">
        {["Feed", "Clubs", "News", "Lost & Found"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all relative",
              activeTab === tab ? "text-neon-purple" : "text-gray-500 hover:text-white"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
              />
            )}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
           <AnimatePresence mode="popLayout">
             {feed.map((post, i) => (
               <motion.div
                 key={post.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
               >
                 <TitanCard className="p-8 bg-white/[0.01] hover:bg-white/[0.03] transition-colors border-white/5 group">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-5">
                         <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-3xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
                           {post.avatar}
                         </div>
                         <div>
                           <h4 className="text-xl font-bold text-white font-space flex items-center gap-2 tracking-tight">
                             {post.author}
                             {post.isOfficial && <Sparkles className="w-4 h-4 text-neon-purple animate-pulse" />}
                           </h4>
                           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{post.timestamp} • {post.type}</p>
                         </div>
                      </div>
                      <button className="text-gray-700 hover:text-white transition-colors">•••</button>
                    </div>

                    <div className="text-gray-300 text-lg leading-relaxed font-medium pl-1">
                       {post.content}
                    </div>

                    <div className="mt-8 flex items-center gap-10 border-t border-white/5 pt-6">
                       <button 
                         onClick={() => toggleLike(post.id)}
                         className={cn(
                           "flex items-center gap-2.5 text-sm font-bold transition-all group/btn",
                           post.hasLiked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"
                         )}
                       >
                          <Heart className={cn("w-5 h-5 transition-transform group-hover/btn:scale-125", post.hasLiked && "fill-pink-500")} />
                          <span className="font-space">{post.likes}</span>
                       </button>
                       <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                            detail: { message: 'Comment section synchronized. Displaying conversation node...', type: 'info' } 
                          }))}
                          className="flex items-center gap-2.5 text-gray-500 hover:text-neon-purple text-sm font-bold transition-all group/btn"
                        >
                           <MessageSquare className="w-5 h-5 group-hover/btn:scale-125 transition-transform" />
                           <span className="font-space">Comment</span>
                        </button>
                        <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('campus-toast', { 
                            detail: { message: 'Asset link copied to system clipboard. Ready to share.', type: 'success' } 
                          }))}
                          className="flex items-center gap-2.5 text-gray-500 hover:text-accent text-sm font-bold transition-all group/btn"
                        >
                           <Share2 className="w-5 h-5 group-hover/btn:scale-125 transition-transform" />
                           <span className="font-space">Share</span>
                        </button>
                    </div>
                 </TitanCard>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <AdaptiveWidget variant="bioluminescent" title="Neural Feed Intelligence">
              <p className="text-gray-400 text-xs leading-relaxed font-medium mb-6">
                Analyzing campus interactions. Supply surge detected in **Event Coverage**. High affinity for **Hall of Fame** rankings.
              </p>
              <div className="space-y-3">
                 {['#FinalExams', '#CampusFest26', '#LibraryRush', '#Hackathon'].map((tag, i) => (
                   <div key={i} className="px-4 py-2.5 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-500 hover:text-neon-purple cursor-pointer transition-colors font-mono uppercase tracking-[0.2em]">
                     {tag}
                   </div>
                 ))}
              </div>
           </AdaptiveWidget>

           <TitanCard className="p-8 bg-neon-purple/5 border-neon-purple/20">
              <h4 className="text-white font-bold font-space mb-4 tracking-tight">Global Sync Status</h4>
              <div className="flex items-center gap-4 text-neon-purple">
                 <div className="w-2 h-2 rounded-full bg-neon-purple animate-ping" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Active Relay: SECTOR_7A</span>
              </div>
           </TitanCard>
        </div>
      </div>
    </div>
  );
}
