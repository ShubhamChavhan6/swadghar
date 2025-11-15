'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import type { Dish } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartProvider';
import { cn } from '@/lib/utils';

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  const { addToCart } = useCart();
  const image = PlaceHolderImages.find((img) => img.id === dish.image);

  const handleAddToCart = () => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden border-0 shadow-xl transition-transform duration-300 hover:scale-105">
      <CardHeader className="relative h-48 w-full p-0">
        {image && (
          <Image
            src={image.imageUrl}
            alt={dish.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div
          className={cn(
            'absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white',
            dish.type === 'veg' ? 'bg-success' : 'bg-destructive'
          )}
        >
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="font-headline text-xl">{dish.name}</CardTitle>
        <CardDescription className="mt-2">{dish.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-accent-secondary-default">
          ${dish.price.toFixed(2)}
        </p>
        <Button onClick={handleAddToCart} size="icon" className="rounded-full">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
