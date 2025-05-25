export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      template,
      interviewType,
      urgencyLevel,
      includeCalendarLink,
      includeInterviewPrep,
      requestPortfolio,
      selectedTimeSlot,
      candidateSummary,
      candidateScore
    } = req.body;

    // Create a detailed prompt for AI email generation
    const prompt = createEmailPrompt(
      template,
      interviewType,
      urgencyLevel,
      includeCalendarLink,
      includeInterviewPrep,
      requestPortfolio,
      selectedTimeSlot,
      candidateSummary,
      candidateScore
    );

    // Call Gemini API for email generation
    const generatedEmail = await callGeminiForEmail(prompt);

    res.status(200).json({ email: generatedEmail });
  } catch (error) {
    console.error('Error generating email:', error);
    res.status(500).json({ error: 'Failed to generate email' });
  }
}

function createEmailPrompt(template, interviewType, urgencyLevel, includeCalendarLink, includeInterviewPrep, requestPortfolio, selectedTimeSlot, candidateSummary, candidateScore) {
  let templateContext = "";
  
  switch (template) {
    case "technical":
      templateContext = "Focus on technical skills assessment, coding challenges, and technical competency evaluation. Mention technical interview format and preparation.";
      break;
    case "cultural":
      templateContext = "Emphasize team fit, company culture alignment, values assessment, and behavioral interview components. Highlight company culture and team dynamics.";
      break;
    case "standard":
    default:
      templateContext = "Professional and balanced approach covering both technical and interpersonal skills assessment.";
      break;
  }

  const urgencyContext = urgencyLevel === "Urgent" ? "Express urgency and expedited process timeline." : 
                        urgencyLevel === "High Priority" ? "Mention priority consideration and prompt scheduling." : 
                        "Standard professional tone with regular timeline.";

  const additionalRequests = [];
  if (includeCalendarLink) additionalRequests.push("include a calendar scheduling link for convenience");
  if (includeInterviewPrep) additionalRequests.push("provide interview preparation guidance");
  if (requestPortfolio) additionalRequests.push("request portfolio or work samples");

  const prompt = `Generate a professional interview invitation email with the following specifications:

TEMPLATE TYPE: ${template} 
TEMPLATE FOCUS: ${templateContext}

INTERVIEW DETAILS:
- Interview Type: ${interviewType}
- Urgency Level: ${urgencyLevel} (${urgencyContext})
- Additional Requirements: ${additionalRequests.length > 0 ? additionalRequests.join(", ") : "None"}
${selectedTimeSlot ? `- Suggested Time Slot: ${selectedTimeSlot.time} on ${selectedTimeSlot.date}` : ""}

CANDIDATE CONTEXT:
- Summary: ${candidateSummary}
- Match Score: ${candidateScore}/10

REQUIREMENTS:
1. Professional and engaging tone
2. Personalized based on candidate summary
3. Clear next steps and expectations
4. Appropriate length (not too brief, not too lengthy)
5. Include company enthusiasm about the candidate
6. Mention specific aspects from their background that impressed us
7. ${template === "technical" ? "Include technical assessment details" : template === "cultural" ? "Mention team introduction and culture fit discussion" : "Balanced coverage of role expectations"}

Please generate ONLY the email content without any additional text, explanations, or formatting markers.`;

  return prompt;
}

async function callGeminiForEmail(prompt) {
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
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Clean up the response to ensure it's just the email content
    return generatedText.trim();
    
  } catch (error) {
    console.error('Gemini API call failed:', error);
    
    // Return a fallback email
    return `Dear Candidate,

Thank you for your interest in our position. Based on our review of your application, we would like to invite you for an interview to discuss this opportunity further.

We were particularly impressed with your background and believe you would be a great fit for our team.

Please let us know your availability for the coming week so we can schedule a meeting.

Best regards,
Hiring Team`;
  }
}
