import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/20' 
        : 'bg-black/10 backdrop-blur-lg border-b border-white/5'
    }`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Neural network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1={`${i * 16.67}%`}
              y1="0%"
              x2={`${(i + 1) * 16.67}%`}
              y2="100%"
              stroke="white"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center group">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                {/* Animated logo container */}
                <div className="relative p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl mr-4 group-hover:rotate-6 transition-all duration-300 animate-gradient">
                  <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  
                  {/* Floating particles around logo */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xs font-bold text-white">⚡</span>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                </div>
                
                <div className="text-white">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    AI Hiring Assistant
                  </h1>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <p className="text-xs text-slate-300 hidden sm:block font-medium">
                      Powered by Gemini AI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {[
                { id: 'home', label: 'Home', icon: '🏠' },
                { id: 'features', label: 'Features', icon: '✨' },
                { id: 'analyze', label: 'Analyze', icon: '🎯' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {/* Animated background for active state */}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl animate-pulse"></div>
                  )}
                  
                  <div className="relative flex items-center space-x-2">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
              
              {/* Enhanced CTA Button */}
              <div className="ml-4">
                <button
                  onClick={() => scrollToSection('analyze')}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  
                  <div className="relative flex items-center space-x-2">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-semibold">Get Started</span>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative group p-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'translate-y-2.5'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>      {/* Enhanced Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-up">
          <div className="relative px-4 pt-4 pb-6 space-y-3 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-t border-white/10">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random()}s`
                  }}
                />
              ))}
            </div>

            {[
              { id: 'home', label: 'Home', icon: '🏠', description: 'Back to top' },
              { id: 'features', label: 'Features', icon: '✨', description: 'What we offer' },
              { id: 'analyze', label: 'Analyze', icon: '🎯', description: 'Start analysis' }
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group w-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 hover:from-blue-500/20 hover:to-purple-500/20 border border-white/10 hover:border-blue-400/30 rounded-xl p-4 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white font-semibold text-base">{item.label}</div>
                    <div className="text-slate-400 text-sm">{item.description}</div>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
            
            {/* Mobile CTA Button */}
            <button
              onClick={() => scrollToSection('analyze')}
              className="w-full mt-4 relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] animate-slide-up"
              style={{ animationDelay: '300ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-lg font-bold">Start AI Analysis</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
