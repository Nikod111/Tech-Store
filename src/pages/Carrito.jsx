import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { buscarCupon } from "../services/cupones";
import { formatoPrecio } from "../utils/formato";

export default function Carrito() {
  const {
    cart, removeFromCart, clearCart, totalCantidad,
    subtotal, montoDescuento, totalPrecio, cupon, setCupon,
  } = useCart();
  const [codigo, setCodigo] = useState("");
  const [estadoCupon, setEstadoCupon] = useState({ cargando: false, error: "" });

  const aplicarCupon = async (e) => {
    e.preventDefault();
    if (!codigo.trim()) return;
    setEstadoCupon({ cargando: true, error: "" });
    try {
      const encontrado = await buscarCupon(codigo);
      if (!encontrado) {
        setEstadoCupon({ cargando: false, error: "El cupón no existe." });
        return;
      }
      setCupon({ codigo: encontrado.codigo, descuento: Number(encontrado.descuento) });
      setCodigo("");
      setEstadoCupon({ cargando: false, error: "" });
    } catch {
      setEstadoCupon({ cargando: false, error: "No se pudo validar el cupón. Intentá de nuevo." });
    }
  };

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
          <div><span>Productos ({totalCantidad})</span><span>{formatoPrecio(subtotal)}</span></div>
          {cupon && (
            <div className="discount-line">
              <span>Cupón {cupon.codigo} (-{cupon.descuento}%)</span>
              <span>-{formatoPrecio(montoDescuento)}</span>
            </div>
          )}
          <div><span>Envío</span><span>A coordinar</span></div>
          <hr />
          <div className="summary-total"><strong>Total</strong><strong>{formatoPrecio(totalPrecio)}</strong></div>

          <form className="coupon-form" onSubmit={aplicarCupon}>
            <label htmlFor="cupon" className="sr-only">Código de cupón</label>
            <input id="cupon" placeholder="Código de cupón" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            <button className="button button-small" type="submit" disabled={estadoCupon.cargando}>
              {estadoCupon.cargando ? "..." : "Aplicar"}
            </button>
          </form>
          {estadoCupon.error && <p className="field-error">{estadoCupon.error}</p>}
          {cupon && <button className="text-button" onClick={() => setCupon(null)}>Quitar cupón</button>}

          <Link className="button button-full" to="/productos">Seguir comprando</Link>
        </aside>
      </div>
    </section>
  );
}
