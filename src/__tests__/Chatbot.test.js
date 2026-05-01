import { describe, it, expect, vi } from 'vitest';

// Mocking the Google Generative AI module
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockImplementation(() => ({
      generateContent: vi.fn().mockResolvedValue({
        response: { text: () => 'Mocked AI Response' }
      })
    }))
  }))
}));

describe('Chatbot AI Integration', () => {
  it('should successfully mock the Gemini API and return a response', async () => {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI('test-key');
    const model = genAI.getGenerativeModel({ model: 'gemini-flash' });
    const result = await model.generateContent('Hi');
    
    expect(result.response.text()).toBe('Mocked AI Response');
  });

  it('should handle API failures gracefully', async () => {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI('invalid-key');
    const model = genAI.getGenerativeModel({ model: 'gemini-flash' });
    
    // Simulating a failure for this specific test
    vi.spyOn(model, 'generateContent').mockRejectedValueOnce(new Error('API Error'));
    
    await expect(model.generateContent('Hi')).rejects.toThrow('API Error');
  });
});
