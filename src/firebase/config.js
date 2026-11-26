import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArAaEjNdyJCG1sj-Er4oSQNz-28Fe0TYs",
  authDomain: "mi-tienda-ca519.firebaseapp.com",
  projectId: "mi-tienda-ca519",
  storageBucket: "mi-tienda-ca519.firebasestorage.app",
  messagingSenderId: "181914327499",
  appId: "1:181914327499:web:75ca5041fdc7418f043e4e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Usuarios con permiso para ver la Gestión de Productos y Cupones.
export const ADMIN_EMAILS = ["admin@techstore.com"];
