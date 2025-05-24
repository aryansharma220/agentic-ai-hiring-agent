export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden min-h-screen">
      {/* Enhanced animated background with dynamic layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-black">
        {/* Dynamic particle system */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary particles */}
          {[...Array(50)].map((_, i) => (
            <div
              key={`primary-${i}`}
              className="absolute rounded-full animate-particle-float opacity-60"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, 
                  hsl(${200 + Math.random() * 60}, 70%, 60%), 
                  hsl(${260 + Math.random() * 60}, 70%, 60%))`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          ))}

          {/* Secondary glowing orbs */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full animate-cosmic-drift opacity-30 blur-sm"
              style={{
                width: `${6 + Math.random() * 12}px`,
                height: `${6 + Math.random() * 12}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, 
                  hsl(${180 + Math.random() * 80}, 80%, 70%) 0%, 
                  transparent 70%)`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 12}s`,
              }}
            />
          ))}
        </div>{" "}
        {/* Enhanced neural network grid with dynamic connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            {/* Advanced gradient definitions */}
            <linearGradient
              id="neural-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
            </linearGradient>

            <radialGradient id="node-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.3" />
            </radialGradient>

            {/* Dynamic pattern */}
            <pattern
              id="cyber-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="url(#neural-gradient)"
                strokeWidth="0.5"
                opacity="0.4"
              />
              <circle
                cx="40"
                cy="40"
                r="2"
                fill="url(#node-gradient)"
                opacity="0.6"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#cyber-grid)" />

          {/* Dynamic neural connections */}
          {[...Array(20)].map((_, i) => {
            const startX = (i * 5) % 100;
            const startY = (i * 7) % 100;
            const endX = ((i + 3) * 5) % 100;
            const endY = ((i + 5) * 7) % 100;

            return (
              <g key={`connection-${i}`}>
                <line
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="url(#neural-gradient)"
                  strokeWidth="1"
                  className="animate-neural-scan"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${3 + (i % 3)}s`,
                  }}
                />
                {/* Neural nodes */}
                <circle
                  cx={`${startX}%`}
                  cy={`${startY}%`}
                  r="3"
                  fill="url(#node-gradient)"
                  className="animate-neural-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </g>
            );
          })}
        </svg>{" "}
        {/* Advanced morphing background shapes with 3D effects */}
        <div className="absolute inset-0">
          {/* Primary morphing shape */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-500/20 rounded-full animate-morphing blur-3xl"></div>

          {/* Secondary shapes with different animations */}
          <div
            className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-tr from-pink-500/15 via-violet-500/20 to-indigo-500/15 rounded-full animate-dimensional-shift blur-2xl"
            style={{ animationDelay: "2s" }}
          ></div>

          <div
            className="absolute top-1/3 left-1/2 w-32 h-32 bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-full animate-quantum-phase blur-xl"
            style={{ animationDelay: "4s" }}
          ></div>

          {/* Floating geometric shapes */}
          <div
            className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/15 rotate-45 animate-perspective-rotate blur-sm"
            style={{ animationDelay: "1s" }}
          ></div>

          <div
            className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-tr from-red-400/20 to-pink-500/15 rounded-lg animate-quantum-tunnel blur-sm"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </div>{" "}
      {/* Main footer content with enhanced design */}
      <div className="relative z-10">
        {/* Top section with revolutionary branding */}
        <div className="px-6 py-24 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced header section */}
            <div className="text-center mb-20">
              <div className="flex justify-center mb-12">
                <div className="group relative">
                  {/* Revolutionary logo design */}
                  <div className="relative p-8 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-[2rem] transform group-hover:scale-110 transition-all duration-700 animate-gradient-enhanced shadow-2xl shadow-blue-500/30">
                    {/* Inner glow effect */}
                    <div className="absolute inset-2 bg-gradient-to-br from-white/10 to-transparent rounded-[1.5rem] animate-holographic-interference"></div>

                    {/* Main icon */}
                    <svg
                      className="w-16 h-16 text-white relative z-10 group-hover:rotate-12 transition-transform duration-500"
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

                    {/* Advanced orbital particles */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-particle-orbital shadow-lg">
                      <span className="text-lg font-bold text-white animate-lightning-strike">
                        ⚡
                      </span>
                    </div>
                    <div
                      className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-particle-orbital"
                      style={{
                        animationDelay: "2s",
                        animationDirection: "reverse",
                      }}
                    >
                      <span className="text-sm font-bold text-white animate-energy-wave">
                        🎯
                      </span>
                    </div>
                    <div
                      className="absolute top-1/2 -right-4 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center animate-particle-orbital"
                      style={{ animationDelay: "4s" }}
                    >
                      <span className="text-xs font-bold text-white">✨</span>
                    </div>

                    {/* Enhanced multi-layer glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 -z-10 animate-plasma-wave"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400 rounded-[2rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 -z-20 animate-electromagnetic-field"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced title with holographic effect */}
              <div className="relative mb-8">
                <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 animate-text-hologram tracking-tight">
                  AI Hiring Assistant
                </h2>
                {/* Holographic reflection */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-blue-100/20 to-purple-100/20 bg-clip-text text-transparent blur-sm opacity-30 animate-hologram-flicker pointer-events-none">
                  AI Hiring Assistant
                </div>
              </div>

              <p
                className="text-2xl text-slate-300 max-w-3xl mx-auto animate-fade-in leading-relaxed font-light"
                style={{ animationDelay: "0.3s" }}
              >
                Revolutionizing recruitment with the power of{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold animate-text-glow">
                  artificial intelligence
                </span>
              </p>

              {/* Dynamic status indicators */}
              <div
                className="flex justify-center items-center space-x-8 mt-8 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center space-x-2 text-emerald-400">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Online</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <div
                    className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <span className="text-sm font-medium">
                    Neural Networks Active
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <div
                    className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <span className="text-sm font-medium">
                    Quantum Processing
                  </span>
                </div>
              </div>
            </div>{" "}
            {/* Revolutionary features grid with 3D cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
              {[
                {
                  icon: "🛡️",
                  title: "Quantum Security",
                  description:
                    "Military-grade encryption with quantum-resistant algorithms protecting your sensitive data",
                  gradient: "from-blue-500 via-cyan-500 to-teal-500",
                  glowColor: "blue",
                  delay: "0s",
                },
                {
                  icon: "⚡",
                  title: "Neural Processing",
                  description:
                    "Advanced neural networks deliver lightning-fast analysis with unprecedented accuracy",
                  gradient: "from-purple-500 via-pink-500 to-rose-500",
                  glowColor: "purple",
                  delay: "0.2s",
                },
                {
                  icon: "🎯",
                  title: "Precision Intelligence",
                  description:
                    "AI-powered insights with machine learning algorithms trained on millions of data points",
                  gradient: "from-emerald-500 via-teal-500 to-cyan-500",
                  glowColor: "emerald",
                  delay: "0.4s",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative perspective-1000 animate-fade-in"
                  style={{ animationDelay: feature.delay }}
                >
                  {/* 3D Card Container */}
                  <div className="relative preserve-3d group-hover:rotate-y-12 transition-all duration-700 transform-gpu">
                    {/* Main Card */}
                    <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 hover:border-white/40 transition-all duration-700 shadow-2xl overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div
                          className={`w-full h-full bg-gradient-to-br ${feature.gradient} opacity-20 animate-gradient-enhanced`}
                        ></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <div
                          className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} mb-8 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg animate-depth-float`}
                        >
                          <span className="text-3xl">{feature.icon}</span>
                          {/* Icon glow effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 -z-10 animate-pulse`}
                          ></div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-500">
                          {feature.title}
                        </h3>

                        <p className="text-slate-300 leading-relaxed text-lg group-hover:text-slate-200 transition-colors duration-500">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover particles */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`absolute w-1 h-1 bg-${feature.glowColor}-400 rounded-full animate-particle-burst`}
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Enhanced glow effects */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 -z-10`}
                      ></div>
                      <div
                        className={`absolute -inset-2 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-1000 -z-20`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>{" "}
            {/* Revolutionary action buttons with advanced effects */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
              <button
                onClick={scrollToTop}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-12 py-6 rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-purple-500/40 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 min-w-[240px]"
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                {/* Button content */}
                <div className="relative flex items-center justify-center space-x-4">
                  <svg
                    className="w-7 h-7 group-hover:-translate-y-1 group-hover:rotate-12 transition-all duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  <span className="text-xl font-bold tracking-wide">
                    Back to Top
                  </span>
                </div>

                {/* Enhanced glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 -z-10 animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 -z-20 animate-electromagnetic-field"></div>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("analyze")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative overflow-hidden bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold px-12 py-6 rounded-2xl backdrop-blur-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:bg-white/10 min-w-[240px]"
              >
                {/* Holographic border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-holographic-interference"></div>

                {/* Button content */}
                <div className="relative flex items-center justify-center space-x-4">
                  <svg
                    className="w-7 h-7 group-hover:rotate-45 group-hover:scale-125 transition-all duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="text-xl font-bold tracking-wide group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                    Try AI Analysis
                  </span>
                </div>

                {/* Particle effects on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-particle-burst"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </button>
            </div>{" "}
            {/* Enhanced tech stack with interactive elements */}
            <div className="border-t border-white/20 pt-16">
              <div className="text-center">
                <p className="text-slate-400 text-2xl mb-8 font-semibold tracking-wide">
                  Powered by cutting-edge technology
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  {[
                    {
                      name: "Next.js",
                      icon: "⚛️",
                      description: "React Framework",
                      color: "from-blue-400 to-cyan-400",
                    },
                    {
                      name: "Tailwind CSS",
                      icon: "🎨",
                      description: "Utility-First CSS",
                      color: "from-teal-400 to-emerald-400",
                    },
                    {
                      name: "Google Gemini AI",
                      icon: "🧠",
                      description: "Advanced AI Model",
                      color: "from-purple-400 to-pink-400",
                    },
                    {
                      name: "React",
                      icon: "⚡",
                      description: "UI Library",
                      color: "from-yellow-400 to-orange-400",
                    },
                  ].map((tech, index) => (
                    <div
                      key={index}
                      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                    >
                      {/* Tech icon with enhanced effects */}
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                      >
                        <span className="text-2xl">{tech.icon}</span>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500 -z-10 animate-pulse`}
                        ></div>
                      </div>

                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-500">
                        {tech.name}
                      </h4>

                      <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors duration-500">
                        {tech.description}
                      </p>

                      {/* Hover glow effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10`}
                      ></div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>{" "}
        {/* Revolutionary bottom section with advanced status display */}
        <div className="border-t border-white/20 bg-black/30 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Company info with enhanced branding */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <div>
                  <p className="text-slate-300 text-lg font-medium">
                    © {currentYear} AI Hiring Assistant
                  </p>
                  <p className="text-slate-400 text-sm">
                    Transforming recruitment with artificial intelligence
                  </p>
                </div>
              </div>

              {/* Enhanced status indicators grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "AI-Powered",
                    color: "bg-blue-400",
                    shadowColor: "shadow-blue-400/50",
                    description: "Neural Networks Active",
                  },
                  {
                    label: "Real-time",
                    color: "bg-emerald-400",
                    shadowColor: "shadow-emerald-400/50",
                    description: "Live Processing",
                  },
                  {
                    label: "Secure",
                    color: "bg-purple-400",
                    shadowColor: "shadow-purple-400/50",
                    description: "Encrypted Data",
                  },
                  {
                    label: "Global",
                    color: "bg-pink-400",
                    shadowColor: "shadow-pink-400/50",
                    description: "Worldwide Access",
                  },
                ].map((status, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="relative mb-2">
                      <div
                        className={`w-3 h-3 ${status.color} rounded-full animate-pulse shadow-lg ${status.shadowColor}`}
                      ></div>
                      <div
                        className={`absolute inset-0 w-3 h-3 ${status.color} rounded-full animate-ping opacity-75`}
                      ></div>
                    </div>
                    <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
                      {status.label}
                    </span>
                    <span className="text-slate-500 text-xs group-hover:text-slate-400 transition-colors duration-300">
                      {status.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional footer features */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 text-slate-400 text-sm mb-4 md:mb-0">
                <span>🌐 Global Infrastructure</span>
                <span>•</span>
                <span>🔒 SOC 2 Compliant</span>
                <span>•</span>
                <span>⚡ 99.9% Uptime</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-slate-400 text-sm">
                  Made with ❤️
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
