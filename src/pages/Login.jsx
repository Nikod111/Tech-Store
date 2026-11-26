import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { traducirErrorAuth, useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.desde || "/perfil";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (usuario) return <Navigate to={destino} replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setError("Completá email y contraseña.");
      return;
    }
    setEnviando(true);
    setError("");
    try {
      await login(form.email.trim(), form.password);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(traducirErrorAuth(err));
      setEnviando(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <p className="eyebrow">BIENVENIDO</p>
        <h2>Iniciar sesión</h2>
        {error && <p className="alert alert-error" role="alert">{error}</p>}
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={handleChange} />
        </div>
        <button className="button button-full" type="submit" disabled={enviando}>
          {enviando ? "Ingresando..." : "Ingresar"}
        </button>
        <p className="muted form-footer">¿No tenés cuenta? <Link to="/registro">Registrate</Link></p>
      </form>
    </section>
  );
}
