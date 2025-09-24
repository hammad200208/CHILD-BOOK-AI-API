import dotenv from "dotenv";
dotenv.config(); // ✅ ensure env loads before anything else

import OpenAI from "openai";

console.log("HF_API_KEY from service:", process.env.HF_API_KEY?.slice(0, 6)); // should print "hf_Sus"

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY, // ✅ now not undefined
});

export const generateStory = async (prompt) => {
  try {
    const completion = await client.chat.completions.create({
      model: "Qwen/Qwen3-Next-80B-A3B-Instruct:novita",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("HF API Error:", err.response?.data || err.message);
    return "Failed to generate story.";
  }
};
