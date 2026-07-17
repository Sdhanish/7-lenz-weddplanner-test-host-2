import express from "express";
import fs from "fs";
import { hasCloudinary, getHeroAssets, getGalleryAssets } from "./cloudinary";
import { CSV_FILE, appendToCSV, forwardToGoogleSheet } from "./bookings";
import { sendBookingEmail } from "./email";

const router = express.Router();

/**
 * Secure API route to download Excel/CSV sheet
 */
router.get("/admin/download-bookings", (req, res) => {
  const key = req.query.key;
  if (key !== "7lenz2026") {
    return res.status(403).send("Unauthorized: Invalid administrative key.");
  }

  if (!fs.existsSync(CSV_FILE)) {
    return res.status(404).send("No bookings or enquiries have been recorded yet.");
  }

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=7lenz_wedding_planner_bookings.csv");
  res.sendFile(CSV_FILE);
});

/**
 * API Booking & Enquiry Submission Route
 */
router.post("/booking", async (req, res) => {
  try {
    const {
      eventType,
      date,
      location,
      guestCount,
      services,
      name,
      phone,
      email,
      vision,
      packageName,
    } = req.body;

    // Validate required fields
    if (!name || !email || !eventType) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    console.log("Received booking/enquiry submission:", {
      eventType,
      date,
      location,
      guestCount,
      services,
      name,
      phone,
      email,
      packageName,
    });

    const submission = {
      eventType,
      date,
      location,
      guestCount,
      services,
      name,
      phone,
      email,
      vision,
      packageName,
    };

    // 1. Write to Excel CSV database sheet immediately
    appendToCSV(submission);

    // 2. Forward to external Google Sheet Webapp/Webhook asynchronously (non-blocking)
    forwardToGoogleSheet(submission);

    // 3. Send notification email via SMTP (if configured)
    const { emailSent, emailInfo } = await sendBookingEmail(submission);

    // Return a successful state to client
    return res.status(200).json({
      success: true,
      message: "Enquiry processed successfully.",
      emailSent,
      emailInfo,
    });
  } catch (err: any) {
    console.error("Booking handler error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

/**
 * Dynamic Cloudinary Hero Section Assets Endpoint
 */
router.get("/cloudinary/hero", async (req, res) => {
  try {
    const result = await getHeroAssets();
    return res.json(result);
  } catch (err: any) {
    console.error("Failed to fetch Cloudinary hero assets:", err);
    return res.json({
      configured: hasCloudinary,
      videoUrl: null,
      posterUrl: null,
      error: err.message
    });
  }
});

/**
 * Dynamic Cloudinary Multi-Folder Gallery Endpoint
 */
router.get("/cloudinary/gallery", async (req, res) => {
  try {
    const result = await getGalleryAssets();
    return res.json(result);
  } catch (err: any) {
    console.error("Failed to compile Cloudinary dynamic gallery:", err);
    return res.status(500).json({ error: "Failed to fetch dynamic Cloudinary gallery data." });
  }
});

export default router;
