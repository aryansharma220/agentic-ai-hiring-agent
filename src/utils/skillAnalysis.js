// Skill Gap Analysis and Recommendations Utility
// This module provides comprehensive skill analysis capabilities

/**
 * Extract skills from text using enhanced NLP techniques and comprehensive skill databases
 * @param {string} text - Text to analyze (resume or job description)
 * @param {string} type - Type of text ('resume' or 'job')
 * @returns {Object} Extracted skills categorized by type
 */
export function extractSkills(text, type = 'resume') {
  const lowerText = text.toLowerCase();
  
  // Enhanced comprehensive skill databases with more variations
  const skillCategories = {
    technical: {
      programming: [
        'javascript', 'js', 'ecmascript', 'python', 'java', 'c++', 'cpp', 'c#', 'csharp', 
        'php', 'ruby', 'go', 'golang', 'rust', 'kotlin', 'swift', 'typescript', 'ts',
        'scala', 'perl', 'r', 'matlab', 'sql', 'nosql', 'html', 'html5', 'css', 'css3',
        'dart', 'objective-c', 'shell', 'bash', 'powershell', 'assembly', 'cobol', 'fortran'
      ],
      frameworks: [
        'react', 'reactjs', 'angular', 'angularjs', 'vue', 'vuejs', 'node.js', 'nodejs',
        'express', 'expressjs', 'django', 'flask', 'spring', 'spring boot', 'laravel',
        'rails', 'ruby on rails', 'next.js', 'nextjs', 'nuxt.js', 'nuxtjs', 'svelte',
        'ember', '.net', 'dotnet', 'asp.net', 'jquery', 'bootstrap', 'tailwind',
        'material-ui', 'mui', 'chakra ui', 'styled-components', 'sass', 'less'
      ],
      databases: [
        'mysql', 'postgresql', 'postgres', 'mongodb', 'mongo', 'redis', 'elasticsearch',
        'cassandra', 'oracle', 'sqlite', 'dynamodb', 'firebase', 'firestore', 'supabase',
        'prisma', 'sequelize', 'mongoose', 'typeorm', 'knex', 'graphql', 'apollo'
      ],
      cloud: [
        'aws', 'amazon web services', 'azure', 'microsoft azure', 'gcp', 'google cloud',
        'docker', 'containerization', 'kubernetes', 'k8s', 'terraform', 'ansible',
        'jenkins', 'gitlab', 'github actions', 'circleci', 'heroku', 'vercel', 'netlify',
        'cloudflare', 'digitalocean', 'linode', 'vagrant', 'chef', 'puppet'
      ],
      tools: [
        'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack', 'figma',
        'sketch', 'adobe', 'photoshop', 'illustrator', 'postman', 'insomnia', 'webpack',
        'vite', 'babel', 'eslint', 'prettier', 'jest', 'cypress', 'selenium', 'puppeteer'
      ]
    },
    soft: {
      leadership: [
        'leadership', 'team management', 'project management', 'mentoring', 'coaching',
        'strategic planning', 'decision making', 'delegation', 'conflict resolution',
        'people management', 'team building', 'performance management', 'cross-functional'
      ],
      communication: [
        'communication', 'presentation', 'public speaking', 'writing', 'documentation',
        'stakeholder management', 'client relations', 'negotiation', 'collaboration',
        'interpersonal skills', 'verbal communication', 'written communication'
      ],
      analytical: [
        'problem solving', 'critical thinking', 'analytical thinking', 'data analysis',
        'research', 'troubleshooting', 'debugging', 'optimization', 'innovation',
        'logical thinking', 'attention to detail', 'pattern recognition'
      ],
      adaptability: [
        'adaptability', 'flexibility', 'learning agility', 'change management',
        'resilience', 'stress management', 'time management', 'multitasking',
        'continuous learning', 'growth mindset', 'self-motivated'
      ]
    },
    domain: {
      business: [
        'agile', 'scrum', 'kanban', 'lean', 'six sigma', 'business analysis',
        'requirements gathering', 'user experience', 'ux', 'ui', 'product management',
        'marketing', 'sales', 'customer service', 'business development', 'strategy'
      ],
      industry: [
        'fintech', 'healthcare', 'e-commerce', 'education', 'manufacturing',
        'automotive', 'gaming', 'media', 'telecommunications', 'retail',
        'finance', 'banking', 'insurance', 'real estate', 'logistics'
      ]
    }
  };

  const extractedSkills = {
    technical: {
      programming: [],
      frameworks: [],
      databases: [],
      cloud: [],
      tools: []
    },
    soft: {
      leadership: [],
      communication: [],
      analytical: [],
      adaptability: []
    },
    domain: {
      business: [],
      industry: []
    }
  };

  // Enhanced skill extraction with better pattern matching
  Object.keys(skillCategories).forEach(category => {
    Object.keys(skillCategories[category]).forEach(subcategory => {
      skillCategories[category][subcategory].forEach(skill => {
        const variations = generateSkillVariations(skill);
        const skillMatches = findSkillInText(text, variations);
        
        if (skillMatches.found) {
          const confidence = calculateEnhancedSkillConfidence(text, skill, variations, type);
          if (!extractedSkills[category][subcategory].some(s => s.name === skill)) {
            extractedSkills[category][subcategory].push({
              name: skill,
              confidence,
              variations: skillMatches.matchedVariations,
              context: skillMatches.contexts,
              experience_level: extractExperienceLevel(text, skill),
              mentions: skillMatches.mentionCount
            });
          }
        }
      });
    });
  });

  return extractedSkills;
}

/**
 * Generate enhanced variations of a skill name for better matching
 * @param {string} skill - Base skill name
 * @returns {Array} Array of skill variations
 */
function generateSkillVariations(skill) {
  const variations = [skill];
  
  // Add common variations
  if (skill.includes('.')) {
    variations.push(skill.replace(/\./g, ''));
    variations.push(skill.replace(/\./g, ' '));
  }
  if (skill.includes('-')) {
    variations.push(skill.replace(/-/g, ' '));
    variations.push(skill.replace(/-/g, ''));
  }
  if (skill.includes(' ')) {
    variations.push(skill.replace(/ /g, ''));
    variations.push(skill.replace(/ /g, '-'));
  }
  
  // Add acronyms and common alternatives
  const skillMap = {
    'javascript': ['js', 'ecmascript', 'es6', 'es2015'],
    'typescript': ['ts'],
    'cascading style sheets': ['css', 'css3'],
    'hypertext markup language': ['html', 'html5'],
    'structured query language': ['sql'],
    'amazon web services': ['aws'],
    'google cloud platform': ['gcp', 'google cloud'],
    'microsoft azure': ['azure'],
    'application programming interface': ['api', 'rest api', 'restful'],
    'user interface': ['ui'],
    'user experience': ['ux'],
    'node.js': ['nodejs', 'node'],
    'react': ['reactjs', 'react.js'],
    'angular': ['angularjs', 'angular.js'],
    'vue': ['vuejs', 'vue.js'],
    'next.js': ['nextjs', 'next'],
    'express': ['expressjs', 'express.js'],
    'mongodb': ['mongo'],
    'postgresql': ['postgres'],
    'kubernetes': ['k8s'],
    'docker': ['containerization']
  };
  
  const lowerSkill = skill.toLowerCase();
  if (skillMap[lowerSkill]) {
    variations.push(...skillMap[lowerSkill]);
  }
  
  // Find reverse mappings
  Object.entries(skillMap).forEach(([key, values]) => {
    if (values.includes(lowerSkill)) {
      variations.push(key);
      variations.push(...values.filter(v => v !== lowerSkill));
    }
  });
  
  return [...new Set(variations)]; // Remove duplicates
}

/**
 * Enhanced skill detection in text with better pattern matching
 * @param {string} text - Text to search in
 * @param {Array} variations - Skill variations to search for
 * @returns {Object} Detection results
 */
function findSkillInText(text, variations) {
  const lowerText = text.toLowerCase();
  const result = {
    found: false,
    matchedVariations: [],
    contexts: [],
    mentionCount: 0
  };
  
  variations.forEach(variation => {
    // Use word boundaries for more accurate matching
    const regex = new RegExp(`\\b${variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = lowerText.match(regex);
    
    if (matches) {
      result.found = true;
      result.matchedVariations.push(variation);
      result.mentionCount += matches.length;
      
      // Extract context around each mention
      const contextRegex = new RegExp(`(.{0,60}\\b${variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b.{0,60})`, 'gi');
      const contextMatches = text.match(contextRegex);
      if (contextMatches) {
        result.contexts.push(...contextMatches.map(c => c.trim()));
      }
    }
  });
  
  return result;
}

/**
 * Calculate enhanced confidence score for skill extraction
 * @param {string} text - Full text
 * @param {string} skill - Primary skill name
 * @param {Array} variations - All skill variations
 * @param {string} type - Text type
 * @returns {number} Confidence score (0-1)
 */
function calculateEnhancedSkillConfidence(text, skill, variations, type) {
  const lowerText = text.toLowerCase();
  let confidence = 0;
  let totalMentions = 0;
  
  variations.forEach(variation => {
    const regex = new RegExp(`\\b${variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = lowerText.match(regex) || [];
    totalMentions += matches.length;
  });
  
  // Base confidence from mentions
  confidence = Math.min(totalMentions * 0.25, 0.8);
  
  // Context-based confidence boosting
  const strongContexts = [
    'experience with', 'proficient in', 'expert in', 'skilled in', 'specialized in',
    'worked with', 'developed using', 'implemented with', 'years of', 'experienced in',
    'familiar with', 'knowledge of', 'background in', 'expertise in', 'competent in',
    'advanced', 'intermediate', 'beginner', 'senior', 'junior', 'lead'
  ];
  
  const experienceContexts = [
    '\\d+\\s*years?\\s*of', '\\d+\\s*months?\\s*of', 'over\\s*\\d+\\s*years?',
    'more than\\s*\\d+\\s*years?', '\\d+\\+\\s*years?'
  ];
  
  strongContexts.forEach(context => {
    variations.forEach(variation => {
      const contextRegex = new RegExp(`${context}[^.]{0,50}\\b${variation}\\b`, 'gi');
      if (contextRegex.test(lowerText)) {
        confidence = Math.min(confidence + 0.15, 1.0);
      }
    });
  });
  
  // Experience level boosting
  experienceContexts.forEach(expContext => {
    variations.forEach(variation => {
      const expRegex = new RegExp(`${expContext}[^.]{0,30}\\b${variation}\\b`, 'gi');
      if (expRegex.test(lowerText)) {
        confidence = Math.min(confidence + 0.2, 1.0);
      }
    });
  });
  
  // Project/achievement context
  const projectContexts = [
    'built', 'created', 'developed', 'designed', 'implemented', 'deployed',
    'maintained', 'optimized', 'integrated', 'migrated', 'scaled'
  ];
  
  projectContexts.forEach(context => {
    variations.forEach(variation => {
      const projectRegex = new RegExp(`${context}[^.]{0,50}\\b${variation}\\b`, 'gi');
      if (projectRegex.test(lowerText)) {
        confidence = Math.min(confidence + 0.1, 1.0);
      }
    });
  });
  
  // Penalty for very brief mentions
  if (totalMentions === 1 && confidence < 0.3) {
    confidence *= 0.7;
  }
  
  return Math.round(confidence * 100) / 100;
}

/**
 * Extract experience level for a skill
 * @param {string} text - Full text
 * @param {string} skill - Skill name
 * @returns {string} Experience level
 */
function extractExperienceLevel(text, skill) {
  const lowerText = text.toLowerCase();
  const skillPattern = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Look for explicit experience levels
  const levelPatterns = {
    'expert': ['expert', 'advanced', 'senior', 'lead', 'principal', 'architect'],
    'intermediate': ['intermediate', 'mid-level', 'experienced', 'proficient'],
    'beginner': ['beginner', 'junior', 'entry-level', 'basic', 'familiar with']
  };
  
  for (const [level, patterns] of Object.entries(levelPatterns)) {
    for (const pattern of patterns) {
      const regex = new RegExp(`${pattern}[^.]{0,30}\\b${skillPattern}\\b`, 'gi');
      if (regex.test(lowerText)) {
        return level;
      }
    }
  }
  
  // Look for years of experience
  const yearsRegex = new RegExp(`(\\d+)\\s*years?[^.]{0,30}\\b${skillPattern}\\b`, 'gi');
  const yearsMatch = lowerText.match(yearsRegex);
  if (yearsMatch) {
    const years = parseInt(yearsMatch[0].match(/\d+/)[0]);
    if (years >= 5) return 'expert';
    if (years >= 2) return 'intermediate';
    return 'beginner';
  }
  
  return 'intermediate'; // Default assumption
}

/**
 * Calculate confidence score for skill extraction
 * @param {string} text - Full text
 * @param {string} skill - Skill to analyze
 * @param {string} type - Text type
 * @returns {number} Confidence score (0-1)
 */
function calculateSkillConfidence(text, skill, type) {
  const lowerText = text.toLowerCase();
  const skillRegex = new RegExp(`\\b${skill}\\b`, 'gi');
  const matches = lowerText.match(skillRegex) || [];
  
  let confidence = Math.min(matches.length * 0.3, 1.0);
  
  // Context-based confidence boosting
  const strongContexts = [
    'experience with', 'proficient in', 'expert in', 'skilled in',
    'worked with', 'developed using', 'implemented with', 'years of'
  ];
  
  strongContexts.forEach(context => {
    const contextRegex = new RegExp(`${context}[^.]*${skill}`, 'gi');
    if (contextRegex.test(lowerText)) {
      confidence = Math.min(confidence + 0.2, 1.0);
    }
  });
  
  return Math.round(confidence * 100) / 100;
}

/**
 * Extract context around a skill mention
 * @param {string} text - Full text
 * @param {string} skill - Skill to find context for
 * @returns {string} Context snippet
 */
function extractSkillContext(text, skill) {
  const skillRegex = new RegExp(`(.{0,50}${skill}.{0,50})`, 'gi');
  const match = text.match(skillRegex);
  return match ? match[0].trim() : '';
}

/**
 * Perform comprehensive skill gap analysis with enhanced matching
 * @param {Object} resumeSkills - Skills extracted from resume
 * @param {Object} jobSkills - Skills extracted from job description
 * @returns {Object} Comprehensive gap analysis
 */
export function analyzeSkillGaps(resumeSkills, jobSkills) {
  const analysis = {
    matching: {
      technical: [],
      soft: [],
      domain: []
    },
    gaps: {
      critical: [],
      important: [],
      nice_to_have: []
    },
    strengths: [],
    recommendations: {
      immediate: [],
      short_term: [],
      long_term: []
    },
    overall_score: 0,
    category_scores: {},
    detailed_metrics: {
      total_required_skills: 0,
      matched_skills: 0,
      gap_count: 0,
      strength_count: 0
    }
  };

  let totalRequired = 0;
  let totalMatched = 0;

  // Analyze each category with improved matching
  Object.keys(jobSkills).forEach(category => {
    let categoryMatches = 0;
    let categoryTotal = 0;
    
    Object.keys(jobSkills[category]).forEach(subcategory => {
      jobSkills[category][subcategory].forEach(requiredSkill => {
        categoryTotal++;
        totalRequired++;
        
        const matchResult = findEnhancedMatchingSkill(
          requiredSkill,
          resumeSkills[category][subcategory],
          category
        );
        
        if (matchResult.match) {
          categoryMatches++;
          totalMatched++;
          analysis.matching[category].push({
            skill: requiredSkill.name,
            resumeConfidence: matchResult.match.confidence,
            jobImportance: requiredSkill.confidence,
            match_score: matchResult.score,
            experience_level: matchResult.match.experience_level,
            match_quality: matchResult.quality
          });
        } else {
          // Enhanced gap classification
          const gapInfo = classifyEnhancedGap(requiredSkill, category, subcategory);
          analysis.gaps[gapInfo.severity].push({
            skill: requiredSkill.name,
            category,
            subcategory,
            importance: requiredSkill.confidence,
            severity: gapInfo.severity,
            difficulty: gapInfo.difficulty,
            learn_time: gapInfo.learnTime,
            priority_score: gapInfo.priorityScore,
            resources: getEnhancedSkillResources(requiredSkill.name, gapInfo.difficulty),
            related_skills: findRelatedSkills(requiredSkill.name, resumeSkills)
          });
        }
      });
    });
    
    analysis.category_scores[category] = categoryTotal > 0 ? 
      Math.round((categoryMatches / categoryTotal) * 100) : 0;
  });

  // Enhanced overall score calculation
  analysis.overall_score = totalRequired > 0 ?
    Math.round((totalMatched / totalRequired) * 100) : 0;

  // Apply quality weighting to overall score
  const qualityWeight = calculateQualityWeight(analysis.matching);
  analysis.overall_score = Math.round(analysis.overall_score * qualityWeight);

  // Update detailed metrics
  analysis.detailed_metrics = {
    total_required_skills: totalRequired,
    matched_skills: totalMatched,
    gap_count: analysis.gaps.critical.length + analysis.gaps.important.length + analysis.gaps.nice_to_have.length,
    strength_count: 0 // Will be updated below
  };

  // Enhanced strength identification
  analysis.strengths = findEnhancedCandidateStrengths(resumeSkills, jobSkills);
  analysis.detailed_metrics.strength_count = analysis.strengths.length;

  // Generate enhanced recommendations
  analysis.recommendations = generateEnhancedRecommendations(analysis.gaps, analysis.strengths, analysis.matching);

  return analysis;
}

/**
 * Find enhanced matching skill with similarity scoring
 * @param {Object} requiredSkill - Required skill from job
 * @param {Array} candidateSkills - Candidate's skills in same category
 * @param {string} category - Skill category
 * @returns {Object} Match result with quality scoring
 */
function findEnhancedMatchingSkill(requiredSkill, candidateSkills, category) {
  let bestMatch = null;
  let bestScore = 0;
  let bestQuality = 'none';

  candidateSkills.forEach(candidateSkill => {
    const similarity = calculateSkillSimilarity(requiredSkill.name, candidateSkill.name);
    const experienceBonus = getExperienceBonus(candidateSkill.experience_level);
    const confidenceBonus = candidateSkill.confidence * 0.3;
    
    const totalScore = similarity + experienceBonus + confidenceBonus;
    
    if (totalScore > bestScore && similarity >= 0.7) { // Minimum similarity threshold
      bestMatch = candidateSkill;
      bestScore = totalScore;
      bestQuality = determineMatchQuality(similarity, candidateSkill.confidence, candidateSkill.experience_level);
    }
  });

  return {
    match: bestMatch,
    score: Math.round(bestScore * 100),
    quality: bestQuality
  };
}

/**
 * Calculate skill similarity using multiple techniques
 * @param {string} skill1 - First skill name
 * @param {string} skill2 - Second skill name
 * @returns {number} Similarity score (0-1)
 */
function calculateSkillSimilarity(skill1, skill2) {
  const s1 = skill1.toLowerCase();
  const s2 = skill2.toLowerCase();
  
  // Exact match
  if (s1 === s2) return 1.0;
  
  // Check if one is contained in the other
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;
  
  // Levenshtein distance similarity
  const levenshtein = calculateLevenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);
  const levenshteinSimilarity = 1 - (levenshtein / maxLength);
  
  // Jaccard similarity (for multi-word skills)
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);
  const jaccardSimilarity = calculateJaccardSimilarity(words1, words2);
  
  // Combine similarities
  return Math.max(levenshteinSimilarity, jaccardSimilarity);
}

/**
 * Calculate Levenshtein distance between two strings
 */
function calculateLevenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Calculate Jaccard similarity between two sets of words
 */
function calculateJaccardSimilarity(words1, words2) {
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
}

/**
 * Get experience bonus for scoring
 */
function getExperienceBonus(experienceLevel) {
  const bonuses = {
    'expert': 0.3,
    'intermediate': 0.2,
    'beginner': 0.1
  };
  return bonuses[experienceLevel] || 0.1;
}

/**
 * Determine match quality based on various factors
 */
function determineMatchQuality(similarity, confidence, experienceLevel) {
  if (similarity >= 0.95 && confidence >= 0.8 && experienceLevel === 'expert') {
    return 'excellent';
  } else if (similarity >= 0.9 && confidence >= 0.6 && experienceLevel !== 'beginner') {
    return 'good';
  } else if (similarity >= 0.8 && confidence >= 0.4) {
    return 'fair';
  } else {
    return 'poor';
  }
}

/**
 * Find matching skill between resume and job requirements
 * @param {Object} requiredSkill - Required skill from job
 * @param {Array} candidateSkills - Candidate's skills in same category
 * @returns {Object|null} Matching skill or null
 */
function findMatchingSkill(requiredSkill, candidateSkills) {
  return candidateSkills.find(skill => 
    skill.name.toLowerCase() === requiredSkill.name.toLowerCase() ||
    skill.variations.some(v => v.toLowerCase() === requiredSkill.name.toLowerCase())
  );
}

/**
 * Calculate match score between candidate and required skill
 * @param {Object} candidateSkill - Candidate's skill
 * @param {Object} requiredSkill - Required skill
 * @returns {number} Match score (0-100)
 */
function calculateMatchScore(candidateSkill, requiredSkill) {
  const confidenceWeight = 0.6;
  const importanceWeight = 0.4;
  
  return Math.round(
    (candidateSkill.confidence * confidenceWeight + 
     requiredSkill.confidence * importanceWeight) * 100
  );
}

/**
 * Enhanced gap classification with more detailed analysis
 * @param {Object} skill - Missing skill
 * @param {string} category - Skill category
 * @param {string} subcategory - Skill subcategory
 * @returns {Object} Detailed gap information
 */
function classifyEnhancedGap(skill, category, subcategory) {
  const importance = skill.confidence;
  let severity, difficulty, learnTime, priorityScore;
  
  // Determine severity based on importance and skill type
  if (importance >= 0.8) {
    severity = 'critical';
    priorityScore = 100;
  } else if (importance >= 0.5) {
    severity = 'important';
    priorityScore = 70;
  } else {
    severity = 'nice_to_have';
    priorityScore = 40;
  }
  
  // Estimate learning difficulty and time
  const difficultyInfo = estimateEnhancedLearnDifficulty(skill.name, category, subcategory);
  difficulty = difficultyInfo.level;
  learnTime = difficultyInfo.time;
  
  // Adjust priority based on difficulty
  if (difficulty === 'beginner') priorityScore += 20;
  if (difficulty === 'advanced') priorityScore -= 10;
  
  return {
    severity,
    difficulty,
    learnTime,
    priorityScore: Math.min(priorityScore, 100)
  };
}

/**
 * Enhanced learning difficulty estimation
 * @param {string} skillName - Name of the skill
 * @param {string} category - Skill category
 * @param {string} subcategory - Skill subcategory
 * @returns {Object} Difficulty and time estimation
 */
function estimateEnhancedLearnDifficulty(skillName, category, subcategory) {
  const skillLower = skillName.toLowerCase();
  
  const difficultyMap = {
    technical: {
      programming: {
        beginner: { skills: ['html', 'css', 'sql'], time: '2-4 weeks' },
        intermediate: { skills: ['javascript', 'python', 'react', 'node.js'], time: '2-4 months' },
        advanced: { skills: ['kubernetes', 'machine learning', 'blockchain', 'system design'], time: '6-12 months' }
      },
      frameworks: {
        beginner: { skills: ['bootstrap', 'jquery'], time: '1-2 weeks' },
        intermediate: { skills: ['react', 'angular', 'vue', 'express'], time: '1-3 months' },
        advanced: { skills: ['microservices', 'spring boot'], time: '3-6 months' }
      },
      cloud: {
        beginner: { skills: ['heroku', 'netlify'], time: '1-2 weeks' },
        intermediate: { skills: ['docker', 'aws basics'], time: '2-4 months' },
        advanced: { skills: ['kubernetes', 'terraform', 'aws architect'], time: '6-12 months' }
      }
    },
    soft: {
      communication: {
        beginner: { skills: ['basic communication'], time: '2-4 weeks' },
        intermediate: { skills: ['presentation', 'documentation'], time: '1-3 months' },
        advanced: { skills: ['stakeholder management', 'negotiation'], time: '3-6 months' }
      },
      leadership: {
        beginner: { skills: ['team collaboration'], time: '1-2 months' },
        intermediate: { skills: ['project management', 'mentoring'], time: '3-6 months' },
        advanced: { skills: ['strategic planning', 'change management'], time: '6-12 months' }
      }
    }
  };

  const categoryMap = difficultyMap[category] || difficultyMap.technical;
  const subcategoryMap = categoryMap[subcategory] || categoryMap.programming || categoryMap.communication;

  for (const [level, info] of Object.entries(subcategoryMap)) {
    if (info.skills.some(s => skillLower.includes(s) || s.includes(skillLower))) {
      return { level, time: info.time };
    }
  }
  
  // Default estimation based on category
  if (category === 'technical') {
    return { level: 'intermediate', time: '2-4 months' };
  } else {
    return { level: 'intermediate', time: '1-3 months' };
  }
}

/**
 * Calculate quality weight for overall score adjustment
 */
function calculateQualityWeight(matching) {
  let totalWeight = 0;
  let count = 0;
  
  Object.values(matching).forEach(categoryMatches => {
    categoryMatches.forEach(match => {
      const qualityWeights = {
        'excellent': 1.0,
        'good': 0.9,
        'fair': 0.8,
        'poor': 0.6
      };
      totalWeight += qualityWeights[match.match_quality] || 0.8;
      count++;
    });
  });
  
  return count > 0 ? totalWeight / count : 1.0;
}

/**
 * Find related skills that could help with learning a missing skill
 */
function findRelatedSkills(targetSkill, resumeSkills) {
  const related = [];
  const targetLower = targetSkill.toLowerCase();
  
  // Define skill relationships
  const relationships = {
    'react': ['javascript', 'html', 'css', 'node.js'],
    'angular': ['typescript', 'javascript', 'html', 'css'],
    'vue': ['javascript', 'html', 'css'],
    'node.js': ['javascript'],
    'django': ['python'],
    'flask': ['python'],
    'spring': ['java'],
    'kubernetes': ['docker', 'linux', 'cloud'],
    'docker': ['linux', 'devops'],
    'aws': ['cloud', 'linux'],
    'mongodb': ['nosql', 'database'],
    'postgresql': ['sql', 'database']
  };

  const relatedSkillNames = relationships[targetLower] || [];
  
  // Search for related skills in resume
  Object.values(resumeSkills).forEach(category => {
    Object.values(category).forEach(subcategory => {
      subcategory.forEach(skill => {
        if (relatedSkillNames.some(rs => 
          skill.name.toLowerCase().includes(rs) || 
          rs.includes(skill.name.toLowerCase())
        )) {
          related.push({
            name: skill.name,
            confidence: skill.confidence,
            experience_level: skill.experience_level
          });
        }
      });
    });
  });
  
  return related.slice(0, 5); // Limit to 5 most relevant
}

/**
 * Get enhanced learning resources for a skill based on difficulty
 * @param {string} skillName - Name of the skill
 * @param {string} difficulty - Learning difficulty level
 * @returns {Array} Array of resource objects
 */
function getEnhancedSkillResources(skillName, difficulty) {
  const skillLower = skillName.toLowerCase();
  
  // Comprehensive resource mapping
  const resourceMap = {
    // Programming Languages
    javascript: [
      { type: 'course', name: 'freeCodeCamp JavaScript', url: 'https://freecodecamp.org', duration: '40 hours', difficulty: 'beginner' },
      { type: 'book', name: 'You Don\'t Know JS', url: 'https://github.com/getify/You-Dont-Know-JS', duration: '2-3 weeks', difficulty: 'intermediate' },
      { type: 'practice', name: 'JavaScript30', url: 'https://javascript30.com', duration: '30 days', difficulty: 'intermediate' },
      { type: 'course', name: 'Advanced JavaScript Concepts', url: 'https://zerotomastery.io', duration: '25 hours', difficulty: 'advanced' }
    ],
    python: [
      { type: 'course', name: 'Python.org Tutorial', url: 'https://python.org', duration: '30 hours', difficulty: 'beginner' },
      { type: 'book', name: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com', duration: '3-4 weeks', difficulty: 'beginner' },
      { type: 'practice', name: 'Python Challenges', url: 'https://pythonchallenge.com', duration: 'Ongoing', difficulty: 'intermediate' },
      { type: 'course', name: 'Advanced Python', url: 'https://realpython.com', duration: '50 hours', difficulty: 'advanced' }
    ],
    react: [
      { type: 'course', name: 'React Official Tutorial', url: 'https://react.dev', duration: '20 hours', difficulty: 'beginner' },
      { type: 'course', name: 'Complete React Guide', url: 'https://udemy.com', duration: '50 hours', difficulty: 'intermediate' },
      { type: 'practice', name: 'React Projects', url: 'https://github.com/practical-tutorials/project-based-learning', duration: '4-6 weeks', difficulty: 'intermediate' },
      { type: 'book', name: 'Learning React', url: 'https://oreilly.com', duration: '3-4 weeks', difficulty: 'advanced' }
    ],
    // Frameworks
    'node.js': [
      { type: 'course', name: 'Node.js Complete Guide', url: 'https://nodejs.org', duration: '30 hours', difficulty: 'beginner' },
      { type: 'practice', name: 'Node.js Projects', url: 'https://github.com/practical-tutorials/project-based-learning', duration: '6-8 weeks', difficulty: 'intermediate' },
      { type: 'course', name: 'Advanced Node.js', url: 'https://pluralsight.com', duration: '40 hours', difficulty: 'advanced' }
    ],
    angular: [
      { type: 'course', name: 'Angular Tour of Heroes', url: 'https://angular.io', duration: '25 hours', difficulty: 'beginner' },
      { type: 'course', name: 'Angular Complete Course', url: 'https://udemy.com', duration: '45 hours', difficulty: 'intermediate' },
      { type: 'practice', name: 'Angular Projects', url: 'https://github.com/topics/angular-projects', duration: '8-10 weeks', difficulty: 'intermediate' }
    ],
    // Cloud Technologies
    aws: [
      { type: 'course', name: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/training', duration: '40 hours', difficulty: 'beginner' },
      { type: 'certification', name: 'AWS Solutions Architect', url: 'https://aws.amazon.com/certification', duration: '3-4 months', difficulty: 'intermediate' },
      { type: 'practice', name: 'AWS Hands-on Labs', url: 'https://aws.amazon.com/getting-started', duration: 'Ongoing', difficulty: 'intermediate' }
    ],
    docker: [
      { type: 'course', name: 'Docker Fundamentals', url: 'https://docker.com/get-started', duration: '20 hours', difficulty: 'beginner' },
      { type: 'practice', name: 'Docker Projects', url: 'https://github.com/docker/labs', duration: '4-6 weeks', difficulty: 'intermediate' },
      { type: 'book', name: 'Docker Deep Dive', url: 'https://nigelpoulton.com', duration: '3-4 weeks', difficulty: 'advanced' }
    ],
    kubernetes: [
      { type: 'course', name: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials', duration: '30 hours', difficulty: 'intermediate' },
      { type: 'certification', name: 'CKA Certification', url: 'https://www.cncf.io/certification/cka', duration: '4-6 months', difficulty: 'advanced' },
      { type: 'practice', name: 'Kubernetes the Hard Way', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way', duration: '2-3 months', difficulty: 'advanced' }
    ]
  };

  // Get resources for the specific skill
  const skillResources = resourceMap[skillLower] || [];
  
  // Filter by difficulty if specified
  let filteredResources = skillResources;
  if (difficulty) {
    filteredResources = skillResources.filter(resource => {
      if (difficulty === 'beginner') return ['beginner', 'intermediate'].includes(resource.difficulty);
      if (difficulty === 'intermediate') return ['beginner', 'intermediate', 'advanced'].includes(resource.difficulty);
      return resource.difficulty === 'advanced';
    });
  }
  
  // If no specific resources found, provide generic ones
  if (filteredResources.length === 0) {
    const difficultyMap = {
      beginner: [
        { type: 'course', name: `${skillName} Fundamentals`, url: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}`, duration: '20-30 hours', difficulty: 'beginner' },
        { type: 'tutorial', name: `Learn ${skillName}`, url: `https://www.youtube.com/results?search_query=learn+${encodeURIComponent(skillName)}`, duration: '10-20 hours', difficulty: 'beginner' }
      ],
      intermediate: [
        { type: 'course', name: `Advanced ${skillName}`, url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(skillName)}`, duration: '30-50 hours', difficulty: 'intermediate' },
        { type: 'practice', name: `${skillName} Projects`, url: `https://github.com/search?q=${encodeURIComponent(skillName)}+projects`, duration: '4-8 weeks', difficulty: 'intermediate' }
      ],
      advanced: [
        { type: 'specialization', name: `${skillName} Mastery`, url: `https://www.pluralsight.com/search?q=${encodeURIComponent(skillName)}`, duration: '50-100 hours', difficulty: 'advanced' },
        { type: 'certification', name: `${skillName} Certification`, url: `https://www.google.com/search?q=${encodeURIComponent(skillName)}+certification`, duration: '3-6 months', difficulty: 'advanced' }
      ]
    };
    
    filteredResources = difficultyMap[difficulty] || difficultyMap.intermediate;
  }
  
  return filteredResources.slice(0, 4); // Return top 4 resources
}

/**
 * Find enhanced candidate strengths with better analysis
 * @param {Object} resumeSkills - Skills from resume
 * @param {Object} jobSkills - Skills from job description
 * @returns {Array} Array of strength skills with analysis
 */
function findEnhancedCandidateStrengths(resumeSkills, jobSkills) {
  const strengths = [];
  
  Object.keys(resumeSkills).forEach(category => {
    Object.keys(resumeSkills[category]).forEach(subcategory => {
      resumeSkills[category][subcategory].forEach(skill => {
        const isRequired = isSkillRequired(skill, jobSkills[category]);
        
        if (!isRequired && skill.confidence >= 0.6) {
          const strengthValue = calculateStrengthValue(skill, category, subcategory);
          strengths.push({
            skill: skill.name,
            category,
            subcategory,
            confidence: skill.confidence,
            experience_level: skill.experience_level,
            context: skill.context ? skill.context[0] : '',
            strength_value: strengthValue,
            market_demand: assessMarketDemand(skill.name),
            transferable: assessTransferability(skill.name, category)
          });
        }
      });
    });
  });
  
  // Sort by strength value and return top 10
  return strengths
    .sort((a, b) => b.strength_value - a.strength_value)
    .slice(0, 10);
}

/**
 * Check if a skill is required in job description
 */
function isSkillRequired(candidateSkill, jobCategorySkills) {
  if (!jobCategorySkills) return false;
  
  return Object.values(jobCategorySkills).some(subcategory =>
    subcategory.some(jobSkill => 
      calculateSkillSimilarity(candidateSkill.name, jobSkill.name) >= 0.8
    )
  );
}

/**
 * Calculate the value of a strength skill
 */
function calculateStrengthValue(skill, category, subcategory) {
  let value = skill.confidence * 100;
  
  // Experience level bonus
  const experienceBonuses = { expert: 30, intermediate: 20, beginner: 10 };
  value += experienceBonuses[skill.experience_level] || 10;
  
  // Category weight
  const categoryWeights = { technical: 1.2, soft: 1.0, domain: 1.1 };
  value *= categoryWeights[category] || 1.0;
  
  // Market demand bonus
  const marketDemand = assessMarketDemand(skill.name);
  if (marketDemand === 'high') value += 20;
  if (marketDemand === 'medium') value += 10;
  
  return Math.round(value);
}

/**
 * Assess market demand for a skill
 */
function assessMarketDemand(skillName) {
  const highDemand = ['react', 'python', 'aws', 'kubernetes', 'machine learning', 'cybersecurity', 'devops'];
  const mediumDemand = ['angular', 'vue', 'docker', 'mongodb', 'postgresql', 'java'];
  
  const skillLower = skillName.toLowerCase();
  
  if (highDemand.some(s => skillLower.includes(s) || s.includes(skillLower))) {
    return 'high';
  } else if (mediumDemand.some(s => skillLower.includes(s) || s.includes(skillLower))) {
    return 'medium';
  }
  return 'low';
}

/**
 * Assess transferability of a skill
 */
function assessTransferability(skillName, category) {
  if (category === 'soft') return 'high';
  
  const highTransfer = ['git', 'sql', 'linux', 'problem solving', 'debugging'];
  const skillLower = skillName.toLowerCase();
  
  return highTransfer.some(s => skillLower.includes(s) || s.includes(skillLower)) ? 'high' : 'medium';
}

/**
 * Generate enhanced personalized recommendations
 * @param {Object} gaps - Skill gaps analysis
 * @param {Array} strengths - Candidate strengths
 * @param {Object} matching - Matched skills analysis
 * @returns {Object} Enhanced recommendations by timeline
 */
function generateEnhancedRecommendations(gaps, strengths, matching) {
  const recommendations = {
    immediate: [],
    short_term: [],
    long_term: [],
    career_growth: []
  };

  // Sort gaps by priority score for better recommendations
  const allGaps = [
    ...gaps.critical.map(g => ({ ...g, severity: 'critical' })),
    ...gaps.important.map(g => ({ ...g, severity: 'important' })),
    ...gaps.nice_to_have.map(g => ({ ...g, severity: 'nice_to_have' }))
  ].sort((a, b) => b.priority_score - a.priority_score);

  // Immediate recommendations (1-2 weeks)
  allGaps.slice(0, 3).forEach(gap => {
    if (gap.difficulty === 'beginner' && gap.severity !== 'nice_to_have') {
      recommendations.immediate.push({
        type: 'skill_development',
        skill: gap.skill,
        action: `Start learning ${gap.skill} immediately`,
        reasoning: `High-priority ${gap.severity} skill that can be learned quickly`,
        resources: gap.resources.slice(0, 2),
        timeline: gap.learn_time,
        priority: gap.severity === 'critical' ? 'high' : 'medium',
        difficulty: gap.difficulty,
        related_skills: gap.related_skills
      });
    }
  });

  // Short-term recommendations (1-3 months)
  allGaps.slice(0, 6).forEach(gap => {
    if (gap.difficulty === 'intermediate' || (gap.difficulty === 'beginner' && gap.severity === 'critical')) {
      recommendations.short_term.push({
        type: 'skill_development',
        skill: gap.skill,
        action: `Develop proficiency in ${gap.skill}`,
        reasoning: `Important skill for role requirements with moderate learning curve`,
        resources: gap.resources,
        timeline: gap.learn_time,
        priority: gap.priority_score >= 80 ? 'high' : 'medium',
        difficulty: gap.difficulty,
        related_skills: gap.related_skills
      });
    }
  });

  // Long-term recommendations (3-6 months)
  allGaps.forEach(gap => {
    if (gap.difficulty === 'advanced' || gap.severity === 'nice_to_have') {
      recommendations.long_term.push({
        type: 'skill_development',
        skill: gap.skill,
        action: `Master ${gap.skill} for competitive advantage`,
        reasoning: `Advanced skill that provides significant career growth potential`,
        resources: gap.resources,
        timeline: gap.learn_time,
        priority: gap.severity === 'critical' ? 'high' : 'medium',
        difficulty: gap.difficulty,
        related_skills: gap.related_skills
      });
    }
  });

  // Strength-based recommendations
  strengths.slice(0, 3).forEach(strength => {
    recommendations.immediate.push({
      type: 'strength_highlight',
      skill: strength.skill,
      action: `Emphasize your ${strength.skill} expertise in interviews`,
      reasoning: `Strong skill that differentiates you from other candidates`,
      timeline: 'Immediate',
      priority: 'medium',
      market_value: strength.market_demand,
      transferable: strength.transferable
    });
  });

  // Career growth recommendations based on strengths
  const topStrengths = strengths.slice(0, 5);
  topStrengths.forEach(strength => {
    if (strength.market_demand === 'high' && strength.experience_level !== 'expert') {
      recommendations.career_growth.push({
        type: 'career_advancement',
        skill: strength.skill,
        action: `Advance your ${strength.skill} expertise to expert level`,
        reasoning: `High market demand skill with room for growth`,
        timeline: '6-12 months',
        priority: 'medium',
        current_level: strength.experience_level,
        target_level: 'expert',
        market_impact: 'High salary potential and career opportunities'
      });
    }
  });

  // Add skill combination recommendations
  const combinationRecommendations = generateSkillCombinationRecommendations(gaps, strengths);
  recommendations.short_term.push(...combinationRecommendations);

  return recommendations;
}

/**
 * Generate skill combination recommendations
 */
function generateSkillCombinationRecommendations(gaps, strengths) {
  const combinations = [];
  
  // Define powerful skill combinations
  const skillCombos = {
    'Full Stack Developer': {
      required: ['react', 'node.js', 'database'],
      description: 'Combining frontend and backend skills for full-stack capability'
    },
    'DevOps Engineer': {
      required: ['docker', 'kubernetes', 'aws'],
      description: 'Container orchestration and cloud deployment expertise'
    },
    'Data Engineer': {
      required: ['python', 'sql', 'cloud'],
      description: 'Data processing and cloud infrastructure skills'
    }
  };

  const strengthSkills = strengths.map(s => s.skill.toLowerCase());
  const gapSkills = [...gaps.critical, ...gaps.important].map(g => g.skill.toLowerCase());

  Object.entries(skillCombos).forEach(([role, combo]) => {
    const hasStrengths = combo.required.some(skill => 
      strengthSkills.some(s => s.includes(skill) || skill.includes(s))
    );
    
    const hasGaps = combo.required.some(skill =>
      gapSkills.some(g => g.includes(skill) || skill.includes(g))
    );

    if (hasStrengths && hasGaps) {
      combinations.push({
        type: 'skill_combination',
        role: role,
        action: `Build towards ${role} role by combining your existing skills`,
        reasoning: combo.description,
        timeline: '3-6 months',
        priority: 'medium',
        required_skills: combo.required,
        current_strengths: strengthSkills.filter(s => 
          combo.required.some(req => s.includes(req) || req.includes(s))
        )
      });
    }
  });

  return combinations.slice(0, 2);
}

/**
 * Generate enhanced market insights for skills
 * @param {Array} skills - Skills to analyze
 * @returns {Object} Comprehensive market insights
 */
export function generateMarketInsights(skills) {
  // Enhanced market data (in a real app, this would come from APIs)
  const marketData = {
    trending: {
      'ai/ml': { growth: '+45%', demand: 'very high', avg_salary: '$145k' },
      'cloud computing': { growth: '+35%', demand: 'very high', avg_salary: '$130k' },
      'cybersecurity': { growth: '+40%', demand: 'very high', avg_salary: '$125k' },
      'blockchain': { growth: '+30%', demand: 'high', avg_salary: '$135k' },
      'devops': { growth: '+25%', demand: 'very high', avg_salary: '$120k' },
      'data science': { growth: '+35%', demand: 'very high', avg_salary: '$140k' }
    },
    high_demand: {
      'react': { openings: '50k+', competition: 'medium', salary_range: '$85k-$150k' },
      'python': { openings: '80k+', competition: 'medium', salary_range: '$90k-$160k' },
      'aws': { openings: '45k+', competition: 'low', salary_range: '$100k-$180k' },
      'kubernetes': { openings: '25k+', competition: 'low', salary_range: '$110k-$190k' },
      'node.js': { openings: '40k+', competition: 'medium', salary_range: '$80k-$140k' },
      'docker': { openings: '35k+', competition: 'medium', salary_range: '$95k-$155k' }
    },
    emerging: {
      'web3': { adoption: 'growing', timeline: '2-3 years', potential: 'high' },
      'quantum computing': { adoption: 'early', timeline: '5-10 years', potential: 'very high' },
      'edge computing': { adoption: 'growing', timeline: '1-2 years', potential: 'high' },
      'ar/vr': { adoption: 'growing', timeline: '2-4 years', potential: 'high' }
    },
    salary_impact: {
      'aws': { impact: '+15%', certification_bonus: '+25%', avg_salary: '$130k' },
      'kubernetes': { impact: '+20%', certification_bonus: '+30%', avg_salary: '$140k' },
      'machine learning': { impact: '+25%', certification_bonus: '+35%', avg_salary: '$150k' },
      'react': { impact: '+10%', certification_bonus: '+15%', avg_salary: '$110k' },
      'python': { impact: '+12%', certification_bonus: '+20%', avg_salary: '$115k' },
      'cybersecurity': { impact: '+18%', certification_bonus: '+28%', avg_salary: '$125k' }
    }
  };

  const insights = {
    trending_skills: [],
    high_demand_skills: [],
    emerging_opportunities: [],
    salary_potential: [],
    career_growth: [],
    market_demand: 'medium', // high, medium, low
    recommendations: []
  };

  let totalDemandScore = 0;
  let skillCount = 0;

  skills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    skillCount++;

    // Check trending skills
    Object.entries(marketData.trending).forEach(([trendSkill, data]) => {
      if (skillLower.includes(trendSkill) || trendSkill.includes(skillLower)) {
        insights.trending_skills.push({
          skill,
          category: 'trending',
          growth: data.growth,
          demand: data.demand,
          avg_salary: data.avg_salary
        });
        totalDemandScore += 3;
      }
    });

    // Check high demand skills
    Object.entries(marketData.high_demand).forEach(([demandSkill, data]) => {
      if (skillLower.includes(demandSkill) || demandSkill.includes(skillLower)) {
        insights.high_demand_skills.push({
          skill,
          category: 'high_demand',
          openings: data.openings,
          competition: data.competition,
          salary_range: data.salary_range
        });
        totalDemandScore += 2;
      }
    });

    // Check emerging opportunities
    Object.entries(marketData.emerging).forEach(([emergingSkill, data]) => {
      if (skillLower.includes(emergingSkill) || emergingSkill.includes(skillLower)) {
        insights.emerging_opportunities.push({
          skill,
          category: 'emerging',
          adoption: data.adoption,
          timeline: data.timeline,
          potential: data.potential
        });
        totalDemandScore += 1;
      }
    });

    // Check salary impact
    Object.entries(marketData.salary_impact).forEach(([salarySkill, data]) => {
      if (skillLower.includes(salarySkill) || salarySkill.includes(skillLower)) {
        insights.salary_potential.push({
          skill,
          impact: data.impact,
          certification_bonus: data.certification_bonus,
          avg_salary: data.avg_salary,
          recommendation: `Consider getting certified in ${skill} for maximum salary impact`
        });
      }
    });
  });

  // Calculate overall market demand
  const avgDemandScore = skillCount > 0 ? totalDemandScore / skillCount : 0;
  if (avgDemandScore >= 2) {
    insights.market_demand = 'high';
  } else if (avgDemandScore >= 1) {
    insights.market_demand = 'medium';
  } else {
    insights.market_demand = 'low';
  }

  // Generate career growth insights
  insights.career_growth = generateCareerGrowthInsights(insights);

  // Generate strategic recommendations
  insights.recommendations = generateMarketRecommendations(insights);

  return insights;
}

/**
 * Generate career growth insights based on market data
 */
function generateCareerGrowthInsights(insights) {
  const growthOpportunities = [];

  // High-value skill combinations
  const combinations = [
    {
      skills: ['react', 'node.js'],
      role: 'Full Stack Developer',
      growth_potential: 'high',
      timeline: '6-12 months'
    },
    {
      skills: ['python', 'machine learning'],
      role: 'Data Scientist',
      growth_potential: 'very high',
      timeline: '8-15 months'
    },
    {
      skills: ['aws', 'kubernetes'],
      role: 'Cloud Architect',
      growth_potential: 'very high',
      timeline: '12-18 months'
    }
  ];

  const userSkills = [
    ...insights.trending_skills.map(s => s.skill.toLowerCase()),
    ...insights.high_demand_skills.map(s => s.skill.toLowerCase())
  ];

  combinations.forEach(combo => {
    const matchingSkills = combo.skills.filter(skill => 
      userSkills.some(userSkill => userSkill.includes(skill) || skill.includes(userSkill))
    );

    if (matchingSkills.length > 0) {
      growthOpportunities.push({
        target_role: combo.role,
        current_skills: matchingSkills,
        missing_skills: combo.skills.filter(skill => !matchingSkills.includes(skill)),
        growth_potential: combo.growth_potential,
        timeline: combo.timeline,
        next_steps: `Focus on learning ${combo.skills.filter(skill => !matchingSkills.includes(skill)).join(', ')}`
      });
    }
  });

  return growthOpportunities;
}

/**
 * Generate strategic market recommendations
 */
function generateMarketRecommendations(insights) {
  const recommendations = [];

  // Trending skill recommendations
  if (insights.trending_skills.length > 0) {
    recommendations.push({
      type: 'market_trend',
      title: 'Capitalize on Trending Skills',
      description: `You have skills in trending technologies. Consider deepening expertise and staying current with latest developments.`,
      action: 'Focus on continuous learning and industry engagement',
      priority: 'high'
    });
  }

  // High demand recommendations
  if (insights.high_demand_skills.length > 0) {
    const lowCompetitionSkills = insights.high_demand_skills.filter(s => s.competition === 'low');
    if (lowCompetitionSkills.length > 0) {
      recommendations.push({
        type: 'market_opportunity',
        title: 'Low Competition Opportunities',
        description: `You have skills with high demand and low competition: ${lowCompetitionSkills.map(s => s.skill).join(', ')}`,
        action: 'Aggressively market these skills and seek senior roles',
        priority: 'high'
      });
    }
  }

  // Certification recommendations
  if (insights.salary_potential.length > 0) {
    const topCertSkills = insights.salary_potential
      .sort((a, b) => parseInt(b.certification_bonus) - parseInt(a.certification_bonus))
      .slice(0, 2);
    
    recommendations.push({
      type: 'certification',
      title: 'High-Value Certifications',
      description: `Get certified in ${topCertSkills.map(s => s.skill).join(' and ')} for significant salary impact`,
      action: 'Pursue professional certification programs',
      priority: 'medium'
    });
  }

  // Market demand strategy
  if (insights.market_demand === 'low') {
    recommendations.push({
      type: 'skill_diversification',
      title: 'Diversify Your Skill Portfolio',
      description: 'Consider adding high-demand skills to improve market positioning',
      action: 'Learn trending technologies and high-demand skills',
      priority: 'high'
    });
  }

  return recommendations;
}
