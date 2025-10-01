import express from "express";
import { generateBook } from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js"; // ⬅️ import auth middleware

const router = express.Router();

// POST /api/book/generate (protected)
router.post("/generate", protect, generateBook);

export default router;
