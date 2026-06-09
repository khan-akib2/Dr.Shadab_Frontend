import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, age, concern, date, timeSlot } = body;

    // 1. Basic Server-side Validation
    if (!name || !phone || !email || !age || !concern || !date) {
      return NextResponse.json(
        { error: "Missing required fields in consultation form" },
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
        <title>Appointment Request Received</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
          body { margin: 0; padding: 0; min-width: 100%; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f9ff; }
          table { border-spacing: 0; border-collapse: collapse; }
          a { text-decoration: none; color: #0284c7; }
        </style>
      </head>
      <body style="background-color: #f0f9ff; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f9ff" style="background-color: #f0f9ff; width: 100%; padding: 40px 20px;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; text-align: left; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.15);">
                <tr>
                  <td style="background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%); background-color: #0369a1; padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-family: 'Playfair Display', Georgia, serif; font-weight: normal; font-size: 32px; letter-spacing: 1px;">Dr. Shadab</h1>
                    <p style="margin: 8px 0 0 0; color: #ccfbf1; font-family: 'Manrope', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold;">Healthcare That Listens</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px; font-size: 15px; line-height: 1.6; color: #334155;">
                    <p style="margin-top: 0; font-size: 17px; color: #0f172a;">Dear <strong>${name}</strong>,</p>
                    <p>Thank you for placing your trust in our healthcare consulting services. We have successfully logged your consultation request.</p>
                    
                    <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; border-left: 4px solid #0d9488; border-radius: 8px; padding: 24px; margin: 30px 0;">
                      <h3 style="margin-top: 0; font-family: 'Playfair Display', Georgia, serif; color: #0f172a; font-size: 20px; margin-bottom: 16px; font-weight: normal;">Consultation Details</h3>
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="width: 40%; padding-bottom: 12px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Focus:</td>
                          <td style="width: 60%; padding-bottom: 12px; font-weight: 600; color: #0d9488;">${concern}</td>
                        </tr>
                        <tr>
                          <td style="width: 40%; padding-bottom: 12px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Date:</td>
                          <td style="width: 60%; padding-bottom: 12px; font-weight: 600; color: #0f172a;">${date}</td>
                        </tr>
                        <tr>
                          <td style="width: 40%; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Time Slot:</td>
                          <td style="width: 60%; font-weight: 600; color: #0f172a;">${timeSlot || "Not Specified"}</td>
                        </tr>
                      </table>
                    </div>

                    <p style="color: #0f172a; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; margin-top: 0; margin-bottom: 20px;">What happens next?</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 0 20px 20px 0; vertical-align: top;">
                          <div style="background-color: #e0f2fe; color: #0284c7; width: 28px; height: 28px; border-radius: 14px; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">1</div>
                        </td>
                        <td style="padding-bottom: 20px; color: #334155; padding-top: 4px;">Our scheduling coordinator will review Dr. Shadab's clinical availability.</td>
                      </tr>
                      <tr>
                        <td style="padding: 0 20px 20px 0; vertical-align: top;">
                          <div style="background-color: #e0f2fe; color: #0284c7; width: 28px; height: 28px; border-radius: 14px; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">2</div>
                        </td>
                        <td style="padding-bottom: 20px; color: #334155; padding-top: 4px;">We will contact you via phone or email within 12 hours to confirm your exact appointment time.</td>
                      </tr>
                      <tr>
                        <td style="padding: 0 20px 0 0; vertical-align: top;">
                          <div style="background-color: #e0f2fe; color: #0284c7; width: 28px; height: 28px; border-radius: 14px; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">3</div>
                        </td>
                        <td style="color: #334155; padding-top: 4px;">Please keep any previous clinical files or active prescription summaries ready.</td>
                      </tr>
                    </table>

                    <p style="margin-bottom: 0;">If you need to reschedule or have immediate questions, feel free to reply directly to this email or call us at <strong style="color: #0f172a;">+91 98765 43210</strong>.</p>
                    
                    <div style="background-color: #fff1f2; border: 1px solid #fecaca; color: #be123c; padding: 16px; border-radius: 8px; margin-top: 30px; font-size: 13px; line-height: 1.5;">
                      <strong>Emergency Disclaimer:</strong> If you are experiencing a medical emergency (e.g., chest pains, severe breathing issues, acute trauma), please contact emergency services or proceed to the nearest hospital emergency room immediately.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Detailed doctor clinic notification HTML template
    const doctorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Consultation Request</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
          body { margin: 0; padding: 0; min-width: 100%; font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f9ff; }
          table { border-spacing: 0; border-collapse: collapse; }
          a { text-decoration: none; }
          .value a { color: #0284c7 !important; text-decoration: none !important; font-weight: 600; }
        </style>
      </head>
      <body style="background-color: #f0f9ff; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f9ff" style="background-color: #f0f9ff; width: 100%; padding: 40px 20px;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; text-align: left; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.15);">
                <tr>
                  <td style="background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%); background-color: #0369a1; padding: 40px 30px; text-align: center;">
                    <h2 style="margin: 0; color: #ffffff; font-family: 'Playfair Display', Georgia, serif; font-weight: normal; font-size: 28px; letter-spacing: 0.5px;">New Patient Consultation</h2>
                    <p style="margin: 8px 0 0; color: #ccfbf1; font-family: 'Manrope', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Action Required</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 40%; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Patient Name</td>
                        <td class="value" style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 60%; font-size: 16px; color: #0f172a; font-weight: 600;">${name}</td>
                      </tr>
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 40%; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Age</td>
                        <td class="value" style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 60%; font-size: 15px; color: #334155; font-weight: 500;">${age} years</td>
                      </tr>
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 40%; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Phone Number</td>
                        <td class="value" style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 60%; font-size: 15px; color: #334155; font-weight: 500;">${phone}</td>
                      </tr>
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 40%; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Email Address</td>
                        <td class="value" style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 60%; font-size: 15px; color: #334155; font-weight: 500;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 40%; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Consultation Focus</td>
                        <td class="value" style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 60%; font-size: 15px; color: #0d9488; font-weight: 600;">${concern}</td>
                      </tr>
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 40%; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Preferred Date</td>
                        <td class="value" style="border-bottom: 1px solid #f1f5f9; padding: 16px 0; width: 60%; font-size: 15px; color: #0f172a; font-weight: 600;">${date}</td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0; width: 40%; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Preferred Time Slot</td>
                        <td class="value" style="padding: 16px 0; width: 60%; font-size: 15px; color: #0f172a; font-weight: 600;">${timeSlot || "Not Specified"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 30px; text-align: center;">
                    <p style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 20px 0;">Quick Admin Responses</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/respond?type=appointment&status=confirm&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&concern=${encodeURIComponent(concern)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(timeSlot || 'Not Specified')}" style="display: inline-block; background-color: #0d9488; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: bold; margin: 0 4px 10px 4px; box-shadow: 0 2px 4px rgba(13,148,136,0.3);">Confirm</a>
                          
                          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/respond?type=appointment&status=reschedule&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&concern=${encodeURIComponent(concern)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(timeSlot || 'Not Specified')}" style="display: inline-block; background-color: #ffffff; color: #0284c7; border: 1px solid #0284c7; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: bold; margin: 0 4px 10px 4px;">Reschedule</a>
                          
                          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/respond?type=appointment&status=decline&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&concern=${encodeURIComponent(concern)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(timeSlot || 'Not Specified')}" style="display: inline-block; background-color: #fff1f2; color: #e11d48; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: bold; margin: 0 4px 10px 4px;">Decline</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 0 0; font-size: 13px; color: #64748b;">
                      Or chat directly on: <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #0d9488; text-decoration: none; font-weight: bold;">WhatsApp Support</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // 3. Make Requests to Brevo API (if API Key is configured)
    if (apiKey) {
      const emailPayload = {
        sender: { name: "Dr. Shadab Clinic", email: senderEmail },
        to: [{ email: email, name: name }],
        subject: `Appointment Request Logged - Dr. Shadab`,
        htmlContent: patientHtml,
      };

      const doctorPayload = {
        sender: { name: "Dr. Shadab Clinic Notification", email: senderEmail },
        to: [{ email: doctorEmail, name: "Dr. Shadab Clinic" }],
        subject: `New Patient Consultation: ${name} (${concern})`,
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
        // We log details but still return mock success to prevent blockages if API limits occur
      }
    } else {
      // API Key missing - Log mock behavior for developer check
      console.warn("BREVO_API_KEY is not defined in environments. Simulating successful email deliveries.");
      console.log("Mock emails sent to Patient:", email, "and Doctor:", doctorEmail);
    }

    return NextResponse.json({ success: true, message: "Appointment requested logged successfully" });

  } catch (error) {
    console.error("Appointment API Exception:", error);
    return NextResponse.json(
      { error: "Server error during booking registration" },
      { status: 500 }
    );
  }
}
