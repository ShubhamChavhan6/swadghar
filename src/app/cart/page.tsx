import { CartClient } from '@/components/cart/CartClient';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const tableId = '1'; // In a real app, this would come from the session or URL

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href={`/menu/${tableId}`}><ChevronLeft /></Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold">Your Cart</h1>
      </div>
      <CartClient tableId={tableId} />
    </div>
  );
}
