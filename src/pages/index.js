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
                    {/* Enhanced waiting state card */}
                    <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl border border-white/20 p-12 text-center hover:border-white/40 transition-all duration-700 overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 animate-gradient-enhanced"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="relative mb-8">
                          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-blue-500/20">
                            <svg className="w-16 h-16 text-white animate-depth-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            {/* Icon glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 -z-10 animate-pulse"></div>
                          </div>
                          
                          {/* Orbital particles around icon */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-particle-orbital opacity-60"
                                style={{
                                  animationDelay: `${i * 0.8}s`,
                                  animationDuration: '8s'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                          Analysis Ready
                        </h3>
                        
                        <p className="text-xl text-slate-300 leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-500">
                          Upload your resume and job description to unlock detailed AI-powered insights and compatibility analysis
                        </p>
                        
                        {/* Feature highlights */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          {[
                            { icon: '🧠', label: 'AI Analysis' },
                            { icon: '⚡', label: 'Instant Results' },
                            { icon: '🎯', label: 'Precision Match' },
                            { icon: '🔒', label: 'Secure Process' }
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-slate-400 group-hover:text-slate-300 transition-colors duration-500">
                              <span className="text-lg">{feature.icon}</span>
                              <span className="font-medium">{feature.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Hover particles */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-particle-burst"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
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
