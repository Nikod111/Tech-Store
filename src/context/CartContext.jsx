import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cupon, setCupon] = useState(null); // { codigo, descuento }

  // Devuelve true si se pudo agregar (respeta el stock disponible).
  const addToCart = (producto, cantidad = 1) => {
    const enCarrito = cart.find((item) => item.id === producto.id)?.cantidad ?? 0;
    const stock = Number(producto.stock ?? Infinity);
    if (enCarrito + cantidad > stock) return false;

    setCart((actual) => {
      const existente = actual.find((item) => item.id === producto.id);
      if (existente) {
        return actual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [...actual, { ...producto, cantidad }];
    });
    return true;
  };

  const removeFromCart = (id) => setCart((actual) => actual.filter((item) => item.id !== id));

  const clearCart = () => {
    setCart([]);
    setCupon(null);
  };

  const totalCantidad = useMemo(() => cart.reduce((t, item) => t + item.cantidad, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((t, item) => t + item.precio * item.cantidad, 0), [cart]);
  const montoDescuento = cupon ? Math.round((subtotal * cupon.descuento) / 100) : 0;
  const totalPrecio = subtotal - montoDescuento;

  return (
    <CartContext.Provider
      value={{
        cart, addToCart, removeFromCart, clearCart,
        totalCantidad, subtotal, montoDescuento, totalPrecio,
        cupon, setCupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe utilizarse dentro de CartProvider");
  return context;
}
