export default function FeaturesSection() {
  const scrollToAnalyze = () => {
    document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      title: "Lightning Fast Analysis",
      description:
        "Get comprehensive resume analysis in under 30 seconds with our advanced AI algorithms.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Smart Compatibility Scoring",
      description:
        "AI-powered matching algorithm provides accurate compatibility scores between candidates and job requirements.",
      gradient: "from-blue-400 to-purple-500",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Detailed Insights",
      description:
        "Get comprehensive candidate summaries highlighting strengths, skills, and potential areas of concern.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Auto-Generated Emails",
      description:
        "Professional interview invitation emails generated automatically based on the analysis results.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Secure & Private",
      description:
        "Your data is processed securely with enterprise-grade encryption. No data is stored permanently.",
      gradient: "from-red-400 to-pink-500",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
      title: "Multiple Formats",
      description:
        "Support for various resume formats with intelligent parsing and extraction capabilities.",
      gradient: "from-indigo-400 to-blue-500",
    },
  ];
  return (
    <section
      id="features"
      className="relative py-20 px-4 sm:px-6 lg:px-8 matte-background overflow-hidden"
    >
      {" "}
      {/* Enhanced Cyberpunk Background Elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        {/* Test Animation Visibility - Large Moving Element */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-floating-orb z-20"></div>
        <div className="absolute top-20 right-10 w-2 h-20 bg-purple-400 animate-data-stream-vertical z-20"></div>
        {/* Animated Neural Grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="features-neural-grid"
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
              fill="url(#features-neural-grid)"
            />
          </svg>
        </div>{" "}
        {/* Moving Data Streams */}
        <div className="absolute inset-0">
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-1"
            style={{ left: "8%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-2"
            style={{ left: "16%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-3"
            style={{ left: "24%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-4"
            style={{ left: "32%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-5"
            style={{ left: "40%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-6"
            style={{ left: "48%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-7"
            style={{ left: "56%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-8"
            style={{ left: "64%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-9"
            style={{ left: "72%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-10"
            style={{ left: "80%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-11"
            style={{ left: "88%" }}
          />
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-stream-12"
            style={{ left: "96%" }}
          />
        </div>{" "}
        {/* Diagonal Energy Lines */}
        <div className="absolute inset-0">
          <div
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-1"
            style={{ top: "20%", left: "-10%", transform: "rotate(15deg)" }}
          />
          <div
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-2"
            style={{ top: "35%", left: "-10%", transform: "rotate(15deg)" }}
          />
          <div
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-3"
            style={{ top: "50%", left: "-10%", transform: "rotate(15deg)" }}
          />
          <div
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-4"
            style={{ top: "65%", left: "-10%", transform: "rotate(15deg)" }}
          />
          <div
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-5"
            style={{ top: "80%", left: "-10%", transform: "rotate(15deg)" }}
          />
          <div
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-diagonal-6"
            style={{ top: "95%", left: "-10%", transform: "rotate(15deg)" }}
          />
        </div>{" "}
        {/* Floating Energy Orbs */}
        <div className="absolute inset-0">
          <div
            className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-1"
            style={{ left: "10%", top: "15%" }}
          />
          <div
            className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-2"
            style={{ left: "25%", top: "45%" }}
          />
          <div
            className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-3"
            style={{ left: "60%", top: "25%" }}
          />
          <div
            className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-4"
            style={{ left: "80%", top: "70%" }}
          />
          <div
            className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-5"
            style={{ left: "35%", top: "80%" }}
          />
          <div
            className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-6"
            style={{ left: "70%", top: "55%" }}
          />
          <div
            className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-7"
            style={{ left: "15%", top: "65%" }}
          />
          <div
            className="absolute w-2 h-2 bg-gradient-radial-cyan rounded-full animate-orb-8"
            style={{ left: "90%", top: "35%" }}
          />
        </div>
        {/* Pulsing Circuit Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient
                id="circuit-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" />
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
            <line
              x1="0"
              y1="20%"
              x2="100%"
              y2="20%"
              stroke="url(#circuit-gradient)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="40%"
              x2="100%"
              y2="40%"
              stroke="url(#circuit-gradient)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="60%"
              x2="100%"
              y2="60%"
              stroke="url(#circuit-gradient)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="80%"
              x2="100%"
              y2="80%"
              stroke="url(#circuit-gradient)"
              strokeWidth="1"
            />
          </svg>
        </div>{" "}
        {/* Holographic Scan Lines */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent holographic-scan-1" />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent holographic-scan-2" />
        </div>{" "}
        {/* Matrix Rain Effect */}
        <div className="absolute inset-0">
          {" "}
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-1"
            style={{ left: "6.67%", top: "-20px" }}
          >
            01 10 11
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-2"
            style={{ left: "13.34%", top: "-20px" }}
          >
            10 01 00
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-3"
            style={{ left: "20.01%", top: "-20px" }}
          >
            11 00 01
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-4"
            style={{ left: "26.68%", top: "-20px" }}
          >
            00 11 10
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-5"
            style={{ left: "33.35%", top: "-20px" }}
          >
            01 11 00
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-6"
            style={{ left: "40.02%", top: "-20px" }}
          >
            10 00 11
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-7"
            style={{ left: "46.69%", top: "-20px" }}
          >
            11 01 10
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-8"
            style={{ left: "53.36%", top: "-20px" }}
          >
            00 10 01
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-9"
            style={{ left: "60.03%", top: "-20px" }}
          >
            01 00 11
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-10"
            style={{ left: "66.70%", top: "-20px" }}
          >
            10 11 00
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-11"
            style={{ left: "73.37%", top: "-20px" }}
          >
            11 10 01
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-12"
            style={{ left: "80.04%", top: "-20px" }}
          >
            00 01 11
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-13"
            style={{ left: "86.71%", top: "-20px" }}
          >
            01 11 10
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-14"
            style={{ left: "93.38%", top: "-20px" }}
          >
            10 00 01
          </div>
          <div
            className="absolute text-green-400/50 font-mono text-xs animate-matrix-15"
            style={{ left: "100.05%", top: "-20px" }}
          >
            11 01 00
          </div>
          {/* Test elements for visibility verification */}
          <div className="absolute top-4 left-4 text-cyan-400 animate-orb-1 z-20">
            <div className="w-3 h-3 bg-cyan-400/60 rounded-full"></div>
          </div>
          <div className="absolute top-8 right-8 text-purple-400 animate-data-stream-1 z-20">
            <div className="w-16 h-0.5 bg-purple-400/60"></div>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {" "}
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Cyber Terminal Header */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="matte-glass shiny-border-hover rounded-lg px-4 py-2 font-mono text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">FEATURES</span>
                <div className="w-px h-4 bg-cyan-500/30 mx-2" />
                <span className="text-cyan-300">MODULE_LOADED</span>
              </div>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-slide-up relative">
            <span className="relative">Powerful Features for</span>
            <br />
            <span className="holographic-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-neural-pulse">
              Modern Hiring
            </span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto animate-slide-up delay-200 relative">
            Our AI-powered platform provides everything you need to streamline
            your recruitment process and make data-driven hiring decisions.
            {/* Tech Keywords Floating */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-4 -left-8 text-xs text-cyan-500/30 font-mono animate-neural-pulse">
                AI
              </div>
              <div
                className="absolute -bottom-4 -right-8 text-xs text-purple-500/30 font-mono animate-neural-pulse"
                style={{ animationDelay: "1s" }}
              >
                ML
              </div>
            </div>
          </p>
        </div>{" "}
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group matte-card shiny-border-hover rounded-2xl p-8 transition-all duration-500 hover:transform hover:scale-105 animate-slide-up cyber-glow cyber-pulse relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Neural Activity Indicator */}
              <div className="absolute -top-2 right-2 pb-4 flex space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                <div
                  className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>

              {/* Data Stream Effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-data-stream" />
              </div>

              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 relative`}
              >
                <div className="text-white relative z-10">{feature.icon}</div>
                {/* Icon Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors font-mono relative">
                {feature.title}
                {/* Underline Effect */}
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-500" />
              </h3>

              <p className="text-slate-300 leading-relaxed relative z-10">
                {feature.description}
              </p>

              {/* Terminal Cursor */}
              <div className="absolute bottom-4 right-4 w-2 h-4 bg-green-400 animate-pulse opacity-60" />
            </div>
          ))}
        </div>{" "}
        {/* CTA Section */}
        <div className="text-center mt-16 animate-slide-up delay-500">
          <div className="matte-card shiny-border rounded-2xl p-8 relative overflow-hidden cyber-glow-purple">
            {" "}
            {/* Enhanced Background Particles and Animations */}
            <div className="absolute inset-0 opacity-70">
              {/* Floating Particles */}
              <div className="absolute inset-0">
                <div
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-orb-1 shadow-lg shadow-cyan-400/50"
                  style={{ left: "5%", top: "10%" }}
                />
                <div
                  className="absolute w-2 h-2 bg-purple-400 rounded-full animate-orb-2 shadow-lg shadow-purple-400/50"
                  style={{ left: "15%", top: "70%" }}
                />
                <div
                  className="absolute w-2 h-2 bg-blue-400 rounded-full animate-orb-3 shadow-lg shadow-blue-400/50"
                  style={{ left: "85%", top: "20%" }}
                />
                <div
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-orb-4 shadow-lg shadow-cyan-400/50"
                  style={{ left: "75%", top: "80%" }}
                />
                <div
                  className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full animate-orb-5 shadow-lg shadow-purple-400/50"
                  style={{ left: "35%", top: "15%" }}
                />
                <div
                  className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full animate-orb-6 shadow-lg shadow-blue-400/50"
                  style={{ left: "65%", top: "65%" }}
                />
                <div
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-orb-7 shadow-md shadow-cyan-400/50"
                  style={{ left: "25%", top: "40%" }}
                />
                <div
                  className="absolute w-1 h-1 bg-purple-400 rounded-full animate-orb-8 shadow-md shadow-purple-400/50"
                  style={{ left: "90%", top: "50%" }}
                />
              </div>
              {/* Data Stream Particles */}
              <div className="absolute inset-0">
                <div
                  className="absolute w-0.5 h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-data-stream-1 shadow-sm shadow-cyan-400/50"
                  style={{ left: "20%" }}
                />
                <div
                  className="absolute w-0.5 h-12 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-data-stream-3 shadow-sm shadow-purple-400/50"
                  style={{ left: "50%" }}
                />
                <div
                  className="absolute w-0.5 h-12 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-data-stream-5 shadow-sm shadow-blue-400/50"
                  style={{ left: "80%" }}
                />
              </div>{" "}
              {/* Circuit Traces */}
              <div className="absolute inset-0">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="cta-circuit"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="transparent" />
                      <stop
                        offset="50%"
                        stopColor="#06b6d4"
                        stopOpacity="0.9"
                      />
                      <stop offset="100%" stopColor="transparent" />
                      <animateTransform
                        attributeName="gradientTransform"
                        type="translate"
                        values="-200 0;200 0;-200 0"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </linearGradient>
                    <linearGradient
                      id="cta-circuit-2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="transparent" />
                      <stop
                        offset="50%"
                        stopColor="#8b5cf6"
                        stopOpacity="0.9"
                      />
                      <stop offset="100%" stopColor="transparent" />
                      <animateTransform
                        attributeName="gradientTransform"
                        type="translate"
                        values="200 0;-200 0;200 0"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </linearGradient>
                  </defs>

                  {/* Animated Circuit Lines */}
                  <line
                    x1="0"
                    y1="25%"
                    x2="100%"
                    y2="25%"
                    stroke="url(#cta-circuit)"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="75%"
                    x2="100%"
                    y2="75%"
                    stroke="url(#cta-circuit-2)"
                    strokeWidth="2"
                  />

                  {/* Circuit Nodes */}
                  <circle cx="10%" cy="25%" r="2" fill="#06b6d4" opacity="0.9">
                    <animate
                      attributeName="opacity"
                      values="0.5;1;0.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="90%" cy="25%" r="2" fill="#06b6d4" opacity="0.9">
                    <animate
                      attributeName="opacity"
                      values="0.5;1;0.5"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                  </circle>
                  <circle cx="10%" cy="75%" r="2" fill="#8b5cf6" opacity="0.9">
                    <animate
                      attributeName="opacity"
                      values="0.5;1;0.5"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="0.5s"
                    />
                  </circle>
                  <circle cx="90%" cy="75%" r="2" fill="#8b5cf6" opacity="0.9">
                    <animate
                      attributeName="opacity"
                      values="0.5;1;0.5"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="1.5s"
                    />
                  </circle>
                </svg>
              </div>
              {/* Energy Waves */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div
                    className="absolute w-20 h-20 border-2 border-cyan-400/60 rounded-full animate-cyber-pulse shadow-lg shadow-cyan-400/30"
                    style={{ left: "10%", top: "20%" }}
                  />
                  <div
                    className="absolute w-16 h-16 border-2 border-purple-400/60 rounded-full animate-cyber-pulse shadow-lg shadow-purple-400/30"
                    style={{ left: "80%", top: "60%", animationDelay: "1s" }}
                  />
                  <div
                    className="absolute w-12 h-12 border-2 border-blue-400/60 rounded-full animate-cyber-pulse shadow-lg shadow-blue-400/30"
                    style={{ left: "60%", top: "30%", animationDelay: "2s" }}
                  />
                </div>
              </div>
              {/* Matrix-style Binary Code */}
              <div className="absolute inset-0 font-mono text-sm">
                <div
                  className="absolute text-green-400/80 animate-matrix-1 font-bold"
                  style={{ left: "5%", top: "5%" }}
                >
                  01
                </div>
                <div
                  className="absolute text-green-400/80 animate-matrix-3 font-bold"
                  style={{ left: "92%", top: "8%" }}
                >
                  11
                </div>
                <div
                  className="absolute text-green-400/80 animate-matrix-5 font-bold"
                  style={{ left: "8%", top: "85%" }}
                >
                  10
                </div>
                <div
                  className="absolute text-green-400/80 animate-matrix-7 font-bold"
                  style={{ left: "88%", top: "88%" }}
                >
                  00
                </div>
              </div>{" "}
              {/* Neural Network Pattern */}
              <div className="absolute inset-0 opacity-30">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="cta-neural"
                      x="0"
                      y="0"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="1"
                        fill="#3b82f6"
                        opacity="0.8"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.4;1;0.4"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="r"
                          values="0.5;2;0.5"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <line
                        x1="0"
                        y1="20"
                        x2="40"
                        y2="20"
                        stroke="#8b5cf6"
                        strokeWidth="0.5"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="20"
                        y1="0"
                        x2="20"
                        y2="40"
                        stroke="#06b6d4"
                        strokeWidth="0.5"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </line>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#cta-neural)" />
                </svg>
              </div>
            </div>
            {/* Terminal Header */}
            <div className="inline-flex items-center justify-center mb-6">
              <div className="matte-glass rounded-lg px-4 py-2 font-mono text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-cyan-400 ml-4">transformation.exe</span>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-mono relative">
              <span className="holographic-text bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Transform Your Hiring Process?
              </span>
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
              Join thousands of HR professionals who have already revolutionized
              their recruitment workflow with our AI-powered solution.
            </p>{" "}
            <button
              onClick={scrollToAnalyze}
              className="group relative matte-glass shiny-border-hover text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 cyber-glow cyber-pulse border-glow overflow-hidden cursor-pointer"
            >
              {/* Scanning Line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex items-center space-x-3">
                <div className="w-5 h-5 relative">
                  <svg
                    className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500"
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
                  <div className="absolute inset-0 w-5 h-5 bg-cyan-400/20 rounded-full animate-ping" />
                </div>
                <span className="font-mono">Initialize System</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                  <div
                    className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <div
                    className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  />
                </div>
              </div>
            </button>
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50" />
            <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-purple-400/50" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-purple-400/50" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
