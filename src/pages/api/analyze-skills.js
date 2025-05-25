// API endpoint for skill gap analysis
import { extractSkills, analyzeSkillGaps, generateMarketInsights } from '../../utils/skillAnalysis';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ 
        message: 'Resume text and job description are required' 
      });
    }

    // Extract skills from both texts
    const resumeSkills = extractSkills(resumeText, 'resume');
    const jobSkills = extractSkills(jobDescription, 'job');

    // Perform gap analysis
    const gapAnalysis = analyzeSkillGaps(resumeSkills, jobSkills);

    // Get all extracted skills for market insights
    const allSkills = [];
    Object.values(resumeSkills).forEach(category => {
      Object.values(category).forEach(subcategory => {
        subcategory.forEach(skill => allSkills.push(skill.name));
      });
    });

    // Generate market insights
    const marketInsights = generateMarketInsights(allSkills);

    // Return comprehensive analysis
    return res.status(200).json({
      success: true,
      data: {
        resumeSkills,
        jobSkills,
        gapAnalysis,
        marketInsights,
        metadata: {
          resumeSkillCount: allSkills.length,
          analysisTimestamp: new Date().toISOString(),
          version: '1.0.0'
        }
      }
    });

  } catch (error) {
    console.error('Skill analysis error:', error);
    return res.status(500).json({ 
      message: 'Internal server error during skill analysis',
      error: error.message 
    });
  }
}
