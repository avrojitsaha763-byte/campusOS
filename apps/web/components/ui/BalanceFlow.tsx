"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

interface BalanceFlowProps {
  value: number;
  currency?: string;
  className?: string;
}

export const BalanceFlow = ({ value, currency = "CC", className }: BalanceFlowProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (latest) => setDisplayValue(latest),
      ease: "circOut"
    });
    return () => controls.stop();
  }, [value]);

  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      <motion.span 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-7xl font-bold text-white font-space tracking-tighter glow-text"
      >
        {displayValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </motion.span>
      <span className="text-xl font-bold text-primary tracking-[0.3em] uppercase font-space animate-pulse">
        {currency}
      </span>
    </div>
  );
};

export const FinancialAura = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="absolute inset-0 w-full h-[200%] -top-[50%] animate-[wave_20s_linear_infinite]"
            >
                <path 
                    d="M0 50 Q 25 40 50 50 T 100 50 V 100 H 0 Z" 
                    fill="url(#gold-gradient)" 
                    className="opacity-30"
                />
                <defs>
                    <linearGradient id="gold-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
            <style jsx>{`
                @keyframes wave {
                    0% { transform: translateY(0%) skewY(0deg); }
                    50% { transform: translateY(-10%) skewY(5deg); }
                    100% { transform: translateY(0%) skewY(0deg); }
                }
            `}</style>
        </div>
    );
};
