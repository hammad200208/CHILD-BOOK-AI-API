import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

    if (!token) return res.status(401).json({ error: "Not authorized, no token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user id to req
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};
