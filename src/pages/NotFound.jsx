import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="empty-state">
      <p className="eyebrow">ERROR 404</p>
      <h2>Página no encontrada</h2>
      <p>La dirección que buscás no existe.</p>
      <Link className="button" to="/">Volver al inicio</Link>
    </section>
  );
}