import { useEffect, useState } from "react";
import Item from "./Item";
import Loader from "./Loader";
import { obtenerProductos } from "../services/productos";

export default function ItemListContainer({ soloOferta = false, eyebrow = "NUESTRO CATÁLOGO", titulo = "Todos los productos" }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;
    setCargando(true);
    setError("");

    obtenerProductos({ soloOferta })
      .then((datos) => { if (activo) setProductos(datos); })
      .catch(() => { if (activo) setError("No se pudieron cargar los productos. Intentá nuevamente más tarde."); })
      .finally(() => { if (activo) setCargando(false); });

    return () => { activo = false; };
  }, [soloOferta]);

  return (
    <section className="item-list">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{titulo}</h2>
        </div>
        {!cargando && !error && <span className="muted">{productos.length} productos</span>}
      </div>
      {cargando && <Loader texto="Cargando productos..." />}
      {error && <p className="alert alert-error" role="alert">{error}</p>}
      {!cargando && !error && productos.length === 0 && (
        <p className="status-message">No hay productos para mostrar por ahora.</p>
      )}
      {!cargando && !error && productos.length > 0 && (
        <div className="products-grid">
          {productos.map((producto) => <Item key={producto.id} producto={producto} />)}
        </div>
      )}
    </section>
  );
}
