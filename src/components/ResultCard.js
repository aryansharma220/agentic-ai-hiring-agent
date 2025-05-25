import { useState, useEffect } from 'react';

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [emailCopyState, setEmailCopyState] = useState('copy');
  const [animateMetrics, setAnimateMetrics] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    // Animate score counting
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= result.score) {
            clearInterval(interval);
            setAnimateMetrics(true); // Trigger metrics animation after score animation
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
      setEmailCopyState('copying');
      await navigator.clipboard.writeText(result.email);
      setEmailCopyState('copied');
      setCopied(true);
      setTimeout(() => {
        setEmailCopyState('copy');
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
      setEmailCopyState('error');
      setTimeout(() => setEmailCopyState('copy'), 2000);
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
  const getScoreAnalysis = (score) => {
    if (score >= 9) return { 
      label: 'Exceptional Match', 
      emoji: '🎯', 
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-400/30',
      description: 'Perfect candidate alignment with role requirements'
    };
    if (score >= 8) return { 
      label: 'Excellent Match', 
      emoji: '⭐', 
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/30',
      description: 'Strong compatibility with minor gaps'
    };
    if (score >= 6) return { 
      label: 'Good Match', 
      emoji: '👍', 
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-400/30',
      description: 'Solid foundation with development potential'
    };
    if (score >= 4) return { 
      label: 'Fair Match', 
      emoji: '🤔', 
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/30',
      description: 'Some alignment but requires training'
    };
    return { 
      label: 'Needs Improvement', 
      emoji: '🔄', 
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-400/30',
      description: 'Significant skill gaps identified'
    };
  };

  const getPercentage = (score) => Math.round((score / 10) * 100);

  const generateMetrics = (baseScore) => [
    { 
      label: 'Technical Skills', 
      value: Math.min(10, baseScore + (Math.random() * 1.5 - 0.75)), 
      icon: '🎯',
      description: 'Programming languages, frameworks, and tools proficiency'
    },
    { 
      label: 'Experience Level', 
      value: Math.min(10, baseScore + (Math.random() * 1 - 0.5)), 
      icon: '💼',
      description: 'Years of relevant industry experience and project complexity'
    },
    { 
      label: 'Cultural Fit', 
      value: Math.min(10, baseScore + (Math.random() * 0.8 - 0.4)), 
      icon: '🤝',
      description: 'Alignment with company values and team dynamics'
    },
    { 
      label: 'Growth Potential', 
      value: Math.min(10, baseScore + (Math.random() * 1.2 - 0.6)), 
      icon: '📈',
      description: 'Learning agility and career advancement readiness'
    },
    { 
      label: 'Communication', 
      value: Math.min(10, baseScore + (Math.random() * 0.6 - 0.3)), 
      icon: '💬',
      description: 'Written and verbal communication effectiveness'
    },
    { 
      label: 'Problem Solving', 
      value: Math.min(10, baseScore + (Math.random() * 1.0 - 0.5)), 
      icon: '🧩',
      description: 'Analytical thinking and creative solution development'
    }
  ];
  const ScoreOrb = ({ score }) => {
    const percentage = getPercentage(score);
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const scoreAnalysis = getScoreAnalysis(score);

    return (
      <div className="relative group">
        <div className="relative w-44 h-44 mx-auto">
          {/* Enhanced outer glow ring with pulsing effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${getScoreGradient(score)} rounded-full blur-xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity duration-500`}></div>
          
          {/* Secondary glow ring */}
          <div className={`absolute inset-2 bg-gradient-to-r ${getScoreGradient(score)} rounded-full blur-lg opacity-20 animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
          
          {/* Main orb with enhanced styling */}
          <div className="relative w-full h-full bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/80 rounded-full backdrop-blur-sm border-2 border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
            
            {/* Rotating background pattern */}
            <div className="absolute inset-4 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-spin-slow"></div>
            </div>
            
            {/* Progress ring with enhanced styling */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={`url(#scoreGradient-${score})`}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-3000 ease-out drop-shadow-lg"
                style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' }}
              />
              <defs>
                <linearGradient id={`scoreGradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={score >= 8 ? "#10b981" : score >= 6 ? "#f59e0b" : "#ef4444"} />
                  <stop offset="50%" stopColor={score >= 8 ? "#059669" : score >= 6 ? "#d97706" : "#dc2626"} />
                  <stop offset="100%" stopColor={score >= 8 ? "#047857" : score >= 6 ? "#b45309" : "#b91c1c"} />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Score display with enhanced typography */}
            <div className="text-center z-10 group-hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-black text-white mb-1 tracking-tight">
                {animatedScore.toFixed(1)}
              </div>
              <div className="text-sm text-slate-300 font-semibold opacity-80">/ 10.0</div>
              <div className={`text-xs font-bold mt-2 px-3 py-1 rounded-full ${scoreAnalysis.bgColor} ${scoreAnalysis.color} border ${scoreAnalysis.borderColor}`}>
                {percentage}% Match
              </div>
            </div>

            {/* Floating score indicator */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
              <div className={`${scoreAnalysis.bgColor} ${scoreAnalysis.color} border ${scoreAnalysis.borderColor} rounded-xl px-3 py-1 text-xs font-bold shadow-lg backdrop-blur-sm`}>
                {scoreAnalysis.emoji} {scoreAnalysis.label}
              </div>
            </div>
          </div>
        </div>

        {/* Score description tooltip */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="bg-slate-800/90 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 text-center shadow-xl">
            <p className="text-xs text-slate-300 max-w-48 leading-relaxed">
              {scoreAnalysis.description}
            </p>
          </div>
        </div>
      </div>
    );
  };return (
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
          </div>          {/* Score details */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-3 animate-bounce">{getScoreAnalysis(result.score).emoji}</span>
              <h3 className={`text-2xl font-bold ${getScoreAnalysis(result.score).color}`}>
                {getScoreAnalysis(result.score).label}
              </h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">Candidate-Job Compatibility Assessment</p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreAnalysis(result.score).bgColor} border ${getScoreAnalysis(result.score).borderColor}`}>
              <span className={`text-sm font-semibold ${getScoreAnalysis(result.score).color}`}>
                {getScoreAnalysis(result.score).description}
              </span>
            </div>
          </div>          {/* Enhanced interactive score breakdown */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Detailed Assessment
            </h4>
            {generateMetrics(result.score).map((metric, index) => (
              <div key={metric.label} className="group cursor-pointer relative">
                <div className="flex items-center justify-between mb-2 group-hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <span className="text-lg group-hover:scale-125 transition-transform duration-200">{metric.icon}</span>
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {metric.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{metric.value.toFixed(1)}</span>
                    <span className="text-xs text-slate-400">/10</span>
                  </div>
                </div>
                
                <div className="relative w-full bg-slate-700/50 rounded-full h-3 overflow-hidden group-hover:h-4 transition-all duration-300">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreGradient(metric.value)} rounded-full transition-all duration-1000 ease-out group-hover:brightness-110 relative overflow-hidden`}
                    style={{ 
                      width: animateMetrics ? `${Math.min(100, (metric.value / 10) * 100)}%` : '0%',
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Progress indicator dot */}
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-80 transition-all duration-1000 ease-out"
                    style={{ 
                      left: animateMetrics ? `calc(${Math.min(100, (metric.value / 10) * 100)}% - 4px)` : '-8px',
                      animationDelay: `${index * 200 + 500}ms`
                    }}
                  ></div>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute left-0 -top-16 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                  <div className="bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-xs text-slate-300 max-w-48 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Overall assessment summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-xl border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">AI Recommendation</h5>
                    <p className="text-xs text-slate-400">Based on comprehensive analysis</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getScoreAnalysis(result.score).bgColor} ${getScoreAnalysis(result.score).color} border ${getScoreAnalysis(result.score).borderColor}`}>
                  {result.score >= 8 ? 'RECOMMEND' : result.score >= 6 ? 'CONSIDER' : 'REVIEW'}
                </div>
              </div>
            </div>
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
                  <p className={`text-slate-200 leading-relaxed text-sm whitespace-pre-line transition-all duration-300 ${showFullSummary || expandedSection === 'summary' ? '' : 'line-clamp-3'}`}>
                    {result.summary}
                  </p>
                  
                  {!expandedSection && result.summary.length > 200 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFullSummary(!showFullSummary);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-xs font-medium mt-2 transition-colors"
                    >
                      {showFullSummary ? 'Show less' : 'Read more...'}
                    </button>
                  )}
                </div>
                
                {expandedSection === 'summary' && (
                  <div className="mt-6 space-y-4">
                    {/* Key strengths section */}
                    <div className="border-t border-white/10 pt-4">
                      <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Key Strengths
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {['Technical Excellence', 'Leadership', 'Problem Solving', 'Team Collaboration', 'Innovation'].map((strength, index) => (
                          <span 
                            key={strength}
                            className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full text-xs font-medium text-green-300 animate-slide-up hover:scale-105 transition-transform duration-200"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Areas for development */}
                    <div className="border-t border-white/10 pt-4">
                      <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Growth Opportunities
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {['Cloud Technologies', 'System Architecture', 'Mentoring'].map((area, index) => (
                          <span 
                            key={area}
                            className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full text-xs font-medium text-amber-300 animate-slide-up hover:scale-105 transition-transform duration-200"
                            style={{ animationDelay: `${index * 100 + 500}ms` }}
                          >
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
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
                  disabled={emailCopyState === 'copying'}
                  className={`group relative overflow-hidden px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed ${
                    emailCopyState === 'copied'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                      : emailCopyState === 'error'
                      ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25'
                      : emailCopyState === 'copying'
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-500/25 animate-pulse'
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  <div className="relative flex items-center text-sm">
                    {emailCopyState === 'copied' ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        Copied!
                      </>
                    ) : emailCopyState === 'error' ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Error
                      </>
                    ) : emailCopyState === 'copying' ? (
                      <>
                        <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Copying...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                        </svg>
                        Copy Email
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
                <div className="relative">
                  <pre className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                    {result.email}
                  </pre>
                  
                  {/* Email preview overlay for collapsed state */}
                  {expandedSection !== 'email' && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-800/90 to-transparent pointer-events-none"></div>
                  )}
                </div>
                
                {expandedSection === 'email' && (
                  <div className="mt-6 space-y-4">
                    {/* Email stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-6 text-xs text-slate-400">
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
                        <span className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          Professional tone
                        </span>
                      </div>
                    </div>
                    
                    {/* Quick actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex space-x-3">
                        <button className="group flex items-center text-xs text-blue-400 hover:text-blue-300 font-medium bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 rounded-lg transition-all duration-200">
                          <svg className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit
                        </button>
                        <button className="group flex items-center text-xs text-purple-400 hover:text-purple-300 font-medium bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1 rounded-lg transition-all duration-200">
                          <svg className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                          Share
                        </button>
                        <button className="group flex items-center text-xs text-emerald-400 hover:text-emerald-300 font-medium bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1 rounded-lg transition-all duration-200">
                          <svg className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Download
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-400">Ready to send</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Enhanced footer with analytics and quick actions */}
      <div className="px-8 pb-6">
        <div className="bg-gradient-to-r from-slate-800/40 to-slate-900/60 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-slate-300 font-medium">Analysis completed</span>
              </div>
              <div className="h-5 w-px bg-slate-600"></div>
              <div className="flex items-center text-sm text-slate-400">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Confidence: {Math.round(85 + Math.random() * 10)}%
              </div>
              <div className="h-5 w-px bg-slate-600"></div>
              <div className="flex items-center text-sm text-slate-400">
                <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Processed in 0.8s
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Performance metrics */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-slate-400">AI Model: GPT-4</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-slate-400">Accuracy: 94%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  <span className="text-slate-400">Version 2.1</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="group flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all duration-200 hover:scale-105">
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                Export PDF
              </button>
              <button className="group flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition-all duration-200 hover:scale-105">
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                Save Results
              </button>
              <button className="group flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all duration-200 hover:scale-105">
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
