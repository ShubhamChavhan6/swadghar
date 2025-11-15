'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Camera, CornerDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

export default function QRScanPage() {
  const [tableNumber, setTableNumber] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableNumber && !isNaN(Number(tableNumber))) {
      router.push(`/menu/${tableNumber}`);
    } else {
      toast({
        title: 'Invalid Table Number',
        description: 'Please enter a valid number for your table.',
        variant: 'destructive',
      });
    }
  };

  const handleScan = () => {
    toast({
        title: 'Camera Access',
        description: 'QR scanning is a demo feature. Please enter the table number manually.',
      });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover brightness-[0.2] filter blur-sm"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-lg bg-card/50 p-8 text-center shadow-2xl backdrop-blur-md">
        <h1 className="font-headline text-3xl font-bold">Scan QR Code</h1>
        <p className="mt-2 text-muted-foreground">
          Scan the QR code placed on your table to get started.
        </p>
        <div className="my-8 flex h-64 w-64 items-center justify-center rounded-lg border-4 border-dashed border-primary/50 bg-black/20">
          <Camera className="h-24 w-24 text-primary/50" />
        </div>
        <Button onClick={handleScan} size="lg" className="w-full rounded-full">
          Start Scanning
        </Button>
        <div className="my-6 flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={handleManualEntry} className="w-full">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="h-12 flex-1 rounded-full px-6 text-center"
              aria-label="Table Number"
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 flex-shrink-0 rounded-full"
              aria-label="Submit table number"
            >
              <CornerDownRight className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
