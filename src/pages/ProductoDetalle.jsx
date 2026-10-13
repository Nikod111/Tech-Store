import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    let activo = true;
    setCargando(true);
    setError("");

    fetch("/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudo cargar el catálogo.");
        return respuesta.json();
      })
      .then((productos) => {
        const encontrado = productos.find((item) => item.id === Number(id));
        if (!encontrado) throw new Error("No encontramos ese producto.");
        if (activo) setProducto(encontrado);
      })
      .catch((err) => {
        if (activo) setError(err.message);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => { activo = false; };
  }, [id]);

  if (cargando) return <p className="status-message">Cargando producto...</p>;
  if (error) {
    return <section className="empty-state"><h2>Producto no disponible</h2><p>{error}</p><Link className="button" to="/productos">Volver al catálogo</Link></section>;
  }

  const precio = producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

  return (
    <section className="detail-page">
      <Link className="back-link" to="/productos">← Volver al catálogo</Link>
      <div className="detail-card">
        <div className="detail-image"><img src={producto.imagen} alt={producto.nombre} /></div>
        <div className="detail-info">
          <span className="category-tag">{producto.categoria}</span>
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <strong className="detail-price">{precio}</strong>
          <p className="muted">Precio de muestra para la pre-entrega.</p>
          <button className="button" onClick={() => { addToCart(producto); setAgregado(true); }}>
            Agregar al carrito
          </button>
          {agregado && <p className="success-message" role="status">✓ Producto agregado al carrito.</p>}
        </div>
      </div>
    </section>
  );
}