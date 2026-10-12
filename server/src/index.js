import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((origin) => origin.trim()).filter(Boolean);

app.set("trust proxy", 1);
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return callback(null, true); return callback(new Error("Origin not allowed by CORS")); } }));
app.use(express.json({ limit: "20kb" }));
app.use("/api/contact", rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: "draft-7", legacyHeaders: false, message: { message: "Too many messages. Please try again later." } }));

const projectSchema = new mongoose.Schema({
  number: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxlength: 100 },
  kind: { type: String, default: "FRONT-END PROJECT", maxlength: 80 },
  description: { type: String, required: true, trim: true, maxlength: 500 },
  technologies: [{ type: String, maxlength: 40 }],
  url: { type: String, required: true, match: /^https?:\/\// },
  image: { type: String, default: "" },
  featured: { type: Boolean, default: true }
}, { timestamps: true });
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  subject: { type: String, trim: true, maxlength: 120, default: "" },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 3000 },
  status: { type: String, enum: ["new", "read", "replied"], default: "new" }
}, { timestamps: true });
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

const initialProjects = [
  { number: "001", title: "PiggyVest UI study", kind: "INTERFACE RECREATION", description: "Practising interface structure, spacing, and visual consistency through a front-end recreation.", technologies: ["HTML", "CSS", "BOOTSTRAP"], url: "https://ad3n1x.github.io/PIGGYVEST/", image: "/multimedia/Screenshot%202025-09-18%20221344.png" },
  { number: "002", title: "Humankind", kind: "VISUAL WEB PROJECT", description: "A themed web experience focused on content hierarchy and presenting a clear visual idea.", technologies: ["HTML", "CSS", "LAYOUT"], url: "https://ad3n1x.github.io/HUMANKIND/", image: "/multimedia/Screenshot%202025-09-18%20235509.png" },
  { number: "003", title: "Thoughtbot-inspired page", kind: "WEB DESIGN RECREATION", description: "A practice build exploring section rhythm, typography, and responsive page composition.", technologies: ["HTML", "CSS", "JAVASCRIPT"], url: "https://ad3n1x.github.io/Thought-Bot-11/" }
];

app.get("/api/health", (_req, res) => res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected", app: "AD3N1X Portfolio API" }));

app.get("/api/projects", async (_req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.json({ projects: initialProjects, source: "fallback" });
    let projects = await Project.find({ featured: true }).sort({ number: 1 }).lean();
    if (!projects.length) {
      await Project.insertMany(initialProjects);
      projects = await Project.find({ featured: true }).sort({ number: 1 }).lean();
    }
    res.json({ projects, source: "mongodb" });
  } catch (error) { next(error); }
});

app.post("/api/contact", async (req, res, next) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
    const subject = typeof req.body.subject === "string" ? req.body.subject.trim() : "";
    const message = typeof req.body.message === "string" ? req.body.message.trim() : "";
    if (name.length < 2 || name.length > 80) return res.status(400).json({ message: "Please enter a name between 2 and 80 characters." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ message: "Please enter a valid email address." });
    if (subject.length > 120) return res.status(400).json({ message: "Subject must be 120 characters or fewer." });
    if (message.length < 10 || message.length > 3000) return res.status(400).json({ message: "Message must be between 10 and 3000 characters." });
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: "The message service is temporarily unavailable. Please email directly." });
    const saved = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: "Message received successfully.", id: saved._id });
  } catch (error) { next(error); }
});

app.use((error, _req, res, _next) => {
  console.error(error.message);
  res.status(500).json({ message: "Something went wrong. Please try again later." });
});

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection failed:", error.message));
} else {
  console.warn("MONGODB_URI is not configured. Project reads use fallback data; contact submissions are disabled.");
}

app.listen(PORT, () => console.log(`AD3N1X API listening on port ${PORT}`));
