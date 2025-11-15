'use client';

import { useState } from 'react';
import { LayoutGrid, List, Search } from 'lucide-react';
import type { Category, Dish } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DishCard } from './DishCard';
import Link from 'next/link';
import { useCart } from '@/context/CartProvider';
import { cn } from '@/lib/utils';

interface MenuClientProps {
  tableId: string;
  categories: Category[];
  dishes: Dish[];
}

export function MenuClient({ tableId, categories, dishes }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const { itemCount, cartTotal } = useCart();

  const filteredDishes = dishes.filter(
    (dish) =>
      (activeCategory === 'all' || dish.categoryId === activeCategory) &&
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Menu</h1>
          <p className="text-xl text-muted-foreground">Table: {tableId}</p>
        </header>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search dishes..."
              className="rounded-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant={view === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setView('grid')}
              className="rounded-full"
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setView('list')}
              className="rounded-full"
            >
              <List />
            </Button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div
          className={cn(
            'grid gap-8',
            view === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          )}
        >
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>No dishes found. Try changing your search or filter.</p>
          </div>
        )}
      </div>

      {itemCount > 0 && (
        <div className="sticky bottom-0 z-40 p-4">
            <div className="container mx-auto">
                <Button asChild size="lg" className="w-full rounded-full shadow-2xl">
                <Link href="/cart">
                    View Cart ({itemCount} {itemCount > 1 ? 'items' : 'item'}) - ${cartTotal.toFixed(2)}
                </Link>
                </Button>
            </div>
        </div>
      )}
    </>
  );
}
