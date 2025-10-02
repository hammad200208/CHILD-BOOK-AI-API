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

// ✅ Connect DB
connectDB();

// ✅ Allowed origins for frontend
const allowedOrigins = [
  "https://childbook-ai-pink.vercel.app", // frontend on Vercel
  "http://localhost:5173",                // local dev (Vite)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS blocked: ${origin} is not allowed.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));

// ✅ MongoDB connection fallback (if connectDB didn’t handle it)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running! Use /api/book or /api/auth");
});

// ✅ Routes
app.use("/api/book", bookRoutes);
app.use("/api/auth", authRoutes);

// ✅ Export for Vercel
export default app;
