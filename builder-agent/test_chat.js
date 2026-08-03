require('dotenv').config({path: '.env.local'});
const { google } = require('@ai-sdk/google');
const { generateText } = require('ai');
(async () => {
  try {
    const res = await generateText({
      model: google('gemini-3.5-flash'),
      prompt: 'Say hello',
    });
    console.log(res.text);
  } catch(e) {
    console.error('Error:', e.message);
  }
})();
