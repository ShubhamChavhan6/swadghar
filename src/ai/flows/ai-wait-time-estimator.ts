'use server';

/**
 * @fileOverview An AI agent that predicts the order preparation time based on the items ordered,
 * current kitchen workload, and historical data.
 *
 * - estimateWaitTime - A function that handles the wait time estimation process.
 * - EstimateWaitTimeInput - The input type for the estimateWaitTime function.
 * - EstimateWaitTimeOutput - The return type for the estimateWaitTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateWaitTimeInputSchema = z.object({
  itemsOrdered: z
    .array(z.string())
    .describe('A list of items ordered by the customer.'),
  kitchenWorkload: z
    .string()
    .describe('The current workload of the kitchen (e.g., low, medium, high).'),
  historicalData: z
    .string()
    .describe('Historical data about order preparation times.'),
});
export type EstimateWaitTimeInput = z.infer<typeof EstimateWaitTimeInputSchema>;

const EstimateWaitTimeOutputSchema = z.object({
  estimatedWaitTime: z
    .number()
    .describe('The estimated wait time in minutes.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the estimated wait time.'),
});
export type EstimateWaitTimeOutput = z.infer<typeof EstimateWaitTimeOutputSchema>;

export async function estimateWaitTime(
  input: EstimateWaitTimeInput
): Promise<EstimateWaitTimeOutput> {
  return estimateWaitTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateWaitTimePrompt',
  input: {schema: EstimateWaitTimeInputSchema},
  output: {schema: EstimateWaitTimeOutputSchema},
  prompt: `You are an AI restaurant assistant that estimates how long an order will take.

  Consider the items ordered, current kitchen workload, and historical data to estimate the wait time.
  Respond with the estimated wait time in minutes and the reasoning behind it.

  Items Ordered: {{itemsOrdered}}
  Kitchen Workload: {{kitchenWorkload}}
  Historical Data: {{historicalData}}
  `,
});

const estimateWaitTimeFlow = ai.defineFlow(
  {
    name: 'estimateWaitTimeFlow',
    inputSchema: EstimateWaitTimeInputSchema,
    outputSchema: EstimateWaitTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
