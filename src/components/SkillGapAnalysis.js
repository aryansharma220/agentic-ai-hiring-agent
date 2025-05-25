import { useState } from 'react';

export default function SkillGapAnalysis({ skillAnalysis, isVisible, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isVisible || !skillAnalysis) return null;

  const { gapAnalysis, marketInsights } = skillAnalysis;

  const getGapSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/20 border-red-400/30';
      case 'important':
        return 'text-orange-400 bg-orange-500/20 border-orange-400/30';
      case 'nice_to_have':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400 bg-green-500/20';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'low':
        return 'text-green-400 bg-green-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Skill Gap Analysis</h2>
            <p className="text-slate-400 text-sm">
              Comprehensive skill assessment and recommendations
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 p-2 bg-slate-800/50">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'gaps', label: 'Skill Gaps', icon: '🎯' },
            { id: 'strengths', label: 'Strengths', icon: '💪' },
            { id: 'recommendations', label: 'Recommendations', icon: '🚀' },
            { id: 'market', label: 'Market Insights', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-400/30">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300 mb-1">
                      {gapAnalysis.overall_score}%
                    </div>
                    <div className="text-sm text-slate-300">Overall Match</div>
                  </div>
                </div>

                {Object.entries(gapAnalysis.category_scores).map(([category, score]) => (
                  <div key={category} className="bg-slate-700/50 rounded-xl p-4 border border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{score}%</div>
                      <div className="text-sm text-slate-300 capitalize">{category}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gap Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(gapAnalysis.gaps).map(([severity, gaps]) => (
                  <div key={severity} className={`rounded-xl p-4 border ${getGapSeverityColor(severity)}`}>
                    <div className="text-center">
                      <div className="text-xl font-bold mb-1">{gaps.length}</div>
                      <div className="text-sm capitalize">{severity.replace('_', ' ')} Gaps</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gaps Tab */}
          {activeTab === 'gaps' && (
            <div className="space-y-6">
              {Object.entries(gapAnalysis.gaps).map(([severity, gaps]) => (
                <div key={severity} className="space-y-4">
                  <h3 className={`text-lg font-semibold capitalize ${
                    severity === 'critical' ? 'text-red-400' :
                    severity === 'important' ? 'text-orange-400' : 'text-yellow-400'
                  }`}>
                    {severity.replace('_', ' ')} Skills ({gaps.length})
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gaps.map((gap, index) => (
                      <div key={index} className={`rounded-xl p-4 border ${getGapSeverityColor(severity)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-white">{gap.skill}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(gap.difficulty)}`}>
                            {gap.difficulty}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Importance:</span>
                            <span className="text-white">{Math.round(gap.importance * 100)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Category:</span>
                            <span className="text-white capitalize">{gap.category}</span>
                          </div>
                        </div>

                        {/* Learning Resources */}
                        {gap.resources && gap.resources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <div className="text-xs text-slate-400 mb-2">Quick Start Resources:</div>
                            <div className="space-y-1">
                              {gap.resources.slice(0, 2).map((resource, ridx) => (
                                <div key={ridx} className="flex items-center justify-between text-xs">
                                  <span className="text-blue-300">{resource.name}</span>
                                  <span className="text-slate-400">{resource.duration}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Strengths Tab */}
          {activeTab === 'strengths' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gapAnalysis.strengths.map((strength, index) => (
                  <div key={index} className="bg-green-500/20 rounded-xl p-4 border border-green-400/30">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-white">{strength.skill}</h4>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/30 text-green-300">
                        {Math.round(strength.confidence * 100)}%
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Category:</span>
                        <span className="text-white capitalize">{strength.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Subcategory:</span>
                        <span className="text-white capitalize">{strength.subcategory}</span>
                      </div>
                    </div>

                    {strength.context && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="text-xs text-slate-400 mb-1">Context:</div>
                        <div className="text-xs text-slate-300 line-clamp-2">{strength.context}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              {Object.entries(gapAnalysis.recommendations).map(([timeline, recommendations]) => (
                <div key={timeline} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white capitalize flex items-center">
                    <span className="mr-2">
                      {timeline === 'immediate' ? '🚀' : timeline === 'short_term' ? '📈' : '🎯'}
                    </span>
                    {timeline.replace('_', ' ')} Actions
                  </h3>
                  
                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="bg-slate-700/50 rounded-xl p-4 border border-white/10">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white">{rec.skill}</h4>
                            <p className="text-sm text-slate-300 mt-1">{rec.action}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                            {rec.priority}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Timeline:</span>
                          <span className="text-white">{rec.timeline}</span>
                        </div>

                        {rec.resources && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <div className="text-xs text-slate-400 mb-2">Recommended Resources:</div>
                            <div className="space-y-1">
                              {rec.resources.slice(0, 3).map((resource, ridx) => (
                                <div key={ridx} className="flex items-center justify-between text-xs">
                                  <span className="text-blue-300">{resource.name}</span>
                                  <span className="text-slate-400">{resource.duration}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Market Insights Tab */}
          {activeTab === 'market' && (
            <div className="space-y-6">
              {/* Trending Skills */}
              {marketInsights.trending_skills.length > 0 && (
                <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/30">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">🔥 Trending Skills You Have</h3>
                  <div className="flex flex-wrap gap-2">
                    {marketInsights.trending_skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Salary Impact */}
              {marketInsights.salary_potential.length > 0 && (
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30">
                  <h3 className="text-lg font-semibold text-green-300 mb-3">💰 High-Value Skills</h3>
                  <div className="space-y-3">
                    {marketInsights.salary_potential.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium text-white">{item.skill}</span>
                        <div className="text-right">
                          <div className="text-green-300 font-semibold">{item.impact}</div>
                          <div className="text-sm text-slate-400">{item.avg_salary}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Market Demand */}
              <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">📊 Market Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Market Demand</div>
                    <div className="text-lg font-semibold text-white capitalize">
                      {marketInsights.market_demand}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Career Growth Potential</div>
                    <div className="text-lg font-semibold text-green-300">Strong</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
