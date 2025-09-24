// controllers/bookController.js
import { generateStory } from "../services/huggingfaceService.js";

export const generateBook = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const story = await generateStory(prompt);

    res.json({ story });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
