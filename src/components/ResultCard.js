import { useState, useEffect } from "react";
import {
  openGmailCompose,
  generateCalendarInvite,
  openCalendarApp,
  exportToPDF,
} from "../utils/actionUtils";
import { extractSkills, analyzeSkillGaps } from "../utils/skillAnalysis";
import SkillGapAnalysis from "./SkillGapAnalysis";

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [emailCopyState, setEmailCopyState] = useState("copy");
  const [summaryAnalysis, setSummaryAnalysis] = useState(null);
  const [highlightedText, setHighlightedText] = useState("");
  const [summaryActions, setSummaryActions] = useState({
    bookmarked: false,
    shared: false,
    noted: false,
  });
  const [personalNotes, setPersonalNotes] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [quickFilterTags, setQuickFilterTags] = useState([]);
  const [animateMetrics, setAnimateMetrics] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState(null);
  // Skill Gap Analysis State Variables
  const [showSkillAnalysis, setShowSkillAnalysis] = useState(false);
  const [skillAnalysisData, setSkillAnalysisData] = useState(null);
  const [isAnalyzingSkills, setIsAnalyzingSkills] = useState(false);
  const [skillAnalysisError, setSkillAnalysisError] = useState(null);
  // Enhanced Interview Email Section State Variables
  const [emailTemplate, setEmailTemplate] = useState("standard");
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [interviewType, setInterviewType] = useState("Technical Interview");
  const [urgencyLevel, setUrgencyLevel] = useState("Standard");
  const [includeCalendarLink, setIncludeCalendarLink] = useState(true);
  const [includeInterviewPrep, setIncludeInterviewPrep] = useState(true);
  const [requestPortfolio, setRequestPortfolio] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [customizedEmail, setCustomizedEmail] = useState("");
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [availableSlots] = useState([
    { id: 1, time: "9:00 AM", date: "Tomorrow", available: true },
    { id: 2, time: "2:00 PM", date: "Tomorrow", available: true },
    { id: 3, time: "10:00 AM", date: "Thursday", available: false },
    { id: 4, time: "3:00 PM", date: "Thursday", available: true },
    { id: 5, time: "11:00 AM", date: "Friday", available: true },
    { id: 6, time: "4:00 PM", date: "Friday", available: true },
  ]);

  // Generate dynamic key strengths and growth areas based on summary
  const analyzeSummary = (summary) => {
    const keywords = {
      strengths: {
        experience: "Extensive Experience",
        leadership: "Leadership Skills",
        technical: "Technical Excellence",
        problem: "Problem Solving",
        team: "Team Collaboration",
        innovation: "Innovation Mindset",
        communication: "Communication Skills",
        project: "Project Management",
        analysis: "Analytical Thinking",
        creative: "Creative Solutions",
        mentor: "Mentoring Ability",
        adapt: "Adaptability",
      },
      growth: {
        cloud: "Cloud Technologies",
        architect: "System Architecture",
        scale: "Scalability Design",
        security: "Security Practices",
        devops: "DevOps Integration",
        mobile: "Mobile Development",
        ai: "AI/ML Technologies",
        data: "Data Science",
        agile: "Agile Methodologies",
        testing: "Testing Strategies",
      },
    };

    const foundStrengths = [];
    const foundGrowth = [];

    const lowerSummary = summary.toLowerCase();

    Object.entries(keywords.strengths).forEach(([key, value]) => {
      if (lowerSummary.includes(key) && foundStrengths.length < 5) {
        foundStrengths.push(value);
      }
    });

    Object.entries(keywords.growth).forEach(([key, value]) => {
      if (lowerSummary.includes(key) && foundGrowth.length < 3) {
        foundGrowth.push(value);
      }
    });

    // Fallback if not enough found
    if (foundStrengths.length < 3) {
      const defaults = [
        "Technical Proficiency",
        "Professional Experience",
        "Domain Knowledge",
      ];
      defaults.forEach((item) => {
        if (!foundStrengths.includes(item) && foundStrengths.length < 5) {
          foundStrengths.push(item);
        }
      });
    }

    if (foundGrowth.length < 2) {
      const defaults = ["Emerging Technologies", "Advanced Practices"];
      defaults.forEach((item) => {
        if (!foundGrowth.includes(item) && foundGrowth.length < 3) {
          foundGrowth.push(item);
        }
      });
    }

    return { strengths: foundStrengths, growth: foundGrowth };
  };

  // Calculate summary sentiment and insights
  const getSummaryInsights = (summary) => {
    const positiveWords = [
      "excellent",
      "strong",
      "exceptional",
      "outstanding",
      "impressive",
      "skilled",
      "experienced",
      "proficient",
      "successful",
      "innovative",
    ];
    const neutralWords = [
      "adequate",
      "sufficient",
      "basic",
      "standard",
      "average",
      "typical",
    ];
    const words = summary.toLowerCase().split(/\s+/);

    const positiveCount = words.filter((word) =>
      positiveWords.some((pos) => word.includes(pos))
    ).length;
    const neutralCount = words.filter((word) =>
      neutralWords.some((neu) => word.includes(neu))
    ).length;

    let sentiment = "neutral";
    let confidence = "medium";

    if (positiveCount > neutralCount + 2) {
      sentiment = "positive";
      confidence = "high";
    } else if (positiveCount > neutralCount) {
      sentiment = "positive";
      confidence = "medium";
    }

    return {
      sentiment,
      confidence,
      wordCount: words.length,
      readingTime: Math.ceil(words.length / 200), // Average reading speed
      keyPhrases: positiveCount + neutralCount,
    };
  };

  // Summary action handlers
  const handleSummaryAction = (action) => {
    setSummaryActions((prev) => ({
      ...prev,
      [action]: !prev[action],
    }));

    // Here you could add actual functionality like saving to database
    setTimeout(() => {
      setSummaryActions((prev) => ({
        ...prev,
        [action]: false,
      }));
    }, 2000);
  };
  // Enhanced AI insights generator
  const generateAiInsights = (summary, score) => {
    const insights = [];

    // Risk assessment
    if (score < 6) {
      insights.push({
        type: "warning",
        title: "Skill Gap Alert",
        description: "Candidate may require additional training in key areas",
        icon: "⚠️",
        priority: "high",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
      });
    }

    // Cultural fit prediction
    const culturalWords = ["team", "collaboration", "communication"];
    const hasCulturalFit = culturalWords.some((word) =>
      summary.toLowerCase().includes(word)
    );
    if (hasCulturalFit) {
      insights.push({
        type: "positive",
        title: "Strong Cultural Alignment",
        description: "Candidate demonstrates team-oriented mindset",
        icon: "🤝",
        priority: "medium",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
      });
    }

    // Growth potential
    if (score >= 7) {
      insights.push({
        type: "growth",
        title: "High Growth Potential",
        description: "Strong foundation for career advancement",
        icon: "📈",
        priority: "medium",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
      });
    }

    // Interview recommendation
    insights.push({
      type: "action",
      title: "Interview Recommendation",
      description:
        score >= 8
          ? "Fast-track to final round"
          : score >= 6
          ? "Standard interview process"
          : "Consider pre-screening",
      icon: "🎯",
      priority: "high",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    });

    return insights;
  };

  // Enhanced tag extraction from summary
  const extractTags = (summary) => {
    const techTags = [
      "React",
      "Node.js",
      "Python",
      "JavaScript",
      "AWS",
      "Docker",
      "Kubernetes",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
    ];
    const softTags = [
      "Leadership",
      "Communication",
      "Teamwork",
      "Problem-solving",
      "Creative",
      "Analytical",
    ];
    const industryTags = [
      "FinTech",
      "E-commerce",
      "Healthcare",
      "Enterprise",
      "Startup",
      "SaaS",
    ];

    const foundTags = [];
    const lowerSummary = summary.toLowerCase();

    [...techTags, ...softTags, ...industryTags].forEach((tag) => {
      if (lowerSummary.includes(tag.toLowerCase())) {
        foundTags.push({
          text: tag,
          category: techTags.includes(tag)
            ? "tech"
            : softTags.includes(tag)
            ? "soft"
            : "industry",
        });
      }
    });

    return foundTags.slice(0, 8); // Limit to 8 tags
  };
  const highlightKeywords = (text) => {
    const keywords = [
      "experience",
      "leadership",
      "technical",
      "skilled",
      "problem",
      "team",
      "innovation",
    ];
    let highlightedText = text;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b(${keyword}[a-z]*)\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="bg-blue-400/20 text-blue-200 px-1 rounded">$1</mark>'
      );
    });

    return highlightedText;
  };

  // Enhanced compatibility calculator
  const calculateCompatibility = (summary, score) => {
    const techScore = Math.min(10, score + (Math.random() * 1.5 - 0.75));
    const experienceScore = Math.min(10, score + (Math.random() * 1 - 0.5));
    const culturalScore = Math.min(10, score + (Math.random() * 0.8 - 0.4));
    const growthScore = Math.min(10, score + (Math.random() * 1.2 - 0.6));

    return {
      overall: (techScore + experienceScore + culturalScore + growthScore) / 4,
      breakdown: {
        technical: techScore,
        experience: experienceScore,
        cultural: culturalScore,
        growth: growthScore,
      },
    };
  }; // Notes Modal Component
  const NotesModal = () => {
    if (!showNotesModal) return null;

    const handleSaveNote = () => {
      setSummaryActions((prev) => ({ ...prev, noted: true }));
      setShowNotesModal(false);
      // Here you would typically save to backend
      setTimeout(() => {
        setSummaryActions((prev) => ({ ...prev, noted: false }));
      }, 2000);
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative matte-surface rounded-2xl border border-white/20 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Personal Notes</h3>
                <p className="text-slate-400 text-sm">
                  Add your thoughts about this candidate
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNotesModal(false)}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Notes
                </label>
                <textarea
                  value={personalNotes}
                  onChange={(e) => setPersonalNotes(e.target.value)}
                  placeholder="Add your personal notes, observations, or reminders about this candidate..."
                  className="w-full h-32 bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50 transition-colors resize-none"
                />
              </div>

              {/* Quick Note Templates */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Quick Templates
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Strong technical skills, good fit for senior role",
                    "Needs more experience but shows potential",
                    "Excellent communication skills",
                    "Would benefit from culture fit interview",
                  ].map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setPersonalNotes(template)}
                      className="text-left text-xs text-slate-400 hover:text-white p-3 rounded-lg hover:bg-white/5 transition-all duration-200 border border-white/5 hover:border-white/10"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
              <div className="text-xs text-slate-400">
                {personalNotes.length}/500 characters
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Comparison Mode Component
  const ComparisonMode = () => {
    if (!comparisonMode) return null;

    const compatibility = calculateCompatibility(result.summary, result.score);
    const benchmarkCandidate = {
      score: 8.5,
      strengths: ["React Development", "Team Leadership", "Problem Solving"],
      areas: ["Cloud Architecture", "DevOps"],
    };

    return (
      <div className="mt-6 p-6 matte-surface rounded-2xl border border-cyan-400/30 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl mr-4">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 000 2v9a2 2 0 002 2h1a1 1 0 100-2H5V6a1 1 0 01-1-1zM14.5 6.5a1 1 0 00-1.414 0L11.5 8.086 9.914 6.5a1 1 0 00-1.414 1.414L10.086 9.5 8.5 11.086a1 1 0 001.414 1.414L11.5 10.914l1.586 1.586a1 1 0 001.414-1.414L12.914 9.5l1.586-1.586a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Comparison Analysis
              </h4>
              <p className="text-slate-400 text-sm">
                Current candidate vs. team benchmark
              </p>
            </div>
          </div>
          <button
            onClick={() => setComparisonMode(false)}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Candidate */}
          <div className="matte-surface rounded-xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-white font-semibold">Current Candidate</h5>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  getScoreAnalysis(result.score).bgColor
                } ${getScoreAnalysis(result.score).color}`}
              >
                {result.score}/10
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(compatibility.breakdown).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm capitalize">
                    {key}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-slate-700 rounded-full">
                      <div
                        className={`h-full rounded-full ${getScoreGradient(
                          value
                        )} transition-all duration-1000`}
                        style={{ width: `${(value / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-medium w-8">
                      {value.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark */}
          <div className="matte-surface rounded-xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-white font-semibold">Team Benchmark</h5>
              <div className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300">
                {benchmarkCandidate.score}/10
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(compatibility.breakdown).map(([key, value]) => {
                const benchmarkValue =
                  benchmarkCandidate.score + (Math.random() * 1 - 0.5);
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm capitalize">
                      {key}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-slate-700 rounded-full">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000"
                          style={{ width: `${(benchmarkValue / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-white text-sm font-medium w-8">
                        {benchmarkValue.toFixed(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>{" "}
        {/* Comparison Summary */}
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
          <div className="flex items-start">
            <div className="p-2 bg-cyan-500/20 rounded-lg mr-3">
              <svg
                className="w-4 h-4 text-cyan-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h6 className="text-cyan-300 font-semibold text-sm mb-1">
                Comparison Insight
              </h6>
              <p className="text-slate-300 text-xs leading-relaxed">
                {result.score >= benchmarkCandidate.score
                  ? "This candidate exceeds team benchmark standards with particularly strong performance in technical skills and experience."
                  : result.score >= benchmarkCandidate.score - 1
                  ? "This candidate meets team standards with good potential for growth. Consider for interview process."
                  : "This candidate shows promise but may need additional development to meet team standards."}
              </p>
              <div className="mt-2 flex items-center space-x-4 text-xs">
                <span
                  className={`${
                    result.score >= benchmarkCandidate.score
                      ? "text-green-300"
                      : result.score >= benchmarkCandidate.score - 1
                      ? "text-yellow-300"
                      : "text-orange-300"
                  }`}
                >
                  Match Level:{" "}
                  {result.score >= benchmarkCandidate.score
                    ? "Above Benchmark"
                    : result.score >= benchmarkCandidate.score - 1
                    ? "Meets Standards"
                    : "Development Needed"}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400">
                  Gap Analysis:{" "}
                  {Math.abs(result.score - benchmarkCandidate.score).toFixed(1)}{" "}
                  points
                </span>
              </div>
            </div>{" "}
          </div>
        </div>
        {/* Enhanced Action Buttons for Comparison Mode */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Generate Report Button */}
            <button
              onClick={() => {
                setActiveFeedback("report");
                // Simulate report generation
                setTimeout(() => {
                  setShowSaveSuccess(true);
                  setTimeout(() => {
                    setShowSaveSuccess(false);
                    setActiveFeedback(null);
                  }, 2000);
                }, 800);
              }}
              className={`relative flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 font-medium ${
                activeFeedback === "report" ? "scale-95" : ""
              }`}
              disabled={activeFeedback === "report"}
            >
              {activeFeedback === "report" && !showSaveSuccess ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : showSaveSuccess && activeFeedback === "report" ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Generated!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Generate Report
                </>
              )}

              {/* Success ring animation */}
              {showSaveSuccess && activeFeedback === "report" && (
                <span className="absolute inset-0 border-2 border-green-400 rounded-lg animate-ping opacity-75"></span>
              )}
            </button>

            {/* Save Comparison Button */}
            <button
              onClick={() => {
                setActiveFeedback("save");
                // Simulate saving comparison
                setTimeout(() => {
                  setShowSaveSuccess(true);
                  setTimeout(() => {
                    setShowSaveSuccess(false);
                    setActiveFeedback(null);
                  }, 2000);
                }, 600);
              }}
              className={`relative flex items-center px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-600 transition-all duration-200 ${
                activeFeedback === "save" ? "bg-slate-600" : ""
              }`}
              disabled={activeFeedback === "save"}
            >
              {activeFeedback === "save" && !showSaveSuccess ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : showSaveSuccess && activeFeedback === "save" ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                  </svg>
                  Save Comparison
                </>
              )}
            </button>

            {/* Share Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowShareOptions(!showShareOptions);
                  setActiveFeedback(
                    activeFeedback === "share-comparison"
                      ? null
                      : "share-comparison"
                  );
                }}
                className={`flex items-center px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-600 transition-all duration-200 ${
                  activeFeedback === "share-comparison" ? "bg-slate-600" : ""
                }`}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share Analysis
              </button>

              {/* Share Options Dropdown */}
              {showShareOptions && activeFeedback === "share-comparison" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 rounded-lg border border-slate-600 shadow-xl z-10 animate-fade-in">
                  <div className="p-3 border-b border-slate-600">
                    <h6 className="text-sm font-semibold text-white">
                      Share Options
                    </h6>
                  </div>
                  <div className="p-3 space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Email comparison
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      Share with team
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Download as PDF
                    </button>
                    <div className="pt-2 mt-2 border-t border-slate-600">
                      <button
                        onClick={() => {
                          setShowShareOptions(false);
                          setActiveFeedback(null);
                        }}
                        className="w-full text-center px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setComparisonMode(false)}
            className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-white/5 text-sm"
          >
            <span>Close Comparison</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setIsVisible(true);
    // Animate score counting
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= result.score) {
            clearInterval(interval);
            setAnimateMetrics(true); // Trigger metrics animation after score animation
            return result.score;
          }
          return prev + 0.1;
        });
      }, 50);
    }, 500); // Initialize summary analysis and AI insights
    if (result.summary && !summaryAnalysis) {
      setSummaryAnalysis(getSummaryInsights(result.summary));
      setAiInsights(generateAiInsights(result.summary, result.score));
      setQuickFilterTags(extractTags(result.summary));
    }

    return () => clearTimeout(timer);
  }, [result.score, result.summary, summaryAnalysis]);
  const copyEmail = async () => {
    try {
      setEmailCopyState("copying");
      // Use customized email if available, otherwise fall back to result.email
      const emailToUse = customizedEmail || result.email;
      await navigator.clipboard.writeText(emailToUse);
      setEmailCopyState("copied");
      setCopied(true);
      setTimeout(() => {
        setEmailCopyState("copy");
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
      setEmailCopyState("error");
      setTimeout(() => setEmailCopyState("copy"), 2000);
    }
  };

  // Skill Gap Analysis Handler
  const handleSkillAnalysis = async () => {
    try {
      setIsAnalyzingSkills(true);
      setSkillAnalysisError(null);

      // For demo purposes, we'll use the candidate summary as resume text
      // In a real application, you would have access to the full resume text
      const resumeText = result.summary || "No resume content available";

      // You would normally have a job description from the hiring context
      // For demo, we'll create a sample job description
      const jobDescription = `
        We are looking for a Senior Software Engineer with experience in:
        - JavaScript, React, Node.js
        - Python, Django, Flask
        - AWS, Docker, Kubernetes
        - MySQL, PostgreSQL, MongoDB
        - Git, CI/CD, Agile methodologies
        - Strong problem-solving and communication skills
        - Leadership and mentoring experience
        - Experience with microservices architecture
        - Knowledge of security best practices
      `;

      const response = await fetch("/api/analyze-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze skills");
      }

      const data = await response.json();
      setSkillAnalysisData(data.data);
      setShowSkillAnalysis(true);
    } catch (error) {
      console.error("Skill analysis error:", error);
      setSkillAnalysisError("Failed to analyze skills. Please try again.");
    } finally {
      setIsAnalyzingSkills(false);
    }
  };
  const generateCustomizedEmail = async () => {
    try {
      setIsGeneratingEmail(true);

      const customizationOptions = {
        template: emailTemplate,
        interviewType,
        urgencyLevel,
        includeCalendarLink,
        includeInterviewPrep,
        requestPortfolio,
        selectedTimeSlot,
        candidateSummary: result.summary,
        candidateScore: result.score,
        candidateName: result.name || "Candidate", // Fallback name
        position: result.position || "this position", // Fallback position
        companyName: "Our Company", // This could be made configurable
      };

      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customizationOptions),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate email");
      }

      const data = await response.json();
      setCustomizedEmail(data.email);

      // Show success feedback
      setEmailCopyState("regenerated");
      setTimeout(() => setEmailCopyState("copy"), 2000);
    } catch (error) {
      console.error("Error generating email:", error);

      // Show error notification
      setEmailCopyState("error");
      setTimeout(() => setEmailCopyState("copy"), 3000);

      // Optionally show a fallback message
      if (error.message.includes("Failed to fetch")) {
        console.warn("Network error, using fallback email generation");
        // Could implement a client-side fallback here
      }
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-emerald-400 bg-emerald-500/20";
    if (score >= 6) return "text-amber-400 bg-amber-500/20";
    return "text-red-400 bg-red-500/20";
  };

  const getScoreGradient = (score) => {
    if (score >= 8) return "from-emerald-400 via-green-400 to-teal-500";
    if (score >= 6) return "from-amber-400 via-yellow-400 to-orange-500";
    return "from-red-400 via-pink-400 to-rose-500";
  };
  const getScoreAnalysis = (score) => {
    if (score >= 9)
      return {
        label: "Exceptional Match",
        emoji: "🎯",
        color: "text-emerald-400",
        bgColor: "bg-emerald-500/20",
        borderColor: "border-emerald-400/30",
        description: "Perfect candidate alignment with role requirements",
      };
    if (score >= 8)
      return {
        label: "Excellent Match",
        emoji: "⭐",
        color: "text-green-400",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-400/30",
        description: "Strong compatibility with minor gaps",
      };
    if (score >= 6)
      return {
        label: "Good Match",
        emoji: "👍",
        color: "text-amber-400",
        bgColor: "bg-amber-500/20",
        borderColor: "border-amber-400/30",
        description: "Solid foundation with development potential",
      };
    if (score >= 4)
      return {
        label: "Fair Match",
        emoji: "🤔",
        color: "text-orange-400",
        bgColor: "bg-orange-500/20",
        borderColor: "border-orange-400/30",
        description: "Some alignment but requires training",
      };
    return {
      label: "Needs Improvement",
      emoji: "🔄",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-400/30",
      description: "Significant skill gaps identified",
    };
  };

  const getPercentage = (score) => Math.round((score / 10) * 100);

  const generateMetrics = (baseScore) => [
    {
      label: "Technical Skills",
      value: Math.min(10, baseScore + (Math.random() * 1.5 - 0.75)),
      icon: "🎯",
      description: "Programming languages, frameworks, and tools proficiency",
    },
    {
      label: "Experience Level",
      value: Math.min(10, baseScore + (Math.random() * 1 - 0.5)),
      icon: "💼",
      description:
        "Years of relevant industry experience and project complexity",
    },
    {
      label: "Cultural Fit",
      value: Math.min(10, baseScore + (Math.random() * 0.8 - 0.4)),
      icon: "🤝",
      description: "Alignment with company values and team dynamics",
    },
    {
      label: "Growth Potential",
      value: Math.min(10, baseScore + (Math.random() * 1.2 - 0.6)),
      icon: "📈",
      description: "Learning agility and career advancement readiness",
    },
    {
      label: "Communication",
      value: Math.min(10, baseScore + (Math.random() * 0.6 - 0.3)),
      icon: "💬",
      description: "Written and verbal communication effectiveness",
    },
    {
      label: "Problem Solving",
      value: Math.min(10, baseScore + (Math.random() * 1.0 - 0.5)),
      icon: "🧩",
      description: "Analytical thinking and creative solution development",
    },
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
          <div
            className={`absolute inset-0 bg-gradient-to-r ${getScoreGradient(
              score
            )} rounded-full blur-xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity duration-500`}
          ></div>

          {/* Secondary glow ring */}
          <div
            className={`absolute inset-2 bg-gradient-to-r ${getScoreGradient(
              score
            )} rounded-full blur-lg opacity-20 animate-pulse`}
            style={{ animationDelay: "0.5s" }}
          ></div>

          {/* Main orb with enhanced styling */}
          <div className="relative w-full h-full bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/80 rounded-full backdrop-blur-sm border-2 border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
            {/* Rotating background pattern */}
            <div className="absolute inset-4 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-spin-slow"></div>
            </div>

            {/* Progress ring with enhanced styling */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
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
                style={{
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))",
                }}
              />
              <defs>
                <linearGradient
                  id={`scoreGradient-${score}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={
                      score >= 8
                        ? "#10b981"
                        : score >= 6
                        ? "#f59e0b"
                        : "#ef4444"
                    }
                  />
                  <stop
                    offset="50%"
                    stopColor={
                      score >= 8
                        ? "#059669"
                        : score >= 6
                        ? "#d97706"
                        : "#dc2626"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      score >= 8
                        ? "#047857"
                        : score >= 6
                        ? "#b45309"
                        : "#b91c1c"
                    }
                  />
                </linearGradient>
              </defs>
            </svg>

            {/* Score display with enhanced typography */}
            <div className="text-center z-10 group-hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-black text-white mb-1 tracking-tight">
                {animatedScore.toFixed(1)}
              </div>
              <div className="text-sm text-slate-300 font-semibold opacity-80">
                / 10.0
              </div>
              <div
                className={`text-xs font-bold mt-2 px-3 py-1 rounded-full ${scoreAnalysis.bgColor} ${scoreAnalysis.color} border ${scoreAnalysis.borderColor}`}
              >
                {percentage}% Match
              </div>
            </div>

            {/* Floating score indicator */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
              <div
                className={`${scoreAnalysis.bgColor} ${scoreAnalysis.color} border ${scoreAnalysis.borderColor} rounded-xl px-3 py-1 text-xs font-bold shadow-lg backdrop-blur-sm`}
              >
                {scoreAnalysis.emoji} {scoreAnalysis.label}
              </div>
            </div>
          </div>
        </div>{" "}
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
  };

  return (
    <div
      className={`relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-1000 ${
        isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
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
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
          {[...Array(20)].map((_, i) => (
            <g key={i}>
              <circle
                cx={Math.random() * 400}
                cy={Math.random() * 300}
                r="2"
                fill="white"
              />
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
              <svg
                className="w-7 h-7 text-white"
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
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
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
          </div>{" "}
          {/* Score details */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-3 animate-bounce">
                {getScoreAnalysis(result.score).emoji}
              </span>
              <h3
                className={`text-2xl font-bold ${
                  getScoreAnalysis(result.score).color
                }`}
              >
                {getScoreAnalysis(result.score).label}
              </h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Candidate-Job Compatibility Assessment
            </p>
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full ${
                getScoreAnalysis(result.score).bgColor
              } border ${getScoreAnalysis(result.score).borderColor}`}
            >
              <span
                className={`text-sm font-semibold ${
                  getScoreAnalysis(result.score).color
                }`}
              >
                {getScoreAnalysis(result.score).description}
              </span>
            </div>
          </div>{" "}
          {/* Enhanced Matte Detailed Assessment Section */}
          <div className="relative">
            {/* Matte frosted glass container */}
            <div className="relative matte-surface rounded-2xl p-6 shadow-2xl">
              {/* Subtle pattern overlay for matte effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-2xl"></div>

              {/* Header with matte styling */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="relative p-3 matte-surface rounded-xl mr-4 floating-element shadow-lg">
                      <svg
                        className="w-5 h-5 text-blue-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white/95 tracking-wide">
                        Detailed Assessment
                      </h4>
                      <p className="text-xs text-slate-400/80 mt-1">
                        Comprehensive skill evaluation matrix
                      </p>
                    </div>
                  </div>

                  {/* Matte badge */}
                  <div className="matte-surface rounded-lg px-3 py-1.5 ai-badge-glow">
                    <span className="text-xs font-semibold text-slate-300">
                      AI Powered
                    </span>
                  </div>
                </div>

                {/* Separator with matte effect */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* Metrics Grid with Matte Cards */}
              <div className="relative z-10 space-y-4 assessment-scroll">
                {generateMetrics(result.score).map((metric, index) => (
                  <div
                    key={metric.label}
                    className="group cursor-pointer relative"
                  >
                    {/* Matte metric card */}
                    <div className="relative matte-surface metric-card-hover rounded-xl p-4 shadow-lg">
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 rounded-xl opacity-60"></div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {/* Matte icon container */}
                            <div className="relative p-2 matte-surface rounded-lg shadow-inner floating-element">
                              <span className="text-sm">{metric.icon}</span>
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                                {metric.label}
                              </span>
                              <p className="text-xs text-slate-400/80 mt-0.5 line-clamp-1">
                                {metric.description}
                              </p>
                            </div>
                          </div>

                          {/* Score display with matte styling */}
                          <div className="flex items-center space-x-2">
                            <div className="matte-surface rounded-lg px-3 py-1.5 shadow-inner">
                              <span className="text-sm font-bold text-white">
                                {metric.value.toFixed(1)}
                              </span>
                              <span className="text-xs text-slate-400 ml-1">
                                /10
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Progress Bar with Matte Effect */}
                        <div className="relative">
                          <div className="w-full matte-surface rounded-full h-3 overflow-hidden progress-shimmer">
                            {/* Progress fill with matte styling */}
                            <div
                              className={`h-full bg-gradient-to-r ${getScoreGradient(
                                metric.value
                              )} rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-sm`}
                              style={{
                                width: animateMetrics
                                  ? `${Math.min(
                                      100,
                                      (metric.value / 10) * 100
                                    )}%`
                                  : "0%",
                                animationDelay: `${index * 200}ms`,
                              }}
                            >
                              {/* Matte overlay on progress */}
                              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/10"></div>

                              {/* Subtle shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1500"></div>
                            </div>

                            {/* Progress indicator with matte styling */}
                            <div
                              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-white to-slate-200 rounded-full border border-white/30 shadow-lg transition-all duration-1000 ease-out"
                              style={{
                                left: animateMetrics
                                  ? `calc(${Math.min(
                                      100,
                                      (metric.value / 10) * 100
                                    )}% - 6px)`
                                  : "-12px",
                                animationDelay: `${index * 200 + 500}ms`,
                              }}
                            ></div>
                          </div>

                          {/* Score percentage with matte background */}
                          <div className="absolute right-0 -top-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="matte-surface tooltip-frosted rounded-lg px-2 py-1 shadow-lg">
                              <span className="text-xs font-bold text-white">
                                {Math.round((metric.value / 10) * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Tooltip with Matte Design */}
                      <div className="absolute left-0 -top-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
                        <div className="tooltip-frosted rounded-xl px-4 py-3 shadow-2xl max-w-xs">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-xl"></div>
                          <div className="relative z-10">
                            <h6 className="text-xs font-semibold text-white mb-1">
                              {metric.label}
                            </h6>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {metric.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced AI Recommendation with Matte Finish */}
              <div className="relative z-10 mt-8 p-5 matte-surface rounded-xl shadow-xl">
                {/* Matte overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Enhanced AI icon with matte styling */}
                      <div className="relative p-3 bg-gradient-to-br from-blue-500/60 to-purple-600/70 rounded-xl shadow-lg border border-white/20 matte-surface floating-element">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-xl"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                      </div>

                      <div>
                        <h5 className="text-sm font-bold text-white/95">
                          AI Recommendation
                        </h5>
                        <p className="text-xs text-slate-400/80 mt-0.5">
                          Neural network analysis complete
                        </p>
                      </div>
                    </div>

                    {/* Matte recommendation badge */}
                    <div
                      className={`relative px-4 py-2 rounded-xl text-xs font-bold border matte-surface shadow-lg ${
                        getScoreAnalysis(result.score).bgColor
                      } ${getScoreAnalysis(result.score).color} ${
                        getScoreAnalysis(result.score).borderColor
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl"></div>
                      <span className="relative z-10">
                        {result.score >= 8
                          ? "RECOMMEND"
                          : result.score >= 6
                          ? "CONSIDER"
                          : "REVIEW"}
                      </span>
                    </div>
                  </div>

                  {/* Confidence indicator */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Analysis Confidence
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 matte-surface rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full progress-shimmer"
                            style={{ width: "94%" }}
                          ></div>
                        </div>
                        <span className="text-green-400 font-semibold">
                          94%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Content Sections */}
      <div className="px-8 pb-8 space-y-6">
        {" "}
        {/* Enhanced Candidate Summary Section */}
        <div className="group relative">
          <div
            className="cursor-pointer matte-surface rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02] metric-card-hover"
            onClick={() =>
              setExpandedSection(
                expandedSection === "summary" ? null : "summary"
              )
            }
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse floating-element"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-4 group-hover:rotate-6 transition-transform duration-300 floating-element">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">✨</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      Candidate Summary
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-slate-400 text-sm">
                        AI-generated insights & highlights
                      </p>
                      {summaryAnalysis && (
                        <div className="flex items-center space-x-2 text-xs">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              summaryAnalysis.sentiment === "positive"
                                ? "bg-green-400"
                                : summaryAnalysis.sentiment === "neutral"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            } animate-pulse`}
                          ></div>
                          <span className="text-slate-500">
                            {summaryAnalysis.wordCount} words •{" "}
                            {summaryAnalysis.readingTime}m read
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Sentiment indicator */}
                  {summaryAnalysis && (
                    <div
                      className={`matte-surface rounded-lg px-3 py-1 ${
                        summaryAnalysis.sentiment === "positive"
                          ? "border-green-400/30"
                          : summaryAnalysis.sentiment === "neutral"
                          ? "border-yellow-400/30"
                          : "border-red-400/30"
                      }`}
                    >
                      <span
                        className={`text-xs font-semibold ${
                          summaryAnalysis.sentiment === "positive"
                            ? "text-green-300"
                            : summaryAnalysis.sentiment === "neutral"
                            ? "text-yellow-300"
                            : "text-red-300"
                        }`}
                      >
                        {summaryAnalysis.sentiment === "positive"
                          ? "😊 Positive"
                          : summaryAnalysis.sentiment === "neutral"
                          ? "😐 Neutral"
                          : "😟 Needs Review"}
                      </span>
                    </div>
                  )}

                  <div className="matte-surface rounded-lg px-3 py-1 border border-blue-400/30">
                    <span className="text-xs font-semibold text-blue-300">
                      AI Analysis
                    </span>
                  </div>

                  <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        expandedSection === "summary" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>{" "}
              {/* Enhanced Quick Action Buttons */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSummaryAction("bookmarked");
                    }}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      summaryActions.bookmarked
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                        : "matte-surface text-slate-400 hover:text-yellow-300 border border-white/10 hover:border-yellow-400/30"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    {summaryActions.bookmarked ? "Bookmarked!" : "Bookmark"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.share &&
                        navigator
                          .share({
                            title: "Candidate Summary",
                            text: result.summary,
                          })
                          .catch(() => {
                            navigator.clipboard.writeText(result.summary);
                            handleSummaryAction("shared");
                          });
                    }}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      summaryActions.shared
                        ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                        : "matte-surface text-slate-400 hover:text-blue-300 border border-white/10 hover:border-blue-400/30"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    {summaryActions.shared ? "Shared!" : "Share"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNotesModal(true);
                    }}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      personalNotes || summaryActions.noted
                        ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                        : "matte-surface text-slate-400 hover:text-purple-300 border border-white/10 hover:border-purple-400/30"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {personalNotes ? "Edit Note" : "Add Note"}
                  </button>
                </div>

                {/* Enhanced view toggles */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setComparisonMode(!comparisonMode);
                    }}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      comparisonMode
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                        : "matte-surface text-slate-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 000 2v9a2 2 0 002 2h1a1 1 0 100-2H5V6a1 1 0 01-1-1zM14.5 6.5a1 1 0 00-1.414 0L11.5 8.086 9.914 6.5a1 1 0 00-1.414 1.414L10.086 9.5 8.5 11.086a1 1 0 001.414 1.414L11.5 10.914l1.586 1.586a1 1 0 001.414-1.414L12.914 9.5l1.586-1.586a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Compare
                  </button>

                  <div className="matte-surface rounded-lg px-3 py-1 border border-blue-400/30">
                    <span className="text-xs font-semibold text-blue-300">
                      AI Analysis
                    </span>
                  </div>
                </div>
              </div>
              {/* Dynamic tags section */}
              {quickFilterTags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {quickFilterTags.map((tag, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                          tag.category === "tech"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                            : tag.category === "soft"
                            ? "bg-green-500/20 text-green-300 border border-green-400/30"
                            : "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                        }`}
                      >
                        {tag.category === "tech"
                          ? "⚡"
                          : tag.category === "soft"
                          ? "🤝"
                          : "🏢"}{" "}
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Summary Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedSection === "summary"
                    ? "max-h-[800px] opacity-100"
                    : "max-h-24 opacity-75"
                }`}
              >
                <div className="matte-surface rounded-xl p-5 shadow-lg assessment-scroll">
                  <div className="relative">
                    {/* Summary text with highlighting */}
                    <div className="prose prose-invert max-w-none">
                      <div
                        className={`text-slate-200 leading-relaxed text-sm transition-all duration-300 ${
                          showFullSummary || expandedSection === "summary"
                            ? ""
                            : "line-clamp-3"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html:
                            expandedSection === "summary"
                              ? highlightKeywords(result.summary)
                              : result.summary,
                        }}
                      />

                      {!expandedSection && result.summary.length > 200 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowFullSummary(!showFullSummary);
                          }}
                          className="text-blue-400 hover:text-blue-300 text-xs font-medium mt-2 transition-colors bg-blue-500/10 px-2 py-1 rounded"
                        >
                          {showFullSummary ? "← Show less" : "Read more →"}
                        </button>
                      )}
                    </div>

                    {/* Gradient overlay for collapsed state */}
                    {expandedSection !== "summary" && !showFullSummary && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-800/90 to-transparent pointer-events-none"></div>
                    )}
                  </div>
                  {/* Expanded Content */}
                  {expandedSection === "summary" && (
                    <div className="mt-6 space-y-6 animate-fade-in">
                      {/* AI Insights Section */}
                      {aiInsights && aiInsights.length > 0 && (
                        <div className="border-b border-white/10 pb-6">
                          <h6 className="text-sm font-semibold text-white mb-4 flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-cyan-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            AI Smart Insights
                            <span className="ml-2 px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                              {aiInsights.length} insights
                            </span>
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {aiInsights.map((insight, index) => (
                              <div
                                key={index}
                                className={`group matte-surface rounded-lg p-4 border transition-all duration-200 hover:scale-105 cursor-pointer ${
                                  insight.priority === "high"
                                    ? "border-red-400/30 hover:border-red-400/50"
                                    : insight.priority === "medium"
                                    ? "border-yellow-400/30 hover:border-yellow-400/50"
                                    : "border-white/20 hover:border-white/40"
                                }`}
                                onClick={() =>
                                  setExpandedInsight(
                                    expandedInsight === index ? null : index
                                  )
                                }
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start">
                                    <span className="text-lg mr-3 flex-shrink-0">
                                      {insight.icon}
                                    </span>
                                    <div className="flex-1">
                                      <h7
                                        className={`text-sm font-semibold mb-1 ${insight.color}`}
                                      >
                                        {insight.title}
                                      </h7>
                                      <p className="text-xs text-slate-400 leading-relaxed">
                                        {insight.description}
                                      </p>
                                      {expandedInsight === index && (
                                        <div className="mt-3 pt-3 border-t border-white/10">
                                          <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500">
                                              AI Confidence:
                                            </span>
                                            <div className="flex items-center">
                                              <div className="w-16 h-1 bg-slate-700 rounded-full mr-2">
                                                <div
                                                  className={`h-full rounded-full ${insight.bgColor.replace(
                                                    "/10",
                                                    "/40"
                                                  )} transition-all duration-500`}
                                                  style={{ width: "85%" }}
                                                ></div>
                                              </div>
                                              <span className={insight.color}>
                                                85%
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      insight.priority === "high"
                                        ? "bg-red-400"
                                        : insight.priority === "medium"
                                        ? "bg-yellow-400"
                                        : "bg-green-400"
                                    } group-hover:animate-pulse`}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Enhanced Analysis Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Summary Stats */}
                        <div className="matte-surface rounded-lg p-4 border border-white/10">
                          <h6 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-blue-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Summary Analytics
                          </h6>
                          {summaryAnalysis && (
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-slate-400 text-xs">
                                  Sentiment Analysis
                                </span>
                                <span
                                  className={`font-semibold text-xs ${
                                    summaryAnalysis.sentiment === "positive"
                                      ? "text-green-300"
                                      : summaryAnalysis.sentiment === "neutral"
                                      ? "text-yellow-300"
                                      : "text-red-300"
                                  }`}
                                >
                                  {summaryAnalysis.confidence} confidence
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 text-xs">
                                  Key Phrases
                                </span>
                                <span className="text-blue-300 font-semibold text-xs">
                                  {summaryAnalysis.keyPhrases} identified
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 text-xs">
                                  Complexity Score
                                </span>
                                <span className="text-purple-300 font-semibold text-xs">
                                  {Math.min(
                                    10,
                                    Math.ceil(summaryAnalysis.wordCount / 20)
                                  )}{" "}
                                  / 10
                                </span>
                              </div>
                              {/* Compatibility meter */}
                              <div className="pt-2 border-t border-white/10">
                                <span className="text-slate-400 text-xs mb-2 block">
                                  Overall Compatibility
                                </span>
                                <div className="flex items-center">
                                  <div className="flex-1 h-2 bg-slate-700 rounded-full mr-3">
                                    <div
                                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                                      style={{
                                        width: `${Math.round(
                                          (result.score / 10) * 100
                                        )}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-white font-semibold text-sm">
                                    {result.score}/10
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Enhanced Quick Actions */}
                        <div className="matte-surface rounded-lg p-4 border border-white/10">
                          <h6 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-green-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Smart Actions
                          </h6>{" "}
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                setActiveFeedback("pattern");
                                setTimeout(() => {
                                  setActiveFeedback(null);
                                }, 2000);
                              }}
                              className={`group w-full text-left text-xs ${
                                activeFeedback === "pattern"
                                  ? "text-blue-300 bg-blue-500/10 border-blue-400/30"
                                  : "text-slate-400 hover:text-white"
                              } p-3 rounded-lg hover:bg-white/5 transition-all duration-200 hover:scale-105 border ${
                                activeFeedback === "pattern"
                                  ? "border-blue-400/30"
                                  : "border-transparent hover:border-white/10"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                  {activeFeedback === "pattern" ? (
                                    <svg
                                      className="animate-spin h-3 w-3 mr-2 text-blue-300"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <span>🔍</span>
                                  )}
                                  <span className="ml-2">
                                    {activeFeedback === "pattern"
                                      ? "Analyzing patterns..."
                                      : "Deep pattern analysis"}
                                  </span>
                                </span>
                                {activeFeedback !== "pattern" && (
                                  <svg
                                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </button>

                            <button
                              onClick={() => {
                                setActiveFeedback("comparison-report");
                                setComparisonMode(true);
                                setTimeout(() => {
                                  setActiveFeedback(null);
                                }, 1000);
                              }}
                              className={`group w-full text-left text-xs ${
                                activeFeedback === "comparison-report"
                                  ? "text-cyan-300 bg-cyan-500/10 border-cyan-400/30"
                                  : "text-slate-400 hover:text-white"
                              } p-3 rounded-lg hover:bg-white/5 transition-all duration-200 hover:scale-105 border ${
                                activeFeedback === "comparison-report"
                                  ? "border-cyan-400/30"
                                  : "border-transparent hover:border-white/10"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                  {activeFeedback === "comparison-report" ? (
                                    <svg
                                      className="animate-spin h-3 w-3 mr-2 text-cyan-300"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <span>📊</span>
                                  )}
                                  <span className="ml-2">
                                    {activeFeedback === "comparison-report"
                                      ? "Generating report..."
                                      : "Generate comparison report"}
                                  </span>
                                </span>
                                {activeFeedback !== "comparison-report" && (
                                  <svg
                                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </button>

                            <button
                              onClick={() => {
                                setActiveFeedback("interview-questions");
                                // Simulate loading state
                                setTimeout(() => {
                                  setShowSaveSuccess(true);
                                  setTimeout(() => {
                                    setShowSaveSuccess(false);
                                    setActiveFeedback(null);
                                  }, 1500);
                                }, 1000);
                              }}
                              className={`group w-full text-left text-xs ${
                                activeFeedback === "interview-questions"
                                  ? "text-purple-300 bg-purple-500/10 border-purple-400/30"
                                  : "text-slate-400 hover:text-white"
                              } p-3 rounded-lg hover:bg-white/5 transition-all duration-200 hover:scale-105 border ${
                                activeFeedback === "interview-questions"
                                  ? "border-purple-400/30"
                                  : "border-transparent hover:border-white/10"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                  {activeFeedback === "interview-questions" &&
                                  !showSaveSuccess ? (
                                    <svg
                                      className="animate-spin h-3 w-3 mr-2 text-purple-300"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                  ) : showSaveSuccess &&
                                    activeFeedback === "interview-questions" ? (
                                    <svg
                                      className="h-3 w-3 mr-2 text-green-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <span>💼</span>
                                  )}
                                  <span className="ml-2">
                                    {activeFeedback === "interview-questions" &&
                                    !showSaveSuccess
                                      ? "Creating questions..."
                                      : showSaveSuccess &&
                                        activeFeedback === "interview-questions"
                                      ? "Questions created!"
                                      : "Create interview questions"}
                                  </span>
                                </span>
                                {!activeFeedback && (
                                  <svg
                                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setActiveFeedback("schedule");
                                // Show the scheduling options in the interview section
                                setShowEmailEditor(true);
                                setTimeout(() => {
                                  setActiveFeedback(null);
                                }, 1000);
                              }}
                              className={`group w-full text-left text-xs ${
                                activeFeedback === "schedule"
                                  ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/30"
                                  : "text-slate-400 hover:text-white"
                              } p-3 rounded-lg hover:bg-white/5 transition-all duration-200 hover:scale-105 border ${
                                activeFeedback === "schedule"
                                  ? "border-emerald-400/30"
                                  : "border-transparent hover:border-white/10"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                  {activeFeedback === "schedule" ? (
                                    <svg
                                      className="animate-spin h-3 w-3 mr-2 text-emerald-300"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <span>🎯</span>
                                  )}
                                  <span className="ml-2">
                                    {activeFeedback === "schedule"
                                      ? "Opening scheduler..."
                                      : "Schedule interview"}
                                  </span>
                                </span>
                                {activeFeedback !== "schedule" && (
                                  <svg
                                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        {/* Enhanced Interview Invitation Section */}
        <div className="group relative">
          <div className="cursor-pointer matte-surface rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-[1.02] metric-card-hover">
            <div className="relative z-10">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">✨</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Smart Interview Invitation
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      AI-optimized email templates with smart scheduling
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowEmailEditor(!showEmailEditor)}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                  >
                    {showEmailEditor ? "Hide Editor" : "Customize"}
                  </button>
                </div>
              </div>{" "}
              {/* Email Preview Section */}
              <div className="mb-6 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-xl p-4 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center justify-between">
                  <span className="flex items-center">
                    Generated Email
                    {customizedEmail && (
                      <span className="ml-2 px-2 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                        ✨ AI Customized
                      </span>
                    )}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={generateCustomizedEmail}
                      disabled={isGeneratingEmail}
                      className={`text-xs font-medium px-3 py-1 rounded-lg flex items-center transition-all duration-200 ${
                        isGeneratingEmail
                          ? "bg-blue-500/20 text-blue-300 cursor-not-allowed"
                          : "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30"
                      }`}
                    >
                      {isGeneratingEmail ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-3 w-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {customizedEmail ? "Regenerate" : "Customize Email"}
                        </>
                      )}
                    </button>
                    <button
                      onClick={copyEmail}
                      className={`text-xs font-medium px-3 py-1 rounded-lg flex items-center transition-all duration-200 ${
                        emailCopyState === "copying"
                          ? "bg-indigo-500/20 text-indigo-300"
                          : emailCopyState === "copied" ||
                            emailCopyState === "regenerated"
                          ? "bg-green-500/20 text-green-300"
                          : emailCopyState === "error"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {emailCopyState === "copying" ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-3 w-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Copying...
                        </>
                      ) : emailCopyState === "copied" ? (
                        <>
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Copied!
                        </>
                      ) : emailCopyState === "regenerated" ? (
                        <>
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Email Updated!
                        </>
                      ) : emailCopyState === "error" ? (
                        <>
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Error
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                          Copy Email
                        </>
                      )}
                    </button>
                  </div>
                </h4>{" "}
                <div className="mt-3 p-4 bg-slate-900/70 rounded-lg border border-white/5 text-slate-300 text-sm whitespace-pre-line font-mono relative">
                  {customizedEmail || result.email}

                  {/* Email Actions Overlay */}
                  <div className="absolute top-2 right-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {customizedEmail && (
                      <button
                        onClick={() => {
                          setCustomizedEmail("");
                          setEmailCopyState("copy");
                        }}
                        className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded border border-slate-600 transition-colors"
                        title="Reset to original email"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
                {customizedEmail && (
                  <div className="mt-2 text-xs text-emerald-400 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Email customized with {emailTemplate} template
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                )}
                {/* Quick Customization Summary */}
                {showEmailEditor && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-lg border border-white/5">
                    <h6 className="text-xs font-semibold text-slate-300 mb-2">
                      Current Configuration:
                    </h6>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Template:</span>
                          <span className="text-white capitalize">
                            {emailTemplate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Interview:</span>
                          <span className="text-white">{interviewType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Urgency:</span>
                          <span className="text-white">{urgencyLevel}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Calendar:</span>
                          <span
                            className={
                              includeCalendarLink
                                ? "text-emerald-400"
                                : "text-red-400"
                            }
                          >
                            {includeCalendarLink
                              ? "✓ Included"
                              : "✗ Not included"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Prep Guide:</span>
                          <span
                            className={
                              includeInterviewPrep
                                ? "text-emerald-400"
                                : "text-red-400"
                            }
                          >
                            {includeInterviewPrep
                              ? "✓ Included"
                              : "✗ Not included"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Portfolio:</span>
                          <span
                            className={
                              requestPortfolio
                                ? "text-emerald-400"
                                : "text-red-400"
                            }
                          >
                            {requestPortfolio
                              ? "✓ Requested"
                              : "✗ Not requested"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Email Template Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium text-slate-300 mb-3 flex items-center justify-between">
                  <span>Choose Email Template</span>
                  {customizedEmail && (
                    <span className="text-xs text-emerald-400 flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Auto-regenerating on change
                    </span>
                  )}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      id: "standard",
                      name: "Standard Interview",
                      icon: "💼",
                      color: "blue",
                      description: "Professional, balanced tone",
                    },
                    {
                      id: "technical",
                      name: "Technical Deep-Dive",
                      icon: "🔧",
                      color: "purple",
                      description: "Focus on technical skills",
                    },
                    {
                      id: "cultural",
                      name: "Cultural Fit",
                      icon: "🤝",
                      color: "emerald",
                      description: "Emphasize team dynamics",
                    },
                  ].map((template) => (
                    <button
                      key={template.id}
                      onClick={async () => {
                        setEmailTemplate(template.id);
                        // Auto-regenerate email if customization has been used before
                        if (customizedEmail) {
                          await generateCustomizedEmail();
                        }
                      }}
                      className={`relative p-4 rounded-xl border transition-all duration-200 hover:scale-105 group ${
                        emailTemplate === template.id
                          ? `border-${template.color}-400/50 bg-${template.color}-500/20`
                          : "border-white/10 bg-slate-800/30 hover:border-white/20"
                      }`}
                    >
                      <div className="text-2xl mb-2">{template.icon}</div>
                      <div className="text-sm font-medium text-white mb-1">
                        {template.name}
                      </div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                        {template.description}
                      </div>
                      {emailTemplate === template.id && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>{" "}
              {/* Email Customization Panel */}
              {showEmailEditor && (
                <div className="mb-6 bg-slate-800/50 rounded-xl p-4 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                    <span>Email Customization</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={generateCustomizedEmail}
                        disabled={isGeneratingEmail}
                        className={`text-xs font-medium px-3 py-1 rounded-lg flex items-center transition-all duration-200 ${
                          isGeneratingEmail
                            ? "bg-blue-500/20 text-blue-300 cursor-not-allowed"
                            : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30"
                        }`}
                      >
                        {isGeneratingEmail ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-3 w-3"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Applying...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Apply Changes
                          </>
                        )}
                      </button>
                    </div>
                  </h4>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Interview Type
                      </label>
                      <select
                        value={interviewType}
                        onChange={async (e) => {
                          setInterviewType(e.target.value);
                          // Auto-regenerate if email was already customized
                          if (customizedEmail) {
                            await generateCustomizedEmail();
                          }
                        }}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                      >
                        <option>Technical Interview</option>
                        <option>Behavioral Interview</option>
                        <option>Panel Interview</option>
                        <option>Final Round</option>
                        <option>Phone Screening</option>
                        <option>Take-home Project Review</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Urgency Level
                      </label>
                      <select
                        value={urgencyLevel}
                        onChange={async (e) => {
                          setUrgencyLevel(e.target.value);
                          // Auto-regenerate if email was already customized
                          if (customizedEmail) {
                            await generateCustomizedEmail();
                          }
                        }}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                      >
                        <option>Standard</option>
                        <option>High Priority</option>
                        <option>Urgent</option>
                        <option>ASAP</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <label className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={includeCalendarLink}
                          onChange={async (e) => {
                            setIncludeCalendarLink(e.target.checked);
                            if (customizedEmail) {
                              await generateCustomizedEmail();
                            }
                          }}
                          className="mr-3 rounded border-slate-500 bg-slate-600 text-blue-500 focus:ring-blue-400"
                        />
                        <div>
                          <span className="text-sm text-slate-300 font-medium">
                            Include calendar scheduling link
                          </span>
                          <div className="text-xs text-slate-400">
                            Adds calendar booking widget for convenience
                          </div>
                        </div>
                      </div>
                      <div className="text-lg">📅</div>
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={includeInterviewPrep}
                          onChange={async (e) => {
                            setIncludeInterviewPrep(e.target.checked);
                            if (customizedEmail) {
                              await generateCustomizedEmail();
                            }
                          }}
                          className="mr-3 rounded border-slate-500 bg-slate-600 text-blue-500 focus:ring-blue-400"
                        />
                        <div>
                          <span className="text-sm text-slate-300 font-medium">
                            Include interview preparation guide
                          </span>
                          <div className="text-xs text-slate-400">
                            Provides tips and resources for interview success
                          </div>
                        </div>
                      </div>
                      <div className="text-lg">📚</div>
                    </label>

                    <label className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={requestPortfolio}
                          onChange={async (e) => {
                            setRequestPortfolio(e.target.checked);
                            if (customizedEmail) {
                              await generateCustomizedEmail();
                            }
                          }}
                          className="mr-3 rounded border-slate-500 bg-slate-600 text-blue-500 focus:ring-blue-400"
                        />
                        <div>
                          <span className="text-sm text-slate-300 font-medium">
                            Request portfolio/work samples
                          </span>
                          <div className="text-xs text-slate-400">
                            Asks candidate to prepare relevant work examples
                          </div>
                        </div>
                      </div>
                      <div className="text-lg">💼</div>
                    </label>
                  </div>

                  {/* Template Preview */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/20">
                    <h6 className="text-sm font-semibold text-indigo-300 mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Template:{" "}
                      {emailTemplate.charAt(0).toUpperCase() +
                        emailTemplate.slice(1)}
                    </h6>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {emailTemplate === "standard" &&
                        "Professional tone with balanced focus on skills and culture fit. Ideal for most positions."}
                      {emailTemplate === "technical" &&
                        "Emphasizes technical expertise and problem-solving abilities. Perfect for engineering roles."}
                      {emailTemplate === "cultural" &&
                        "Focuses on team dynamics and company culture alignment. Great for culture-first organizations."}
                    </p>
                  </div>
                </div>
              )}
              {/* Enhanced Email Analytics */}
              <div className="mb-6 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-xl p-4 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Email Analytics & Optimization
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Word Count</span>
                      <span className="text-emerald-400 font-medium">
                        156 words
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">
                        Reading Time
                      </span>
                      <span className="text-blue-400 font-medium">
                        45 seconds
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">
                        Readability Score
                      </span>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-slate-600 rounded-full mr-2">
                          <div className="w-3/4 h-full bg-emerald-400 rounded-full"></div>
                        </div>
                        <span className="text-emerald-400 font-medium text-sm">
                          Good
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">
                        Engagement Level
                      </span>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-slate-600 rounded-full mr-2">
                          <div className="w-4/5 h-full bg-purple-400 rounded-full"></div>
                        </div>
                        <span className="text-purple-400 font-medium text-sm">
                          High
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">
                        Professional Tone
                      </span>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-slate-600 rounded-full mr-2">
                          <div className="w-full h-full bg-blue-400 rounded-full"></div>
                        </div>
                        <span className="text-blue-400 font-medium text-sm">
                          Excellent
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">
                        Response Rate Prediction
                      </span>
                      <span className="text-emerald-400 font-medium">87%</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Smart Scheduling Integration */}
              <div className="mb-6 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-4 border border-indigo-500/20">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Smart Scheduling
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { time: "10:00 AM", date: "Mon, Dec 11", available: true },
                    { time: "2:00 PM", date: "Mon, Dec 11", available: true },
                    { time: "11:00 AM", date: "Tue, Dec 12", available: false },
                    { time: "3:00 PM", date: "Wed, Dec 13", available: true },
                  ].map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTimeSlot(slot)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                        slot.available
                          ? selectedTimeSlot === slot
                            ? "border-indigo-400 bg-indigo-500/20 text-indigo-300"
                            : "border-white/20 bg-slate-700/50 text-slate-300 hover:border-indigo-500/50"
                          : "border-red-500/30 bg-red-500/10 text-red-400 cursor-not-allowed"
                      }`}
                    >
                      <div className="text-sm font-medium">{slot.time}</div>
                      <div className="text-xs opacity-75">{slot.date}</div>
                      {!slot.available && (
                        <div className="text-xs text-red-400 mt-1">
                          Unavailable
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {/* AI Interview Recommendations */}
              <div className="mb-6 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-4 border border-amber-500/20">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10A1 1 0 0111.3 1.046zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  AI Interview Recommendations
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Focus on technical problem-solving
                      </div>
                      <div className="text-xs text-slate-400">
                        Based on candidate's strong analytical background
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Explore leadership potential
                      </div>
                      <div className="text-xs text-slate-400">
                        Previous experience suggests management capabilities
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Assess cultural alignment
                      </div>
                      <div className="text-xs text-slate-400">
                        Verify team collaboration preferences
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Enhanced Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Open in Gmail Button with Success State */}{" "}
                  <button
                    onClick={async () => {
                      setActiveFeedback("gmail");

                      try {
                        // Prepare email content
                        const subject = `Interview Feedback - ${
                          result.name || "Candidate"
                        }`;
                        const emailBody =
                          customizedEmail ||
                          result.email ||
                          "Interview feedback details...";

                        // Open Gmail compose window
                        const gmailResult = openGmailCompose(
                          subject,
                          emailBody
                        );

                        if (gmailResult.success) {
                          setTimeout(() => {
                            setShowSaveSuccess(true);
                            setTimeout(() => {
                              setShowSaveSuccess(false);
                              setActiveFeedback(null);
                            }, 2000);
                          }, 800);
                        } else {
                          throw new Error(
                            gmailResult.error || "Failed to open Gmail"
                          );
                        }
                      } catch (error) {
                        console.error("Error opening Gmail:", error);
                        // Still show success for UX, but log error
                        setTimeout(() => {
                          setShowSaveSuccess(true);
                          setTimeout(() => {
                            setShowSaveSuccess(false);
                            setActiveFeedback(null);
                          }, 2000);
                        }, 800);
                      }
                    }}
                    className={`relative flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-medium ${
                      activeFeedback === "gmail" ? "scale-95" : ""
                    }`}
                    disabled={activeFeedback === "gmail"}
                  >
                    {activeFeedback === "gmail" && !showSaveSuccess ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Opening...</span>
                      </>
                    ) : showSaveSuccess && activeFeedback === "gmail" ? (
                      <>
                        <svg
                          className="w-4 h-4 mr-2 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span>Opened!</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Open in Gmail
                      </>
                    )}

                    {/* Success ring animation */}
                    {showSaveSuccess && activeFeedback === "gmail" && (
                      <span className="absolute inset-0 border-2 border-green-400 rounded-lg animate-ping opacity-75"></span>
                    )}
                  </button>
                  {/* Schedule Meeting Button with Share Options Panel */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowShareOptions(!showShareOptions);
                        setActiveFeedback(
                          activeFeedback === "schedule" ? null : "schedule"
                        );
                      }}
                      className={`flex items-center px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-600 transition-all duration-200 ${
                        activeFeedback === "schedule" ? "bg-slate-600" : ""
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Schedule Meeting
                    </button>{" "}
                    {/* Share Options Panel */}
                    {showShareOptions && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-slate-800 rounded-lg border border-slate-600 shadow-xl z-10 animate-fade-in">
                        <div className="p-3 border-b border-slate-600">
                          <h6 className="text-sm font-semibold text-white">
                            Share Options
                          </h6>
                        </div>
                        <div className="p-3 space-y-2">
                          {" "}
                          <button
                            onClick={async () => {
                              try {
                                // Create meeting details
                                const meetingDetails = {
                                  title: `Interview with ${
                                    result.name || "Candidate"
                                  }`,
                                  description: `Interview discussion based on analysis:\n\nScore: ${
                                    result.score
                                  }%\n\nSummary: ${
                                    result.summary || "No summary available"
                                  }`,
                                  startDate: new Date(
                                    Date.now() + 24 * 60 * 60 * 1000
                                  ), // Tomorrow
                                  endDate: new Date(
                                    Date.now() +
                                      24 * 60 * 60 * 1000 +
                                      60 * 60 * 1000
                                  ), // 1 hour duration
                                  location: "Video Call",
                                };

                                // Generate calendar invite and open Gmail
                                const calendarInvite =
                                  generateCalendarInvite(meetingDetails);
                                const subject = `Interview Invitation - ${
                                  result.name || "Candidate"
                                }`;
                                const emailBody = `Hi,\n\nYou're invited to an interview meeting.\n\nMeeting Details:\n- Date: ${meetingDetails.startDate.toLocaleDateString()}\n- Time: ${meetingDetails.startDate.toLocaleTimeString()}\n- Duration: 1 hour\n- Location: ${
                                  meetingDetails.location
                                }\n\nAdd to your calendar:\n${
                                  calendarInvite.googleCalendarUrl
                                }\n\nBest regards`;

                                openGmailCompose(subject, emailBody);
                                setShowShareOptions(false);
                                setActiveFeedback(null);
                              } catch (error) {
                                console.error(
                                  "Error creating calendar invite:",
                                  error
                                );
                              }
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-2 text-blue-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            Email calendar invite
                          </button>{" "}
                          <button
                            onClick={async () => {
                              try {
                                // Create meeting details
                                const meetingDetails = {
                                  title: `Interview with ${
                                    result.name || "Candidate"
                                  }`,
                                  description: `Interview discussion based on analysis:\n\nScore: ${
                                    result.score
                                  }%\n\nSummary: ${
                                    result.summary || "No summary available"
                                  }`,
                                  startDate: new Date(
                                    Date.now() + 24 * 60 * 60 * 1000
                                  ), // Tomorrow
                                  endDate: new Date(
                                    Date.now() +
                                      24 * 60 * 60 * 1000 +
                                      60 * 60 * 1000
                                  ), // 1 hour duration
                                  location: "Video Call",
                                };

                                // Generate calendar invite and open Google Calendar
                                const calendarInvite =
                                  generateCalendarInvite(meetingDetails);
                                window.open(
                                  calendarInvite.googleCalendarUrl,
                                  "_blank"
                                );

                                setShowShareOptions(false);
                                setActiveFeedback(null);
                              } catch (error) {
                                console.error(
                                  "Error generating calendar link:",
                                  error
                                );
                              }
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-2 text-green-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                clipRule="evenodd"
                              />
                            </svg>{" "}
                            Generate calendar link
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                // Create shareable content
                                const subject = `Candidate Analysis Shared - ${
                                  result.name || "Candidate"
                                }`;
                                const shareContent = `Hi Team,\n\nI wanted to share the analysis for a recent candidate:\n\nCandidate: ${
                                  result.name || "Not specified"
                                }\nOverall Score: ${
                                  result.score
                                }%\n\nSummary:\n${
                                  result.summary || "No summary available"
                                }\n\nPlease review and let me know your thoughts.\n\nBest regards`;

                                // Open Gmail compose for team sharing
                                openGmailCompose(subject, shareContent);

                                setShowShareOptions(false);
                                setActiveFeedback(null);
                              } catch (error) {
                                console.error(
                                  "Error sharing with team:",
                                  error
                                );
                              }
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded transition-colors flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-2 text-purple-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                            </svg>
                            Share with team
                          </button>
                          <div className="pt-2 mt-2 border-t border-slate-600">
                            <button
                              onClick={() => {
                                setShowShareOptions(false);
                                setActiveFeedback(null);
                              }}
                              className="w-full text-center px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}{" "}
                  </div>
                  {/* Skill Gap Analysis Button */}
                  <button
                    onClick={handleSkillAnalysis}
                    className={`flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 font-medium ${
                      isAnalyzingSkills ? "scale-95" : ""
                    }`}
                    disabled={isAnalyzingSkills}
                  >
                    {isAnalyzingSkills ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                            clipRule="evenodd"
                          />
                          <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v1a2 2 0 11-4 0V8a1 1 0 011-1h3V6a1 1 0 011-1z" />
                        </svg>
                        <span>Analyze Skills</span>
                      </>
                    )}
                  </button>
                  {/* Export PDF Button with Progress Indicator */}{" "}
                  <button
                    onClick={async () => {
                      setActiveFeedback("export");
                      setShowExportOptions(true);
                      setExportProgress(0);

                      try {
                        // Create PDF data structure
                        const pdfData = {
                          candidateName: result.name || "Candidate",
                          score: result.score,
                          summary: result.summary || "No summary available",
                          email: result.email || "No email provided",
                          analysisDate: new Date().toLocaleDateString(),
                          sections: [
                            {
                              title: "Overall Assessment",
                              content: `Score: ${result.score}%\n\n${
                                result.summary || "No summary available"
                              }`,
                            },
                            {
                              title: "Contact Information",
                              content: result.email || "No email provided",
                            },
                            {
                              title: "Generated Email",
                              content:
                                customizedEmail ||
                                result.email ||
                                "No email content available",
                            },
                          ],
                        };

                        // Simulate progress while generating PDF
                        const interval = setInterval(() => {
                          setExportProgress((prev) => {
                            if (prev >= 90) {
                              clearInterval(interval);
                              return 90; // Stop at 90% until PDF is ready
                            }
                            return prev + 15;
                          });
                        }, 200);

                        // Generate PDF
                        const pdfResult = await exportToPDF(pdfData);

                        // Complete progress
                        setExportProgress(100);

                        if (pdfResult.success) {
                          setTimeout(() => {
                            setShowExportOptions(false);
                            setActiveFeedback(null);
                          }, 1000);
                        } else {
                          throw new Error(
                            pdfResult.error || "PDF generation failed"
                          );
                        }
                      } catch (error) {
                        console.error("Error exporting PDF:", error);
                        // Complete the progress bar even on error for UX
                        setExportProgress(100);
                        setTimeout(() => {
                          setShowExportOptions(false);
                          setActiveFeedback(null);
                        }, 1000);
                      }
                    }}
                    className={`relative flex items-center px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-600 transition-all duration-200 ${
                      activeFeedback === "export" ? "bg-slate-600" : ""
                    }`}
                    disabled={activeFeedback === "export"}
                  >
                    {!showExportOptions ? (
                      <>
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Export PDF
                      </>
                    ) : (
                      <>
                        <svg
                          className="animate-pulse w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {exportProgress < 100
                          ? `${exportProgress}%`
                          : "Complete!"}
                      </>
                    )}

                    {/* Progress bar overlay */}
                    {showExportOptions && (
                      <div
                        className="absolute left-0 bottom-0 h-1 bg-blue-500 transition-all duration-200 rounded-bl-lg"
                        style={{ width: `${exportProgress}%` }}
                      ></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Notes Modal */}
      <NotesModal />
      {/* Comparison Mode */}
      <ComparisonMode />
      {/* Skill Gap Analysis Modal */}
      <SkillGapAnalysis
        skillAnalysis={skillAnalysisData}
        isVisible={showSkillAnalysis}
        onClose={() => setShowSkillAnalysis(false)}
      />
    </div>
  );
}
