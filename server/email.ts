import nodemailer from "nodemailer";

interface BookingEmailParams {
  name: string;
  email: string;
  eventType: string;
  phone?: string;
  packageName?: string;
  date?: string;
  location?: string;
  guestCount?: string;
  services?: string | string[];
  vision?: string;
}

/**
 * Sends a notification email to the admin with details of the booking/enquiry
 */
export async function sendBookingEmail(booking: BookingEmailParams): Promise<{ emailSent: boolean; emailInfo: string }> {
  const {
    name,
    email,
    eventType,
    phone,
    packageName,
    date,
    location,
    guestCount,
    services,
    vision,
  } = booking;

  const adminEmail = process.env.ADMIN_EMAIL || "info@7lenz.com";
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("SMTP not configured in environment. Skipping email sending.");
    return {
      emailSent: false,
      emailInfo: "SMTP_NOT_CONFIGURED",
    };
  }

  const isGeneralEnquiry = eventType === "General Enquiry";
  const emailSubject = isGeneralEnquiry 
    ? `New General Website Enquiry: ${name}`
    : `New Wedding Booking Request: ${name} - ${eventType}`;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"7 Lenz Booking Engine" <${smtpUser}>`,
      to: adminEmail,
      subject: emailSubject,
      text: `
You have received a new ${isGeneralEnquiry ? "general website enquiry" : "consultation request"} from the 7 Lenz website:

Client Details:
- Name: ${name}
- Phone: ${phone || "Not Specified"}
- Email: ${email}

Event Details:
- Type/Subject: ${eventType}
${packageName ? `- Selected Package: ${packageName}\n` : ""}
- Date: ${date || "Not Specified"}
- Location: ${location || "Not Specified"}
- Estimated Guest Count: ${guestCount || "Not Specified"}

Services Requested:
${Array.isArray(services) ? services.join(", ") : services || "None selected"}

Client Note/Vision:
${vision || "No note provided."}

--
This enquiry was securely processed and saved into the server Excel spreadsheet database.
      `,
      html: `
        <h2>${isGeneralEnquiry ? "New General Enquiry" : "New Booking Request"}</h2>
        <p>You have received a new submission from the <strong>7 Lenz Wedd Planner</strong> website:</p>
        <h3>Client Details</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Phone:</strong> ${phone || "Not Specified"}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h3>Event & Booking Details</h3>
        <ul>
          <li><strong>Type/Subject:</strong> ${eventType}</li>
          ${packageName ? `<li><strong>Selected Package:</strong> <span style="color: #d97706; font-weight: bold;">${packageName}</span></li>` : ""}
          <li><strong>Date:</strong> ${date || "Not Specified"}</li>
          <li><strong>Location:</strong> ${location || "Not Specified"}</li>
          <li><strong>Estimated Guest Count:</strong> ${guestCount || "Not Specified"}</li>
        </ul>
        <h3>Services Requested</h3>
        <p>${Array.isArray(services) ? services.join(", ") : services || "None selected"}</p>
        <h3>Client Note / Vision</h3>
        <p style="background: #f5f5f5; padding: 12px; border-left: 4px solid #d97706; font-style: italic;">
          ${vision ? vision.replace(/\n/g, "<br>") : "No vision note provided."}
        </p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.messageId);
    return {
      emailSent: true,
      emailInfo: info.messageId,
    };
  } catch (mailError: any) {
    console.error("Failed to send email through SMTP:", mailError);
    return {
      emailSent: false,
      emailInfo: mailError.message || "Unknown SMTP Error",
    };
  }
}
