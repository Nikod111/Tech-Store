import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const productosRef = collection(db, "productos");

const mapear = (snap) => ({ id: snap.id, ...snap.data() });

export async function obtenerProductos({ soloOferta = false } = {}) {
  const consulta = soloOferta ? query(productosRef, where("oferta", "==", true)) : productosRef;
  const snapshot = await getDocs(consulta);
  return snapshot.docs.map(mapear).sort((a, b) => a.nombre.localeCompare(b.nombre));
}

export async function obtenerProducto(id) {
  const snap = await getDoc(doc(db, "productos", id));
  if (!snap.exists()) throw new Error("No encontramos ese producto.");
  return mapear(snap);
}

export const crearProducto = (producto) => addDoc(productosRef, producto);

export const actualizarProducto = (id, producto) => updateDoc(doc(db, "productos", id), producto);

export const eliminarProducto = (id) => deleteDoc(doc(db, "productos", id));
