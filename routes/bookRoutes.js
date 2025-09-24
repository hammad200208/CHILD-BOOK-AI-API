import express from "express";
import { generateBook } from "../controllers/bookController.js";

const router = express.Router();

// POST /api/book/generate
router.post("/generate", generateBook);

export default router;