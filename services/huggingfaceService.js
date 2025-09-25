// services/huggingfaceService.js
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

// 🔹 Story generation (works fine)
export const generateStory = async (prompt) => {
  try {
    const completion = await client.chat.completions.create({
      model: "Qwen/Qwen3-Next-80B-A3B-Instruct:novita",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("HF API Error (Story):", err.response?.data || err.message);
    return "Failed to generate story.";
  }
};

// 🔹 Image generation using Hugging Face Inference API
export const generateImage = async (prompt) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error(`HF Image API Error: ${response.statusText}`);
    }

    // HF returns raw image (bytes), so we need base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    return `data:image/png;base64,${base64Image}`;
  } catch (err) {
    console.error("HF Image Error:", err.message);
    return null;
  }
};
