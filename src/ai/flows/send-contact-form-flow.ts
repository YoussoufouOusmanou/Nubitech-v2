'use server';

/**
 * @fileOverview A flow to handle sending the contact form data via email.
 *
 * - sendContactMessage - A function that handles processing the contact form data.
 * - ContactFormInput - The input type for the sendContactMessage function.
 * - ContactFormOutput - The return type for the sendContactMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { sendEmail } from '@/services/email-service';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  email: z.string().email().describe('The email of the person.'),
  message: z.string().describe('The content of the message.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function sendContactMessage(
  input: ContactFormInput
): Promise<ContactFormOutput> {
  return sendContactMessageFlow(input);
}

const sendContactMessageFlow = ai.defineFlow(
  {
    name: 'sendContactMessageFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    
    const supportEmail = process.env.SUPPORT_EMAIL || 'support@example.com';

    // Email options
    const mailOptions = {
      from: `"Nubitech Contact Form" <no-reply@nubitech.com>`, // Sender address
      to: supportEmail, // List of receivers
      subject: `New contact message from ${input.name}`, // Subject line
      text: input.message, // Plain text body
      replyTo: input.email, // Allow direct reply to the user
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        <hr />
        <h2>Message:</h2>
        <p>${input.message.replace(/\n/g, '<br>')}</p>
      `
    };

    try {
        await sendEmail(mailOptions);
        console.log(`Email sent successfully to ${supportEmail}`);
        return {
            success: true,
            message: 'Contact message sent successfully.',
        };
    } catch (error) {
        console.error("Failed to send email:", error);
        // In a real app, you might want more specific error handling
        return {
            success: false,
            message: 'Failed to send contact message.',
        };
    }
  }
);
