const equipo = [
  { nombre: "Nicolás Domínguez", rol: "Desarrollo web" },
  { nombre: "Iván García", rol: "Diseño y experiencia de usuario" },
  { nombre: "Florencia López", rol: "Contenido y comunicación" }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <section>
          <h2>Tech Store</h2>
          <p>Somos una tienda dedicada a acercarte productos tecnológicos para estudiar, trabajar y disfrutar.</p>
          <p className="footer-contact">Contacto: hola@techstore.example</p>
        </section>
        <section>
          <h3>Nuestro equipo</h3>
          <div className="team-grid">
            {equipo.map((persona) => (
              <article className="team-card" key={persona.nombre}>
                <div className="avatar" aria-hidden="true">{persona.nombre.charAt(0)}</div>
                <div>
                  <h4>{persona.nombre}</h4>
                  <p>{persona.rol}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <div className="footer-bottom">© 2026 Tech Store · Todos los derechos reservados.</div>
    </footer>
  );
}