import { useEffect, useState } from "react";
import Item from "./Item";

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    fetch("/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudieron cargar los productos.");
        return respuesta.json();
      })
      .then((datos) => {
        if (activo) setProductos(datos);
      })
      .catch((err) => {
        if (activo) setError(err.message || "Ocurrió un error al cargar el catálogo.");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => { activo = false; };
  }, []);

  if (cargando) return <p className="status-message">Cargando productos...</p>;
  if (error) return <p className="status-message error-message">{error}</p>;

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">NUESTRO CATÁLOGO</p>
          <h2>Todos los productos</h2>
        </div>
        <span className="muted">{productos.length} productos</span>
      </div>
      <div className="products-grid">
        {productos.map((producto) => <Item key={producto.id} producto={producto} />)}
      </div>
    </section>
  );
}