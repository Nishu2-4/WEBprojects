// backend/chatgpt.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const USE_MOCK_API = process.env.USE_MOCK_API === 'true';

function mockApiResponse(message) {
  const responses = [
    "I'm a mock API response. How can I help you today?",
    "That's an interesting question! As a mock API, I'd say the answer is 42.",
    "I'm afraid I can't provide a real answer as I'm just a mock API. But I hope you're having a great day!",
    "Beep boop! Mock API here. I'm not as smart as the real thing, but I'll do my best to pretend.",
    "In a world of real APIs, be a mock API. That's my motto!"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

async function generateReply(message) {
  if (USE_MOCK_API) {
    return mockApiResponse(message);
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 150
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

module.exports = { generateReply };