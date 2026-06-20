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
    const requestId = req.headers.get('x-railway-request-id') || crypto.randomUUID();
    const contactContext = {
      requestId,
      firstName: safeFirstName,
      lastName: safeLastName,
      email: safeEmail,
    };

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Contact form email service is not configured.', contactContext);
        return NextResponse.json({ success: false, error: 'Email service is not configured' }, { status: 500 });
      }

      console.warn('Contact form email service is not configured in development. Simulating success.', contactContext);
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
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #06b6d4; margin-bottom: 12px;">New Lead Inquiry</h2>
            <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #475569;">
              A new enquiry has been submitted through the TechUpServices website contact form.
            </p>
          </div>
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <p style="margin: 0 0 14px; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em;">Lead Details</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; width: 38%; color: #64748b;"><strong>First Name</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${safeFirstName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Last Name</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${safeLastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b;"><strong>Email</strong></td>
                <td style="padding: 10px 0; color: #0f172a;">
                  <a href="mailto:${safeEmail}" style="color: #06b6d4; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
            </table>
          </div>
          <div style="text-align: left; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <p style="margin-top: 0; color: #64748b; font-size: 14px;">Customer message</p>
            <p style="font-style: italic; margin: 0; line-height: 1.7; color: #0f172a;">"${safeMessage}"</p>
          </div>
          <p style="font-size: 14px; color: #64748b; margin-top: 24px; text-align: center;">
            Reply directly to this email to contact the lead.
          </p>
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

    console.info('Contact form submission received.', contactContext);

    const adminResult = await transporter.sendMail(adminMailOptions);
    console.info('Admin email sent.', {
      ...contactContext,
      to: adminMailOptions.to,
      messageId: adminResult.messageId,
      accepted: adminResult.accepted,
      rejected: adminResult.rejected,
    });

    const customerResult = await transporter.sendMail(userConfirmationOptions);
    console.info('Customer confirmation email sent.', {
      ...contactContext,
      to: userConfirmationOptions.to,
      messageId: customerResult.messageId,
      accepted: customerResult.accepted,
      rejected: customerResult.rejected,
    });

    console.info('Contact form email flow completed.', contactContext);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form email flow failed.', error);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}
