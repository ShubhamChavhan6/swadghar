'use client';

import type { CartItem } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId:string) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
    toast({
      title: 'Added to cart',
      description: `${itemToAdd.name} has been added to your order.`,
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };
  
  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
     toast({
      title: 'Item removed',
      description: `An item has been removed from your cart.`,
      variant: 'destructive',
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
