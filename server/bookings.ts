import fs from "fs";
import path from "path";

export const CSV_FILE = path.join(process.cwd(), "bookings.csv");

/**
 * CSV Cell escaping helper to keep formatting intact in Microsoft Excel
 */
function escapeCSV(val: any): string {
  if (val === undefined || val === null) return "";
  let str = String(val);
  str = str.replace(/"/g, '""');
  if (str.includes(",") || str.includes("\n") || str.includes("\r") || str.includes('"')) {
    return `"${str}"`;
  }
  return str;
}

/**
 * Appends a booking/enquiry to the Excel/CSV sheet
 */
export function appendToCSV(booking: any) {
  const fileExists = fs.existsSync(CSV_FILE);
  const headers = [
    "Timestamp",
    "Type",
    "Name",
    "Email",
    "Phone",
    "Event Type",
    "Selected Package",
    "Date",
    "Location",
    "Guest Count",
    "Services",
    "Vision or Message"
  ];

  const row = [
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    booking.eventType === "General Enquiry" ? "General Enquiry" : "Booking Request",
    booking.name,
    booking.email,
    booking.phone || "N/A",
    booking.eventType,
    booking.packageName || "N/A",
    booking.date || "N/A",
    booking.location || "N/A",
    booking.guestCount || "N/A",
    Array.isArray(booking.services) ? booking.services.join(", ") : (booking.services || "N/A"),
    booking.vision || ""
  ];

  const csvRow = row.map(escapeCSV).join(",") + "\n";

  try {
    if (!fileExists) {
      const headerRow = headers.map(escapeCSV).join(",") + "\n";
      fs.writeFileSync(CSV_FILE, headerRow + csvRow, "utf8");
    } else {
      fs.appendFileSync(CSV_FILE, csvRow, "utf8");
    }
    console.log("Successfully appended record to bookings.csv");
  } catch (err) {
    console.error("Failed to write to CSV:", err);
  }
}

/**
 * Forwards the booking details to the external Google Sheet webapp/webhook if configured
 */
export function forwardToGoogleSheet(booking: any) {
  const externalSheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
  if (!externalSheetUrl) return;

  try {
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const payload = {
      timestamp,
      submissionType: booking.eventType === "General Enquiry" ? "General Enquiry" : "Booking Request",
      name: booking.name,
      email: booking.email,
      phone: booking.phone || "N/A",
      eventType: booking.eventType,
      packageName: booking.packageName || "N/A",
      date: booking.date || "N/A",
      location: booking.location || "N/A",
      guestCount: booking.guestCount || "N/A",
      services: Array.isArray(booking.services) ? booking.services.join(", ") : (booking.services || "N/A"),
      vision: booking.vision || "",
    };

    // Native fetch to forward the submission asynchronously (non-blocking)
    fetch(externalSheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log(`Forwarded to external Google Sheet. Response status: ${res.status}`);
      })
      .catch((err) => {
        console.error("Failed to forward to Google Sheet:", err);
      });
  } catch (webhookErr) {
    console.error("Failed to prepare Google Sheet payload:", webhookErr);
  }
}
