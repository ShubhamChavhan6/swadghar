import type { Category, Dish, Order, WaiterCall } from './definitions';

export const CATEGORIES: Category[] = [
  { id: 'starters', name: 'Starters' },
  { id: 'main-course', name: 'Main Course' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

export const DISHES: Dish[] = [
  {
    id: 'dish-1',
    name: 'Gourmet Burger',
    price: 15.99,
    categoryId: 'main-course',
    image: 'dish-burger',
    type: 'non-veg',
    description: '1/2 lb patty, cheddar, lettuce, tomato, and our secret sauce.',
  },
  {
    id: 'dish-2',
    name: 'Margherita Pizza',
    price: 18.50,
    categoryId: 'main-course',
    image: 'dish-pizza',
    type: 'veg',
    description: 'Classic pizza with fresh tomatoes, mozzarella, and basil.',
  },
  {
    id: 'dish-3',
    name: 'Spaghetti Carbonara',
    price: 16.00,
    categoryId: 'main-course',
    image: 'dish-pasta',
    type: 'non-veg',
    description: 'Creamy pasta with pancetta, egg yolk, and parmesan.',
  },
  {
    id: 'dish-4',
    name: 'Greek Salad',
    price: 12.00,
    categoryId: 'starters',
    image: 'dish-salad',
    type: 'veg',
    description: 'Fresh cucumbers, tomatoes, olives, and feta cheese.',
  },
  {
    id: 'dish-5',
    name: 'Sushi Platter',
    price: 25.00,
    categoryId: 'starters',
    image: 'dish-sushi',
    type: 'non-veg',
    description: 'Assortment of fresh nigiri and maki rolls.',
  },
  {
    id: 'dish-6',
    name: 'Grilled Ribeye',
    price: 35.00,
    categoryId: 'main-course',
    image: 'dish-steak',
    type: 'non-veg',
    description: '12oz ribeye steak grilled to perfection, served with asparagus.',
  },
  {
    id: 'dish-7',
    name: 'Lava Cake',
    price: 9.50,
    categoryId: 'desserts',
    image: 'dish-dessert',
    type: 'veg',
    description: 'Warm chocolate cake with a molten center.',
  },
  {
    id: 'dish-8',
    name: 'Sunset Cocktail',
    price: 11.00,
    categoryId: 'drinks',
    image: 'dish-cocktail',
    type: 'veg',
    description: 'A vibrant mix of orange juice, grenadine, and spirits.',
  },
];

export const ORDERS: Order[] = [
  {
    id: 'ORD-001',
    tableId: 5,
    items: [
      { id: 'dish-1', name: 'Gourmet Burger', price: 15.99, quantity: 1, image: 'dish-burger' },
      { id: 'dish-3', name: 'Spaghetti Carbonara', price: 16.00, quantity: 1, image: 'dish-pasta' },
    ],
    total: 31.99,
    status: 'preparing',
    timestamp: Date.now() - 5 * 60 * 1000, // 5 minutes ago
  },
  {
    id: 'ORD-002',
    tableId: 2,
    items: [{ id: 'dish-2', name: 'Margherita Pizza', price: 18.50, quantity: 2, image: 'dish-pizza' }],
    total: 37.00,
    status: 'confirmed',
    timestamp: Date.now() - 2 * 60 * 1000, // 2 minutes ago
  },
  {
    id: 'ORD-003',
    tableId: 8,
    items: [
      { id: 'dish-7', name: 'Lava Cake', price: 9.50, quantity: 1, image: 'dish-dessert' },
      { id: 'dish-8', name: 'Sunset Cocktail', price: 11.00, quantity: 2, image: 'dish-cocktail' },
    ],
    total: 31.50,
    status: 'ready',
    timestamp: Date.now() - 10 * 60 * 1000, // 10 minutes ago
  },
];

export const WAITER_CALLS: WaiterCall[] = [];
