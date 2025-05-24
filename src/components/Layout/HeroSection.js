import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAnalyze = () => {
    document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Dynamic Cyber Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
        {/* Neural Network Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="neural-grid"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="50" cy="50" r="1" fill="#3b82f6" opacity="0.4">
                  <animate
                    attributeName="opacity"
                    values="0.2;0.8;0.2"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="20" cy="20" r="0.8" fill="#8b5cf6" opacity="0.3">
                  <animate
                    attributeName="opacity"
                    values="0.1;0.6;0.1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="80" cy="30" r="1.2" fill="#ec4899" opacity="0.3">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.9;0.3"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <line
                  x1="20"
                  y1="20"
                  x2="50"
                  y2="50"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    values="0.1;0.4;0.1"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="50"
                  y1="50"
                  x2="80"
                  y2="30"
                  stroke="#8b5cf6"
                  strokeWidth="0.5"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    values="0.1;0.4;0.1"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </line>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-grid)" />
          </svg>
        </div>

        {/* Floating Data Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-particle-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Holographic Scan Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-2 animate-neural-scan" />
        </div>

        {/* Cyber Grid */}
        <div className="absolute inset-0 opacity-10 cyber-grid-animated" />
      </div>{" "}
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* AI Status Terminal */}
        <div
          className={`inline-flex items-center mb-8 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative bg-black/40 backdrop-blur-xl rounded-lg border border-cyan-500/30 px-6 py-3 font-mono">
            {/* Terminal Header */}
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-cyan-400 ml-4">
                neural_interface.exe
              </span>
            </div>

            {/* Status Display */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-bold">ONLINE</span>
              </div>
              <div className="h-4 w-px bg-cyan-500/30" />
              <span className="text-cyan-300">
                AI_CORE: <span className="text-green-400">ACTIVE</span>
              </span>
              <div className="h-4 w-px bg-cyan-500/30" />
              <span className="text-cyan-300">
                PROC:{" "}
                <span className="text-yellow-400 animate-pulse">99.2%</span>
              </span>
            </div>
          </div>
        </div>{" "}
        {/* Main Heading with Holographic Effect */}
        <div
          className={`mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-6 relative">
            <span className="block text-white mb-2 relative">
              Transform Your
              {/* Glitch overlay */}
              <span className="absolute inset-0 text-cyan-400 animate-cyber-glitch opacity-20">
                Transform Your
              </span>
            </span>
            <span className="block relative">
              <span className="holographic-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Hiring Process
              </span>
              {/* Neural Underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse -z-10" />
            </span>
          </h1>

          {/* Floating Accent Elements */}
          <div className="absolute -top-8 -left-8 w-4 h-4 bg-cyan-400 rounded-full animate-particle-burst opacity-60" />
          <div
            className="absolute -top-4 -right-12 w-3 h-3 bg-purple-500 rounded-full animate-particle-burst opacity-60"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute -bottom-4 left-16 w-2 h-2 bg-pink-400 rounded-full animate-particle-burst opacity-60"
            style={{ animationDelay: "2s" }}
          />
        </div>{" "}
        {/* Enhanced Subtitle */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed relative z-10">
              Advanced{" "}
              <span className="text-cyan-400 font-semibold text-glow">
                AI neural networks
              </span>{" "}
              for instant resume screening. Get{" "}
              <span className="text-purple-400 font-semibold">
                compatibility scores
              </span>
              , detailed insights, and streamlined interviews in{" "}
              <span className="text-pink-400 font-semibold animate-pulse">
                nanoseconds
              </span>
              .
            </p>

            {/* Floating Tech Keywords */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 text-xs text-cyan-500/40 font-mono animate-float">
                ML
              </div>
              <div
                className="absolute bottom-0 right-1/4 text-xs text-purple-500/40 font-mono animate-float"
                style={{ animationDelay: "1s" }}
              >
                NLP
              </div>
              <div
                className="absolute top-1/2 left-8 text-xs text-pink-500/40 font-mono animate-float"
                style={{ animationDelay: "2s" }}
              >
                AI
              </div>
              <div
                className="absolute top-1/4 right-8 text-xs text-blue-500/40 font-mono animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                GPU
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Cyberpunk CTA Buttons */}
        <div
          className={`mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Primary Neural CTA */}
            <button
              onClick={scrollToAnalyze}
              className="group relative bg-black/40 backdrop-blur-xl text-white font-bold px-8 py-4 rounded-lg border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 overflow-hidden transform hover:scale-105"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Scanning Line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex items-center space-x-3">
                <div className="w-6 h-6 relative">
                  <svg
                    className="w-6 h-6 text-cyan-400 group-hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div className="absolute inset-0 w-6 h-6 bg-cyan-400/20 rounded-full animate-ping" />
                </div>
                <span className="text-lg">Initialize Neural Scan</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                  <div
                    className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </button>

            {/* Secondary Ghost CTA */}
            <button
              onClick={scrollToFeatures}
              className="group relative bg-transparent backdrop-blur-xl text-white font-semibold px-8 py-4 rounded-lg border border-purple-500/50 hover:border-purple-400 transition-all duration-300 transform hover:scale-105"
            >
              {/* Holographic Border Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span>Explore Systems</span>
              </div>
            </button>
          </div>{" "}
          {/* Cyberpunk Trust Indicators */}
          <div className="flex justify-center items-center mt-8 space-x-8 text-sm">
            {[
              {
                icon: "🛡️",
                text: "Military-Grade Security",
                color: "text-green-400",
              },
              {
                icon: "⚡",
                text: "Quantum Processing",
                color: "text-cyan-400",
              },
              {
                icon: "🎯",
                text: "Neural Precision",
                color: "text-purple-400",
              },
            ].map((item, index) => (
              <div
                key={item.text}
                className={`flex items-center ${item.color} hover:text-white transition-colors duration-300 group`}
              >
                <span className="text-lg mr-2 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="font-medium font-mono text-xs uppercase tracking-wider">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>{" "}
        {/* Neural Network Stats Dashboard */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                value: "99.2%",
                label: "Neural Accuracy",
                gradient: "from-green-400 to-emerald-500",
                icon: "🎯",
                unit: "PROC",
              },
              {
                value: "<15s",
                label: "Quantum Analysis",
                gradient: "from-cyan-400 to-blue-500",
                icon: "⚡",
                unit: "TIME",
              },
              {
                value: "50K+",
                label: "Data Points Analyzed",
                gradient: "from-purple-400 to-pink-500",
                icon: "🧠",
                unit: "DATA",
              },
              {
                value: "95%",
                label: "User Satisfaction",
                gradient: "from-yellow-400 to-orange-500",
                icon: "⭐",
                unit: "RATE",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="relative group bg-black/40 backdrop-blur-xl rounded-lg border border-slate-700/50 p-6 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                {/* Holographic Border */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                    {stat.unit}
                  </span>
                  <span className="text-lg">{stat.icon}</span>
                </div>

                {/* Value */}
                <div
                  className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent relative`}
                >
                  {stat.value}
                  <div className="absolute -right-1 top-0 w-1 h-6 bg-cyan-400 animate-pulse" />
                </div>

                {/* Label */}
                <div className="text-slate-300 text-sm font-medium font-mono">
                  {stat.label}
                </div>

                {/* Neural Activity Indicator */}
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60" />
              </div>
            ))}
          </div>
        </div>{" "}
        {/* Cyberpunk Scroll Indicator */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <p className="text-slate-400 text-sm mb-4 font-mono uppercase tracking-wider">
                :: Scroll to Access More Data ::
              </p>
              
            </div>

            <div className="relative">
              <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full p-1">
                <div className="w-1 h-3 bg-cyan-400 rounded-full mx-auto animate-bounce" />
              </div>

              {/* Data Stream Effect */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex flex-col space-y-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 h-1 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
