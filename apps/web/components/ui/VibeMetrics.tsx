"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface VibeMetricsProps {
  metrics: {
    label: string;
    value: number; // 0 to 100
    color: string;
  }[];
}

export const VibeMetrics = ({ metrics }: VibeMetricsProps) => {
  return (
    <div className="space-y-4 w-full">
      {metrics.map((metric, i) => (
        <div key={metric.label} className="group/metric">
          <div className="flex justify-between items-end mb-1.5 px-1">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] group-hover/metric:text-white transition-colors font-space">
              {metric.label}
            </span>
            <span className={`text-[10px] font-bold font-mono ${metric.color}`}>
              {metric.value}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metric.value}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: "circOut" }}
              className={`h-full rounded-full shadow-[0_0_10px_currentColor] ${metric.color.replace('text-', 'bg-')}`}
              style={{ color: metric.color.includes('text-') ? undefined : metric.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const RoomBadge = ({ active = false }: { active?: boolean }) => {
    return (
        <div className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border transition-all ${
            active 
            ? 'bg-green-500/10 border-green-500/30 text-green-500 animate-pulse' 
            : 'bg-red-500/10 border-red-500/30 text-red-500'
        }`}>
            {active ? 'Synchronized' : 'Occupied'}
        </div>
    );
};
