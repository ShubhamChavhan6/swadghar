'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Check, UtensilsCrossed, X } from 'lucide-react';
import type { Order } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

export function StaffOrderCard({ order }: { order: Order }) {
  const [timeSince, setTimeSince] = useState('');

  useEffect(() => {
    const update = () => {
      const seconds = Math.floor((Date.now() - order.timestamp) / 1000);
      const minutes = Math.floor(seconds / 60);
      setTimeSince(`${minutes}m ${seconds % 60}s ago`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [order.timestamp]);
  
  const statusColors = {
      confirmed: 'bg-blue-500',
      preparing: 'bg-yellow-500',
      ready: 'bg-green-500',
      served: 'bg-gray-500',
      cancelled: 'bg-red-500',
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-headline">
          <Link href={`/staff/order/${order.id}`} className="hover:underline">
            Order #{order.id.split('-')[1]} (Table {order.tableId})
          </Link>
          <Badge className={cn("capitalize", statusColors[order.status])}>
            {order.status}
          </Badge>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>{timeSince}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.quantity} x {item.name}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-dashed pt-2 text-right font-bold">
          Total: ${order.total.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" className="flex-1 rounded-full bg-green-600 hover:bg-green-700">
          <Check /> Mark Ready
        </Button>
        <Button size="sm" className="flex-1 rounded-full" variant="secondary">
          <UtensilsCrossed /> Mark Served
        </Button>
         <Button size="sm" className="rounded-full" variant="destructive">
          <X/>
        </Button>
      </CardFooter>
    </Card>
  );
}
