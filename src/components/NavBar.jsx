import { NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

export default function NavBar() {
  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <nav className="nav-bar" aria-label="Navegación principal">
      <NavLink className={linkClass} to="/">Inicio</NavLink>
      <NavLink className={linkClass} to="/productos">Productos</NavLink>
      <CartWidget />
    </nav>
  );
}