import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    // Verify req payload
    if (!firstName || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const safeFirstName = escapeHtml(String(firstName));
    const safeLastName = lastName ? escapeHtml(String(lastName)) : 'Not provided';
    const safeEmail = escapeHtml(String(email));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, '<br>');

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      if (process.env.NODE_ENV === 'production') {
        console.error('SMTP_USER and SMTP_PASS are missing in production.');
        return NextResponse.json({ success: false, error: 'Email service is not configured' }, { status: 500 });
      }

      console.warn('SMTP_USER and SMTP_PASS are missing in development. Email logic will simulate success.');
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ success: true, simulated: true });
    }

    // Configure the transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminMailOptions = {
      from: `"TechUpServices Website" <${process.env.SMTP_USER || 'no-reply@techupservices.com'}>`,
      to: 'support@techupservices.com',
      replyTo: String(email),
      subject: `New Lead: ${safeFirstName} ${lastName ? safeLastName : ''}`.trim(),
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">New Lead Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>First Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${safeFirstName}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Last Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${safeLastName}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${safeEmail}</td></tr>
          </table>
          <h3 style="margin-top: 30px;">Message:</h3>
          <p style="background: #f8fafc; padding: 15px; border-radius: 8px; font-style: italic;">${safeMessage}</p>
        </div>
      `,
    };

    const userConfirmationOptions = {
      from: `"TechUpServices" <${process.env.SMTP_USER || 'support@techupservices.com'}>`,
      to: email,
      subject: `Thank you for contacting TechUpServices!`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; text-align: center;">
          <h2 style="color: #06b6d4; margin-bottom: 20px;">Request Received Successfully</h2>
          <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${safeFirstName}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.6;">Your request has been submitted successfully and our team will get in touch with you soon to discuss your requirements in detail.</p>
          <br/>
          <div style="text-align: left; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <p style="margin-top:0; color: #64748b; font-size: 14px;">A copy of your message:</p>
            <p style="font-style: italic; margin-bottom: 0;">"${safeMessage}"</p>
          </div>
          <br/><br/>
          <p style="font-size: 14px; color: #64748b;">Best regards,<br/>The TechUpServices Team</p>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userConfirmationOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}
