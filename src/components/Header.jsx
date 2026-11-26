import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <p className="eyebrow">TECNOLOGÍA PARA VOS</p>
          <h1>Tech Store</h1>
          <p className="header-subtitle">Tu tecnología, en un solo lugar.</p>
        </Link>
        <NavBar />
      </div>
    </header>
  );
}
