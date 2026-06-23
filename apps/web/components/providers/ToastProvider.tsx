"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error' | 'security';
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type?: ToastMessage['type'] }>;
      const newToast: ToastMessage = {
        id: Math.random().toString(36).substring(2, 9),
        message: customEvent.detail.message,
        type: customEvent.detail.type || 'success'
      };

      setToasts(prev => [...prev, newToast]);

      // Auto-remove toast after 4 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 4000);
    };

    window.addEventListener('campus-toast', handleToastEvent);
    return () => window.removeEventListener('campus-toast', handleToastEvent);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let themeClass = "border-sky-500/30 bg-sky-500/5 text-sky-400";
          let prefix = "INFO";

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            themeClass = "border-green-500/30 bg-green-500/5 text-green-400";
            prefix = "SUCCESS";
          } else if (toast.type === 'warning') {
            Icon = AlertCircle;
            themeClass = "border-amber-500/30 bg-amber-500/5 text-amber-400";
            prefix = "WARNING";
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            themeClass = "border-red-500/30 bg-red-500/5 text-red-400";
            prefix = "ERROR";
          } else if (toast.type === 'security') {
            Icon = Sparkles;
            themeClass = "border-primary/40 bg-primary/10 text-primary";
            prefix = "SECURE_SYNC";
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-md flex items-start gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${themeClass}`}
            >
              <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 animate-pulse" />
              <div className="flex-1">
                <span className="text-[9px] font-bold tracking-widest font-mono block opacity-60 mb-0.5">
                  {prefix}
                </span>
                <p className="text-xs font-semibold leading-relaxed text-white">
                  {toast.message}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
