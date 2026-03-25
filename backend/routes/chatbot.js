const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Hotel = require('../models/Hotel');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Check if the user has added their API key
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ 
        reply: "Hello! To activate me fully, please get a free API key from Google AI Studio and add it to your `.env` file as `GEMINI_API_KEY`." 
      });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Fetch brief hotel data to feed as context to the AI
    const availableHotels = await Hotel.find({ isBooked: false }).select('name location price').limit(20);
    const contextStr = availableHotels.map(h => `${h.name} situated in ${h.location} for ₹${h.price}/night`).join(' | ');

    // Construct the prompt
    const prompt = `
      You are the official AI Travel Agent for TravelX. Be friendly, short, and helpful.
      A user just said: "${message}"

      Here is a live list of some available hotels you can recommend: ${contextStr}

      Respond strictly based on this data. If they ask for recommendations, suggest 1 or 2 from the list that fit their description. Don't use markdown formatting like asterisks.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({ reply: responseText });

  } catch (error) {
    console.error("AI Agent Error:", error);
    res.status(500).json({ error: "Agent is taking a coffee break. Try again later!" });
  }
});

module.exports = router;