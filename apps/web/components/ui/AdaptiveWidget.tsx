"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AdaptiveWidgetProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'glow' | 'bioluminescent';
}

export const AdaptiveWidget = ({ 
  children, 
  title, 
  icon, 
  className,
  variant = 'glass' 
}: AdaptiveWidgetProps) => {
  const variantClasses = {
    glass: "glass-card border-white/5",
    glow: "bg-primary/5 border border-primary/20 glow-border",
    bioluminescent: "bg-surface-glass border border-accent/20 [box-shadow:0_0_20px_rgba(34,211,238,0.1)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={cn(
        "rounded-3xl p-6 relative overflow-hidden transition-all duration-300",
        variantClasses[variant],
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {icon && <div className="p-2.5 rounded-xl bg-white/5 text-primary">{icon}</div>}
            {title && <h3 className="text-lg font-bold text-white tracking-tight font-space">{title}</h3>}
          </div>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>
        </div>
      )}

      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Modern Background Texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
    </motion.div>
  );
};
