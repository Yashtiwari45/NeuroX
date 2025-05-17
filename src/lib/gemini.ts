import { generateVideo } from "./videoService.ts";

const API_KEY = "AIzaSyDd-3k_XdRHhpszC80bXfBqcsrY_DeQqkQ";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

export async function generateContent(request: any): Promise<any> {
  try {
    const prompt = constructPrompt(request);

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    const parsedContent = parseResponse(data);

    if (request.generateVideo && parsedContent.videoScript) {
      try {
        const videoUrl = await generateVideo(
          parsedContent.videoScript,
          request.topic,
          request.language
        );
        return {
          ...parsedContent,
          videoUrl,
        };
      } catch (videoError) {
        console.error("Error generating video link:", videoError);
        return parsedContent;
      }
    }

    return parsedContent;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

function constructPrompt(request: any): string {
  return `
You are a knowledgeable and empathetic neuro specialist. Answer the following question with accurate, up-to-date, and medically sound information on neurological conditions such as Alzheimer's disease, Parkinson's disease, and related disorders.

Question: "${request.topic}"

Please provide your answer in JSON format with the following structure:
{
  "answer": "Your detailed answer here"
}
  `.trim();
}

function parseResponse(data: any): any {
  try {
    const textResponse = data.candidates[0].content.parts[0].text;
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsedResponse = JSON.parse(jsonStr);

      if (parsedResponse.answer) {
        return {
          title: "Answer",
          introduction: parsedResponse.answer,
          keyPoints: [],
          activities: [],
          resources: [],
          videoScript: "",
          codeSnippet: "",
        };
      }

      return {
        title: parsedResponse.title || "Answer",
        introduction: parsedResponse.introduction || "",
        keyPoints: parsedResponse.keyPoints || [],
        activities: parsedResponse.activities || [],
        resources: parsedResponse.resources || [],
        videoScript: parsedResponse.videoScript || "",
        codeSnippet: parsedResponse.codeSnippet || "",
      };
    }

    throw new Error("Failed to parse JSON from response");
  } catch (error) {
    console.error("Error parsing response:", error);
    throw new Error("Failed to parse the generated content. Please try again.");
  }
}
