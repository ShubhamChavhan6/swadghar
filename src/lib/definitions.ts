export type Dish = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image: string;
  type: 'veg' | 'non-veg';
  description: string;
};

export type Category = {
  id: string;
  name: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  tableId: number;
  items: CartItem[];
  total: number;
  status: 'confirmed' | 'preparing' | 'ready' | 'served' | 'cancelled';
  timestamp: number;
  specialInstructions?: string;
};

export type WaiterCall = {
  id: string;
  tableId: number;
  request: string;
  urgency: 'low' | 'medium' | 'high';
  response: string;
  timestamp: number;
};
