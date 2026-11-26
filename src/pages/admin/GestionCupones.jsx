import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { crearCupon, eliminarCupon, obtenerCupones } from "../../services/cupones";

export default function GestionCupones() {
  const [cupones, setCupones] = useState([]);
  const [form, setForm] = useState({ codigo: "", descuento: "" });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [errorForm, setErrorForm] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    obtenerCupones()
      .then(setCupones)
      .catch(() => setError("No se pudieron cargar los cupones."))
      .finally(() => setCargando(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codigo = form.codigo.trim().toUpperCase();
    const descuento = Number(form.descuento);
    setAviso("");

    if (!/^[A-Z0-9]{4,20}$/.test(codigo)) return setErrorForm("El código debe tener entre 4 y 20 letras o números, sin espacios.");
    if (!Number.isInteger(descuento) || descuento < 1 || descuento > 90) return setErrorForm("El descuento debe ser un entero entre 1 y 90.");
    if (cupones.some((c) => c.codigo === codigo)) return setErrorForm("Ya existe un cupón con ese código.");

    setErrorForm("");
    setGuardando(true);
    try {
      const ref = await crearCupon({ codigo, descuento });
      setCupones((prev) => [...prev, { id: ref.id, codigo, descuento }].sort((a, b) => a.codigo.localeCompare(b.codigo)));
      setForm({ codigo: "", descuento: "" });
      setAviso(`Cupón ${codigo} creado.`);
    } catch {
      setErrorForm("No se pudo crear el cupón. Revisá tus permisos o tu conexión.");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (cupon) => {
    setError("");
    setAviso("");
    try {
      await eliminarCupon(cupon.id);
      setCupones((prev) => prev.filter((c) => c.id !== cupon.id));
      setAviso(`Cupón ${cupon.codigo} eliminado.`);
    } catch {
      setError("No se pudo eliminar el cupón.");
    }
  };

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">PANEL DE GESTIÓN</p>
          <h2>Cupones de descuento</h2>
        </div>
      </div>

      <div className="coupons-layout">
        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <h3>Nuevo cupón</h3>
          {errorForm && <p className="alert alert-error" role="alert">{errorForm}</p>}
          <div className="form-field">
            <label htmlFor="codigo">Código</label>
            <input id="codigo" value={form.codigo} placeholder="VERANO15" onChange={(e) => setForm({ ...form, codigo: e.target.value })} />
          </div>
          <div className="form-field">
            <label htmlFor="descuento">Descuento (%)</label>
            <input id="descuento" type="number" min="1" max="90" value={form.descuento} onChange={(e) => setForm({ ...form, descuento: e.target.value })} />
          </div>
          <button className="button" type="submit" disabled={guardando}>{guardando ? "Creando..." : "Crear cupón"}</button>
        </form>

        <div className="coupons-list">
          {aviso && <p className="alert alert-success" role="status">{aviso}</p>}
          {error && <p className="alert alert-error" role="alert">{error}</p>}
          {cargando && <Loader texto="Cargando cupones..." />}
          {!cargando && cupones.length === 0 && !error && <p className="status-message">No hay cupones creados.</p>}
          {cupones.map((c) => (
            <article className="coupon-card" key={c.id}>
              <div>
                <strong className="coupon-code">{c.codigo}</strong>
                <p className="muted">{c.descuento}% de descuento</p>
              </div>
              <button className="button button-small button-danger" onClick={() => handleEliminar(c)}>Eliminar</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
