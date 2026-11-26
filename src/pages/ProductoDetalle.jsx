import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { obtenerProducto } from "../services/productos";
import { formatoPrecio } from "../utils/formato";
import Loader from "../components/Loader";

export default function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    let activo = true;
    setCargando(true);
    setError("");

    obtenerProducto(id)
      .then((p) => { if (activo) setProducto(p); })
      .catch((err) => {
        if (activo) setError(err.message.includes("encontramos") ? err.message : "No se pudo cargar el producto.");
      })
      .finally(() => { if (activo) setCargando(false); });

    return () => { activo = false; };
  }, [id]);

  if (cargando) return <Loader texto="Cargando producto..." />;
  if (error) {
    return (
      <section className="empty-state">
        <h2>Producto no disponible</h2>
        <p>{error}</p>
        <Link className="button" to="/productos">Volver al catálogo</Link>
      </section>
    );
  }

  const sinStock = Number(producto.stock) <= 0;
  const handleAgregar = () => {
    const ok = addToCart(producto);
    setMensaje(ok
      ? { tipo: "ok", texto: "✓ Producto agregado al carrito." }
      : { tipo: "error", texto: "No hay más stock disponible de este producto." });
  };

  return (
    <section className="detail-page">
      <Link className="back-link" to="/productos">← Volver al catálogo</Link>
      <div className="detail-card">
        <div className="detail-image"><img src={producto.imagen} alt={producto.nombre} /></div>
        <div className="detail-info">
          <span className="category-tag">{producto.categoria}</span>
          {producto.oferta && <span className="category-tag tag-offer">OFERTA</span>}
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <strong className="detail-price">{formatoPrecio(producto.precio)}</strong>
          <p className="muted">{sinStock ? "Sin stock" : `Stock disponible: ${producto.stock}`}</p>
          <button className="button" onClick={handleAgregar} disabled={sinStock}>Agregar al carrito</button>
          {mensaje && (
            <p className={mensaje.tipo === "ok" ? "success-message" : "field-error"} role="status">{mensaje.texto}</p>
          )}
        </div>
      </div>
    </section>
  );
}
