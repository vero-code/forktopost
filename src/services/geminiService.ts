import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface SubmissionData {
  mode?: 'custom' | 'template';
  repoName?: string;
  projectLink?: string;
  demoLink?: string;
  techStack?: string;
  summary?: string;
  targetCommunity?: string;
  problemSolved?: string;
  template?: string;
}

export async function generateSubmissionPost(data: SubmissionData): Promise<string> {
  const isTemplateMode = data.mode === 'template';

  const prompt = isTemplateMode 
    ? `
You are a World-Class Developer Advocate and Technical Writer. Your goal is to help users generate a winning submission post for the DEV Weekend Challenge.

YOUR MISSION:
Analyze the provided GitHub repository data and context to fill out the provided Markdown template.

INPUT DATA:
- Project Link: ${data.projectLink || "N/A"}
- README/Context: ${data.summary || "N/A"}
- Template to follow:
${data.template}

TONE & STYLE:
- Professional yet witty (typical for DEV.to)
- Use "I" (first person)
- Bold key phrases
- Scannable sections
- Clear, energetic, and encouraging.

OUTPUT REQUIREMENTS:
1. Generate a "Post Title" at the very top.
2. Fill out the template completely based on the repository data.
3. Output ONLY the Markdown content.
`
    : `
You are a World-Class Developer Advocate and Technical Writer. Your goal is to help users generate a winning submission post for the DEV Weekend Challenge.

YOUR MISSION:
Analyze the provided GitHub repository data and user answers to create a compelling story that hits all 4 judging criteria:
1. Value Proposition (Community impact)
2. Creativity (Originality)
3. Technical Execution (Functionality)
4. Writing Quality (Compelling story)

INPUT DATA:
- Repo Name: ${data.repoName}
- Project Link: ${data.projectLink || "N/A"}
- Demo Link: ${data.demoLink || "N/A"}
- Tech Stack: ${data.techStack}
- README Content (Summary): ${data.summary}
- Community Target: ${data.targetCommunity}
- Problem Solved: ${data.problemSolved}

TONE & STYLE:
- Professional yet witty (typical for DEV.to)
- Use "I" (first person)
- Bold key phrases
- Scannable sections (bullet points, horizontal rules)
- Clear, energetic, and encouraging.

OUTPUT STRUCTURE (Follow the official template):
1. Catchy Title (with community focus)
2. The Community Section (Defining the 'Who' and 'Why')
3. What I Built (The 'What' and 'How')
4. Why It Matters (The 'Impact')
5. Tech Deep Dive (Specific Gemini role/API usage)
6. Link to the project & Demo

IMPORTANT:
- Output ONLY the Markdown content for the post.
- Do not include any conversational filler before or after the post.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
    });
    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Error generating post:", error);
    throw new Error("Failed to generate submission post. Please try again.");
  }
}
