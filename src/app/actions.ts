'use server';

import { redirect } from 'next/navigation';
import type { CartItem } from './lib/definitions';
import { generateWaiterResponse } from '@/ai/flows/ai-call-waiter-response';
import { estimateWaitTime } from '@/ai/flows/ai-wait-time-estimator';

// --- Waiter Call AI Action ---
export type WaiterCallState = {
  message?: string;
  urgency?: 'low' | 'medium' | 'high';
  response?: string;
  error?: string;
};

export async function getWaiterResponse(
  prevState: WaiterCallState,
  formData: FormData
): Promise<WaiterCallState> {
  const requestDetails = formData.get('requestDetails');

  if (!requestDetails || typeof requestDetails !== 'string' || requestDetails.trim() === '') {
    return { error: 'Please provide details for your request.' };
  }

  try {
    const aiResponse = await generateWaiterResponse({ requestDetails });
    return {
      message: "We've received your request.",
      urgency: aiResponse.urgencyLevel,
      response: aiResponse.suggestedResponse,
    };
  } catch (e) {
    console.error(e);
    return {
      error: 'Sorry, we could not process your request at this time. Please try again.',
    };
  }
}

// --- Order Placement and Wait Time AI Action ---
export async function placeOrder(
  items: CartItem[],
  specialInstructions: string,
  tableId: string
) {
  if (items.length === 0) {
    return { error: 'Your cart is empty.' };
  }

  // In a real app, you would save the order to Firestore here.
  const orderId = `ORD-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

  // Estimate wait time using AI
  let estimatedWaitTime = 15; // default
  let estimationReasoning = 'Based on average preparation times.';

  try {
    const { estimatedWaitTime: aiWaitTime, reasoning } = await estimateWaitTime({
      itemsOrdered: items.map(item => `${item.name} (x${item.quantity})`),
      kitchenWorkload: 'Medium', // This could be dynamic in a real app
      historicalData: 'Peak hours on a Friday night. Similar orders took 20-25 minutes.',
    });
    estimatedWaitTime = aiWaitTime;
    estimationReasoning = reasoning;
  } catch(e) {
    console.error("AI Wait Time Estimation Failed:", e);
    // Proceed without AI estimation if it fails
  }

  // We can pass the wait time via search params to the order status page
  const params = new URLSearchParams({
      tableId,
      wait: estimatedWaitTime.toString(),
      reason: estimationReasoning
  });
  
  redirect(`/order/${orderId}?${params.toString()}`);
}
