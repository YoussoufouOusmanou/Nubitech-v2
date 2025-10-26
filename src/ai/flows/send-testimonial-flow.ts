'use server';

/**
 * @fileOverview A flow to handle sending testimonial data.
 *
 * - sendTestimonial - A function that handles processing the testimonial data.
 * - TestimonialInput - The input type for the sendTestimonial function.
 * - TestimonialOutput - The return type for the sendTestimonial function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TestimonialInputSchema = z.object({
  name: z.string().describe('The name of the person giving the testimonial.'),
  role: z.string().describe('The role or company of the person.'),
  testimonial: z.string().describe('The content of the testimonial.'),
  rating: z.number().describe('The rating given, from 1 to 5.'),
});
type TestimonialInput = z.infer<typeof TestimonialInputSchema>;

const TestimonialOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
type TestimonialOutput = z.infer<typeof TestimonialOutputSchema>;

export async function sendTestimonial(
  input: TestimonialInput
): Promise<TestimonialOutput> {
  return sendTestimonialFlow(input);
}

const sendTestimonialFlow = ai.defineFlow(
  {
    name: 'sendTestimonialFlow',
    inputSchema: TestimonialInputSchema,
    outputSchema: TestimonialOutputSchema,
  },
  async (input) => {
    // In a real application, you would integrate an email sending service here.
    // For example, using a library like Nodemailer or an API like SendGrid.
    
    console.log('--- New Testimonial Received ---');
    console.log(`From: ${input.name} (${input.role})`);
    console.log(`Rating: ${input.rating}/5`);
    console.log(`Message: ${input.testimonial}`);
    console.log('---------------------------------');
    console.log('Simulating sending email to support...');

    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Email sent successfully (simulated).');

    return {
      success: true,
      message: 'Testimonial received and processed.',
    };
  }
);
