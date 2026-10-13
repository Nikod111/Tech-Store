import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartWidget() {
  const { totalCantidad } = useCart();

  return (
    <Link className="cart-widget" to="/carrito" aria-label={`Carrito, ${totalCantidad} productos`}>
      <span aria-hidden="true">🛒</span>
      <span>Carrito</span>
      <span className="cart-count">{totalCantidad}</span>
    </Link>
  );
}