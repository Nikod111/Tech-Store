import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, ADMIN_EMAILS } from "../firebase/config";

const AuthContext = createContext(null);

const MENSAJES_ERROR = {
  "auth/invalid-credential": "Email o contraseña incorrectos.",
  "auth/invalid-email": "El email no es válido.",
  "auth/user-not-found": "No existe un usuario con ese email.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/email-already-in-use": "Ya existe una cuenta con ese email.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/too-many-requests": "Demasiados intentos. Probá de nuevo en unos minutos.",
  "auth/network-request-failed": "Error de conexión. Revisá tu internet.",
  "auth/operation-not-allowed": "El login con email no está habilitado en Firebase.",
  "app/email-reservado": "Ese email está reservado. Usá otro email para crear tu cuenta.",
  "auth/configuration-not-found": "Firebase Authentication no está activado en el proyecto (consola → Authentication → Comenzar).",
};

export const traducirErrorAuth = (error) =>
  MENSAJES_ERROR[error?.code] || "Ocurrió un error. Intentá nuevamente.";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargandoAuth(false);
    });
    return desuscribir;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // El registro público solo crea usuarios normales (clientes).
  // Los emails de administrador están reservados y se crean desde la consola de Firebase.
  const registrar = async (nombre, email, password) => {
    if (ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
      const error = new Error("Email reservado");
      error.code = "app/email-reservado";
      throw error;
    }
    const credencial = await createUserWithEmailAndPassword(auth, email, password);
    if (nombre) {
      await updateProfile(credencial.user, { displayName: nombre });
      setUsuario({ ...credencial.user, displayName: nombre });
    }
    return credencial;
  };

  const logout = () => signOut(auth);

  const esAdmin = Boolean(usuario && ADMIN_EMAILS.includes(usuario.email?.toLowerCase()));

  return (
    <AuthContext.Provider value={{ usuario, cargandoAuth, esAdmin, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  return context;
}
