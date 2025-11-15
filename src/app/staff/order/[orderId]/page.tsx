import { Clock, Hash, Check, UtensilsCrossed, X } from 'lucide-react';
import { ORDERS } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function StaffOrderDetailPage({ params }: { params: { orderId: string } }) {
  const order = ORDERS.find(o => o.id === params.orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Order Details</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <span>{order.id}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(order.timestamp).toLocaleString()}</span>
            </div>
        </div>
      </header>

      <Card className="max-w-2xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Table {order.tableId}</CardTitle>
            <CardDescription>
                <Badge className="capitalize">{order.status}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="mb-4 font-semibold">Items</h4>
            <ul className="space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <Separator className="my-6" />
             <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes (Est.)</span>
                    <span>${(order.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(order.total * 1.08).toFixed(2)}</span>
                </div>
            </div>
            {order.specialInstructions && (
                <>
                    <Separator className="my-6" />
                    <h4 className="mb-2 font-semibold">Special Instructions</h4>
                    <p className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">{order.specialInstructions}</p>
                </>
            )}
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-2">
            <Button size="sm" className="rounded-full bg-green-600 hover:bg-green-700">
                <Check /> Mark as Ready
            </Button>
            <Button size="sm" className="rounded-full" variant="secondary">
                <UtensilsCrossed /> Mark as Completed
            </Button>
            <div className="col-span-2">
                <Button size="sm" className="w-full rounded-full" variant="destructive">
                    <X /> Cancel Order
                </Button>
            </div>
          </CardFooter>
      </Card>
    </div>
  );
}
