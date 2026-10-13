import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatoPrecio = (precio) =>
  precio.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export default function Carrito() {
  const { cart, removeFromCart, clearCart, totalCantidad, totalPrecio } = useCart();

  if (cart.length === 0) {
    return (
      <section className="empty-state">
        <div className="empty-cart-icon" aria-hidden="true">🛒</div>
        <h2>Tu carrito está vacío</h2>
        <p>Cuando agregues productos, los vas a encontrar acá.</p>
        <Link className="button" to="/productos">Explorar productos</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="section-heading">
        <div><p className="eyebrow">TU SELECCIÓN</p><h2>Carrito de compras</h2></div>
        <span className="muted">{totalCantidad} {totalCantidad === 1 ? "unidad" : "unidades"}</span>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((producto) => (
            <article className="cart-item" key={producto.id}>
              <img src={producto.imagen} alt={producto.nombre} />
              <div className="cart-item-info">
                <span className="category-tag">{producto.categoria}</span>
                <h3>{producto.nombre}</h3>
                <p>{formatoPrecio(producto.precio)} por unidad</p>
                <button className="text-button" onClick={() => removeFromCart(producto.id)}>Eliminar</button>
              </div>
              <div className="cart-item-total">
                <span className="muted">Cantidad: {producto.cantidad}</span>
                <strong>{formatoPrecio(producto.precio * producto.cantidad)}</strong>
              </div>
            </article>
          ))}
          <button className="text-button clear-button" onClick={clearCart}>Vaciar carrito</button>
        </div>
        <aside className="order-summary">
          <h3>Resumen del pedido</h3>
          <div><span>Productos ({totalCantidad})</span><span>{formatoPrecio(totalPrecio)}</span></div>
          <div><span>Envío</span><span>A coordinar</span></div>
          <hr />
          <div className="summary-total"><strong>Total</strong><strong>{formatoPrecio(totalPrecio)}</strong></div>
          <p className="muted">Esta pre-entrega no procesa pagos reales.</p>
          <Link className="button button-full" to="/productos">Seguir comprando</Link>
        </aside>
      </div>
    </section>
  );
}