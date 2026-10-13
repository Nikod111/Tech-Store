import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (producto, cantidad = 1) => {
    setCart((carritoActual) => {
      const existente = carritoActual.find((item) => item.id === producto.id);

      if (existente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [...carritoActual, { ...producto, cantidad }];
    });
  };

  const removeFromCart = (id) => {
    setCart((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => setCart([]);

  const totalCantidad = useMemo(
    () => cart.reduce((total, item) => total + item.cantidad, 0),
    [cart]
  );

  const totalPrecio = useMemo(
    () => cart.reduce((total, item) => total + item.precio * item.cantidad, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalCantidad,
        totalPrecio
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider");
  }
  return context;
}