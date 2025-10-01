import dotenv from "dotenv";
dotenv.config();
console.log("DEBUG HF_API_KEY:", process.env.HF_API_KEY?.slice(0, 6));

import express from "express";
import cors from "cors";
import mongoose from "mongoose";   // ⬅️ new
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";  // ⬅️ new
import connectDB from "./utils/db.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// Root route
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀 Use /api/book or /api/auth");
});

// API routes
app.use("/api/book", bookRoutes);
app.use("/api/auth", authRoutes);   // ⬅️ new

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
