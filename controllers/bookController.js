// controllers/bookController.js
import { generateStory, generateImage } from "../services/huggingfaceService.js";

export const generateBook = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // 1. Generate story
    const story = await generateStory(prompt);

    // 2. Generate image (based on story or prompt)
    const image = await generateImage(`Children's story illustration: ${prompt}`);

    res.json({ story, image });
  } catch (error) {
    console.error("Error in generateBook:", error.message);
    res.status(500).json({ error: "Failed to generate book." });
  }
};
