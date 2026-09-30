const ANALYSIS_PROMPT = `You are an expert resume analyst and career coach. Analyze the following resume text and provide a comprehensive evaluation. You MUST respond with ONLY valid JSON, no other text before or after.

Respond in this exact JSON format:
{
  "overallScore": <number 0-100>,
  "formattingScore": <number 0-100>,
  "readabilityScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "experienceScore": <number 0-100>,
  "skillsScore": <number 0-100>,
  "educationScore": <number 0-100>,
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "weaknesses": ["<weakness1>", "<weakness2>", "<weakness3>"],
  "missingKeywords": ["<keyword1>", "<keyword2>", "<keyword3>", "<keyword4>", "<keyword5>"],
  "suggestions": ["<suggestion1>", "<suggestion2>", "<suggestion3>", "<suggestion4>", "<suggestion5>"],
  "summary": "<2-3 sentence overall assessment>"
}

Resume Text:
`;

const MOCK_RESPONSE = {
  overallScore: 72,
  formattingScore: 68,
  readabilityScore: 75,
  atsScore: 65,
  experienceScore: 78,
  skillsScore: 70,
  educationScore: 80,
  strengths: [
    "Strong technical skills section with relevant technologies listed",
    "Clear work experience with measurable achievements",
    "Well-structured education section with relevant coursework"
  ],
  weaknesses: [
    "Missing professional summary or objective statement",
    "Limited use of action verbs and quantified results",
    "No links to portfolio, GitHub, or LinkedIn profile"
  ],
  missingKeywords: [
    "team collaboration",
    "agile methodology",
    "project management",
    "data-driven",
    "stakeholder communication"
  ],
  suggestions: [
    "Add a compelling professional summary at the top highlighting your unique value proposition",
    "Quantify achievements with specific metrics (e.g., 'Increased sales by 25%')",
    "Include relevant certifications and professional development activities",
    "Add a skills section organized by category (Technical, Soft Skills, Tools)",
    "Tailor keywords to match the specific job description you're applying for"
  ],
  summary: "This resume demonstrates solid technical foundations and relevant experience. However, it lacks a professional summary and could benefit from more quantified achievements. With targeted keyword optimization, the ATS compatibility score could improve significantly."
};

export async function analyzeResume(resumeText) {
  const startTime = Date.now();

  try {
    if (typeof window !== 'undefined' && window.puter && window.puter.ai) {
      const response = await window.puter.ai.chat(
        ANALYSIS_PROMPT + resumeText,
        { model: 'claude-sonnet-4-20250514' }
      );

      const responseText = typeof response === 'string'
        ? response
        : response?.message?.content || response?.text || JSON.stringify(response);

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse AI response as JSON');
      }

      const result = JSON.parse(jsonMatch[0]);
      const endTime = Date.now();

      return {
        ...result,
        responseTime: endTime - startTime,
        source: 'puter-ai',
      };
    } else {
      throw new Error('Puter AI not available');
    }
  } catch (error) {
    console.warn('Puter AI analysis failed, using mock response:', error.message);

    await new Promise(resolve => setTimeout(resolve, 2000));
    const endTime = Date.now();

    return {
      ...MOCK_RESPONSE,
      responseTime: endTime - startTime,
      source: 'mock',
    };
  }
}

export function saveAnalysis(analysis, fileName) {
  const history = getAnalysisHistory();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    fileName,
    date: new Date().toISOString(),
    overallScore: analysis.overallScore,
    analysis,
  };

  history.unshift(entry);
  if (history.length > 5) history.pop();

  localStorage.setItem('resumeAnalysisHistory', JSON.stringify(history));
  return entry;
}

export function getAnalysisHistory() {
  try {
    return JSON.parse(localStorage.getItem('resumeAnalysisHistory') || '[]');
  } catch {
    return [];
  }
}
