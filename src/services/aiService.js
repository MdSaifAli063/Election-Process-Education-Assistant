import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

/**
 * NVIDIA NIM Service
 */
export const generateNimResponse = async (prompt, apiKey, language = 'en-US') => {
  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1", 
    dangerouslyAllowBrowser: true 
  });


  const langNames = { 'en-US': 'English', 'es-ES': 'Spanish', 'fr-FR': 'French', 'hi-IN': 'Hindi' };
  const targetLang = langNames[language] || 'English';

  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct", // Standard Llama 3.1 NIM name
      messages: [
        { role: 'system', content: `You are a voice-based assistant. Answer the user's question directly, strictly, and extremely briefly. IMPORTANT: You MUST reply entirely in ${targetLang}. ABSOLUTELY NO MARKDOWN.` },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
    });
    
    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("NIM Error Details:", error);
    throw new Error(`NVIDIA NIM: ${error.message || 'Connection failed'}`);
  }


};

/**
 * Gemini Service
 */
export const generateGeminiResponse = async (prompt, apiKey, language = 'en-US') => {
  const genAI = new GoogleGenerativeAI(apiKey);
  // Direct connection in production is more robust for Gemini SDK
  const model = genAI.getGenerativeModel(
    { model: "gemini-1.5-flash" }, 
    { apiVersion: "v1beta" }
  );



  
  const langNames = { 'en-US': 'English', 'es-ES': 'Spanish', 'fr-FR': 'French', 'hi-IN': 'Hindi' };
  const targetLang = langNames[language] || 'English';

  const systemPrompt = `You are a voice-based assistant. Answer extremely briefly using ONLY provided context. Reply in ${targetLang}. NO MARKDOWN. Plain text only.`;
  
  try {
    const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
    return (await result.response).text();
  } catch (error) {
    console.error("Gemini Error Context:", error.message);
    if (error.message.includes("404") || error.message.includes("not found")) {
      // Extensive fallback for GCP projects
      const fallbacks = [
        { model: "gemini-1.5-flash", version: "v1beta" },
        { model: "gemini-pro", version: "v1" },
        { model: "gemini-1.0-pro", version: "v1" }
      ];
      
      for (const fb of fallbacks) {
        try {
          console.log(`Trying Gemini fallback: ${fb.model} (${fb.version})`);
          const fbModel = genAI.getGenerativeModel(
            { model: fb.model }, 
            { apiVersion: fb.version, baseUrl: `${window.location.origin}/gemini-api` }
          );

          const fbResult = await fbModel.generateContent(`${systemPrompt}\n\n${prompt}`);
          return (await fbResult.response).text();
        } catch (inner) {
          continue;
        }
      }
    }
    throw new Error(`Gemini: ${error.message || 'Connection failed'}`);
  }



};

/**
 * Robust Orchestrator with Fallback
 */
export const generateRobustAiResponse = async (prompt, preferredModel, geminiKey, nimKey, language = 'en-US') => {
  const tryGemini = async () => {
    if (!geminiKey) throw new Error("Google Gemini API Key is missing.");
    return await generateGeminiResponse(prompt, geminiKey, language);
  };
  
  const tryNim = async () => {
    if (!nimKey) throw new Error("NVIDIA NIM API Key is missing.");
    return await generateNimResponse(prompt, nimKey, language);
  };

  if (preferredModel === 'gemini') {
    try {
      return await tryGemini();
    } catch (err) {
      console.warn("Primary model (Gemini) failed. Falling back to NVIDIA NIM:", err);
      return await tryNim();
    }
  } else {
    try {
      return await tryNim();
    } catch (err) {
      console.warn("Primary model (NIM) failed. Falling back to Gemini:", err);
      return await tryGemini();
    }
  }
};

/**
 * Generates a dynamic quiz using AI providers.
 */
export const generateDynamicQuiz = async (geminiKey, nimKey, language = 'en-US') => {
  const langNames = { 'en-US': 'English', 'es-ES': 'Spanish', 'fr-FR': 'French', 'hi-IN': 'Hindi' };
  const targetLang = langNames[language] || 'English';

  const prompt = `Generate a 5-question multiple choice quiz about Global and Indian Election processes.
  Language: ${targetLang}. Return ONLY a JSON array. 
  Example: [{"question": "Text", "options": ["A", "B", "C", "D"], "correctAnswer": "B"}]`;

  try {
    const response = await generateGeminiResponse(prompt, geminiKey, language);
    let content = response.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(content);
  } catch (err) {
    console.warn("Gemini Quiz failed, trying NIM:", err);
    try {
      const response = await generateNimResponse(prompt, nimKey, language);
      let content = response.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(content);
    } catch (fallbackErr) {
      return [{ question: "Error generating quiz", options: ["A", "B", "C", "D"], correctAnswer: "A" }];
    }
  }
};

/**
 * Generates an objective civic analysis based on user values.
 */
export const generateValuesAnalysis = async (answers, nimKey, language = 'en-US') => {
  const langNames = { 'en-US': 'English', 'es-ES': 'Spanish', 'fr-FR': 'French', 'hi-IN': 'Hindi' };
  const targetLang = langNames[language] || 'English';

  const prompt = `Based on these user values: ${JSON.stringify(answers)}, provide a 3-sentence objective civic policy alignment summary in ${targetLang}. Focus on policies, not parties.`;

  try {
    return await generateNimResponse(prompt, nimKey, language);
  } catch (error) {
    return "Analysis unavailable.";
  }
};

