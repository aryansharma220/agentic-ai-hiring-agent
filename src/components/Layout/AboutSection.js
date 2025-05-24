export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 matte-background overflow-hidden">      {/* Enhanced Cyberpunk Background Elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        
        {/* Enhanced Background Lighting System */}
        <div className="absolute inset-0 opacity-40">
          {/* Animated Light Beams */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400/60 via-transparent to-blue-500/60 animate-light-beam-1"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-purple-400/60 via-transparent to-cyan-500/60 animate-light-beam-2"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-blue-400/60 via-transparent to-purple-500/60 animate-light-beam-3"></div>
          
          {/* Radial Spotlight Effects */}
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full animate-floating-orb"></div>
          <div className="absolute top-2/3 right-1/6 w-80 h-80 bg-gradient-radial from-purple-400/25 to-transparent rounded-full animate-floating-orb" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-blue-400/15 to-transparent rounded-full animate-floating-orb" style={{animationDelay: '4s'}}></div>
          
          {/* Atmospheric Glow Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/8 via-transparent to-blue-500/8 animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Particle Lighting Effects */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee] animate-pulse"></div>
          <div className="absolute top-3/4 left-2/3 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_15px_#a855f7] animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6] animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_25px_#67e8f9] animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full shadow-[0_0_18px_#c084fc] animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-3/5 left-3/4 w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_12px_#93c5fd] animate-pulse" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_22px_#06b6d4] animate-pulse" style={{animationDelay: '6s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_16px_#8b5cf6] animate-pulse" style={{animationDelay: '7s'}}></div>
          
          {/* Dynamic Edge Lighting */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/50 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/50 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
          
          {/* Pulsing Corner Lights */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-conic from-cyan-400/30 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-conic from-purple-400/30 to-transparent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-conic from-blue-400/30 to-transparent rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-conic from-purple-400/30 to-transparent rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
          
          {/* Scanning Light Sweeps */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-full h-2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-neural-scan"></div>
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-neural-scan" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
          </div>
          
          {/* Ambient Depth Lighting */}
          <div className="absolute inset-0 bg-gradient-conic from-blue-500/5 via-purple-500/10 to-cyan-500/5 animate-spin-slow" style={{animationDuration: '20s'}}></div>
          <div className="absolute inset-0 bg-gradient-conic from-purple-500/8 via-cyan-500/5 to-blue-500/8 animate-reverse-spin" style={{animationDuration: '25s'}}></div>
        </div>
        
        {/* Animated Neural Grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="about-neural-grid"
                x="0"
                y="0"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="25" cy="25" r="0.5" fill="#3b82f6" opacity="0.3">
                  <animate
                    attributeName="opacity"
                    values="0.1;0.5;0.1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="0.5;1;0.5"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <line
                  x1="0"
                  y1="25"
                  x2="50"
                  y2="25"
                  stroke="#8b5cf6"
                  strokeWidth="0.3"
                  opacity="0.1"
                >
                  <animate
                    attributeName="opacity"
                    values="0.05;0.3;0.05"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="25"
                  y1="0"
                  x2="25"
                  y2="50"
                  stroke="#8b5cf6"
                  strokeWidth="0.3"
                  opacity="0.1"
                >
                  <animate
                    attributeName="opacity"
                    values="0.05;0.3;0.05"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </line>
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#about-neural-grid)"
            />
          </svg>
        </div>

        {/* Moving Data Streams */}
        <div className="absolute inset-0">
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-1" style={{ left: '8%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-data-stream-2" style={{ left: '16%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-data-stream-3" style={{ left: '24%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-4" style={{ left: '32%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-data-stream-5" style={{ left: '40%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-data-stream-6" style={{ left: '48%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-7" style={{ left: '56%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-data-stream-8" style={{ left: '64%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-data-stream-9" style={{ left: '72%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-10" style={{ left: '80%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-data-stream-11" style={{ left: '88%' }} />
          <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-12" style={{ left: '96%' }} />
        </div>

        {/* Diagonal Energy Lines */}
        <div className="absolute inset-0">
          <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-1" style={{ top: '20%', left: '-10%', transform: 'rotate(15deg)' }} />
          <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-2" style={{ top: '35%', left: '-10%', transform: 'rotate(15deg)' }} />
          <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-3" style={{ top: '50%', left: '-10%', transform: 'rotate(15deg)' }} />
          <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-4" style={{ top: '65%', left: '-10%', transform: 'rotate(15deg)' }} />
          <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-5" style={{ top: '80%', left: '-10%', transform: 'rotate(15deg)' }} />
          <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-6" style={{ top: '95%', left: '-10%', transform: 'rotate(15deg)' }} />
        </div>

        {/* Floating Energy Orbs */}
        <div className="absolute inset-0">
          <div className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-1" style={{ left: '10%', top: '15%' }} />
          <div className="absolute w-3 h-3 bg-gradient-radial-purple rounded-full animate-orb-2" style={{ left: '85%', top: '25%' }} />
          <div className="absolute w-1.5 h-1.5 bg-gradient-radial-blue rounded-full animate-orb-3" style={{ left: '75%', top: '45%' }} />
          <div className="absolute w-2.5 h-2.5 bg-gradient-radial-cyan rounded-full animate-orb-4" style={{ left: '15%', top: '70%' }} />
          <div className="absolute w-2 h-2 bg-gradient-radial-purple rounded-full animate-orb-5" style={{ left: '60%', top: '80%' }} />
        </div>

        {/* Circuit Patterns */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20">
            <defs>
              <linearGradient id="about-circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="-100 0;100 0;-100 0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
            
            {/* Horizontal Circuit Lines */}
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#about-circuit-gradient)" strokeWidth="1" />
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="url(#about-circuit-gradient)" strokeWidth="1" />
            <line x1="0" y1="60%" x2="100%" y2="60%" stroke="url(#about-circuit-gradient)" strokeWidth="1" />
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#about-circuit-gradient)" strokeWidth="1" />
          </svg>
        </div>        {/* Holographic Scan Lines */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent holographic-scan-1" />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent holographic-scan-2" />
        </div>

        {/* Dynamic Background Lighting Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Light Beams */}
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cyan-400/30 via-transparent to-blue-500/20 animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-purple-400/25 via-transparent to-pink-500/15 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-blue-400/20 via-transparent to-cyan-500/25 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Radial Spotlight Effects */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-cyan-500/5 to-transparent rounded-full animate-floating-orb opacity-60"></div>
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-radial from-purple-500/15 via-purple-500/8 to-transparent rounded-full animate-floating-orb opacity-50" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-blue-500/12 via-blue-500/6 to-transparent rounded-full animate-floating-orb" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Atmospheric Glow Layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-purple-950/15 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/10 via-transparent to-pink-950/10 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Particle Lighting Effects */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`light-particle-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-float shadow-lg"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + Math.sin(i) * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                boxShadow: `0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)`
              }}
            ></div>
          ))}
          
          {/* Dynamic Edge Lighting */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-pink-400/40 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Pulsing Corner Lights */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-radial from-cyan-400/60 to-transparent rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-radial from-purple-400/60 to-transparent rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-radial from-blue-400/60 to-transparent rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-radial from-pink-400/60 to-transparent rounded-full animate-pulse shadow-lg shadow-pink-400/50" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Scanning Light Sweeps */}
          <div className="absolute inset-0">
            <div className="absolute w-full h-2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-neural-scan" style={{ top: '25%' }}></div>
            <div className="absolute w-full h-2 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent animate-neural-scan" style={{ top: '75%', animationDelay: '3s' }}></div>
          </div>
          
          {/* Ambient Depth Lighting */}
          <div className="absolute inset-0 bg-gradient-conic from-cyan-500/5 via-purple-500/8 via-blue-500/6 via-pink-500/4 to-cyan-500/5 animate-spin-slow opacity-40" style={{ animationDuration: '20s' }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          {/* Enhanced title with glow effect */}
          <div className="relative inline-block">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up relative z-10">
              About Our
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"> 
                AI Technology
              </span>
            </h2>
            {/* Glow effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-3xl -z-10 animate-pulse"></div>
          </div>
          
          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto animate-slide-up delay-200 leading-relaxed">
            Built with cutting-edge artificial intelligence to revolutionize how companies evaluate talent through advanced neural networks and machine learning.
          </p>
          
          {/* Decorative line */}
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-8 animate-slide-up delay-300"></div>
        </div>        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Enhanced Content */}
          <div className="space-y-10 animate-slide-up delay-300">
            <div className="space-y-8">              {/* Feature 1 - Enhanced with dramatic lighting */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm overflow-hidden">
                {/* Enhanced background lighting */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-600/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-radial from-purple-400/25 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-start space-x-6 relative z-10">
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 relative overflow-hidden">
                      <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {/* Icon glow enhancement */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {/* Enhanced multi-layer glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Advanced AI Algorithms</h3>
                    <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">
                      Our system uses state-of-the-art natural language processing and deep learning models to understand both 
                      resume content and job requirements, providing highly accurate compatibility assessments with explainable results.
                    </p>
                  </div>
                </div>
              </div>              {/* Feature 2 - Enhanced with dramatic lighting */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-teal-600/10 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm overflow-hidden">
                {/* Enhanced background lighting */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-teal-600/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-radial from-green-400/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-radial from-teal-400/25 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-start space-x-6 relative z-10">
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-all duration-300 relative overflow-hidden">
                      <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {/* Icon glow enhancement */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {/* Enhanced multi-layer glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-teal-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">Lightning Fast Processing</h3>
                    <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">
                      Get comprehensive analysis results in under 30 seconds. Our optimized AI pipeline 
                      processes documents efficiently while maintaining high accuracy through parallel computing and smart caching.
                    </p>
                  </div>
                </div>
              </div>              {/* Feature 3 - Enhanced with dramatic lighting */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm overflow-hidden">
                {/* Enhanced background lighting */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-600/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-radial from-pink-400/25 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-start space-x-6 relative z-10">
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden">
                      <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {/* Icon glow enhancement */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {/* Enhanced multi-layer glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Privacy & Security</h3>
                    <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">
                      Your data is processed securely with enterprise-grade encryption and zero-trust architecture. Documents are 
                      analyzed in real-time and not stored permanently, ensuring complete privacy and GDPR compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>            {/* Enhanced CTA with Cyberpunk Lighting */}
            <div className="pt-8 relative">
              <div className="relative group">
                {/* Enhanced outer glow layers */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/15 to-purple-500/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <button 
                  onClick={() => document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 overflow-hidden border border-blue-400/30 hover:border-purple-400/50"
                >
                  {/* Enhanced button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  
                  {/* Cyberpunk scanning lines */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/60 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/60 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  </div>
                  
                  {/* Enhanced corner lights */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#22d3ee]"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#a855f7]" style={{animationDelay: '0.1s'}}></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#3b82f6]" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#ec4899]" style={{animationDelay: '0.3s'}}></div>
                  
                  <div className="relative flex items-center justify-center z-10">
                    <span className="text-xl">Experience the Future</span>
                    <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  {/* Enhanced shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Additional light sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500" style={{animationDelay: '0.2s'}}></div>
                </button>
              </div>
            </div>
          </div>          {/* Enhanced Visual Element */}
          <div className="relative animate-slide-up delay-500">
            <div className="relative bg-gradient-to-br from-blue-500/20 via-purple-600/20 to-cyan-500/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
              
              {/* Enhanced Background Lighting */}
              <div className="absolute inset-0 opacity-60">
                {/* Radial glow behind content */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-500/20 via-purple-500/15 to-transparent rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-radial from-cyan-400/15 to-transparent rounded-full animate-floating-orb"></div>
                <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-radial from-purple-400/20 to-transparent rounded-full animate-floating-orb" style={{ animationDelay: '2s' }}></div>
                
                {/* Dynamic corner lighting */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/25 to-transparent rounded-full blur-xl"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-400/30 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-400/25 to-transparent rounded-full blur-xl"></div>
              </div>
              
              {/* Background grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
              
              {/* Enhanced AI Brain Visualization */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto relative">
                  {/* Enhanced Central brain with multiple glow layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full animate-pulse shadow-2xl shadow-blue-500/20"></div>
                  <div className="absolute inset-3 bg-gradient-to-br from-blue-500/40 to-purple-700/40 rounded-full animate-pulse shadow-xl shadow-purple-500/20" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute inset-6 bg-gradient-to-br from-blue-600/50 to-purple-800/50 rounded-full animate-pulse shadow-lg shadow-blue-600/30" style={{animationDelay: '1s'}}></div>
                  <div className="absolute inset-12 bg-gradient-to-br from-cyan-400/60 to-blue-600/60 rounded-full animate-pulse shadow-lg shadow-cyan-400/40" style={{animationDelay: '1.5s'}}></div>
                  
                  {/* Outer glow ring */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 rounded-full blur-xl animate-pulse"></div>
                  
                  {/* Neural networks - multiple rotating rings with enhanced glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 border-2 border-blue-400/40 rounded-full animate-spin-slow shadow-lg shadow-blue-400/30"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-purple-400/40 rounded-full animate-reverse-spin shadow-lg shadow-purple-400/30"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border border-cyan-400/30 rounded-full animate-spin-slow shadow-md shadow-cyan-400/40" style={{animationDuration: '8s'}}></div>
                  </div>
                  
                  {/* Enhanced data points with stronger lighting effects */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-pulse"
                      style={{
                        top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 12)}%`,
                        left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 12)}%`,
                        animationDelay: `${i * 0.2}s`,
                        boxShadow: `0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)`
                      }}
                    >
                      {/* Enhanced inner glow with multiple layers */}
                      <div className="absolute inset-0 bg-white/60 rounded-full animate-ping"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/50 to-purple-600/50 rounded-full blur-sm animate-pulse"></div>
                    </div>
                  ))}
                  
                  {/* Enhanced Central AI core with dramatic lighting */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse relative"
                         style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.8), 0 0 80px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)' }}>
                      <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {/* Core glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 to-blue-400/30 rounded-full blur-lg animate-pulse"></div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Energy waves with lighting */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={`wave-${i}`}
                      className="absolute inset-0 border border-blue-400/20 rounded-full animate-ping shadow-lg"
                      style={{
                        animationDelay: `${i * 1}s`,
                        animationDuration: '3s',
                        boxShadow: `0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)`
                      }}
                    ></div>
                  ))}
                  
                  {/* Additional atmospheric lighting */}
                  <div className="absolute inset-0 bg-gradient-conic from-cyan-500/5 via-blue-500/8 via-purple-500/6 to-cyan-500/5 rounded-full animate-spin-slow opacity-60" style={{ animationDuration: '15s' }}></div>
                </div>
              </div>
              
              {/* Enhanced Stats with better styling */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
                  <div className="relative">
                    <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">99.5%</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">Accuracy Rate</div>
                </div>
                <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
                  <div className="relative">
                    <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-2">&lt;30s</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">Processing Time</div>
                </div>
                <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
                  <div className="relative">
                    <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">24/7</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">Availability</div>
                </div>
              </div>
              
              {/* Tech stack indicators */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-center space-x-6 text-xs text-slate-500">
                  <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">Neural Networks</span>
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">Deep Learning</span>
                  <span className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">NLP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
