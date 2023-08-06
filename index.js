const axios = require('axios');
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const OPENAI_API_KEY = "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"; // Replace this with your actual OpenAI API key

const apiUrl = 'https://api.openai.com/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${OPENAI_API_KEY}`,
};

const requestData = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'user', content: 'Hello!' }
  ],
};

const rateLimitDelay = 1000 / 3; // Approximately 3 requests per second (1000 ms / 3)

function makeApiRequest() {
  axios.post(apiUrl, requestData, { headers })
    .then(response => {
      console.log('Response:', response.data.choices[0].message.content);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}

// Start making API requests at a controlled rate
const intervalId = setInterval(makeApiRequest, rateLimitDelay);

// Stop making API requests after 5 seconds for demonstration purposes
setTimeout(() => {
  clearInterval(intervalId);
}, 5000);

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));
