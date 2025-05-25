import { useState, useEffect } from 'react';

export default function LoadingOverlay({ isVisible, progress = 0 }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const stages = [
    { 
      icon: "📄", 
      title: "Parsing Resume", 
      description: "Extracting text and analyzing document structure",
      threshold: 20 
    },
    { 
      icon: "🎯", 
      title: "Analyzing Job Requirements", 
      description: "Processing job description and identifying key criteria",
      threshold: 40 
    },
    { 
      icon: "🧠", 
      title: "AI Skill Matching", 
      description: "Comparing qualifications with job requirements",
      threshold: 65 
    },
    { 
      icon: "📊", 
      title: "Generating Insights", 
      description: "Creating detailed compatibility analysis",
      threshold: 85 
    },
    { 
      icon: "✨", 
      title: "Finalizing Results", 
      description: "Preparing comprehensive recommendations",
      threshold: 100 
    }
  ];

  // Determine current stage based on progress prop
  const getCurrentStage = () => {
    for (let i = 0; i < stages.length; i++) {
      if (progress <= stages[i].threshold) {
        return i;
      }
    }
    return stages.length - 1;
  };

  const currentStage = getCurrentStage();

  // Smoothly animate to the actual progress value
  useEffect(() => {
    if (!isVisible) {
      setAnimatedProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setAnimatedProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) {
          return progress;
        }
        return prev + (diff * 0.1);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [progress, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center animate-scale-in shadow-2xl shadow-purple-500/20 max-w-md w-full mx-4">
        
        {/* Enhanced Progress Ring */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            {/* Background circle */}
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
                fill="none"
              />              {/* Progress circle with gradient */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#progressGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(animatedProgress / 100) * 282.7}, 282.7`}
                className="transition-all duration-500 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-1 animate-bounce" style={{ animationDelay: `${currentStage * 0.2}s` }}>
                  {stages[currentStage]?.icon || "🤖"}
                </div>
                <div className="text-lg font-bold text-white">
                  {Math.round(animatedProgress)}%
                </div>
              </div>
            </div>
          </div>

          {/* Floating particles around the progress ring */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float opacity-60"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Stage Information */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-3">
            {stages[currentStage]?.title || "AI Analysis in Progress"}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {stages[currentStage]?.description || "Processing your request..."}
          </p>
        </div>        {/* Progress Steps */}
        <div className="space-y-3 mb-6">
          {stages.map((stage, index) => {
            const isCompleted = progress > stage.threshold;
            const isActive = index === currentStage;
            
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30" 
                    : isActive
                    ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 shadow-lg shadow-blue-500/20"
                    : "bg-slate-700/50 border border-slate-600"
                }`}>
                  {isCompleted ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : isActive ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  ) : (
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  )}
                </div>
                <span className={`text-sm transition-colors duration-500 ${
                  isCompleted || isActive ? "text-white font-medium" : "text-slate-400"
                }`}>
                  {stage.title}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced Processing Indicator */}
        <div className="flex items-center justify-center space-x-3 text-sm">
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-bounce"
                style={{
                  backgroundColor: i === 0 ? '#3B82F6' : i === 1 ? '#8B5CF6' : i === 2 ? '#EC4899' : '#F59E0B',
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>          <span className="text-slate-300 font-medium">
            {progress >= 100 ? "Complete!" : progress >= 85 ? "Almost done..." : "Processing..."}
          </span>
        </div>        {/* Estimated time */}
        <div className="mt-4 text-xs text-slate-400">
          Estimated time remaining: {Math.max(Math.round((100 - progress) / 10), 0)} seconds
        </div>
      </div>
    </div>
  );
}
