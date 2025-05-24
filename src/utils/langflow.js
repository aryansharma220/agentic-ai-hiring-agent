
export async function callLangflowAPI(resumeText, jobDescription) {
  const langflowUrl = process.env.LANGFLOW_URL || 'http://localhost:7860/api/predict';
  
  try {
    const response = await fetch(langflowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resume: resumeText,
        job_description: jobDescription,
      }),
    });

    if (!response.ok) {
      throw new Error(`Langflow API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Langflow API call failed:', error);
    throw error;
  }
}

export function parseResumeAnalysis(langflowResponse) {
  try {
    if (langflowResponse.result) {
      return langflowResponse.result;
    }
    
    // Default parsing logic
    return {
      score: langflowResponse.score || 5,
      summary: langflowResponse.summary || 'Analysis completed',
      email: langflowResponse.email || 'Interview invitation generated',
    };
  } catch (error) {
    console.error('Error parsing Langflow response:', error);
    throw error;
  }
}
