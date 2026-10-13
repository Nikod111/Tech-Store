import { Link } from "react-router-dom";

export default function Item({ producto }) {
  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/producto/${producto.id}`} aria-label={`Ver ${producto.nombre}`}>
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <span className="category-tag">{producto.categoria}</span>
        <h3>{producto.nombre}</h3>
        <p className="product-description">{producto.descripcion}</p>
        <div className="product-card-bottom">
          <strong className="price">{producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}</strong>
          <Link className="button button-small" to={`/producto/${producto.id}`}>Ver detalle</Link>
        </div>
      </div>
    </article>
  );
}