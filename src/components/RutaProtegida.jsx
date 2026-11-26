import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export default function RutaProtegida({ soloAdmin = false }) {
  const { usuario, esAdmin, cargandoAuth } = useAuth();
  const location = useLocation();

  if (cargandoAuth) return <Loader texto="Verificando sesión..." />;
  if (!usuario) return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  if (soloAdmin && !esAdmin) {
    return (
      <section className="empty-state">
        <p className="eyebrow">ACCESO RESTRINGIDO</p>
        <h2>No tenés permisos</h2>
        <p>Esta sección es solo para administradores de la tienda.</p>
      </section>
    );
  }
  return <Outlet />;
}
