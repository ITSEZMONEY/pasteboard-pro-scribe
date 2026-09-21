// Claude API integration for Pasteboard Pro

export type ActionType = 'rephrase' | 'summarize' | 'tweetify';

// 🚨 CRITICAL SECURITY FIX: Calling Anthropic API directly from the frontend
// exposes the API key to users via the browser. To implement real AI processing,
// you MUST use a backend proxy server to protect your API keys.
// For now, this is restricted to returning mock responses.

export async function processWithClaude(action: ActionType, text: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

  const mockResponses = {
    rephrase: `Here's a crisp, professional rewrite of your text: "${text.substring(0, 100)}..." → Polished and refined for maximum impact.`,
    summarize: `Key insight: ${text.split(' ').slice(0, 10).join(' ')}... (summarized for clarity)`,
    tweetify: `🚀 ${text.split(' ').slice(0, 8).join(' ')}... #productivity #flow`
  };

  return mockResponses[action];
}