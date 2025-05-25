import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { extractTextFromPDF, validatePDFFile } from '../../utils/pdfParser';
import { extractSkills, analyzeSkillGaps } from '../../utils/skillAnalysis';

// Disable body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let tempFilePath = null;

  try {
    // Parse the form data with enhanced options
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      allowEmptyFiles: false,
      filter: ({ name, originalFilename, mimetype }) => {
        // Only allow PDF files
        return name === 'resume' && (
          mimetype === 'application/pdf' || 
          originalFilename?.toLowerCase().endsWith('.pdf')
        );
      }
    });

    const [fields, files] = await form.parse(req);

    const resumeFile = files.resume?.[0];
    const jobDescription = fields.jobDescription?.[0];

    if (!resumeFile || !jobDescription) {
      return res.status(400).json({ 
        error: 'Resume file and job description are required',
        details: {
          hasResume: !!resumeFile,
          hasJobDescription: !!jobDescription
        }
      });
    }

    tempFilePath = resumeFile.filepath;

    // Read PDF file
    const pdfBuffer = fs.readFileSync(resumeFile.filepath);
    
    // Validate PDF file
    const validation = validatePDFFile(pdfBuffer);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: 'Invalid PDF file',
        details: validation.error
      });
    }

    // Enhanced PDF text extraction
    const extractionResult = await extractTextFromPDF(pdfBuffer);
    
    if (!extractionResult.success) {
      return res.status(422).json({ 
        error: 'Failed to extract text from PDF',
        details: extractionResult.error,
        fallbackError: extractionResult.fallbackError
      });
    }

    const resumeText = extractionResult.text;
    const extractionQuality = extractionResult.quality;

    // Check if extracted text is sufficient for analysis
    if (!resumeText || resumeText.length < 100) {
      return res.status(422).json({ 
        error: 'Insufficient text extracted from PDF',
        details: {
          textLength: resumeText?.length || 0,
          quality: extractionQuality,
          suggestion: 'Please ensure the PDF contains readable text and is not a scanned image'
        }
      });
    }

    // Enhanced skill analysis
    let skillAnalysis = null;
    try {
      const resumeSkills = extractSkills(resumeText, 'resume');
      const jobSkills = extractSkills(jobDescription, 'job');
      skillAnalysis = analyzeSkillGaps(resumeSkills, jobSkills);
    } catch (skillError) {
      console.warn('Skill analysis failed:', skillError);
      // Continue without skill analysis
    }

    // Call Gemini API with enhanced context
    const geminiResponse = await callGeminiAPI(resumeText, jobDescription, {
      extractionQuality,
      structuredData: extractionResult,
      skillAnalysis
    });

    // Clean up the uploaded file
    fs.unlinkSync(resumeFile.filepath);

    // Enhanced response with additional metadata
    res.status(200).json({
      ...geminiResponse,
      metadata: {
        pdfQuality: extractionQuality,
        textLength: resumeText.length,
        processingTime: Date.now(),
        hasSkillAnalysis: !!skillAnalysis
      },
      skillAnalysis: skillAnalysis ? {
        overall_score: skillAnalysis.overall_score,
        matched_skills: skillAnalysis.detailed_metrics.matched_skills,
        gap_count: skillAnalysis.detailed_metrics.gap_count,
        strength_count: skillAnalysis.detailed_metrics.strength_count
      } : null
    });
  } catch (error) {
    console.error('Error processing request:', error);
    
    // Clean up temp file if it exists
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (cleanupError) {
        console.error('Failed to cleanup temp file:', cleanupError);
      }
    }

    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function callGeminiAPI(resumeText, jobDescription, context = {}) {
  const { extractionQuality, structuredData, skillAnalysis } = context;
  
  // Create enhanced prompt with context
  let prompt = `Analyze this resume against the job description and provide a comprehensive evaluation.

EXTRACTION QUALITY: ${extractionQuality?.score || 'unknown'} (Issues: ${extractionQuality?.issues?.join(', ') || 'none'})

Resume Content:
${resumeText}

Job Description:
${jobDescription}

Please provide a JSON response with this exact structure:
{
  "score": <number from 1 to 10 based on job match>,
  "summary": "<detailed 4-5 sentence candidate evaluation covering strengths, experience relevance, and key qualifications>",
  "email": "<professional interview invitation email>",
  "confidence": <number from 0 to 1 indicating analysis confidence>,
  "key_strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "areas_for_concern": ["<concern1>", "<concern2>"],
  "recommended_interview_focus": ["<focus_area1>", "<focus_area2>"]
}`;

  // Add skill analysis context if available
  if (skillAnalysis) {
    prompt += `\n\nSKILL ANALYSIS CONTEXT:
- Overall skill match: ${skillAnalysis.overall_score}%
- Matched skills: ${skillAnalysis.detailed_metrics.matched_skills}
- Skill gaps: ${skillAnalysis.detailed_metrics.gap_count}
- Candidate strengths: ${skillAnalysis.detailed_metrics.strength_count}

Use this skill analysis to inform your evaluation and be more specific about technical competencies.`;
  }

  prompt += `\n\nIMPORTANT: 
1. Be objective and specific in your evaluation
2. Consider the extraction quality when assessing completeness
3. Provide actionable insights for the hiring team
4. If extraction quality is low, mention this may affect the completeness of analysis
5. Focus on demonstrable skills and experience rather than assumptions`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3, // Lower temperature for more consistent analysis
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048, // Increased for more detailed analysis
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response structure from Gemini API');
    }
    
    const generatedText = data.candidates[0].content.parts[0].text;

    // Enhanced JSON parsing with better error handling
    try {
      // Look for JSON in the response with improved regex
      const jsonMatch = generatedText.match(/\{[\s\S]*?\}(?=\s*$|[\n\r])/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        // Validate required fields
        const requiredFields = ['score', 'summary', 'email'];
        const missingFields = requiredFields.filter(field => !parsed[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        
        // Ensure score is within valid range
        parsed.score = Math.max(1, Math.min(10, parsed.score || 5));
        
        return {
          score: parsed.score,
          summary: parsed.summary || 'Analysis completed successfully.',
          email: parsed.email || 'Interview invitation email generated.',
          confidence: parsed.confidence || 0.7,
          key_strengths: parsed.key_strengths || [],
          areas_for_concern: parsed.areas_for_concern || [],
          recommended_interview_focus: parsed.recommended_interview_focus || [],
          analysis_quality: extractionQuality?.score || 1.0
        };
      }
    } catch (parseError) {
      console.log('JSON parsing failed, attempting text extraction:', parseError.message);
    }

    // Enhanced fallback parsing
    const fallbackResult = extractFromText(generatedText, extractionQuality);
    return fallbackResult;

  } catch (error) {
    console.error('Gemini API call failed:', error);
    
    // Enhanced fallback response with context awareness
    return {
      score: extractionQuality?.score > 0.7 ? 6 : 5, // Lower score if extraction quality is poor
      summary: `Analysis completed with ${extractionQuality?.score > 0.7 ? 'good' : 'limited'} text extraction quality. ${extractionQuality?.issues?.length > 0 ? 'Note: ' + extractionQuality.issues.join(', ') + '. ' : ''}The candidate appears to have relevant experience for the position based on available information.`,
      email: `Dear Candidate,

Thank you for submitting your resume for our open position. We have reviewed your application and would like to schedule an interview to discuss your qualifications further.

Please reply with your availability for the next week.

Best regards,
Hiring Team`,
      confidence: 0.3,
      key_strengths: ['Previous experience in relevant field'],
      areas_for_concern: extractionQuality?.score < 0.7 ? ['PDF extraction quality may affect analysis completeness'] : [],
      recommended_interview_focus: ['Verify technical skills', 'Discuss relevant experience'],
      analysis_quality: extractionQuality?.score || 0.5,
      fallback: true,
      error: error.message
    };
  }
}

/**
 * Extract information from text when JSON parsing fails
 * @param {string} text - Generated text
 * @param {Object} extractionQuality - PDF extraction quality metrics
 * @returns {Object} Structured response
 */
function extractFromText(text, extractionQuality) {
  // Try to extract score
  let score = 6;
  const scoreMatch = text.match(/score[:\s]*(\d+(?:\.\d+)?)/i);
  if (scoreMatch) {
    score = Math.max(1, Math.min(10, parseFloat(scoreMatch[1])));
  }

  // Extract summary (first substantial paragraph)
  const paragraphs = text.split('\n').filter(p => p.trim().length > 50);
  const summary = paragraphs[0] || 'Analysis completed based on available resume information.';

  // Generate email
  const email = `Dear Candidate,

Thank you for your interest in our position. Based on our review of your resume, we would like to invite you for an interview to discuss this opportunity further.

Please let us know your availability for the coming week.

Best regards,
HR Team`;

  return {
    score,
    summary: summary.substring(0, 500) + (summary.length > 500 ? '...' : ''),
    email,
    confidence: 0.5,
    key_strengths: [],
    areas_for_concern: extractionQuality?.score < 0.7 ? ['PDF text extraction may be incomplete'] : [],
    recommended_interview_focus: ['Technical assessment', 'Experience verification'],
    analysis_quality: extractionQuality?.score || 0.5,
    fallback: true
  };
}
