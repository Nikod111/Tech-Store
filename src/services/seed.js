// Datos de ejemplo para cargar Firestore por primera vez desde el panel de gestión.
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const productos = [
  { nombre: "Auriculares Gamer", precio: 45000, stock: 12, oferta: true, categoria: "Audio",
    descripcion: "Auriculares con sonido envolvente y micrófono integrado.",
    imagen: "https://images.bidcom.com.ar/resize?src=https://static.bidcom.com.ar/publicacionesML/productos/ABLUE104/1000x1000-ABLUE104.jpg&w=400&q=100" },
  { nombre: "Teclado Mecánico", precio: 65000, stock: 8, oferta: false, categoria: "Periféricos",
    descripcion: "Teclado mecánico retroiluminado para jugar y trabajar.",
    imagen: "https://acdn-us.mitiendanube.com/stores/001/593/734/products/ganon-80-ia-01-9963b20821425b445c17803251220817-1024-1024.webp" },
  { nombre: "Mouse Gamer", precio: 28000, stock: 20, oferta: true, categoria: "Periféricos",
    descripcion: "Mouse óptico de alta precisión con diseño ergonómico.",
    imagen: "https://arrichetta.com.ar/wp-content/uploads/2025/06/Razer-Cobra-Pro-Lightweight-Wireless-PC-Gaming-Mouse-with-Razer-Chroma-RGB-Customizable-Controls-77g-Black_d00c5c3d-f3fc-48a6-b1d8-49b223778807.c72c5b3a425efcf1940f833032f8b274-800x800.jpeg" },
  { nombre: "Monitor Full HD", precio: 185000, stock: 5, oferta: false, categoria: "Monitores",
    descripcion: "Monitor Full HD ideal para estudio, trabajo y entretenimiento.",
    imagen: "https://img.inovamusicnet.com/p/cmo9bhsrs142q04kynn29502x/50ca8f78813f4bc2/640" },
];

const equipo = [
  { orden: 1, nombre: "Nicolás Domínguez", rol: "Desarrollo web", descripcion: "Arma la tienda y la conecta con Firebase." },
  { orden: 2, nombre: "Iván García", rol: "Diseño y experiencia de usuario", descripcion: "Cuida que comprar sea simple y agradable." },
  { orden: 3, nombre: "Florencia López", rol: "Contenido y comunicación", descripcion: "Escribe cada descripción y atiende consultas." },
];

const cupones = [
  { codigo: "BIENVENIDA10", descuento: 10 },
  { codigo: "TECH20", descuento: 20 },
];

async function cargarSiVacia(nombre, datos) {
  const ref = collection(db, nombre);
  const snapshot = await getDocs(ref);
  if (!snapshot.empty) return 0;
  await Promise.all(datos.map((item) => addDoc(ref, item)));
  return datos.length;
}

export async function cargarDatosDeEjemplo() {
  const [p, e, c] = await Promise.all([
    cargarSiVacia("productos", productos),
    cargarSiVacia("equipo", equipo),
    cargarSiVacia("cupones", cupones),
  ]);
  return { productos: p, equipo: e, cupones: c };
}
