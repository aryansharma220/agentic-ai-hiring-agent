import { useState } from 'react';

export default function JobDescriptionGenerator({ onGenerate, onCancel, isVisible }) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    experienceLevel: '',
    yearsOfExperience: '',
    department: '',
    employmentType: 'Full-time',
    workLocation: '',
    companySize: '',
    industry: '',
    keySkills: '',
    companyName: '',
    salaryRange: '',
    additionalRequirements: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const experienceLevels = [
    'Entry Level',
    'Associate',
    'Mid-Level',
    'Senior',
    'Lead',
    'Principal',
    'Director',
    'Executive'
  ];

  const employmentTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Temporary',
    'Internship',
    'Freelance'
  ];

  const companySizes = [
    'Startup (1-10 employees)',
    'Small (11-50 employees)',
    'Medium (51-200 employees)',
    'Large (201-1000 employees)',
    'Enterprise (1000+ employees)'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Government',
    'Non-profit',
    'Entertainment',
    'Real Estate',
    'Transportation',
    'Energy',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = 'Job title is required';
      }
      if (!formData.experienceLevel) {
        newErrors.experienceLevel = 'Experience level is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleGenerate = async () => {
    if (!validateStep(1)) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-job-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate job description');
      }

      const { jobDescription } = await response.json();
      onGenerate(jobDescription);
    } catch (error) {
      console.error('Error generating job description:', error);
      setErrors({ general: 'Failed to generate job description. Please try again.' });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">✨</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Job Description Generator</h2>
                <p className="text-slate-400">Create a professional job description in minutes</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                    step < currentStep ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 text-sm text-slate-400">
            Step {currentStep} of 3: {
              currentStep === 1 ? 'Basic Information' :
              currentStep === 2 ? 'Company & Role Details' :
              'Additional Requirements'
            }
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className={`w-full px-4 py-3 bg-slate-800/60 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.jobTitle ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-purple-400'
                    }`}
                  />
                  {errors.jobTitle && (
                    <p className="mt-1 text-sm text-red-400">{errors.jobTitle}</p>
                  )}
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Experience Level *
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-800/60 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.experienceLevel ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-purple-400'
                    }`}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.experienceLevel && (
                    <p className="mt-1 text-sm text-red-400">{errors.experienceLevel}</p>
                  )}
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={formData.yearsOfExperience}
                    onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                    placeholder="e.g., 3-5 years"
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="e.g., Engineering, Marketing"
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Key Skills */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Key Skills Required
                </label>
                <textarea
                  value={formData.keySkills}
                  onChange={(e) => handleInputChange('keySkills', e.target.value)}
                  placeholder="e.g., React, Node.js, Python, SQL, Git, Agile methodologies"
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 resize-none"
                />
                <p className="mt-1 text-xs text-slate-400">Separate skills with commas</p>
              </div>
            </div>
          )}

          {/* Step 2: Company & Role Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="e.g., Tech Innovations Inc."
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Employment Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => handleInputChange('employmentType', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  >
                    {employmentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Work Location */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Work Location
                  </label>
                  <input
                    type="text"
                    value={formData.workLocation}
                    onChange={(e) => handleInputChange('workLocation', e.target.value)}
                    placeholder="e.g., New York, NY / Remote / Hybrid"
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Company Size
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  >
                    <option value="">Select company size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={formData.salaryRange}
                    onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                    placeholder="e.g., $80,000 - $120,000"
                    className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Additional Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Additional Requirements & Notes
                </label>
                <textarea
                  value={formData.additionalRequirements}
                  onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                  placeholder="Any specific requirements, certifications, travel requirements, or other important details..."
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 resize-none"
                />
              </div>

              {/* Preview Summary */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Generation Preview</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <p><strong>Position:</strong> {formData.jobTitle || 'Not specified'}</p>
                  <p><strong>Level:</strong> {formData.experienceLevel || 'Not specified'}</p>
                  <p><strong>Type:</strong> {formData.employmentType}</p>
                  {formData.companyName && <p><strong>Company:</strong> {formData.companyName}</p>}
                  {formData.keySkills && <p><strong>Skills:</strong> {formData.keySkills}</p>}
                </div>
              </div>

              {errors.general && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                  <p className="text-red-400 text-sm">{errors.general}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-slate-900/50">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onCancel}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-200"
              >
                Cancel
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Generate Job Description</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
