import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API if key is present
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") return null;
  return new GoogleGenAI({ apiKey });
};

// Healthcheck API
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    company: "Nemean Partners Pty Ltd",
    location: "Brisbane, Queensland",
    abn: "55 692 594 228",
    timestamp: new Date().toISOString()
  });
});

// Enquiry Contact API
app.post("/api/enquiry", (req, res) => {
  const { name, organisation, email, reason, message, consent } = req.body;

  if (!name || !email || !reason || !message) {
    return res.status(400).json({ error: "Please fill out all required fields." });
  }

  if (!consent) {
    return res.status(400).json({ error: "Please accept the privacy and communication consent." });
  }

  const ticketRef = `NP-${Math.floor(100000 + Math.random() * 900000)}`;

  // Log or handle submission
  console.log(`[ENQUIRY RECEIVED] Ref: ${ticketRef} | Name: ${name} | Org: ${organisation || "Individual"} | Reason: ${reason}`);

  return res.json({
    success: true,
    ticketRef,
    message: "Thank you for contacting Nemean Partners. Our Brisbane team will respond within 1-2 business days.",
    timestamp: new Date().toISOString()
  });
});

// WellPath Intelligent Program Matcher API
app.post("/api/wellpath/match", async (req, res) => {
  const { goal, location, accessNeeds, telehealthPreferred } = req.body;

  const ai = getAiClient();

  const fallbackPrograms = [
    {
      id: "prog-01",
      title: "My health for Life (Queensland Preventive Health)",
      provider: "Diabetes Queensland / Queensland Health Network",
      category: goal || "Preventive Health & Lifestyle",
      cost: "Free (Queensland Government Funded)",
      delivery: telehealthPreferred ? "Virtual & Local Groups" : "In-Person (Brisbane Metro & Regional QLD)",
      matchScore: 96,
      explainability: "Matches your health goal and preferred delivery method. Fully supported free Queensland preventive program.",
      nextAction: "Generate referral token for registration"
    },
    {
      id: "prog-02",
      title: "10,000 Steps Queensland Engagement Tracker",
      provider: "CQUniversity & Health and Wellbeing Queensland",
      category: "Physical Activity & Fitness Routine",
      cost: "Free",
      delivery: "Digital / Mobile App Access",
      matchScore: 92,
      explainability: "Ideal for low-barrier step tracking and community physical activity goals with automated milestone tracking.",
      nextAction: "Instant digital enrollment code"
    },
    {
      id: "prog-03",
      title: "Quitline Queensland Personal Health Coach",
      provider: "Queensland Health",
      category: "Health Habit Transformation",
      cost: "Free",
      delivery: "Telehealth & SMS Navigator Support",
      matchScore: 88,
      explainability: "Dedicated phone navigation and goal coaching with structured follow-up support intervals.",
      nextAction: "Request callback from navigator"
    }
  ];

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are WellPath's explainable matching engine developed by Nemean Partners Pty Ltd for Queensland health navigation.
User Health Goal: "${goal || 'General Wellbeing'}"
Location/Postcode: "${location || 'Brisbane 4000'}"
Access Needs: "${accessNeeds || 'Flexible'}"
Telehealth Preferred: ${telehealthPreferred ? 'Yes' : 'No'}

Generate 3 realistic, verified free or low-cost Queensland preventive health program matches in JSON array format:
[
  {
    "id": "prog-1",
    "title": "Program Name",
    "provider": "Organisation / Provider",
    "category": "Category",
    "cost": "Free or Low-Cost detail",
    "delivery": "Telehealth / In-Person",
    "matchScore": 95,
    "explainability": "1-2 sentence reason for match based on goal and location",
    "nextAction": "Action steps"
  }
]
Return ONLY valid JSON array with no markdown code blocks.`
      });

      const text = response.text?.trim() || "";
      const cleaned = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({
          success: true,
          matchMethod: "Gemini AI Bounded Matcher",
          programs: parsed,
          syntheticNotice: "Demonstration users, referrals and outcome figures are synthetic. No Queensland Government partnership or endorsement is implied. Proposed for the 2026 Private Sector Pathways health challenge."
        });
      }
    } catch (e) {
      console.warn("AI Matcher fallback used:", e);
    }
  }

  return res.json({
    success: true,
    matchMethod: "Rule-Based Explainable Matcher Engine",
    programs: fallbackPrograms,
    syntheticNotice: "Demonstration users, referrals and outcome figures are synthetic. No Queensland Government partnership or endorsement is implied. Proposed for the 2026 Private Sector Pathways health challenge."
  });
});

// Vite Middleware Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const assetsPath = path.join(distPath, "assets");
    const currentAsset = (extension: ".js" | ".css") => {
      if (!fs.existsSync(assetsPath)) return null;
      return fs
        .readdirSync(assetsPath)
        .find((file) => file.startsWith("index-") && file.endsWith(extension));
    };

    app.use(
      "/assets",
      express.static(assetsPath, {
        fallthrough: true,
        immutable: true,
        index: false,
        maxAge: "1y",
      })
    );

    app.get(/^\/assets\/index-[\w-]+\.(js|css)$/, (req, res, next) => {
      const extension = path.extname(req.path) as ".js" | ".css";
      const asset = currentAsset(extension);
      if (!asset) return next();

      res.setHeader("Cache-Control", "private, max-age=0, must-revalidate");
      if (extension === ".js") res.type("application/javascript");
      if (extension === ".css") res.type("text/css");
      return res.sendFile(path.join(assetsPath, asset));
    });

    app.get("/assets/*", (_req, res) => {
      res.status(404).type("text/plain").send("Asset not found");
    });

    app.use(
      express.static(distPath, {
        fallthrough: true,
        index: false,
        maxAge: 0,
      })
    );

    app.get("*", (_req, res) => {
      res.setHeader("Cache-Control", "private, max-age=0, must-revalidate");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nemean Partners platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
