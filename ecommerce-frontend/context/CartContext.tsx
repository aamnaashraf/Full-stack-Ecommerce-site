'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  savedItems: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (productId: string) => void;
  moveToCart: (product: Product) => void;
  removeSavedItem: (productId: string) => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping_cart';
const SAVED_ITEMS_STORAGE_KEY = 'saved_items';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    const storedSaved = localStorage.getItem(SAVED_ITEMS_STORAGE_KEY);
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
    if (storedSaved) {
      setSavedItems(JSON.parse(storedSaved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(SAVED_ITEMS_STORAGE_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const saveForLater = (productId: string) => {
    const item = items.find((item) => item.product._id === productId);
    if (item) {
      // Add to saved items if not already there
      setSavedItems((prev) => {
        const exists = prev.find((p) => p._id === productId);
        if (!exists) {
          return [...prev, item.product];
        }
        return prev;
      });
      // Remove from cart
      removeFromCart(productId);
    }
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    // Remove from saved items
    setSavedItems((prev) => prev.filter((p) => p._id !== product._id));
  };

  const removeSavedItem = (productId: string) => {
    setSavedItems((prev) => prev.filter((p) => p._id !== productId));
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        savedItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        saveForLater,
        moveToCart,
        removeSavedItem,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};
