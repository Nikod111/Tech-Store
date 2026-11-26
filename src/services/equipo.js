import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export async function obtenerEquipo() {
  const snapshot = await getDocs(collection(db, "equipo"));
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
}
