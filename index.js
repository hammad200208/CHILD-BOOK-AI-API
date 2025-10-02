import dotenv from "dotenv";
dotenv.config();
console.log("DEBUG HF_API_KEY:", process.env.HF_API_KEY?.slice(0, 6));

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./utils/db.js";

const app = express();

// Connect DB
connectDB();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ MongoDB connection (fallback, in case connectDB doesn’t handle errors)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running! Use /api/book or /api/auth");
});

// Routes
app.use("/api/book", bookRoutes);
app.use("/api/auth", authRoutes);

// ✅ Export for Vercel
export default app;
