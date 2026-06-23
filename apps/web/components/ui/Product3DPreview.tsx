"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Product3DPreviewProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const Product3DPreview = ({ children, className, glowColor = "rgba(99, 102, 241, 0.2)" }: Product3DPreviewProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative h-60 w-full rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center p-8 transition-colors group-hover:border-primary/20 ${className}`}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        {children}
      </div>

      {/* Internal Glowing Layer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"
        style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
            transform: "translateZ(-20px)"
        }}
      />
      
      {/* Holographic Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-[2.5rem] overflow-hidden">
        <div className="absolute inset-x-0 h-[2px] bg-white animate-[scan_3s_linear_infinite]" />
      </div>
    </motion.div>
  );
};
