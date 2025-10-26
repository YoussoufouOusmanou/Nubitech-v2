import nodemailer from 'nodemailer';

// Force the server action to run on Node.js environment
// This is necessary because Nodemailer uses Node.js APIs not available in the Edge runtime.
export const runtime = 'nodejs';

// Define the shape of the mail options
interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  replyTo: string;
  html: string;
}

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: (process.env.EMAIL_PORT || "587") === "465", // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Sends an email using the pre-configured transporter.
 * @param mailOptions The email options.
 */
export async function sendEmail(mailOptions: MailOptions): Promise<void> {
    await transporter.sendMail(mailOptions);
}
