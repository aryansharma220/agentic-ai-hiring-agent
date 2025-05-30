import { useState, useRef, useEffect, useCallback } from "react";
import JobDescriptionGenerator from "./JobDescriptionGenerator";

export default function UploadForm({ onSubmit, loading }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [fileProcessing, setFileProcessing] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readabilityScore, setReadabilityScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showJobGenerator, setShowJobGenerator] = useState(false);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    // Show helpful tips after component loads
    setTimeout(() => {
      setSuggestions([
        "💡 Pro tip: Include specific technical skills in the job description",
        "🎯 Mention years of experience required for better matching",
        "📊 Add company culture details for personality fit analysis",
      ]);
    }, 2000);
  }, []);

  // Enhanced job description analysis
  useEffect(() => {
    const words = jobDescription
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);

    // Calculate completion percentage
    const minWords = 50;
    const optimalWords = 200;
    const completion = Math.min((words.length / optimalWords) * 100, 100);
    setCompletionPercentage(completion);

    // Simple readability score (based on word length and sentence structure)
    if (words.length > 10) {
      const avgWordLength =
        words.reduce((acc, word) => acc + word.length, 0) / words.length;
      const sentences = jobDescription
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);
      const avgSentenceLength = words.length / Math.max(sentences.length, 1);
      const score = Math.max(
        0,
        Math.min(100, 100 - avgWordLength * 3 - avgSentenceLength * 0.5)
      );
      setReadabilityScore(score);
    }

    // Show preview when sufficient content
    if (words.length >= 30 && !showPreview) {
      setShowPreview(true);
    }
  }, [jobDescription, showPreview]);

  // Enhanced typing indicator
  const handleJobDescriptionChange = useCallback(
    (e) => {
      const value = e.target.value;
      setJobDescription(value);
      setTypingIndicator(true);

      // Clear errors immediately when user starts typing
      if (errors.jobDescription) {
        setErrors((prev) => ({ ...prev, jobDescription: null }));
      }

      // Clear typing indicator after user stops
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setTypingIndicator(false);
      }, 1000);
    },
    [errors.jobDescription]
  );

  // Auto-save and load drafts
  useEffect(() => {
    const savedData = localStorage.getItem("uploadFormDraft");
    if (savedData) {
      try {
        const { jobDescription: savedJobDesc, timestamp } =
          JSON.parse(savedData);
        // Only restore if saved within last 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setJobDescription(savedJobDesc || "");
        }
      } catch (error) {
        console.warn("Failed to restore draft:", error);
      }
    }
  }, []);

  // Save draft periodically
  useEffect(() => {
    if (jobDescription.length > 20) {
      const draftData = {
        jobDescription,
        timestamp: Date.now(),
      };
      localStorage.setItem("uploadFormDraft", JSON.stringify(draftData));
    }
  }, [jobDescription]);

  const validateForm = () => {
    const newErrors = {};

    if (!file) {
      newErrors.file = "Please upload a resume file to continue";
    }

    if (!jobDescription.trim()) {
      newErrors.jobDescription =
        "Job description is required for accurate analysis";
    } else if (jobDescription.trim().length < 50) {
      newErrors.jobDescription = `Please add ${
        50 - jobDescription.trim().length
      } more characters for better analysis`;
    } else if (wordCount < 20) {
      newErrors.jobDescription =
        "Job description seems too brief. Please add more details about the role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enhanced submit with better progress tracking
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Highlight problematic fields
      if (!file) setFocusedField("file");
      else if (errors.jobDescription) setFocusedField("jobDescription");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    formData.append("wordCount", wordCount);
    formData.append("readabilityScore", readabilityScore);

    // Enhanced progress simulation with realistic stages
    setUploadProgress(0);
    const stages = [
      { progress: 15, message: "Uploading resume..." },
      { progress: 30, message: "Processing document..." },
      { progress: 50, message: "Analyzing job requirements..." },
      { progress: 75, message: "Matching skills..." },
      { progress: 90, message: "Generating insights..." },
    ];

    let currentStage = 0;
    const progressInterval = setInterval(() => {
      if (currentStage < stages.length) {
        setUploadProgress(stages[currentStage].progress);
        currentStage++;
      } else {
        clearInterval(progressInterval);
      }
    }, 800);

    try {
      await onSubmit(formData);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 2000);
    } catch (error) {
      setUploadProgress(0);
      setErrors((prev) => ({
        ...prev,
        submit: "Analysis failed. Please check your files and try again.",
      }));
    }
    clearInterval(progressInterval);
  };

  // Enhanced drag and drop with better feedback
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      // Only deactivate if leaving the entire drop area
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        setDragActive(false);
      }
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (files.length > 1) {
        setErrors((prev) => ({
          ...prev,
          file: "Please select only one resume file",
        }));
        return;
      }
      handleFileSelection(files[0]);
    }
  }, []);

  // Enhanced file selection with better validation and feedback
  const handleFileSelection = useCallback((selectedFile) => {
    setErrors((prev) => ({ ...prev, file: null }));
    setFileProcessing(true);

    // Simulate processing time for better UX
    setTimeout(() => {
      // Enhanced file type validation
      const allowedTypes = ["application/pdf"];
      const allowedExtensions = [".pdf"];
      const fileExtension = selectedFile.name
        .toLowerCase()
        .substring(selectedFile.name.lastIndexOf("."));

      if (
        !allowedTypes.includes(selectedFile.type) &&
        !allowedExtensions.includes(fileExtension)
      ) {
        setErrors((prev) => ({
          ...prev,
          file: "Please select a PDF file. Other formats are not supported for accurate text extraction.",
        }));
        setFileProcessing(false);
        return;
      }

      // Enhanced file size validation with helpful feedback
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size > maxSize) {
        const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
        setErrors((prev) => ({
          ...prev,
          file: `File size (${sizeMB}MB) exceeds 10MB limit. Please compress your PDF or use a smaller file.`,
        }));
        setFileProcessing(false);
        return;
      }

      // Check for very small files that might be corrupted
      if (selectedFile.size < 1024) {
        // Less than 1KB
        setErrors((prev) => ({
          ...prev,
          file: "File seems too small. Please ensure your resume PDF contains actual content.",
        }));
        setFileProcessing(false);
        return;
      }

      setFile(selectedFile);
      setFileProcessing(false);

      // Clear any previous errors and show success
      setTimeout(() => {
        setFocusedField(null);
      }, 500);
    }, 1200); // Realistic processing time
  }, []);  const handleFileChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
      }
    },
    [handleFileSelection]
  );

  // Job Description Generator handlers
  const handleJobDescriptionGenerated = useCallback((generatedDescription) => {
    setJobDescription(generatedDescription);
    setShowJobGenerator(false);
    setFocusedField('jobDescription');
    
    // Clear any existing errors
    if (errors.jobDescription) {
      setErrors((prev) => ({ ...prev, jobDescription: null }));
    }
  }, [errors.jobDescription]);

  const openJobGenerator = useCallback(() => {
    setShowJobGenerator(true);
  }, []);

  const closeJobGenerator = useCallback(() => {
    setShowJobGenerator(false);
  }, []);

  // Quick actions for better UX
  const clearFile = useCallback(() => {
    setFile(null);
    setFileProcessing(false);
    setErrors((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const clearForm = useCallback(() => {
    clearFile();
    setJobDescription("");
    setErrors({});
    setFocusedField(null);
    setWordCount(0);
    setReadabilityScore(0);
    setCompletionPercentage(0);
  }, [clearFile]);

  // Auto-save draft to localStorage
  useEffect(() => {
    const draft = {
      jobDescription,
      timestamp: Date.now(),
    };
    localStorage.setItem("resumeAnalyzer_draft", JSON.stringify(draft));
  }, [jobDescription]);

  // Load draft on component mount
  useEffect(() => {
    const saved = localStorage.getItem("resumeAnalyzer_draft");
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        // Only load if less than 24 hours old
        if (Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
          setJobDescription(draft.jobDescription || "");
        }
      } catch (e) {
        // Invalid draft, ignore
      }
    }
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  return (
    <div
      className={`relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-1000 ${
        isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic mesh gradient */}{" "}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div
            className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/60 to-purple-400/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced header with progress indicator */}
      <div className="relative p-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="relative p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl mr-4 animate-gradient shadow-xl shadow-purple-500/25">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-sm font-bold text-white">AI</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
                Smart Resume Analysis
              </h2>
              <p className="text-slate-400 text-base flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 animate-pulse"></span>
                AI-powered matching with intelligent insights
              </p>            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="text-xs text-slate-400 mb-1">Analysis Speed</div>
            <div className="text-sm font-semibold text-white flex items-center">
              <svg
                className="w-3 h-3 mr-1 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              ~30 seconds
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="text-xs text-slate-400 mb-1">AI Accuracy</div>
            <div className="text-sm font-semibold text-white flex items-center">
              <svg
                className="w-3 h-3 mr-1 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              99.2%
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="text-xs text-slate-400 mb-1">Languages</div>
            <div className="text-sm font-semibold text-white flex items-center">
              <svg
                className="w-3 h-3 mr-1 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Multi-lingual
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-8">
        {" "}
        {/* Enhanced PDF Upload */}
        <div className="group relative">
          <div className="flex items-center mb-4">
            <div className="relative p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-3 group-hover:rotate-6 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">📄</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors flex items-center">
                Resume Upload
                <span className="ml-2 text-sm font-normal text-slate-400">
                  (PDF Only)
                </span>
              </h3>
              <p className="text-slate-400 text-sm">
                Drag & drop or click to select your resume file
              </p>
            </div>
            {file && (
              <div className="bg-green-500/20 border border-green-400/30 rounded-xl px-3 py-1">
                <span className="text-xs font-semibold text-green-300">
                  ✓ File Ready
                </span>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="resume"
                className={`group relative flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden ${
                  dragActive
                    ? "border-blue-400 bg-blue-500/10 scale-105"
                    : errors.file
                    ? "border-red-400 bg-red-500/10"
                    : file
                    ? "border-green-400 bg-green-500/10"
                    : "border-white/30 bg-gradient-to-br from-slate-800/40 to-slate-900/60 hover:border-blue-400/60 hover:bg-blue-500/5"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onFocus={() => setFocusedField("file")}
                onBlur={() => setFocusedField(null)}
              >
                {/* Background animation */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{
                        left: `${10 + i * 10}%`,
                        top: `${20 + (i % 3) * 20}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                  {file ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                          <svg
                            className="w-12 h-12 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-white text-xs font-bold">
                            ✓
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-green-400 mb-1">
                          {file.name}
                        </p>
                        <p className="text-sm text-green-300">
                          {formatFileSize(file.size)} • PDF Document
                        </p>
                        <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-slate-400">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Ready for analysis</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">                      <div className="relative mx-auto">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-12 h-12 text-white mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white mb-2">
                          Drop your resume here
                        </p>
                        <p className="text-slate-300 mb-4">
                          or{" "}
                          <span className="text-blue-400 font-semibold">
                            click to browse
                          </span>
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
                          <span className="flex items-center">
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
                            PDF files only
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
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
                            Max 10MB
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="resume"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {errors.file && (
              <div className="mt-3 p-3 bg-red-500/10 border border-red-400/30 rounded-xl">
                <p className="text-sm text-red-400 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.file}
                </p>
              </div>
            )}
          </div>
        </div>{" "}
        {/* Enhanced Job Description */}
        <div className="group relative">
          <div className="flex items-center mb-4">
            <div className="relative p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-3 group-hover:rotate-6 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-1a1 1 0 00-1-1H9a1 1 0 00-1 1v1a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">💼</span>
              </div>
            </div>            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center">
                Job Description
                <span className="ml-2 text-sm font-normal text-slate-400">
                  (Min 50 chars)
                </span>
              </h3>
              <p className="text-slate-400 text-sm">
                Detailed requirements and responsibilities
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* AI Generate Button */}
              {!jobDescription.trim() && (
                <button
                  type="button"
                  onClick={openJobGenerator}
                  className="group/btn relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl blur-lg group-hover/btn:blur-xl transition-all duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm">Generate with AI</span>
                  </div>
                </button>
              )}
              
              {jobDescription.length >= 50 && (
                <div className="bg-green-500/20 border border-green-400/30 rounded-xl px-3 py-1">
                  <span className="text-xs font-semibold text-green-300">
                    ✓ Ready
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            {/* Neural network background for textarea */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  />
                ))}
                {/* Connecting lines */}
                <svg className="w-full h-full absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <line
                      key={i}
                      x1={`${Math.random() * 100}%`}
                      y1={`${Math.random() * 100}%`}
                      x2={`${Math.random() * 100}%`}
                      y2={`${Math.random() * 100}%`}
                      stroke="rgb(168 85 247 / 0.3)"
                      strokeWidth="1"
                      className="animate-pulse"
                    />
                  ))}
                </svg>
              </div>
            </div>{" "}
            {/* Enhanced Job Description Container with Hidden Scrollbar */}
            <div
              className={`relative bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-800/60 backdrop-blur-xl rounded-2xl border transition-all duration-300 overflow-hidden group ${
                errors.jobDescription
                  ? "border-red-400/50 shadow-lg shadow-red-500/20"
                  : focusedField === "jobDescription"
                  ? "border-purple-400/60 shadow-lg shadow-purple-500/20"
                  : "border-white/20 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10"
              }`}
            >
              {/* Enhanced floating particles with better distribution */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full animate-float ${
                      i % 3 === 0
                        ? "w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400"
                        : i % 3 === 1
                        ? "w-0.5 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                        : "w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400"
                    } opacity-${i % 2 === 0 ? "30" : "20"}`}
                    style={{
                      left: `${5 + ((i * 7.5) % 90)}%`,
                      top: `${10 + (i % 4) * 20}%`,
                      animationDelay: `${i * 0.4}s`,
                      animationDuration: `${2.5 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Focus indicator gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 transition-opacity duration-300 ${
                  focusedField === "jobDescription"
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              ></div>

              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  if (errors.jobDescription) {
                    setErrors((prev) => ({ ...prev, jobDescription: null }));
                  }
                }}
                onFocus={() => setFocusedField("jobDescription")}
                onBlur={() => setFocusedField(null)}
                rows={9}
                className="relative z-10 w-full px-6 py-5 bg-transparent text-white placeholder-white/60 focus:outline-none resize-none transition-all duration-300 scrollbar-hide leading-relaxed"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitScrollbar: "none",
                }}
                placeholder="🎯 Paste the complete job description here...

Include:
• Role overview and key responsibilities
• Required skills and qualifications  
• Experience level expectations
• Company culture and values
• Any specific requirements or preferences

The more detailed your job description, the more accurate our AI analysis will be!"
              />

              {/* Subtle gradient overlay for better text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
            </div>{" "}
            {/* Enhanced Word and Character Count - Positioned Outside Container */}
            <div className="mt-6 space-y-5">
              {/* Main stats row with improved spacing and design */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Enhanced Word Count Box */}
                  <div className="">
                    <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-md rounded-2xl px-4 py-4 border border-white/10 hover:border-blue-400/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col text-center">
                          <span className="text-lg font-bold text-white leading-none">
                            {wordCount.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400 font-medium mt-1">
                            {wordCount >= 50 ? (
                              <span className="text-green-400 flex items-center space-x-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>words</span>
                              </span>
                            ) : (
                              <span className="text-amber-400">
                                words (need {Math.max(0, 50 - wordCount)} more)
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Character Count Box */}
                  <div className="mr-4">
                    <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-md rounded-2xl px-4 py-4 border border-white/10 hover:border-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10">
                      <div className="flex items-center">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-white leading-none">
                            {jobDescription.length.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400 font-medium mt-1">
                            characters
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Status Indicators with improved spacing */}
                <div className="flex items-center space-x-5">
                  {typingIndicator && (
                    <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl px-4 py-2 animate-pulse backdrop-blur-sm">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div
                            className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-300">
                          Analyzing...
                        </span>
                      </div>
                    </div>
                  )}

                  {jobDescription.length >= 50 && !typingIndicator && (
                    <div className="bg-green-500/20 border border-green-400/30 rounded-xl px-4 py-2 animate-fade-in backdrop-blur-sm hover:bg-green-500/25 transition-colors duration-300">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-green-300">
                          Ready for Analysis
                        </span>
                      </div>
                    </div>
                  )}

                  {completionPercentage >= 80 && (
                    <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl px-4 py-2 animate-glow backdrop-blur-sm hover:bg-purple-500/25 transition-colors duration-300">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-purple-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-purple-300">
                          Optimal Length
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional stats row for detailed information */}
              {jobDescription.length > 50 && (
                <div className="flex items-center justify-between text-xs bg-slate-800/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/5">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-slate-300">
                        Sentences:{" "}
                        <span className="text-white font-semibold">
                          {(jobDescription.match(/[.!?]+/g) || []).length}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-300">
                        Avg words/sentence:{" "}
                        <span className="text-white font-semibold">
                          {wordCount > 0 &&
                          (jobDescription.match(/[.!?]+/g) || []).length > 0
                            ? Math.round(
                                wordCount /
                                  (jobDescription.match(/[.!?]+/g) || []).length
                              )
                            : 0}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                      <span className="text-slate-300">
                        Reading time:{" "}
                        <span className="text-white font-semibold">
                          {Math.max(1, Math.round(wordCount / 200))} min
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    Analysis confidence:{" "}
                    <span
                      className={`font-semibold ${
                        jobDescription.length >= 500
                          ? "text-green-400"
                          : jobDescription.length >= 200
                          ? "text-yellow-400"
                          : "text-orange-400"
                      }`}
                    >
                      {jobDescription.length >= 500
                        ? "High"
                        : jobDescription.length >= 200
                        ? "Medium"
                        : "Low"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* AI Processing Hints */}
            {jobDescription.length > 100 && !errors.jobDescription && (
              <div className="mt-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-300 font-medium mb-1">
                      AI Analysis Preview
                    </p>
                    <p className="text-xs text-slate-300">
                      Our AI will analyze: skills requirements, experience
                      level, cultural fit indicators, and growth opportunities
                      in this role.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {errors.jobDescription && (
              <div className="mt-3 p-3 bg-red-500/10 border border-red-400/30 rounded-xl backdrop-blur-sm animate-shake">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-red-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-400">
                    {errors.jobDescription}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        {/* Enhanced Submit Button */}
        <div className="pt-6">
          <div className="relative group">
            {/* Button container with animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-lg group-hover:blur-xl"></div>

            <button
              type="submit"
              disabled={loading || !file || !jobDescription.trim()}
              className="relative w-full overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl hover:shadow-purple-500/25 disabled:shadow-none transition-all duration-500 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed group border border-white/20"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Flowing particles */}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-float opacity-30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}

                {/* Neural network lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <line
                      key={i}
                      x1={`${i * 12.5}%`}
                      y1="0%"
                      x2={`${(i + 1) * 12.5}%`}
                      y2="100%"
                      stroke="white"
                      strokeWidth="0.5"
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </svg>
              </div>

              {/* Progress overlay */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/30 rounded-2xl overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400/50 via-blue-400/50 to-purple-500/50 transition-all duration-500 relative"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {/* Progress wave effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide-right"></div>
                  </div>
                </div>
              )}

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

              {/* Button content */}
              <div className="relative z-10 flex items-center justify-center space-x-4">
                {loading ? (
                  <>
                    {/* Loading state */}
                    <div className="flex items-center space-x-3">
                      {/* Animated AI brain icon */}
                      <div className="relative">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                      </div>

                      <div className="text-left">
                        <div className="text-lg font-bold">
                          Analyzing with AI
                        </div>
                        <div className="text-sm text-white/80">
                          Processing... {uploadProgress}%
                        </div>
                      </div>
                    </div>

                    {/* Loading progress ring */}
                    <div className="relative">
                      <svg
                        className="w-12 h-12 transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeDasharray={`${uploadProgress}, 100`}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {uploadProgress}%
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Ready state */}
                    <div className="flex items-center space-x-3">
                      {/* AI Lightning icon */}
                      <div className="relative">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <svg
                            className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
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
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-xs">⚡</span>
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="text-xl font-bold tracking-wide">
                          Start AI Analysis
                        </div>
                        <div className="text-sm text-white/90 font-medium">
                          {file && jobDescription.length >= 50
                            ? "Ready to analyze • Click to begin"
                            : "Upload resume & add job description"}
                        </div>
                      </div>
                    </div>

                    {/* Rocket icon for ready state */}
                    {file && jobDescription.length >= 50 && (
                      <div className="relative">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                          <svg
                            className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ transform: "rotate(90deg)" }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-75 group-hover:opacity-100 animate-ping"></div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Status messages */}
          {(!file || !jobDescription.trim()) && !loading && (
            <div className="mt-4 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-amber-300 font-medium">
                    {!file && !jobDescription.trim()
                      ? "Please upload a resume and enter job description to continue"
                      : !file
                      ? "Please upload a resume file to continue"
                      : "Please enter a job description (minimum 50 characters)"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-6 space-y-4">
              {/* Processing stages */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-blue-300">
                    AI Processing Pipeline
                  </h4>
                  <div className="text-xs text-slate-400">
                    Estimated time: ~30s
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: "🔍", text: "Parsing resume content", delay: 0 },
                    {
                      icon: "🎯",
                      text: "Analyzing job requirements",
                      delay: 1,
                    },
                    { icon: "🤖", text: "AI matching & scoring", delay: 2 },
                    { icon: "📊", text: "Generating insights", delay: 3 },
                    {
                      icon: "✨",
                      text: "Finalizing recommendations",
                      delay: 4,
                    },
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-500 ${
                          uploadProgress > index * 20
                            ? "bg-green-500/20 border border-green-400/40"
                            : "bg-slate-700/50 border border-slate-600/40"
                        }`}
                      >
                        {uploadProgress > index * 20 ? "✓" : stage.icon}
                      </div>
                      <span
                        className={`text-sm transition-colors duration-500 ${
                          uploadProgress > index * 20
                            ? "text-green-300"
                            : "text-slate-400"
                        }`}
                      >
                        {stage.text}
                      </span>
                      {uploadProgress > index * 20 &&
                        uploadProgress <= (index + 1) * 20 && (
                          <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.2}s` }}
                              />
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>          )}
        </div>
      </form>
      
      {/* Job Description Generator Modal */}
      <JobDescriptionGenerator 
        isVisible={showJobGenerator}
        onGenerate={handleJobDescriptionGenerated}
        onCancel={closeJobGenerator}
      />
    </div>
  );
}
