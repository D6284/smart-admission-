
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAdmissionAdvice = async (userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: You are an official Admission Assistant for EduQuest International Academy.
      Task: Answer the user's question about the admission process, documents needed (ID card, Transcripts, Photo), and status.
      User Query: ${userQuery}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base. Please contact our support office.";
  }
};
