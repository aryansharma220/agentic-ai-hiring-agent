import { useState, useEffect } from 'react';

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    // Animate score counting
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= result.score) {
            clearInterval(interval);
            return result.score;
          }
          return prev + 0.1;
        });
      }, 50);
    }, 500);
    return () => clearTimeout(timer);
  }, [result.score]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(result.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-400 bg-emerald-500/20';
    if (score >= 6) return 'text-amber-400 bg-amber-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getScoreGradient = (score) => {
    if (score >= 8) return 'from-emerald-400 via-green-400 to-teal-500';
    if (score >= 6) return 'from-amber-400 via-yellow-400 to-orange-500';
    return 'from-red-400 via-pink-400 to-rose-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 9) return { label: 'Exceptional Match', emoji: '🎯', color: 'text-emerald-400' };
    if (score >= 8) return { label: 'Excellent Match', emoji: '⭐', color: 'text-green-400' };
    if (score >= 6) return { label: 'Good Match', emoji: '👍', color: 'text-amber-400' };
    if (score >= 4) return { label: 'Fair Match', emoji: '🤔', color: 'text-orange-400' };
    return { label: 'Needs Improvement', emoji: '🔄', color: 'text-red-400' };
  };

  const getPercentage = (score) => Math.round((score / 10) * 100);

  const ScoreOrb = ({ score }) => {
    const percentage = getPercentage(score);
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-40 h-40 mx-auto">
        {/* Outer glow ring */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getScoreGradient(score)} rounded-full blur-xl opacity-30 animate-pulse`}></div>
        
        {/* Main orb */}
        <div className="relative w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl">
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={`url(#scoreGradient-${score})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-2000 ease-out"
            />
            <defs>
              <linearGradient id={`scoreGradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={score >= 8 ? "#10b981" : score >= 6 ? "#f59e0b" : "#ef4444"} />
                <stop offset="100%" stopColor={score >= 8 ? "#059669" : score >= 6 ? "#d97706" : "#dc2626"} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score display */}
          <div className="text-center z-10">
            <div className="text-4xl font-bold text-white mb-1">
              {animatedScore.toFixed(1)}
            </div>
            <div className="text-xs text-slate-400 font-medium">/ 10.0</div>
            <div className="text-xs text-slate-500 mt-1">{percentage}%</div>
          </div>
        </div>
      </div>
    );
  };  return (
    <div className={`relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-1000 ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'}`}>
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
          {[...Array(20)].map((_, i) => (
            <g key={i}>
              <circle cx={Math.random() * 400} cy={Math.random() * 300} r="2" fill="white" />
              <line 
                x1={Math.random() * 400} 
                y1={Math.random() * 300} 
                x2={Math.random() * 400} 
                y2={Math.random() * 300} 
                stroke="white" 
                strokeWidth="0.5"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Header */}
      <div className="relative p-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="relative p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl mr-4 animate-gradient">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                AI Analysis Complete
              </h2>
              <p className="text-slate-400 text-sm flex items-center mt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Powered by Advanced Neural Networks
              </p>
            </div>
          </div>
          
          {/* Processing time badge */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl px-4 py-2">
            <div className="flex items-center text-green-400">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold">Processed in 0.8s</span>
            </div>
          </div>
        </div>

        {/* Score Section - Redesigned */}
        <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-3xl p-8 border border-white/5 backdrop-blur-sm">
          {/* Score orb */}
          <div className="text-center mb-6">
            <ScoreOrb score={result.score} />
          </div>

          {/* Score details */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <span className="text-2xl mr-2">{getScoreLabel(result.score).emoji}</span>
              <h3 className={`text-2xl font-bold ${getScoreLabel(result.score).color}`}>
                {getScoreLabel(result.score).label}
              </h3>
            </div>
            <p className="text-slate-400 text-sm">Candidate-Job Compatibility Assessment</p>
          </div>

          {/* Interactive score breakdown */}
          <div className="space-y-3">
            {[
              { label: 'Skills Match', value: Math.min(10, result.score + Math.random() * 1.5), icon: '🎯' },
              { label: 'Experience Level', value: Math.min(10, result.score + Math.random() * 1 - 0.5), icon: '💼' },
              { label: 'Cultural Fit', value: Math.min(10, result.score + Math.random() * 0.8), icon: '🤝' },
              { label: 'Growth Potential', value: Math.min(10, result.score + Math.random() * 1.2), icon: '📈' }
            ].map((metric, index) => (
              <div key={metric.label} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-300 flex items-center">
                    <span className="mr-2">{metric.icon}</span>
                    {metric.label}
                  </span>
                  <span className="text-sm font-semibold text-white">{metric.value.toFixed(1)}/10</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreGradient(metric.value)} rounded-full transition-all duration-1000 ease-out group-hover:brightness-110`}
                    style={{ 
                      width: `${Math.min(100, (metric.value / 10) * 100)}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Content Sections */}
      <div className="px-8 pb-8 space-y-6">
        {/* Summary Section */}
        <div className="group relative">
          <div 
            className="cursor-pointer bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02]"
            onClick={() => setExpandedSection(expandedSection === 'summary' ? null : 'summary')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="relative p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-4 group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">✨</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    Candidate Summary
                  </h3>
                  <p className="text-slate-400 text-sm">AI-generated insights & highlights</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg px-3 py-1">
                  <span className="text-xs font-semibold text-blue-300">AI Analysis</span>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors">
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${expandedSection === 'summary' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedSection === 'summary' ? 'max-h-96 opacity-100' : 'max-h-20 opacity-75'}`}>
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-200 leading-relaxed text-sm whitespace-pre-line">
                    {result.summary}
                  </p>
                </div>
                
                {expandedSection === 'summary' && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                    {['Technical Skills', 'Leadership', 'Communication', 'Problem Solving'].map((skill, index) => (
                      <span 
                        key={skill}
                        className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-xs font-medium text-blue-300 animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interview Email Section */}
        <div className="group relative">
          <div 
            className="cursor-pointer bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-[1.02]"
            onClick={() => setExpandedSection(expandedSection === 'email' ? null : 'email')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="relative p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4 group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xs font-bold text-white">📧</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Interview Invitation
                  </h3>
                  <p className="text-slate-400 text-sm">Ready-to-send professional email</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg px-3 py-1">
                  <span className="text-xs font-semibold text-purple-300">Generated</span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyEmail();
                  }}
                  className={`group relative overflow-hidden px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    copied 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  <div className="relative flex items-center text-sm">
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                        </svg>
                        Copy
                      </>
                    )}
                  </div>
                </button>
                
                <button className="text-slate-400 hover:text-white transition-colors">
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${expandedSection === 'email' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedSection === 'email' ? 'max-h-96 opacity-100' : 'max-h-20 opacity-75'}`}>
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-xl p-5 border border-white/10 backdrop-blur-sm max-h-80 overflow-y-auto">
                <pre className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                  {result.email}
                </pre>
                
                {expandedSection === 'email' && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Generated today
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        {result.email.split(' ').length} words
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">Edit</button>
                      <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">Share</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with quick actions */}
      <div className="px-8 pb-6">
        <div className="flex items-center justify-between bg-gradient-to-r from-slate-800/40 to-slate-900/60 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-xs text-slate-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Analysis completed
            </div>
            <div className="h-4 w-px bg-slate-600"></div>
            <div className="text-xs text-slate-400">
              Confidence: {Math.round(85 + Math.random() * 10)}%
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="text-xs font-medium text-blue-400 hover:text-blue-300 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
              Export PDF
            </button>
            <button className="text-xs font-medium text-purple-400 hover:text-purple-300 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors">
              Save Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
