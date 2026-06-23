"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, CookingPot, Utensils, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
  time?: string;
  icon: React.ElementType;
}

interface OrderTimelineProps {
  steps: Step[];
}

export const OrderTimeline = ({ steps }: OrderTimelineProps) => {
  return (
    <div className="relative space-y-8">
      {/* Connector Line */}
      <div className="absolute left-6 top-2 bottom-2 w-[2px] bg-white/5" />
      
      {steps.map((step, i) => (
        <motion.div 
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative flex items-center gap-6 group"
        >
          {/* Icon Node */}
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 border shadow-lg",
            step.status === 'completed' ? "bg-green-500/20 border-green-500/30 text-green-500" :
            step.status === 'current' ? "bg-accent/20 border-accent/30 text-accent animate-pulse shadow-[0_0_15px_rgba(14,165,233,0.3)]" :
            "bg-white/5 border-white/10 text-gray-700"
          )}>
            <step.icon className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
               <h4 className={cn(
                 "text-sm font-bold uppercase font-space tracking-widest transition-colors",
                 step.status === 'pending' ? "text-gray-700" : "text-white"
               )}>{step.label}</h4>
               {step.time && <span className="text-[10px] text-gray-800 font-mono font-bold">{step.time}</span>}
            </div>
            {step.status === 'current' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-accent animate-ping" />
                Live Processing...
              </motion.div>
            )}
            {step.status === 'completed' && <p className="text-[9px] text-gray-700 font-bold uppercase">Sector Handover Verified</p>}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const FoodTag = ({ category }: { category: string }) => {
    const colors: Record<string, string> = {
        'Veg': 'text-green-500 bg-green-500/10 border-green-500/20',
        'Non-Veg': 'text-red-500 bg-red-500/10 border-red-500/20',
        'High Protein': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        'Fast': 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
    };
    
    return (
        <span className={cn(
            "px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest border",
            colors[category] || 'text-gray-500 bg-white/5 border-white/10'
        )}>
            {category}
        </span>
    );
};
