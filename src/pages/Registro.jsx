import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { traducirErrorAuth, useAuth } from "../context/AuthContext";
import { ADMIN_EMAILS } from "../firebase/config";

export default function Registro() {
  const { registrar, usuario } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirmar: "" });
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (usuario && !enviando) return <Navigate to="/perfil" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return setError("El nombre es obligatorio.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Ingresá un email válido.");
    if (ADMIN_EMAILS.includes(form.email.trim().toLowerCase()))
      return setError("Ese email está reservado. Usá otro email para crear tu cuenta.");
    if (form.password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (form.password !== form.confirmar) return setError("Las contraseñas no coinciden.");

    setEnviando(true);
    setError("");
    try {
      await registrar(form.nombre.trim(), form.email.trim(), form.password);
      navigate("/perfil", { replace: true });
    } catch (err) {
      setError(traducirErrorAuth(err));
      setEnviando(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <p className="eyebrow">NUEVA CUENTA</p>
        <h2>Registrarse</h2>
        <p className="muted">Creá tu cuenta de cliente para comprar y ver tu perfil.</p>
        {error && <p className="alert alert-error" role="alert">{error}</p>}
        <div className="form-field">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" autoComplete="name" value={form.nombre} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="confirmar">Repetir contraseña</label>
          <input id="confirmar" name="confirmar" type="password" autoComplete="new-password" value={form.confirmar} onChange={handleChange} />
        </div>
        <button className="button button-full" type="submit" disabled={enviando}>
          {enviando ? "Creando cuenta..." : "Crear cuenta"}
        </button>
        <p className="muted form-footer">¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
      </form>
    </section>
  );
}
