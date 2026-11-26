import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Perfil() {
  const { usuario, esAdmin, logout } = useAuth();
  const { totalCantidad } = useCart();

  return (
    <section className="profile-card">
      <div className="avatar avatar-lg" aria-hidden="true">
        {(usuario.displayName || usuario.email).charAt(0).toUpperCase()}
      </div>
      <p className="eyebrow">MI CUENTA</p>
      <h2>Hola, {usuario.displayName || "usuario"}</h2>
      <p className="muted">{usuario.email}</p>
      <p>Rol: <strong>{esAdmin ? "Administrador" : "Cliente"}</strong></p>
      <p>Tenés {totalCantidad} {totalCantidad === 1 ? "producto" : "productos"} en el carrito.</p>
      <div className="profile-actions">
        {esAdmin && <Link className="button" to="/admin/productos">Gestión de productos</Link>}
        {esAdmin && <Link className="button" to="/admin/cupones">Gestión de cupones</Link>}
        <button className="button button-outline" onClick={logout}>Cerrar sesión</button>
      </div>
    </section>
  );
}
