# Tech Store — Proyecto Final React + Vite + Firebase

Tienda de tecnología hecha con **React 19**, **Vite**, **React Router** y **Firebase** (Firestore + Authentication).

## Funcionalidades

- **Inicio**: muestra los *Productos en oferta* (`ItemListContainer` filtra por `oferta == true`).
- **Productos**: muestra todo el catálogo desde Firestore.
- **Detalle de producto** (`/producto/:id`) con stock disponible.
- **Carrito** (`CartContext` con Context API): agregar desde la card o el detalle (respeta el stock), eliminar productos, vaciar el carrito y aplicar un cupón de descuento.
- **Nosotros**: lee el equipo desde la colección `equipo` de Firestore.
- **Autenticación** (`AuthContext` + Firebase Auth): registro, login, logout y perfil.
- **Rutas protegidas**:
  - `/perfil` → requiere usuario logueado.
  - `/admin/productos` y `/admin/cupones` → solo el usuario administrador.
- **Gestión de productos (CRUD)**: lista con botones *Editar* y *Eliminar*, formulario para *Agregar* y *Editar* con validaciones (nombre obligatorio, precio > 0, stock entero ≥ 0, descripción mínima, URL de imagen válida).
- **Gestión de cupones**: crear y eliminar cupones (código + % de descuento).
- **Estados de carga y error**: spinner mientras se consulta Firestore y mensajes de error si falla la comunicación.
- **Diseño responsive** con `display: flex` y `flex-wrap: wrap`, menú desplegable en mobile.

## Usuario administrador

| Email | Contraseña |
|---|---|
| `admin@techstore.com` | `Admin123` |

El rol admin se define por email en `src/firebase/config.js` (`ADMIN_EMAILS`). Los usuarios que se registran desde `/registro` son siempre clientes: pueden comprar y ver su perfil, pero no acceden a la gestión.

## Requisitos

- Node.js 20 o superior (LTS recomendado)
- npm

## Instalación y ejecución local

```bash
git clone https://github.com/Nikod111/Tech-Store.git
cd Tech-Store
npm install
npm run dev
```

Abrí la URL que muestra Vite (por defecto `http://localhost:5173`).

### Otros comandos

```bash
npm run build     # genera la versión de producción en /dist
npm run preview   # sirve localmente la carpeta /dist
```

## Configuración de Firebase (solo la primera vez)

La configuración del proyecto ya está en `src/firebase/config.js`. En la [consola de Firebase](https://console.firebase.google.com/) del proyecto `mi-tienda-ca519`:

1. **Authentication → Sign-in method** → habilitar **Correo electrónico/contraseña**.
2. **Authentication → Users → Agregar usuario** → `admin@techstore.com` / `Admin123`. El admin se crea **solo desde la consola**: el formulario de `/registro` crea únicamente usuarios normales (clientes) y rechaza los emails de administrador.
3. **Firestore Database** → crear la base y pegar las reglas de `firestore.rules` en la pestaña **Reglas**.
4. Ingresar como admin, ir a **Gestión Productos** y presionar **Cargar datos de ejemplo** (crea productos, equipo y cupones de prueba si las colecciones están vacías).

## Estructura de datos (Firestore)

```
productos/{id}  nombre, precio, stock, categoria, descripcion, imagen (URL), oferta (bool)
cupones/{id}    codigo, descuento (%)
equipo/{id}     nombre, rol, descripcion, orden, imagen (opcional)
```

## Estructura del proyecto

```
src/
├── components/   Header, NavBar, CartWidget, Footer, Layout, Item, ItemListContainer,
│                 FormularioProducto, Loader, RutaProtegida
├── context/      AuthContext, CartContext
├── firebase/     config.js (inicialización de Firebase)
├── pages/        Home, Productos, ProductoDetalle, Carrito, Nosotros, Login, Registro, Perfil, NotFound
│   └── admin/    GestionProductos, EditarProducto, GestionCupones
├── services/     productos, cupones, equipo, seed (acceso a Firestore)
└── utils/        formato.js
```

## Compatibilidad

Probado en Chrome, Firefox, Edge y Safari (desktop y mobile).
