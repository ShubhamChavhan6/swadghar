'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { placeOrder } from '@/app/actions';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

function PlaceOrderButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full rounded-full" disabled={pending}>
      {pending ? 'Placing Order...' : 'Place Order'}
    </Button>
  );
}

export function CartClient({ tableId }: { tableId: string }) {
  const { cartItems, updateQuantity, cartTotal, clearCart } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { toast } = useToast();
  
  const placeOrderWithItems = placeOrder.bind(null, cartItems, specialInstructions, tableId);
  const [state, dispatch] = useFormState(placeOrderWithItems, undefined);

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Order Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, toast]);
  
  useEffect(() => {
    // This is a workaround to clear cart on successful redirect, as the action causes a navigation.
    // In a real SPA-like behavior, you'd handle this differently.
    const handleBeforeUnload = () => {
        clearCart();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [clearCart]);


  if (cartItems.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href={`/menu/${tableId}`}>Back to Menu</Link>
        </Button>
      </div>
    );
  }

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  return (
    <form action={dispatch} className="grid grid-cols-1 gap-12 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {cartItems.map((item) => {
          const image = PlaceHolderImages.find((img) => img.id === item.image);
          return (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                {image && <Image src={image.imageUrl} alt={item.name} fill className="object-cover" />}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  {item.quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                </Button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 border-0 bg-secondary shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Any special instructions? (e.g., allergies, extra spicy)"
              className="rounded-lg"
              rows={3}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-border pt-2 text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <PlaceOrderButton />
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
