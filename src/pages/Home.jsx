import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">EQUIPÁ TU ESPACIO</p>
          <h2>Tecnología que te acompaña.</h2>
          <p>Descubrí accesorios y dispositivos pensados para potenciar tus días de trabajo, estudio y juego.</p>
          <Link className="button" to="/productos">Explorar productos <span aria-hidden="true">→</span></Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>
          <div className="hero-device">⌘</div>
          <div className="floating-chip chip-one">GAME</div>
          <div className="floating-chip chip-two">WORK</div>
        </div>
      </section>
      <section className="benefits">
        <article><span>✦</span><div><h3>Productos seleccionados</h3><p>Opciones para cada necesidad.</p></div></article>
        <article><span>✓</span><div><h3>Compra simple</h3><p>Encontrá lo que buscás fácilmente.</p></div></article>
        <article><span>♡</span><div><h3>Atención cercana</h3><p>Estamos para ayudarte.</p></div></article>
      </section>
      <section className="home-cta">
        <div><p className="eyebrow">¿LISTO PARA EMPEZAR?</p><h2>Tu próximo favorito te espera.</h2></div>
        <Link className="button button-light" to="/productos">Ver catálogo</Link>
      </section>
    </div>
  );
}