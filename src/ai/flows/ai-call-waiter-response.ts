'use server';
/**
 * @fileOverview An AI agent to determine the urgency of a waiter call request and suggest responses.
 *
 * - generateWaiterResponse - A function that handles the waiter call response generation process.
 * - AICallWaiterInput - The input type for the generateWaiterResponse function.
 * - AICallWaiterOutput - The return type for the generateWaiterResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICallWaiterInputSchema = z.object({
  requestDetails: z.string().describe('Details of the waiter request from the user.'),
});
export type AICallWaiterInput = z.infer<typeof AICallWaiterInputSchema>;

const AICallWaiterOutputSchema = z.object({
  urgencyLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The urgency level of the request.'),
  suggestedResponse: z
    .string()
    .describe('A suggested response for the waiter based on the request.'),
});
export type AICallWaiterOutput = z.infer<typeof AICallWaiterOutputSchema>;

export async function generateWaiterResponse(
  input: AICallWaiterInput
): Promise<AICallWaiterOutput> {
  return aiCallWaiterResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCallWaiterPrompt',
  input: {schema: AICallWaiterInputSchema},
  output: {schema: AICallWaiterOutputSchema},
  prompt: `You are a helpful assistant that analyzes waiter call requests from restaurant customers and determines the urgency level (low, medium, or high) and suggests an appropriate response for the waiter.

Consider these factors when determining urgency:
- **Severity of the request**: Is it a simple request or an emergency?
- **Time sensitivity**: Does the request require immediate attention?
- **Potential impact**: Could delaying the request cause significant inconvenience or dissatisfaction?

Based on the request details provided, determine the urgency level and craft a response that is polite, helpful, and addresses the customer's needs effectively.

Request Details: {{{requestDetails}}}

Output:
Urgency Level: (low, medium, or high)
Suggested Response: (A tailored response for the waiter to address the request)`,
});

const aiCallWaiterResponseFlow = ai.defineFlow(
  {
    name: 'aiCallWaiterResponseFlow',
    inputSchema: AICallWaiterInputSchema,
    outputSchema: AICallWaiterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
