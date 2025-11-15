import Image from 'next/image';
import Link from 'next/link';
import { ClipboardList, QrCode, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DISHES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { DishCard } from '@/components/menu/DishCard';

export default function Home() {
  const popularDishes = DISHES.slice(0, 4);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative h-[60vh] w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover brightness-50"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="font-headline text-4xl font-bold md:text-6xl">
              Order Food Quickly from Your Table 🍽️
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-300">
              Scan, order, and enjoy delicious food without leaving your seat.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/scan">Scan QR</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/menu/1">View Menu</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-headline text-3xl font-bold">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-0 bg-card text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <QrCode className="h-8 w-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline">1. Scan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Scan the QR code on your table to open the digital menu.</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-card text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <ClipboardList className="h-8 w-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline">2. Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Browse the menu, add your favorite dishes to the cart, and place your order.</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-card text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Smile className="h-8 w-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline">3. Enjoy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your food is prepared and served right at your table. Enjoy your meal!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="popular-dishes" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-headline text-3xl font-bold">
              Popular Dishes
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {popularDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
