import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { eliminarProducto, obtenerProductos } from "../../services/productos";
import { cargarDatosDeEjemplo } from "../../services/seed";
import { formatoPrecio } from "../../utils/formato";

export default function GestionProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [confirmarId, setConfirmarId] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  const cargar = async () => {
    setCargando(true);
    setError("");
    try {
      setProductos(await obtenerProductos());
    } catch {
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const handleEliminar = async (id) => {
    setEliminandoId(id);
    setError("");
    try {
      await eliminarProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      setAviso("Producto eliminado correctamente.");
    } catch {
      setError("No se pudo eliminar el producto. Revisá tus permisos o tu conexión.");
    } finally {
      setEliminandoId(null);
      setConfirmarId(null);
    }
  };

  const handleSeed = async () => {
    setCargando(true);
    try {
      const r = await cargarDatosDeEjemplo();
      setAviso(`Datos cargados: ${r.productos} productos, ${r.equipo} integrantes, ${r.cupones} cupones.`);
      await cargar();
    } catch {
      setError("No se pudieron cargar los datos de ejemplo. Revisá las reglas de Firestore.");
      setCargando(false);
    }
  };

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">PANEL DE GESTIÓN</p>
          <h2>Lista de productos</h2>
        </div>
        <Link className="button" to="/admin/productos/nuevo">+ Agregar producto</Link>
      </div>

      {aviso && <p className="alert alert-success" role="status">{aviso}</p>}
      {error && <p className="alert alert-error" role="alert">{error}</p>}
      {cargando && <Loader texto="Cargando productos..." />}

      {!cargando && productos.length === 0 && !error && (
        <div className="empty-state">
          <h2>No hay productos</h2>
          <p>Podés agregar uno nuevo o cargar los datos de ejemplo (productos, equipo y cupones).</p>
          <button className="button" onClick={handleSeed}>Cargar datos de ejemplo</button>
        </div>
      )}

      {!cargando && productos.length > 0 && (
        <div className="admin-list">
          {productos.map((p) => (
            <article className="admin-row" key={p.id}>
              <img src={p.imagen} alt={p.nombre} />
              <div className="admin-row-info">
                <h3>{p.nombre} {p.oferta && <span className="category-tag tag-offer">OFERTA</span>}</h3>
                <p className="muted">{p.categoria} · Stock: {p.stock}</p>
              </div>
              <strong className="price">{formatoPrecio(p.precio)}</strong>
              <div className="admin-actions">
                {confirmarId === p.id ? (
                  <>
                    <span className="muted">¿Eliminar?</span>
                    <button className="button button-small button-danger" onClick={() => handleEliminar(p.id)} disabled={eliminandoId === p.id}>
                      {eliminandoId === p.id ? "Eliminando..." : "Sí"}
                    </button>
                    <button className="button button-small button-outline" onClick={() => setConfirmarId(null)}>No</button>
                  </>
                ) : (
                  <>
                    <Link className="button button-small" to={`/admin/productos/editar/${p.id}`}>Editar</Link>
                    <button className="button button-small button-danger" onClick={() => setConfirmarId(p.id)}>Eliminar</button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
