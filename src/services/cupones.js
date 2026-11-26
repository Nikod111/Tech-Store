import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const cuponesRef = collection(db, "cupones");

export async function obtenerCupones() {
  const snapshot = await getDocs(cuponesRef);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => a.codigo.localeCompare(b.codigo));
}

export async function buscarCupon(codigo) {
  const snapshot = await getDocs(query(cuponesRef, where("codigo", "==", codigo.trim().toUpperCase())));
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() };
}

export const crearCupon = (cupon) => addDoc(cuponesRef, cupon);

export const eliminarCupon = (id) => deleteDoc(doc(db, "cupones", id));
