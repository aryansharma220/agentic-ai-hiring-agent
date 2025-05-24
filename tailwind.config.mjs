/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'gradient': 'gradient-shift 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'reverse-spin': 'reverse-spin 4s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'rotate-gradient': 'rotate-gradient 4s linear infinite',
        'neural-pulse': 'neural-pulse 2s ease-in-out infinite',
        'data-flow': 'data-flow 3s ease-in-out infinite',
        'orbit': 'orbit 10s linear infinite',
        'matrix-rain': 'matrix-rain 5s linear infinite',
        'slide-right': 'slide-right 1s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'count-up': 'count-up 0.3s ease-out',
        'morphing': 'morphing 8s ease-in-out infinite',
        'glitch': 'glitch 0.3s linear infinite',
        'text-glow': 'text-glow 3s ease-in-out infinite',
        'particle-float': 'particle-float 4s ease-in-out infinite',
        'hologram-flicker': 'hologram-flicker 2s ease-in-out infinite',
        'depth-float': 'depth-float 4s ease-in-out infinite',
        'perspective-rotate': 'perspective-rotate 20s ease-in-out infinite',
        'gradient-enhanced': 'gradient-enhanced 8s ease-in-out infinite',
        'particle-orbital': 'particle-orbital 10s linear infinite',
        'text-hologram': 'text-hologram 3s ease-in-out infinite',
        'quantum-phase': 'quantum-phase 5s ease-in-out infinite',
        'energy-wave': 'energy-wave 2s ease-in-out infinite',
        'dimensional-shift': 'dimensional-shift 15s ease-in-out infinite',
        'neural-scan': 'neural-scan 3s linear infinite',
        'cyber-glitch': 'cyber-glitch 3s ease-in-out infinite',
        'particle-burst': 'particle-burst 1.5s ease-out infinite',
        'cosmic-drift': 'cosmic-drift 15s linear infinite',
        'quantum-tunnel': 'quantum-tunnel 8s ease-in-out infinite',
        'lightning-strike': 'lightning-strike 4s ease-in-out infinite',
        'electromagnetic-field': 'electromagnetic-field 6s ease-in-out infinite',
        'data-stream': 'data-stream 3s linear infinite',
        'holographic-interference': 'holographic-interference 2s ease-in-out infinite',
        'plasma-wave': 'plasma-wave 8s ease-in-out infinite',
      },
      keyframes: {
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 30px rgba(59, 130, 246, 0.5)',
          },
        },
        'reverse-spin': {
          'from': {
            transform: 'rotate(360deg)',
          },
          'to': {
            transform: 'rotate(0deg)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'rotate-gradient': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'neural-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.7',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '1',
          },
        },
        'data-flow': {
          '0%': {
            transform: 'translateX(-100%) translateY(-100%)',
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%) translateY(100%)',
            opacity: '0',
          },
        },
        'orbit': {
          '0%': {
            transform: 'rotate(0deg) translateX(50px) rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(50px) rotate(-360deg)',
          },
        },
        'matrix-rain': {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
        },
        'slide-right': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        'count-up': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'morphing': {
          '0%, 100%': {
            borderRadius: '50% 50% 50% 50% / 50% 50% 50% 50%',
            transform: 'scale(1) rotate(0deg)',
          },
          '25%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'scale(1.1) rotate(90deg)',
          },
          '50%': {
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'scale(0.9) rotate(180deg)',
          },
          '75%': {
            borderRadius: '70% 30% 50% 50% / 40% 70% 60% 30%',
            transform: 'scale(1.05) rotate(270deg)',
          },
        },
        'glitch': {
          '0%, 100%': {
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg)',
          },
          '20%': {
            transform: 'translate(-2px, 2px)',
            filter: 'hue-rotate(90deg)',
          },
          '40%': {
            transform: 'translate(-2px, -2px)',
            filter: 'hue-rotate(180deg)',
          },
          '60%': {
            transform: 'translate(2px, 2px)',
            filter: 'hue-rotate(270deg)',
          },
          '80%': {
            transform: 'translate(2px, -2px)',
            filter: 'hue-rotate(360deg)',
          },
        },
        'text-glow': {
          '0%, 100%': {
            textShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)',
          },
          '50%': {
            textShadow: '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)',
          },
        },
        'particle-float': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '0.3',
          },
          '25%': {
            transform: 'translateY(-20px) scale(1.1)',
            opacity: '0.7',
          },
          '50%': {
            transform: 'translateY(-10px) scale(0.9)',
            opacity: '0.5',
          },
          '75%': {
            transform: 'translateY(-30px) scale(1.2)',
            opacity: '0.8',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
