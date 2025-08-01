
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.pid === item.pid);
      if (existing) {
        return prev.map((i) =>
          i.pid === item.pid ? { ...i, qty: i.qty + quantity } : i
        );
      }
      return [...prev, { ...item, qty: quantity }];
    });
  };

  const removeFromCart = (pid) => {
    setCartItems((prev) => prev.filter((item) => item.pid !== pid));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
