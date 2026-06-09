import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { toEmail, toName, subject, messageText } = body;

    if (!toEmail || !messageText) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SENDER_EMAIL || "info@drshadab.com";

    // Format the message text to HTML (replace newlines with <br>)
    const formattedMessage = messageText.replace(/\\n/g, "<br>");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
          body { margin: 0; padding: 0; min-width: 100%; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f9ff; }
          table { border-spacing: 0; border-collapse: collapse; }
        </style>
      </head>
      <body style="background-color: #f0f9ff; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f9ff" style="background-color: #f0f9ff; width: 100%; padding: 40px 20px;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; text-align: left; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.15);">
                <tr>
                  <td style="background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%); background-color: #0369a1; padding: 40px 30px; text-align: center;">
                    <h2 style="margin: 0; color: #ffffff; font-family: 'Playfair Display', Georgia, serif; font-weight: normal; font-size: 32px; letter-spacing: 1px;">Dr. Shadab</h2>
                    <p style="margin: 8px 0 0 0; color: #ccfbf1; font-family: 'Manrope', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold;">Clinic Response</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px; font-size: 16px; color: #334155; line-height: 1.7;">
                    ${formattedMessage}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    if (apiKey) {
      const emailPayload = {
        sender: { name: "Dr. Shadab Clinic", email: senderEmail },
        to: [{ email: toEmail, name: toName || "Patient" }],
        subject: subject || "Message from Dr. Shadab",
        htmlContent: htmlContent,
      };

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) {
        console.error("Brevo API error:", response.status);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
      }
    } else {
      console.warn("BREVO_API_KEY is not defined. Simulating reply.");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Reply API Exception:", error);
    return NextResponse.json(
      { error: "Server error during reply dispatch" },
      { status: 500 }
    );
  }
}
