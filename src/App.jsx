import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RutaProtegida from "./components/RutaProtegida";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Nosotros from "./pages/Nosotros";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import GestionProductos from "./pages/admin/GestionProductos";
import EditarProducto from "./pages/admin/EditarProducto";
import GestionCupones from "./pages/admin/GestionCupones";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Requiere usuario logueado */}
        <Route element={<RutaProtegida />}>
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* Requiere usuario administrador */}
        <Route element={<RutaProtegida soloAdmin />}>
          <Route path="/admin/productos" element={<GestionProductos />} />
          <Route path="/admin/productos/nuevo" element={<EditarProducto />} />
          <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
          <Route path="/admin/cupones" element={<GestionCupones />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
