import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '../components/Chatbot';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import React from 'react';

// Mock the AI service
vi.mock('../services/aiService', () => ({
  generateRobustAiResponse: vi.fn(() => Promise.resolve('This is a mocked AI response'))
}));

const renderWithProviders = (ui) => {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    </ThemeProvider>
  );
};

describe('Chatbot Component', () => {
  it('should open the chat window when clicked', () => {
    renderWithProviders(<Chatbot />);
    const toggleBtn = screen.getByLabelText(/toggle assistant/i);
    fireEvent.click(toggleBtn);
    expect(screen.getByText(/ElectED Assistant/i)).toBeDefined();
  });

  it('should display user messages and get AI response', async () => {
    renderWithProviders(<Chatbot />);
    
    // Open chat
    fireEvent.click(screen.getByLabelText(/toggle assistant/i));
    
    const input = screen.getByPlaceholderText(/Ask me anything/i);
    const sendBtn = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'How do I register to vote?' } });
    fireEvent.click(sendBtn);

    // Check if user message is displayed
    expect(screen.getByText('How do I register to vote?')).toBeDefined();

    // Check for AI response (mocked)
    await waitFor(() => {
      expect(screen.getByText('This is a mocked AI response')).toBeDefined();
    }, { timeout: 3000 });
  });
});
