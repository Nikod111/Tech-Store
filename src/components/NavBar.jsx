import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CartWidget from "./CartWidget";

export default function NavBar() {
  const { usuario, esAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);
  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;
  const cerrar = () => setAbierto(false);

  const handleLogout = async () => {
    await logout();
    cerrar();
    navigate("/");
  };

  return (
    <nav className="nav-bar" aria-label="Navegación principal">
      <button
        className="menu-toggle"
        aria-expanded={abierto}
        aria-controls="menu-principal"
        onClick={() => setAbierto(!abierto)}
      >
        ☰ Menú
      </button>
      <div id="menu-principal" className={`nav-links${abierto ? " open" : ""}`} onClick={cerrar}>
        <NavLink className={linkClass} to="/" end>Inicio</NavLink>
        <NavLink className={linkClass} to="/productos">Productos</NavLink>
        <NavLink className={linkClass} to="/nosotros">Nosotros</NavLink>
        {esAdmin && (
          <>
            <NavLink className={linkClass} to="/admin/productos">Gestión Productos</NavLink>
            <NavLink className={linkClass} to="/admin/cupones">Cupones</NavLink>
          </>
        )}
        {usuario ? (
          <>
            <NavLink className={linkClass} to="/perfil">Perfil</NavLink>
            <button className="nav-link nav-button" onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <NavLink className={linkClass} to="/login">Ingresar</NavLink>
        )}
      </div>
      <CartWidget />
    </nav>
  );
}
