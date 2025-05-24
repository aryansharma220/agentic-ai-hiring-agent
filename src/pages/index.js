import { useState } from 'react';
import UploadForm from '../components/UploadForm';
import ResultCard from '../components/ResultCard';
import LoadingOverlay from '../components/LoadingOverlay';
import Notification from '../components/Notification';
import Navbar from '../components/Layout/Navbar';
import HeroSection from '../components/Layout/HeroSection';
import FeaturesSection from '../components/Layout/FeaturesSection';
import AboutSection from '../components/Layout/AboutSection';
import Footer from '../components/Footer';

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const handleAnalysis = async (formData) => {
    setLoading(true);
    setResult(null);
    
    try {
      showNotification('Starting AI analysis...', 'info');
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResult(data);
      showNotification('Analysis completed successfully!', 'success');
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Analysis failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay isVisible={loading} />
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Enhanced Main Analysis Section */}
        <section id="analyze" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Multi-Layer Advanced Background Effects */}
          <div className="absolute inset-0">
            {/* Base gradient with improved depth - darker version */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-indigo-950/90 to-slate-950/98"></div>
            
            {/* Animated gradient overlay - more subtle */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/8 via-transparent via-purple-600/6 to-cyan-600/10 animate-gradient-shift"></div>
            
            {/* Dynamic mesh background - reduced opacity */}
            <div className="absolute inset-0 opacity-15">
              <div 
                className="w-full h-full bg-gradient-to-br from-transparent via-blue-500/5 to-transparent"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 25% 75%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 75% 25%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)
                  `,
                  animation: 'mesh-drift 20s ease-in-out infinite'
                }}
              />
            </div>
            
            {/* Enhanced particle system with multiple layers - darker particles */}
            <div className="absolute inset-0">
              {/* Large ambient particles */}
              {[...Array(25)].map((_, i) => (
                <div
                  key={`large-particle-${i}`}
                  className="absolute rounded-full animate-cosmic-drift opacity-15"
                  style={{
                    width: `${3 + Math.random() * 6}px`,
                    height: `${3 + Math.random() * 6}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `radial-gradient(circle, 
                      hsl(${200 + Math.random() * 80}, 60%, 50%) 0%, 
                      hsl(${200 + Math.random() * 80}, 40%, 30%) 40%,
                      transparent 70%)`,
                    animationDelay: `${Math.random() * 15}s`,
                    animationDuration: `${12 + Math.random() * 20}s`,
                    boxShadow: `0 0 ${1 + Math.random() * 2}px hsl(${200 + Math.random() * 80}, 50%, 40%)`
                  }}
                />
              ))}
              
              {/* Medium particles */}
              {[...Array(35)].map((_, i) => (
                <div
                  key={`medium-particle-${i}`}
                  className="absolute rounded-full animate-cosmic-drift opacity-20"
                  style={{
                    width: `${1.5 + Math.random() * 3}px`,
                    height: `${1.5 + Math.random() * 3}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `radial-gradient(circle, 
                      hsl(${180 + Math.random() * 100}, 55%, 45%) 0%, 
                      transparent 70%)`,
                    animationDelay: `${Math.random() * 12}s`,
                    animationDuration: `${8 + Math.random() * 16}s`
                  }}
                />
              ))}
              
              {/* Small sparkling particles */}
              {[...Array(50)].map((_, i) => (
                <div
                  key={`small-particle-${i}`}
                  className="absolute rounded-full animate-twinkle opacity-25"
                  style={{
                    width: `${0.5 + Math.random() * 1.5}px`,
                    height: `${0.5 + Math.random() * 1.5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `hsl(${200 + Math.random() * 80}, 70%, 60%)`,
                    animationDelay: `${Math.random() * 8}s`,
                    animationDuration: `${2 + Math.random() * 6}s`
                  }}
                />
              ))}
            </div>

        

            {/* Simplified flowing data streams */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Minimal horizontal flowing streams */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`flow-horizontal-${i}`}
                  className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent animate-connection-flow"
                  style={{
                    top: `${25 + i * 25}%`,
                    left: '-100%',
                    width: '200%',
                    animationDelay: `${i * 2}s`,
                    animationDuration: `${8 + (i % 2)}s`
                  }}
                />
              ))}
              
              {/* Minimal vertical flowing streams */}
              {[...Array(2)].map((_, i) => (
                <div
                  key={`flow-vertical-${i}`}
                  className="absolute w-px bg-gradient-to-b from-transparent via-purple-400/25 to-transparent animate-connection-flow"
                  style={{
                    left: `${30 + i * 40}%`,
                    top: '-100%',
                    height: '200%',
                    animationDelay: `${i * 3 + 1}s`,
                    animationDuration: `${10 + i}s`
                  }}
                />
              ))}
            </div>

            {/* Dynamic floating geometric elements - darker opacity */}
            <div className="absolute inset-0">
              {/* Large morphing shapes */}
              <div className="absolute top-16 left-16 w-40 h-40 bg-gradient-to-br from-blue-500/8 via-cyan-500/10 to-purple-500/8 rounded-3xl animate-morph-shape blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-tr from-purple-500/10 via-pink-500/8 to-indigo-500/10 rotate-45 animate-quantum-rotation blur-2xl" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-teal-500/12 to-emerald-500/10 rounded-full animate-energy-pulse blur-xl" style={{ animationDelay: '1s' }}></div>
              
              {/* Medium floating elements */}
              <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-gradient-to-bl from-cyan-400/10 to-blue-600/8 rounded-2xl animate-float-drift" style={{ animationDelay: '3s' }}></div>
              <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-gradient-to-tr from-violet-500/12 to-purple-400/10 rotate-12 animate-gentle-spin" style={{ animationDelay: '4s' }}></div>
              
              {/* Small accent elements */}
              <div className="absolute top-3/4 right-1/4 w-8 h-8 bg-gradient-to-r from-emerald-400/15 to-teal-400/12 rounded-full animate-bounce-soft" style={{ animationDelay: '2.5s' }}></div>
            </div>

            {/* Elegant circle animations */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Large pulsing circle */}
              <div 
                className="absolute w-96 h-96 rounded-full border border-blue-400/20 animate-circle-pulse"
                style={{
                  top: '20%',
                  left: '60%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '8s'
                }}
              ></div>
              
              {/* Medium rotating circle */}
              <div 
                className="absolute w-64 h-64 rounded-full border-2 border-purple-400/15 animate-circle-rotate"
                style={{
                  bottom: '30%',
                  left: '20%',
                  transform: 'translate(-50%, 50%)',
                  animationDuration: '12s'
                }}
              ></div>
              
              {/* Small breathing circle */}
              <div 
                className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/10 to-transparent animate-circle-breathe"
                style={{
                  top: '70%',
                  right: '15%',
                  transform: 'translate(50%, -50%)',
                  animationDuration: '6s'
                }}
              ></div>
            </div>

            {/* Simplified ambient light beams */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Primary vertical beams - reduced count */}
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-light-beam" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-light-beam" style={{ animationDelay: '4s' }}></div>
              
              {/* Primary horizontal beams - reduced count */}
              <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-light-beam-horizontal" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent animate-light-beam-horizontal" style={{ animationDelay: '6s' }}></div>
            </div>

            {/* Depth layers for 3D effect - darker */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/15 to-slate-950/25 animate-depth-breathing"></div>
          </div>

          {/* Main content container */}
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Enhanced header section */}
            <div className="text-center mb-20">
              <div className="relative inline-block mb-8">
                <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 animate-text-hologram tracking-tight">
                  AI Analysis Engine
                </h2>
                {/* Holographic text reflection */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-blue-100/20 to-purple-100/20 bg-clip-text text-transparent blur-sm opacity-30 animate-hologram-flicker pointer-events-none">
                  AI Analysis Engine
                </div>
              </div>
              
              <p className="text-2xl text-slate-300 max-w-4xl mx-auto animate-fade-in leading-relaxed font-light mb-8" style={{ animationDelay: '0.3s' }}>
                Experience the future of recruitment with our advanced <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold animate-text-glow">neural processing</span> technology
              </p>
              
              {/* Real-time status indicators */}
              <div className="flex justify-center items-center space-x-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-emerald-400 font-semibold">Neural Networks Online</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <span className="text-blue-400 font-semibold">AI Processing Ready</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute inset-0 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <span className="text-purple-400 font-semibold">Quantum Analysis</span>
                </div>
              </div>
            </div>

            {/* Enhanced grid layout */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Upload form section */}
              <div className="lg:sticky lg:top-24 animate-slide-up delay-300">
                <div className="relative">
                  {/* Background glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
                  <UploadForm onSubmit={handleAnalysis} loading={loading} />
                </div>
              </div>
              
              {/* Results section */}
              {result ? (
                <div className="lg:mt-0 mt-12 animate-slide-up delay-400">
                  <div className="relative">
                    {/* Background glow effect for results */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
                    <ResultCard result={result} />
                  </div>
                </div>
              ) : (
                <div className="lg:mt-0 mt-12 animate-slide-up delay-400">
                  <div className="relative group">
                    {/* Premium Analysis Ready Card */}
                    <div className="relative bg-gradient-to-br from-slate-900/95 via-indigo-950/85 to-slate-900/95 backdrop-blur-3xl rounded-3xl border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-700 shadow-2xl shadow-blue-500/10">
                      
                      {/* Multi-layer background effects */}
                      <div className="absolute inset-0">
                        {/* Primary gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/25 via-purple-600/20 to-cyan-600/25 animate-gradient-shift"></div>
                        
                        {/* Hexagonal pattern overlay */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="w-full h-full"
                            style={{
                              backgroundImage: `
                                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 25% 75%, rgba(34, 211, 238, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                                conic-gradient(from 0deg at 50% 50%, rgba(59, 130, 246, 0.1) 0deg, transparent 90deg, rgba(139, 92, 246, 0.1) 180deg, transparent 270deg)
                              `,
                              animation: 'mesh-drift 20s ease-in-out infinite'
                            }}
                          ></div>
                        </div>
                        
                        {/* Enhanced particle layer with floating elements */}
                        <div className="absolute inset-0">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={`card-particle-${i}`}
                              className="absolute rounded-full animate-twinkle"
                              style={{
                                width: `${2 + Math.random() * 4}px`,
                                height: `${2 + Math.random() * 4}px`,
                                left: `${15 + Math.random() * 70}%`,
                                top: `${15 + Math.random() * 70}%`,
                                background: `hsl(${200 + Math.random() * 80}, 80%, 65%)`,
                                opacity: 0.6,
                                animationDelay: `${Math.random() * 4}s`,
                                animationDuration: `${2 + Math.random() * 6}s`,
                                boxShadow: `0 0 ${4 + Math.random() * 8}px currentColor`
                              }}
                            />
                          ))}
                          
                          {/* Floating geometric shapes */}
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={`floating-shape-${i}`}
                              className="absolute opacity-20 animate-float"
                              style={{
                                left: `${20 + (i * 12)}%`,
                                top: `${30 + Math.random() * 40}%`,
                                animationDelay: `${i * 0.8}s`,
                                animationDuration: `${4 + Math.random() * 4}s`
                              }}
                            >
                              <div className={`w-3 h-3 ${i % 3 === 0 ? 'rotate-45' : i % 3 === 1 ? 'rounded-full' : 'rotate-12'} bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-sm`}></div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Animated circuit pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <svg width="100%" height="100%" viewBox="0 0 400 300" className="absolute inset-0">
                            <defs>
                              <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6"/>
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8"/>
                              </linearGradient>
                            </defs>
                            
                            <g stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDuration: '3s'}}>
                              <path d="M50 50 L150 50 L150 100 L250 100 L250 150" className="animate-pulse" style={{animationDelay: '0s'}}/>
                              <path d="M100 200 L200 200 L200 120 L300 120" className="animate-pulse" style={{animationDelay: '1s'}}/>
                              <path d="M80 250 L180 250 L180 180 L280 180 L280 80" className="animate-pulse" style={{animationDelay: '2s'}}/>
                              
                              <circle cx="150" cy="50" r="3" fill="url(#circuit-gradient)" className="animate-ping" style={{animationDelay: '0.5s'}}/>
                              <circle cx="250" cy="100" r="3" fill="url(#circuit-gradient)" className="animate-ping" style={{animationDelay: '1.5s'}}/>
                              <circle cx="200" cy="200" r="3" fill="url(#circuit-gradient)" className="animate-ping" style={{animationDelay: '2.5s'}}/>
                            </g>
                          </svg>
                        </div>
                      </div>

                      {/* Main content */}
                      <div className="relative z-10 p-12 text-center">
                        
                        {/* Enhanced icon section */}
                        <div className="relative mb-12">
                          {/* Main icon container */}
                          <div className="relative w-40 h-40 mx-auto">
                            {/* Outer pulsing ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-blue-400/20 animate-spin shadow-lg shadow-blue-500/20" style={{ animationDuration: '25s' }}>
                              <div className="absolute inset-2 rounded-full border border-purple-400/30 animate-pulse"></div>
                            </div>
                            
                            {/* Middle rotating ring with enhanced gradient */}
                            <div className="absolute inset-3 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40 animate-spin shadow-xl shadow-purple-500/30" 
                                 style={{ 
                                   animationDuration: '18s', 
                                   animationDirection: 'reverse',
                                   backgroundClip: 'padding-box',
                                   borderImage: 'linear-gradient(45deg, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.6), rgba(6, 182, 212, 0.6)) 1'
                                 }}>
                              <div className="absolute inset-1 rounded-full bg-slate-900/80 backdrop-blur-sm"></div>
                            </div>
                            
                            {/* Inner circle with enhanced effects */}
                            <div className="absolute inset-6 bg-gradient-to-br from-blue-500/50 via-purple-500/40 to-cyan-500/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-700 shadow-2xl shadow-blue-500/40 hover:shadow-purple-500/50">
                              {/* Enhanced Brain/AI icon with animation */}
                              <div className="relative">
                                <svg className="w-14 h-14 text-white animate-pulse z-10 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'}}>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                
                                {/* Animated neural connections around the brain */}
                                <div className="absolute inset-0">
                                  {[...Array(6)].map((_, i) => (
                                    <div
                                      key={`neural-${i}`}
                                      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                                      style={{
                                        top: `${30 + Math.sin(i * Math.PI / 3) * 20}%`,
                                        left: `${50 + Math.cos(i * Math.PI / 3) * 25}%`,
                                        animationDelay: `${i * 0.3}s`,
                                        animationDuration: '2s'
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                              
                              {/* Enhanced central glow with multiple layers */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-cyan-400/30 rounded-full blur-xl animate-pulse"></div>
                              <div className="absolute inset-2 bg-gradient-to-br from-blue-300/20 via-purple-300/15 to-cyan-300/20 rounded-full blur-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                            </div>
                            
                            {/* Enhanced orbital elements with varied sizes and speeds */}
                            <div className="absolute inset-0">
                              {[...Array(6)].map((_, i) => (
                                <div
                                  key={`orbital-${i}`}
                                  className={`absolute ${i % 2 === 0 ? 'w-2 h-2' : 'w-3 h-3'} bg-gradient-to-r ${
                                    i % 3 === 0 ? 'from-blue-400 to-purple-400' : 
                                    i % 3 === 1 ? 'from-purple-400 to-pink-400' : 
                                    'from-cyan-400 to-blue-400'
                                  } rounded-full opacity-80 animate-spin shadow-lg`}
                                  style={{
                                    top: '50%',
                                    left: '50%',
                                    transformOrigin: `${35 + i * 8}px 0`,
                                    animationDelay: `${i * 1.2}s`,
                                    animationDuration: `${6 + i * 2}s`,
                                    transform: `translateX(-50%) translateY(-50%) rotate(${i * 60}deg) translateY(-${35 + i * 8}px)`,
                                    boxShadow: `0 0 8px currentColor`
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Data flow streams around the icon */}
                            <div className="absolute inset-0">
                              {[...Array(4)].map((_, i) => (
                                <div
                                  key={`stream-${i}`}
                                  className="absolute w-full h-full"
                                  style={{
                                    transform: `rotate(${i * 90}deg)`
                                  }}
                                >
                                  <div
                                    className="absolute w-1 h-8 bg-gradient-to-t from-transparent via-blue-400/60 to-transparent rounded-full animate-pulse"
                                    style={{
                                      top: '10%',
                                      left: '50%',
                                      transform: 'translateX(-50%)',
                                      animationDelay: `${i * 0.5}s`,
                                      animationDuration: '3s'
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Surrounding energy field */}
                          <div className="absolute inset-0 -m-8">
                            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse blur-2xl" style={{animationDuration: '4s'}}></div>
                          </div>
                        </div>
                        
                        {/* Enhanced title with effects */}
                        <div className="mb-6">
                          <h3 className="text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2 tracking-tight">
                            Analysis Ready
                          </h3>
                          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mx-auto rounded-full opacity-70"></div>
                        </div>
                        
                        {/* Enhanced description */}
                        <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-md mx-auto group-hover:text-slate-200 transition-colors duration-500">
                          Upload your documents to experience our next-generation 
                          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"> AI analysis engine</span>
                        </p>
                        
                        {/* Premium feature grid with enhanced effects */}
                        <div className="grid grid-cols-2 gap-8 mb-10">
                          {[
                            { 
                              icon: (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                              ), 
                              label: 'Neural Processing', 
                              color: 'from-blue-400 to-cyan-400',
                              description: 'Advanced AI algorithms'
                            },
                            { 
                              icon: (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              ), 
                              label: 'Instant Results', 
                              color: 'from-yellow-400 to-orange-400',
                              description: 'Lightning-fast analysis'
                            },
                            { 
                              icon: (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ), 
                              label: 'Precision Match', 
                              color: 'from-emerald-400 to-teal-400',
                              description: '99.9% accuracy rate'
                            },
                            { 
                              icon: (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              ), 
                              label: 'Secure Process', 
                              color: 'from-purple-400 to-pink-400',
                              description: 'Enterprise-grade security'
                            }
                          ].map((feature, index) => (
                            <div key={index} className="group/feature relative">
                              <div className="relative p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm hover:backdrop-blur-md">
                                {/* Enhanced background glow */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover/feature:opacity-15 transition-all duration-500 blur-xl`}></div>
                                
                                {/* Animated border overlay */}
                                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover/feature:opacity-30 transition-opacity duration-500`}
                                       style={{
                                         background: `conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent)`,
                                         animation: 'rotate-gradient 3s linear infinite'
                                       }}>
                                  </div>
                                </div>
                                
                                <div className="relative z-10 flex flex-col items-center space-y-4">
                                  {/* Enhanced icon container */}
                                  <div className="relative">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} bg-opacity-20 text-white transition-all duration-500 group-hover/feature:scale-110 group-hover/feature:rotate-3 shadow-lg group-hover/feature:shadow-2xl`}>
                                      {feature.icon}
                                      
                                      {/* Icon glow effect */}
                                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover/feature:opacity-50 transition-opacity duration-500 blur-lg`}></div>
                                    </div>
                                    
                                    {/* Orbiting particles around icon */}
                                    <div className="absolute inset-0 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-500">
                                      {[...Array(3)].map((_, i) => (
                                        <div
                                          key={`particle-${i}`}
                                          className={`absolute w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full animate-spin`}
                                          style={{
                                            top: '50%',
                                            left: '50%',
                                            transformOrigin: `${20 + i * 5}px 0`,
                                            animationDelay: `${i * 0.5}s`,
                                            animationDuration: `${2 + i}s`,
                                            transform: `translateX(-50%) translateY(-50%) rotate(${i * 120}deg) translateY(-${20 + i * 5}px)`
                                          }}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Enhanced text content */}
                                  <div className="text-center">
                                    <span className="text-sm font-bold text-slate-200 group-hover/feature:text-white transition-colors duration-500 block mb-1">
                                      {feature.label}
                                    </span>
                                    <span className="text-xs text-slate-400 group-hover/feature:text-slate-300 transition-colors duration-500 opacity-0 group-hover/feature:opacity-100 transform translate-y-2 group-hover/feature:translate-y-0">
                                      {feature.description}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Progress bar animation on hover */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent overflow-hidden">
                                  <div className={`h-full bg-gradient-to-r ${feature.color} transform -translate-x-full group-hover/feature:translate-x-full transition-transform duration-1000 ease-out`}></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Enhanced call to action indicator */}
                        <div className="relative">
                          <div className="flex items-center justify-center space-x-4 text-slate-400 group-hover:text-slate-300 transition-colors duration-500">
                            {/* Left animated dots with wave effect */}
                            <div className="flex space-x-1">
                              {[...Array(4)].map((_, i) => (
                                <div
                                  key={`left-dot-${i}`}
                                  className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"
                                  style={{ 
                                    animationDelay: `${i * 0.15}s`,
                                    animationDuration: '2s'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Central text with enhanced styling */}
                            <div className="relative px-6 py-2 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-white/10 backdrop-blur-sm">
                              <span className="text-sm font-medium bg-gradient-to-r from-slate-300 to-white bg-clip-text text-transparent">
                                Ready for upload
                              </span>
                              
                              {/* Subtle glow around text */}
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                              
                              {/* Animated border */}
                              <div className="absolute inset-0 rounded-full border border-gradient-to-r from-blue-400/0 via-purple-400/30 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            
                            {/* Right animated dots with wave effect */}
                            <div className="flex space-x-1">
                              {[...Array(4)].map((_, i) => (
                                <div
                                  key={`right-dot-${i}`}
                                  className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"
                                  style={{ 
                                    animationDelay: `${0.6 + i * 0.15}s`,
                                    animationDuration: '2s'
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {/* Floating upload icon */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:-translate-y-2">
                            <svg className="w-5 h-5 text-blue-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Interactive hover effects */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-gradient-to-r from-blue-400/50 via-purple-400/50 to-cyan-400/50 animate-pulse"></div>
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                        
                        {/* Corner accents */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/60 rounded-tl-lg"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/60 rounded-tr-lg"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-lg"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400/60 rounded-br-lg"></div>
                      </div>
                    </div>
                    
                    {/* Enhanced outer glow */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
