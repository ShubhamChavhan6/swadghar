'use client';

import { useState, useEffect } from 'react';
import { Check, ChefHat, Circle, PartyPopper } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CallWaiterDialog } from './CallWaiterDialog';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type OrderStatus = 'confirmed' | 'preparing' | 'ready' | 'served';

const STATUS_STEPS: { id: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { id: 'confirmed', label: 'Order Confirmed', icon: <Check /> },
  { id: 'preparing', label: 'Preparing', icon: <ChefHat /> },
  { id: 'ready', label: 'Ready for Pickup', icon: <PartyPopper /> },
  { id: 'served', label: 'Served', icon: <Circle /> },
];

interface OrderStatusClientProps {
  orderId: string;
  initialWaitTime: number;
  waitTimeReason: string;
}

export function OrderStatusClient({ orderId, initialWaitTime, waitTimeReason }: OrderStatusClientProps) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const totalDuration = initialWaitTime * 60 * 1000; // in ms
  const stepDuration = totalDuration / (STATUS_STEPS.length -1);

  useEffect(() => {
    // Simulate progress for the current step
    const progressInterval = setInterval(() => {
        if(currentStatusIndex < STATUS_STEPS.length -1){
            setProgress(prev => {
                const stepStartTime = currentStatusIndex * stepDuration;
                const elapsed = Date.now() - (startTime + stepStartTime);
                const stepProgress = Math.min(100, (elapsed / stepDuration) * 100);
                return stepProgress;
            });
        }
    }, 1000);
    
    // Simulate advancing to the next status
    const statusInterval = setInterval(() => {
      setCurrentStatusIndex((prevIndex) => {
        if (prevIndex < STATUS_STEPS.length - 1) {
          setProgress(0);
          return prevIndex + 1;
        }
        clearInterval(statusInterval);
        clearInterval(progressInterval);
        setProgress(100);
        return prevIndex;
      });
    }, stepDuration);

    const startTime = Date.now();

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, [stepDuration, currentStatusIndex]);

  const activeStatus = STATUS_STEPS[currentStatusIndex].id;

  return (
    <Card className="w-full max-w-md border-0 bg-secondary shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl">Track Your Order</CardTitle>
        <p className="text-muted-foreground">Order ID: {orderId}</p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <ol className="relative ml-4 border-l border-dashed border-border">
            {STATUS_STEPS.map((step, index) => {
              const isActive = index === currentStatusIndex;
              const isCompleted = index < currentStatusIndex;
              return (
                <li key={step.id} className="mb-10 ml-8">
                  <span
                    className={cn(
                      'absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-secondary',
                      isCompleted ? 'bg-success text-white' : 'bg-primary text-primary-foreground'
                    )}
                  >
                    {isCompleted ? <Check/> : step.icon}
                  </span>
                  <h3 className={cn(
                      "font-semibold",
                      isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </h3>
                  {isActive && (
                      <div className="mt-2">
                        <Progress value={progress} className="h-2"/>
                        <p className="text-xs text-muted-foreground mt-1">{waitTimeReason}</p>
                      </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <CallWaiterDialog />
      </CardContent>
    </Card>
  );
}
