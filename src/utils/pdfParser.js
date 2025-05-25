// Enhanced PDF Parser Utility
// This module provides robust PDF parsing capabilities with error handling and text extraction

import pdfParse from 'pdf-parse';

/**
 * Enhanced PDF text extraction with improved error handling
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @param {Object} options - Parsing options
 * @returns {Object} Extracted text and metadata
 */
export async function extractTextFromPDF(pdfBuffer, options = {}) {
  const defaultOptions = {
    max: 0, // Maximum number of pages to extract (0 = all)
    version: 'v1.10.100', // PDF.js version
    ...options
  };

  try {
    // Basic PDF parsing
    const pdfData = await pdfParse(pdfBuffer, defaultOptions);
    
    // Enhanced text cleaning and processing
    const cleanedText = cleanAndProcessText(pdfData.text);
    
    // Extract metadata and structure
    const metadata = extractMetadata(pdfData);
    
    // Validate extraction quality
    const qualityMetrics = assessExtractionQuality(cleanedText, pdfData);
    
    return {
      success: true,
      text: cleanedText,
      rawText: pdfData.text,
      metadata: {
        ...metadata,
        pages: pdfData.numpages,
        version: pdfData.version,
        info: pdfData.info
      },
      quality: qualityMetrics,
      sections: extractSections(cleanedText),
      contact: extractContactInfo(cleanedText),
      experience: extractExperienceInfo(cleanedText),
      education: extractEducationInfo(cleanedText),
      skills: extractSkillsFromText(cleanedText)
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    
    // Try alternative parsing methods
    try {
      const fallbackResult = await fallbackPDFParsing(pdfBuffer);
      return {
        success: true,
        text: fallbackResult.text,
        rawText: fallbackResult.text,
        metadata: { source: 'fallback' },
        quality: { score: 0.5, issues: ['Used fallback parser'] },
        sections: extractSections(fallbackResult.text),
        contact: extractContactInfo(fallbackResult.text),
        experience: extractExperienceInfo(fallbackResult.text),
        education: extractEducationInfo(fallbackResult.text),
        skills: extractSkillsFromText(fallbackResult.text)
      };
    } catch (fallbackError) {
      return {
        success: false,
        error: error.message,
        fallbackError: fallbackError.message,
        text: '',
        rawText: '',
        metadata: {},
        quality: { score: 0, issues: ['Complete parsing failure'] }
      };
    }
  }
}

/**
 * Clean and process extracted text for better analysis
 * @param {string} rawText - Raw extracted text
 * @returns {string} Cleaned text
 */
function cleanAndProcessText(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return '';
  }

  let text = rawText;
  
  // Remove common PDF artifacts
  text = text
    // Remove excessive whitespace and line breaks
    .replace(/\s{3,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    // Remove page numbers and headers/footers
    .replace(/^\s*\d+\s*$/gm, '')
    .replace(/^Page \d+ of \d+$/gim, '')
    // Remove common PDF encoding issues
    .replace(/[^\x00-\x7F]/g, ' ')
    // Fix common character encoding issues
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\u009D/g, '"')
    .replace(/â€"/g, '-')
    // Normalize bullet points
    .replace(/[•▪▫◦‣⁃]/g, '•')
    // Remove excessive dots and dashes
    .replace(/\.{3,}/g, '...')
    .replace(/-{3,}/g, '---')
    // Normalize phone numbers
    .replace(/(\d{3})\s*[-.]?\s*(\d{3})\s*[-.]?\s*(\d{4})/g, '$1-$2-$3')
    // Clean email addresses
    .replace(/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '$1@$2')
    // Remove extra spaces
    .replace(/[ \t]+/g, ' ')
    .trim();

  return text;
}

/**
 * Extract metadata from PDF data
 * @param {Object} pdfData - PDF parse result
 * @returns {Object} Metadata object
 */
function extractMetadata(pdfData) {
  const metadata = {
    pages: pdfData.numpages || 0,
    creator: '',
    producer: '',
    creationDate: null,
    modificationDate: null,
    title: '',
    author: '',
    subject: '',
    keywords: ''
  };

  if (pdfData.info) {
    Object.keys(metadata).forEach(key => {
      if (pdfData.info[key]) {
        metadata[key] = pdfData.info[key];
      }
    });
  }

  return metadata;
}

/**
 * Assess the quality of text extraction
 * @param {string} text - Extracted text
 * @param {Object} pdfData - Original PDF data
 * @returns {Object} Quality assessment
 */
function assessExtractionQuality(text, pdfData) {
  const issues = [];
  let score = 1.0;

  // Check text length
  if (!text || text.length < 100) {
    issues.push('Very short text extracted');
    score -= 0.4;
  }

  // Check for common extraction problems
  if (text.includes('???') || text.includes('�')) {
    issues.push('Character encoding issues detected');
    score -= 0.2;
  }

  // Check for excessive repetition
  const words = text.split(/\s+/);
  const uniqueWords = new Set(words);
  if (words.length > 0 && uniqueWords.size / words.length < 0.3) {
    issues.push('High text repetition detected');
    score -= 0.2;
  }

  // Check for reasonable word density
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  if (avgWordLength < 2 || avgWordLength > 15) {
    issues.push('Unusual word length distribution');
    score -= 0.1;
  }

  // Check for contact information presence
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\d{3}[-.]?\d{3}[-.]?\d{4})/.test(text);
  if (!hasEmail && !hasPhone) {
    issues.push('No contact information found');
    score -= 0.1;
  }

  return {
    score: Math.max(0, score),
    issues,
    wordCount: words.length,
    characterCount: text.length,
    hasContactInfo: hasEmail || hasPhone
  };
}

/**
 * Extract structured sections from resume text
 * @param {string} text - Resume text
 * @returns {Object} Structured sections
 */
function extractSections(text) {
  const sections = {
    summary: '',
    experience: '',
    education: '',
    skills: '',
    projects: '',
    certifications: '',
    awards: ''
  };

  // Define section patterns
  const sectionPatterns = {
    summary: /(?:summary|profile|objective|about|overview)[\s\S]*?(?=\n(?:experience|education|skills|employment|work|projects)|$)/i,
    experience: /(?:experience|employment|work history|professional experience)[\s\S]*?(?=\n(?:education|skills|projects|certifications)|$)/i,
    education: /(?:education|academic|qualifications|degrees?)[\s\S]*?(?=\n(?:skills|experience|projects|certifications)|$)/i,
    skills: /(?:skills|technical skills|competencies|technologies)[\s\S]*?(?=\n(?:experience|education|projects|certifications)|$)/i,
    projects: /(?:projects|portfolio|achievements)[\s\S]*?(?=\n(?:education|skills|experience|certifications)|$)/i,
    certifications: /(?:certifications?|licenses?|credentials?)[\s\S]*?(?=\n(?:education|skills|experience|projects)|$)/i,
    awards: /(?:awards?|honors?|recognition)[\s\S]*?(?=\n(?:education|skills|experience|projects)|$)/i
  };

  Object.keys(sectionPatterns).forEach(section => {
    const match = text.match(sectionPatterns[section]);
    if (match) {
      sections[section] = match[0].trim();
    }
  });

  return sections;
}

/**
 * Extract contact information from text
 * @param {string} text - Resume text
 * @returns {Object} Contact information
 */
function extractContactInfo(text) {
  const contact = {
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    location: ''
  };

  // Email extraction
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    contact.email = emailMatch[0];
  }

  // Phone extraction
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
  if (phoneMatch) {
    contact.phone = phoneMatch[0];
  }

  // LinkedIn extraction
  const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|linkedin\.com\/profile\/view\?id=)([a-zA-Z0-9-]+)/i);
  if (linkedinMatch) {
    contact.linkedin = linkedinMatch[0];
  }

  // GitHub extraction
  const githubMatch = text.match(/(?:github\.com\/)([a-zA-Z0-9-]+)/i);
  if (githubMatch) {
    contact.github = githubMatch[0];
  }

  // Website extraction
  const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/);
  if (websiteMatch && !websiteMatch[0].includes('linkedin') && !websiteMatch[0].includes('github')) {
    contact.website = websiteMatch[0];
  }

  return contact;
}

/**
 * Extract experience information
 * @param {string} text - Resume text
 * @returns {Array} Experience entries
 */
function extractExperienceInfo(text) {
  const experiences = [];
  
  // Look for date patterns and job titles
  const experiencePatterns = /(\d{4}[-\s]*(?:to|-)?\s*(?:\d{4}|present))\s*[:\-]?\s*([^\n]+)/gi;
  let match;
  
  while ((match = experiencePatterns.exec(text)) !== null) {
    experiences.push({
      duration: match[1].trim(),
      title: match[2].trim(),
      context: text.substr(Math.max(0, match.index - 100), 300).trim()
    });
  }

  return experiences.slice(0, 10); // Limit to 10 entries
}

/**
 * Extract education information
 * @param {string} text - Resume text
 * @returns {Array} Education entries
 */
function extractEducationInfo(text) {
  const education = [];
  
  // Look for degree patterns
  const degreePatterns = /(bachelor|master|phd|doctorate|associate|diploma|certificate|b\.?s\.?|m\.?s\.?|b\.?a\.?|m\.?a\.?|ph\.?d\.?)/gi;
  const matches = text.matchAll(degreePatterns);
  
  for (const match of matches) {
    const context = text.substr(Math.max(0, match.index - 50), 200).trim();
    education.push({
      degree: match[0],
      context: context
    });
  }

  return education.slice(0, 5); // Limit to 5 entries
}

/**
 * Extract skills from text using basic pattern matching
 * @param {string} text - Resume text
 * @returns {Array} Extracted skills
 */
function extractSkillsFromText(text) {
  const commonSkills = [
    'javascript', 'python', 'java', 'react', 'node.js', 'sql', 'html', 'css',
    'aws', 'docker', 'kubernetes', 'git', 'mongodb', 'postgresql', 'mysql',
    'leadership', 'communication', 'problem solving', 'project management'
  ];

  const foundSkills = [];
  const lowerText = text.toLowerCase();

  commonSkills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

  return foundSkills;
}

/**
 * Fallback PDF parsing for problematic files
 * @param {Buffer} pdfBuffer - PDF buffer
 * @returns {Object} Fallback parsing result
 */
async function fallbackPDFParsing(pdfBuffer) {
  // Try with different options
  const options = [
    { max: 0 },
    { max: 10 },
    { version: 'v1.9.426' }
  ];

  for (const option of options) {
    try {
      const result = await pdfParse(pdfBuffer, option);
      if (result.text && result.text.length > 50) {
        return {
          text: cleanAndProcessText(result.text),
          method: 'fallback',
          option: option
        };
      }
    } catch (error) {
      continue;
    }
  }

  throw new Error('All fallback parsing methods failed');
}

/**
 * Validate PDF file before processing
 * @param {Buffer} pdfBuffer - PDF buffer
 * @returns {Object} Validation result
 */
export function validatePDFFile(pdfBuffer) {
  if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
    return { valid: false, error: 'Invalid buffer provided' };
  }

  if (pdfBuffer.length === 0) {
    return { valid: false, error: 'Empty PDF file' };
  }

  // Check PDF signature
  const pdfSignature = pdfBuffer.slice(0, 4).toString();
  if (pdfSignature !== '%PDF') {
    return { valid: false, error: 'Invalid PDF file format' };
  }

  // Check file size (max 10MB)
  if (pdfBuffer.length > 10 * 1024 * 1024) {
    return { valid: false, error: 'PDF file too large (max 10MB)' };
  }

  return { valid: true };
}
