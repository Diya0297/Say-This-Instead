import express from 'express'
import dotenv from 'dotenv'
import  OpenAI from 'openai'
import axios from 'axios';

dotenv.config();

const router = express.Router();

// const openai = new OpenAI({
//   baseURL: 'https://api.studio.nebius.com/',
//   apiKey: process.env.NEBIUS_API_KEY
// });

router.post("/get-questions", async (req, res) => {

    try {
    const response = await axios.post(
      "https://api.studio.nebius.com/v1/chat/completions",
      {
        model: "nvidia/Llama-3_1-Nemotron-Ultra-253B-v1",  // Model name
        temperature: 0.6,
        top_p: 0.95,
        messages: [
          {
            role: "system",
            content:
              "Pretend you are a person dealing with depression or anxiety. Write 5 realistic, emotionally expressive messages that someone might say in a conversation, one after another. Only return a JavaScript array of 5 strings. I only want the array as final response.",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEBIUS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    res.status(200).json({
      questions: content,
    });
  } catch (error) {
    console.error("Something went wrong!", error?.response?.data || error);
    res.status(500).json({ message: "Error!" });
  }
});

router.post("/feedback", async (req, res) => {

    try {
    const userMessage = req.body.message; 
    console.log(userMessage.userResponse);
    const response = await axios.post(
      "https://api.studio.nebius.com/v1/chat/completions",
      {
        model: "Qwen/Qwen3-30B-A3B",  // Model name
        temperature: 0.6,
        top_p: 0.95,
        messages: [
          {
            role: "system",
            content:
              `You're helping a person practice how to support someone with depression. Here is the scenario:

                Question: "${userMessage.question}"
                User's response: "${userMessage.userResponse}"

                Act as a friend and give thoughtful, constructive feedback in 2-3 lines:
                - Mention if the response is empathetic or not (be polite and supportive).
                - Briefly explain what worked or what didn’t.
                - Suggest a better version if needed.

                Only return the feedback (no extra commentary).`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEBIUS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    res.status(200).json({
      feedback: content,
    });
  } catch (error) {
    console.error("Something went wrong!", error?.response?.data || error);
    res.status(500).json({ message: "Error!" });
  }
});


export default router;