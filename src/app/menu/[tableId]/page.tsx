import { CATEGORIES, DISHES } from '@/lib/data';
import { MenuClient } from '@/components/menu/MenuClient';

export default function MenuPage({ params }: { params: { tableId: string } }) {
  // In a real app, you would fetch data based on the restaurant associated with the table
  const categories = CATEGORIES;
  const dishes = DISHES;

  return <MenuClient tableId={params.tableId} categories={categories} dishes={dishes} />;
}
