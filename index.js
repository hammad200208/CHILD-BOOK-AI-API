import dotenv from "dotenv";
dotenv.config();
console.log("DEBUG HF_API_KEY:", process.env.HF_API_KEY?.slice(0, 6));

import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/book", bookRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
