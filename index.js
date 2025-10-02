import dotenv from "dotenv";
dotenv.config();
console.log("DEBUG HF_API_KEY:", process.env.HF_API_KEY?.slice(0, 6));

import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./utils/db.js";

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Allowed origins for frontend
const allowedOrigins = [
  "https://childbook-ai-pink.vercel.app", // frontend on Vercel
  "http://localhost:5173",                // local dev (Vite)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / curl
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

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running! Use /api/book or /api/auth");
});

// ✅ Routes
app.use("/api/book", bookRoutes);
app.use("/api/auth", authRoutes);

// ✅ Export for Vercel
export default app;

// ✅ Local dev server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}
