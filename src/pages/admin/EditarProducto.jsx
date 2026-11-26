import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormularioProducto from "../../components/FormularioProducto";
import Loader from "../../components/Loader";
import { actualizarProducto, crearProducto, obtenerProducto } from "../../services/productos";

// Sirve para Agregar (sin id) y para Editar (/admin/productos/editar/:id).
export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(esEdicion);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!esEdicion) return;
    obtenerProducto(id)
      .then(({ id: _id, ...datos }) => setProducto(datos))
      .catch(() => setError("No se pudo cargar el producto a editar."))
      .finally(() => setCargando(false));
  }, [id, esEdicion]);

  const guardar = async (datos) => {
    if (esEdicion) await actualizarProducto(id, datos);
    else await crearProducto(datos);
    navigate("/admin/productos");
  };

  return (
    <section className="form-page">
      <Link className="back-link" to="/admin/productos">← Volver a la lista</Link>
      <p className="eyebrow">PANEL DE GESTIÓN</p>
      <h2>{esEdicion ? "Editar producto" : "Agregar producto"}</h2>
      {cargando && <Loader texto="Cargando producto..." />}
      {error && <p className="alert alert-error" role="alert">{error}</p>}
      {!cargando && !error && (
        <FormularioProducto
          key={id || "nuevo"}
          inicial={producto || undefined}
          onGuardar={guardar}
          textoBoton={esEdicion ? "Guardar cambios" : "Crear producto"}
        />
      )}
    </section>
  );
}
