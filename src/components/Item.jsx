import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatoPrecio } from "../utils/formato";

export default function Item({ producto }) {
  const { addToCart } = useCart();
  const [mensaje, setMensaje] = useState("");
  const sinStock = Number(producto.stock) <= 0;

  const handleAgregar = () => {
    const ok = addToCart(producto);
    setMensaje(ok ? "✓ Agregado" : "Sin más stock");
    setTimeout(() => setMensaje(""), 1800);
  };

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/producto/${producto.id}`} aria-label={`Ver ${producto.nombre}`}>
        {producto.oferta && <span className="offer-badge">OFERTA</span>}
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <span className="category-tag">{producto.categoria}</span>
        <h3>
          <Link className="product-title-link" to={`/producto/${producto.id}`}>{producto.nombre}</Link>
        </h3>
        <p className="product-description">{producto.descripcion}</p>
        <div className="product-card-bottom">
          <strong className="price">{formatoPrecio(producto.precio)}</strong>
          <button className="button button-small" onClick={handleAgregar} disabled={sinStock}>
            {sinStock ? "Sin stock" : "Agregar"}
          </button>
        </div>
        <p className="card-feedback" role="status">{mensaje}</p>
      </div>
    </article>
  );
}
