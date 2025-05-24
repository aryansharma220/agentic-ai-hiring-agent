import { markdownToTxt } from 'markdown-to-txt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      jobTitle,
      experienceLevel,
      yearsOfExperience,
      department,
      employmentType,
      workLocation,
      companySize,
      industry,
      keySkills,
      companyName,
      salaryRange,
      additionalRequirements
    } = req.body;

    if (!jobTitle || !experienceLevel) {
      return res.status(400).json({ error: 'Job title and experience level are required' });
    }

    const jobDescription = await generateJobDescriptionWithGemini({
      jobTitle,
      experienceLevel,
      yearsOfExperience,
      department,
      employmentType,
      workLocation,
      companySize,
      industry,
      keySkills,
      companyName,
      salaryRange,
      additionalRequirements
    });

    res.status(200).json({ jobDescription });
  } catch (error) {
    console.error('Error generating job description:', error);
    res.status(500).json({ error: 'Failed to generate job description' });
  }
}

async function generateJobDescriptionWithGemini(jobData) {
  const {
    jobTitle,
    experienceLevel,
    yearsOfExperience,
    department,
    employmentType,
    workLocation,
    companySize,
    industry,
    keySkills,
    companyName,
    salaryRange,
    additionalRequirements
  } = jobData;

  const prompt = `Create a comprehensive and professional job description based on the following information:

Job Title: ${jobTitle}
Experience Level: ${experienceLevel}
Years of Experience: ${yearsOfExperience || 'Not specified'}
Department: ${department || 'Not specified'}
Employment Type: ${employmentType || 'Full-time'}
Work Location: ${workLocation || 'Not specified'}
Company Size: ${companySize || 'Not specified'}
Industry: ${industry || 'Not specified'}
Key Skills Required: ${keySkills || 'Not specified'}
Company Name: ${companyName || '[Company Name]'}
Salary Range: ${salaryRange || 'Competitive'}
Additional Requirements: ${additionalRequirements || 'None specified'}

Please generate a well-structured job description that includes:

1. **Job Overview** - A compelling summary of the role and its importance
2. **Key Responsibilities** - 5-8 detailed bullet points of main duties
3. **Required Qualifications** - Education, experience, and must-have skills
4. **Preferred Qualifications** - Nice-to-have skills and experience
5. **Technical Skills** - Specific technologies, tools, or software
6. **Soft Skills** - Communication, leadership, teamwork abilities
7. **What We Offer** - Benefits, growth opportunities, work environment

Make the job description:
- Professional and engaging
- Specific to the ${experienceLevel} level
- Appropriate for ${industry || 'the specified'} industry
- Include modern workplace expectations (remote work, diversity, etc.)
- 300-500 words in total
- Use action-oriented language
- Be inclusive and welcoming

Format the response as clean, readable plain text without any markdown formatting, asterisks, or special characters. Use simple line breaks and spacing for structure.`;

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
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }    const data = await response.json();
    const generatedDescription = data.candidates[0].content.parts[0].text;    // Parse markdown to plain text
    let plainTextDescription = markdownToTxt(generatedDescription);
    
    // Additional cleanup for any remaining markdown-like formatting
    plainTextDescription = cleanupText(plainTextDescription);

    return plainTextDescription.trim();
  } catch (error) {
    console.error('Gemini API call failed:', error);
    
    // Return a fallback job description
    return generateFallbackJobDescription(jobData);
  }
}

function generateFallbackJobDescription(jobData) {
  const { jobTitle, experienceLevel, yearsOfExperience, companyName, keySkills } = jobData;
  
  return `Job Title: ${jobTitle}

We are seeking a ${experienceLevel} ${jobTitle} to join our dynamic team at ${companyName || '[Company Name]'}. This is an excellent opportunity for a professional with ${yearsOfExperience || '2-5'} years of experience to make a significant impact in a growing organization.

Key Responsibilities:
• Lead and execute projects related to ${jobTitle.toLowerCase()} initiatives
• Collaborate with cross-functional teams to deliver high-quality solutions
• Analyze requirements and provide technical recommendations
• Mentor junior team members and contribute to knowledge sharing
• Participate in code reviews and maintain high coding standards
• Stay updated with latest industry trends and best practices

Required Qualifications:
• Bachelor's degree in related field or equivalent experience
• ${yearsOfExperience || '2-5'} years of relevant professional experience
• Strong problem-solving and analytical skills
• Excellent communication and teamwork abilities
${keySkills ? `• Proficiency in: ${keySkills}` : '• Technical expertise relevant to the role'}

What We Offer:
• Competitive salary and benefits package
• Professional development opportunities
• Flexible work arrangements
• Collaborative and inclusive work environment
• Opportunity to work on cutting-edge projects

We are an equal opportunity employer committed to diversity and inclusion. We encourage applications from candidates of all backgrounds and experiences.`;
}

function cleanupText(text) {
  return text
    // Remove any remaining markdown headers
    .replace(/^#+\s*/gm, '')
    // Remove bold/italic markers
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`(.+?)`/g, '$1')
    // Clean up bullet points
    .replace(/^\s*[-\*\+]\s*/gm, '• ')
    // Clean up numbered lists
    .replace(/^\s*\d+\.\s*/gm, '')
    // Remove extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}
