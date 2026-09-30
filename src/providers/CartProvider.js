"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  const [ordered, setOrderedFoods] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("CartDishes");
      if (stored) setOrder(JSON.parse(stored));
    } catch (err) {
      localStorage.removeItem("CartDishes");
    } finally {
      setOrderedFoods(false);
    }
  }, []);

  return (
    <CartContext.Provider value={{ order, ordered, setOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }

  return context;
}
