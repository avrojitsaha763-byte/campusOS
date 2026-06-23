import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712", // Deep charcoal/black
        foreground: "#f9fafb",
        primary: {
          DEFAULT: "#6366f1", // Indigo
          hover: "#4f46e5",
          glow: "rgba(99, 102, 241, 0.5)"
        },
        accent: {
          DEFAULT: "#0ea5e9", // Sky blue
          glow: "rgba(14, 165, 233, 0.5)"
        },
        neon: {
          cyan: "#22d3ee",
          pink: "#f472b6",
          purple: "#c084fc",
        },
        surface: {
          DEFAULT: "#0f172a", // Slate-900
          glass: "rgba(15, 23, 42, 0.6)",
          neumorph: "linear-gradient(145deg, #1e293b, #0f172a)",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'titan-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        glass: '16px',
        ultra: '40px',
      },
      animation: {
        'breath': 'breath 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        breath: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
