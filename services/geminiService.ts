
import { GoogleGenAI, Modality } from "@google/genai";
import type { Emotion, Accent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateSpeech = async (
    text: string,
    voiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr',
    emotion: Emotion,
    accent: Accent
): Promise<string> => {
    try {
        const fullPrompt = `Speaking with a ${emotion.toLowerCase()} tone and a ${accent} accent, say: ${text}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: fullPrompt }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voiceName },
                    },
                },
            },
        });
        
        const audioPart = response.candidates?.[0]?.content?.parts?.[0];
        if (audioPart && audioPart.inlineData) {
            return audioPart.inlineData.data;
        } else {
            throw new Error("No audio data received from API.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
};
