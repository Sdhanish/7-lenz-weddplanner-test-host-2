import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Import modular routes router
import apiRouter from "./server/routes";

// Load environment variables
dotenv.config();

// Fallback to .env.example if some keys are missing
const envExamplePath = path.join(process.cwd(), ".env.example");
if (!process.env.SMTP_USER && fs.existsSync(envExamplePath)) {
  dotenv.config({ path: envExamplePath });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Mount modular API router
  app.use("/api", apiRouter);

  /**
   * Serve Vite in development, compiled static files in production
   */
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
