/**
 * Search Service
 * Provides real-time web search capabilities for the AI Assistant.
 */

export const performWebSearch = async (query, apiKey) => {
  if (!apiKey) {
    console.warn("Search API Key missing. Skipping web search.");
    return { answer: null, results: [] };
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "basic",
        include_answer: true,
        max_results: 3
      })
    });

    if (!response.ok) throw new Error("Tavily Search Failed");
    
    const data = await response.json();
    return {
      answer: data.answer,
      results: data.results.map(r => ({
        title: r.title,
        url: r.url,
        content: r.content
      }))
    };
  } catch (error) {
    console.error("Search Service Error:", error);
    return { answer: null, results: [] };
  }
};
