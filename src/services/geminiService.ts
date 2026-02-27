import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL_NAME_TEXT = process.env.GEMINI_MODEL_NAME_TEXT || 'gemini-3-flash-preview';
const MODEL_NAME_IMAGE = process.env.GEMINI_MODEL_NAME_IMAGE || 'gemini-3.1-flash-image-preview';
if (!MODEL_NAME_TEXT || !MODEL_NAME_IMAGE) {
  throw new Error('GEMINI_MODEL_NAME_TEXT and GEMINI_MODEL_NAME_IMAGE must be set in the environment');
}

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
  youtubeUrl?: string;
  cloudRunUrl?: string;
  generateImage?: boolean;
}

export interface GenerationResult {
  text: string;
  imageUrl?: string;
}

export async function generateSubmissionPost(data: SubmissionData): Promise<GenerationResult> {
  const isTemplateMode = data.mode === 'template';

  const prompt = isTemplateMode 
    ? `
You are a World-Class Developer Advocate and Technical Writer. Your goal is to help users generate a winning submission post for the DEV Weekend Challenge.

YOUR MISSION:
Analyze the provided GitHub repository data and context to fill out the provided Markdown template.

INPUT DATA:
- Project Link: ${data.projectLink || "N/A"}
- YouTube Video: ${data.youtubeUrl || "N/A"}
- Cloud Run URL: ${data.cloudRunUrl || "N/A"}
- README/Context: ${data.summary || "N/A"}
- Template to follow:
${data.template}

IMPORTANT FORMATTING RULE:
If a YouTube Video or Cloud Run URL is provided, ensure they are wrapped in Liquid tags like this: {% embed URL %}. 
For example, if YouTube is "https://youtu.be/123", it should appear as {% embed https://youtu.be/123 %}.

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
    const textResponse = await ai.models.generateContent({
      model: MODEL_NAME_TEXT,
      contents: prompt,
    });

    const result: GenerationResult = {
      text: textResponse.text || "Failed to generate content.",
    };

    if (data.generateImage) {
      const imagePrompt = `A high-quality, professional, and eye-catching cover image titled "${data.repoName || 'My Project'}". The theme should be related to: ${data.techStack || 'software development'}. Style: modern, clean, and vibrant.`;
      
      const imageResponse = await ai.models.generateContent({
        model: MODEL_NAME_IMAGE,
        contents: [{ text: imagePrompt }],
      });

      const parts = imageResponse.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            result.imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }
    }

    return result;
  } catch (error) {
    console.error("Error generating post:", error);
    throw new Error("Failed to generate submission post. Please try again.");
  }
}
