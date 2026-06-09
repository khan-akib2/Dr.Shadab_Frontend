import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Basic Server-side Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields in contact form" },
        { status: 400 }
      );
    }

    // 2. Fetch Environment Variables
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SENDER_EMAIL || "info@drshadab.com";
    const doctorEmail = process.env.BREVO_RECIEVER_EMAIL || process.env.DOCTOR_EMAIL || "drshadab@gmail.com";

    // Detailed patient reassurance HTML template
    const patientHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Inquiry Received</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fdfbf7; color: #0f172a; margin: 0; padding: 20px; }
          .container { max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background-color: #0c4a6e; padding: 32px; text-align: center; color: #ffffff; }
          .header h1 { font-family: Georgia, serif; margin: 0; font-size: 24px; font-weight: normal; }
          .header p { margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #38bdf8; }
          .content { padding: 32px; font-size: 14px; line-height: 1.6; color: #334155; }
          .summary-card { background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 20px; margin: 24px 0; }
          .summary-card h3 { margin-top: 0; font-family: Georgia, serif; color: #0369a1; border-bottom: 1px solid #e0f2fe; padding-bottom: 8px; }
          .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .summary-row:last-child { margin-bottom: 0; }
          .summary-label { font-weight: bold; color: #0f172a; }
          .footer { background-color: #f8fafc; padding: 24px; text-align: center; font-size: 11px; color: #94a3b8; border-t: 1px solid #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Dr. Shadab</h1>
            <p>Healthcare That Listens, Cares, and Guides</p>
          </div>
          <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to us. We have successfully received your inquiry regarding <strong>${subject}</strong>.</p>
            
            <p>Our clinic coordinator or medical team will review your message and respond to this email address (${email}) within 12 to 24 hours.</p>

            <p>If your inquiry is urgent, please call our clinic helpline directly at +91 98765 43210.</p>
          </div>
          <div class="footer">
            &copy; 2026 Dr. Shadab Medical Consultations. Lucknow, Uttar Pradesh, India.
          </div>
        </div>
      </body>
      </html>
    `;

    // Detailed doctor clinic notification HTML template
    const doctorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Inquiry</title>
        <style>
          body { font-family: sans-serif; line-height: 1.5; color: #1e293b; background-color: #f1f5f9; padding: 20px; }
          .card { max-width: 600px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; margin: 0 auto; }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px; }
          .header h2 { margin: 0; color: #0c4a6e; }
          .grid { display: grid; grid-template-cols: 1fr; gap: 12px; }
          .row { border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
          .label { font-weight: bold; color: #475569; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 14px; color: #0f172a; margin-top: 2px; }
          .message-box { background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 14px; color: #334155; margin-top: 8px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>New Contact Inquiry Received</h2>
          </div>
          <div class="grid">
            <div class="row">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
            <div class="row">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>
            <div class="row" style="border-bottom: none;">
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div style="margin-top: 32px; border-top: 2px solid #f1f5f9; padding-top: 24px; text-align: center;">
            <p style="font-size: 11px; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">Quick Admin Responses</p>
            <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/respond?type=contact&status=confirm&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&concern=${encodeURIComponent(subject)}" style="background-color: #8b6d41; color: white; padding: 12px 16px; text-decoration: none; border-radius: 4px; font-size: 11px; font-weight: bold;">ANSWER INQUIRY</a>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/respond?type=contact&status=reschedule&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&concern=${encodeURIComponent(subject)}" style="background-color: #a88854; color: white; padding: 12px 16px; text-decoration: none; border-radius: 4px; font-size: 11px; font-weight: bold;">REQUEST MORE INFO</a>
            </div>
            <p style="margin-top: 24px; font-size: 11px; color: #64748b;">
              Or email directly: <a href="mailto:${email}" style="color: #8b6d41; font-weight: bold; text-decoration: none;">Reply to Patient</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Make Requests to Brevo API (if API Key is configured)
    if (apiKey) {
      const emailPayload = {
        sender: { name: "Dr. Shadab Clinic", email: senderEmail },
        to: [{ email: email, name: name }],
        subject: `Inquiry Received: ${subject}`,
        htmlContent: patientHtml,
      };

      const doctorPayload = {
        sender: { name: "Dr. Shadab Clinic Notification", email: senderEmail },
        to: [{ email: doctorEmail, name: "Dr. Shadab Clinic" }],
        subject: `New Inquiry from ${name}: ${subject}`,
        htmlContent: doctorHtml,
      };

      // Send to Patient
      const patientResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(emailPayload),
      });

      // Send to Doctor
      const doctorResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(doctorPayload),
      });

      if (!patientResponse.ok || !doctorResponse.ok) {
        console.error("Brevo API error:", {
          patientStatus: patientResponse.status,
          doctorStatus: doctorResponse.status
        });
      }
    } else {
      console.warn("BREVO_API_KEY is not defined. Simulating email deliveries.");
    }

    return NextResponse.json({ success: true, message: "Inquiry logged successfully" });

  } catch (error) {
    console.error("Contact API Exception:", error);
    return NextResponse.json(
      { error: "Server error during inquiry registration" },
      { status: 500 }
    );
  }
}
