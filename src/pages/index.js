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
          {/* Advanced Background Effects */}
          <div className="absolute inset-0">
            {/* Primary gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-slate-900/60"></div>
            
            {/* Dynamic particle system */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute rounded-full animate-cosmic-drift opacity-40"
                  style={{
                    width: `${1 + Math.random() * 3}px`,
                    height: `${1 + Math.random() * 3}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `radial-gradient(circle, 
                      hsl(${200 + Math.random() * 80}, 70%, 60%) 0%, 
                      transparent 70%)`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${8 + Math.random() * 15}s`
                  }}
                />
              ))}
            </div>

            {/* Neural network overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <linearGradient id="analysis-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8"/>
                </linearGradient>
                
                <pattern id="analysis-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="url(#analysis-gradient)" opacity="0.6"/>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="url(#analysis-gradient)" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#analysis-grid)" />
              
              {/* Dynamic connection lines */}
              {[...Array(15)].map((_, i) => (
                <line
                  key={`connection-${i}`}
                  x1={`${(i * 7) % 100}%`}
                  y1={`${(i * 11) % 100}%`}
                  x2={`${((i + 2) * 7) % 100}%`}
                  y2={`${((i + 3) * 11) % 100}%`}
                  stroke="url(#analysis-gradient)"
                  strokeWidth="1"
                  className="animate-neural-scan"
                  style={{ 
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${4 + (i % 3)}s`
                  }}
                />
              ))}
            </svg>

            {/* Floating geometric elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 via-cyan-500/15 to-purple-500/10 rounded-3xl animate-dimensional-shift blur-2xl"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-indigo-500/15 rotate-45 animate-quantum-phase blur-xl" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-teal-500/20 to-emerald-500/15 rounded-full animate-energy-wave blur-sm" style={{ animationDelay: '1.5s' }}></div>
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
