import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <section>
          <h2>Tech Store</h2>
          <p>Somos una tienda dedicada a acercarte productos tecnológicos para estudiar, trabajar y disfrutar.</p>
        </section>
        <section>
          <h3>Navegación</h3>
          <ul className="footer-links">
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
          </ul>
          <p className="footer-contact">Contacto: hola@techstore.example</p>
        </section>
      </div>
      <div className="footer-bottom">© 2026 Tech Store · Todos los derechos reservados.</div>
    </footer>
  );
}
