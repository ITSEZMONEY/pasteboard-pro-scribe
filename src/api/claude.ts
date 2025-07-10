// Claude API integration for Pasteboard Pro

export type ActionType = 'rephrase' | 'summarize' | 'tweetify';

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || '';
const CLAUDE_MODEL = 'claude-3-5-sonnet-20241022';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Prompt templates for each action
const prompts = {
  rephrase: (text: string) => `You are Pasteboard Pro, an expert writing assistant. Rewrite the text below in a crisp, professional tone. Be concise and remove fluff. Return only the rewritten text.

---
${text}
---`,

  summarize: (text: string) => `You are Pasteboard Pro, an expert writing assistant. Produce a 1-2 sentence summary of the text below. Focus on key points and strip jargon.

---
${text}
---`,

  tweetify: (text: string) => `You are Pasteboard Pro, an expert writing assistant. Convert the following into a single high-engagement tweet. Keep it under 280 characters, use plain language, and feel free to add appropriate emoji.

---
${text}
---`
};

export async function processWithClaude(action: ActionType, text: string): Promise<string> {
  // For demo purposes, if no API key is provided, return mock responses
  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === '') {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    const mockResponses = {
      rephrase: `Here's a crisp, professional rewrite of your text: "${text.substring(0, 100)}..." → Polished and refined for maximum impact.`,
      summarize: `Key insight: ${text.split(' ').slice(0, 10).join(' ')}... (summarized for clarity)`,
      tweetify: `🚀 ${text.split(' ').slice(0, 8).join(' ')}... #productivity #flow`
    };
    
    return mockResponses[action];
  }

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompts[action](text)
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Invalid response format from Claude API');
    }

    return data.content[0].text.trim();
  } catch (error) {
    console.error('Claude API error:', error);
    
    if (error instanceof Error) {
      throw new Error(`Claude API failed: ${error.message}`);
    }
    
    throw new Error('Failed to process text with Claude');
  }
}