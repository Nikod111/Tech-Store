import { useState } from "react";

const VACIO = { nombre: "", precio: "", stock: "", categoria: "", descripcion: "", imagen: "", oferta: false };

function validar(datos) {
  const errores = {};
  if (!datos.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  else if (datos.nombre.trim().length < 3) errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  if (datos.precio === "" || Number(datos.precio) <= 0) errores.precio = "El precio debe ser mayor a 0.";
  if (datos.stock === "" || !Number.isInteger(Number(datos.stock)) || Number(datos.stock) < 0)
    errores.stock = "El stock debe ser un número entero mayor o igual a 0.";
  if (!datos.categoria.trim()) errores.categoria = "La categoría es obligatoria.";
  if (datos.descripcion.trim().length < 10) errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  if (!datos.imagen.trim()) errores.imagen = "La URL de la imagen es obligatoria.";
  else if (!/^(https?:\/\/|\/|\.\.?\/)/.test(datos.imagen.trim()))
    errores.imagen = "Usá una URL (http://...) o una ruta local (/images/... o ../images/...).";
  return errores;
}

export default function FormularioProducto({ inicial, onGuardar, textoBoton = "Guardar producto" }) {
  const [datos, setDatos] = useState({ ...VACIO, ...inicial });
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    setErrorEnvio("");
    try {
      await onGuardar({
        nombre: datos.nombre.trim(),
        precio: Number(datos.precio),
        stock: Number(datos.stock),
        categoria: datos.categoria.trim(),
        descripcion: datos.descripcion.trim(),
        imagen: datos.imagen.trim(),
        oferta: Boolean(datos.oferta),
      });
    } catch {
      setErrorEnvio("No se pudo guardar el producto. Revisá tu conexión o tus permisos.");
      setEnviando(false);
    }
  };

  const campo = (name, label, props = {}) => (
    <div className={`form-field${errores[name] ? " has-error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={datos[name]} onChange={handleChange} aria-invalid={!!errores[name]} {...props} />
      {errores[name] && <span className="field-error">{errores[name]}</span>}
    </div>
  );

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {errorEnvio && <p className="alert alert-error" role="alert">{errorEnvio}</p>}
      {campo("nombre", "Nombre *")}
      <div className="form-row">
        {campo("precio", "Precio (ARS) *", { type: "number", min: "1", step: "any" })}
        {campo("stock", "Stock *", { type: "number", min: "0", step: "1" })}
      </div>
      {campo("categoria", "Categoría *", { placeholder: "Audio, Periféricos, Monitores..." })}
      <div className={`form-field${errores.descripcion ? " has-error" : ""}`}>
        <label htmlFor="descripcion">Descripción *</label>
        <textarea id="descripcion" name="descripcion" rows="3" value={datos.descripcion} onChange={handleChange} aria-invalid={!!errores.descripcion} />
        {errores.descripcion && <span className="field-error">{errores.descripcion}</span>}
      </div>
      {campo("imagen", "URL de la imagen *", { placeholder: "https://.../imagen.webp" })}
      {datos.imagen && !errores.imagen && (
        <img className="image-preview" src={datos.imagen} alt="Vista previa" onError={(e) => { e.currentTarget.style.display = "none"; }} onLoad={(e) => { e.currentTarget.style.display = "block"; }} />
      )}
      <label className="checkbox-field">
        <input type="checkbox" name="oferta" checked={datos.oferta} onChange={handleChange} />
        Producto en oferta (se muestra en Inicio)
      </label>
      <button className="button" type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : textoBoton}
      </button>
    </form>
  );
}
