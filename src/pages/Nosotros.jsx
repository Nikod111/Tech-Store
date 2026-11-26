import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { obtenerEquipo } from "../services/equipo";

export default function Nosotros() {
  const [equipo, setEquipo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;
    obtenerEquipo()
      .then((datos) => { if (activo) setEquipo(datos); })
      .catch(() => { if (activo) setError("No se pudo cargar el equipo. Intentá nuevamente más tarde."); })
      .finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, []);

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">QUIÉNES SOMOS</p>
          <h2>Nuestro equipo</h2>
        </div>
      </div>
      <p className="intro-text">
        Somos un equipo chico y apasionado por la tecnología. Elegimos cada producto pensando en cómo trabajás, estudiás y jugás.
      </p>
      {cargando && <Loader texto="Cargando equipo..." />}
      {error && <p className="alert alert-error" role="alert">{error}</p>}
      {!cargando && !error && equipo.length === 0 && <p className="status-message">Todavía no hay integrantes cargados.</p>}
      <div className="team-grid">
        {equipo.map((persona) => (
          <article className="team-card" key={persona.id}>
            {persona.imagen
              ? <img className="avatar avatar-img" src={persona.imagen} alt={persona.nombre} />
              : <div className="avatar" aria-hidden="true">{persona.nombre?.charAt(0)}</div>}
            <div>
              <h3>{persona.nombre}</h3>
              <p className="team-role">{persona.rol}</p>
              {persona.descripcion && <p>{persona.descripcion}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
