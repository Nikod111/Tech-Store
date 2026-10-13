
import { useState } from "react";

const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function FormularioProducto() {
  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    precio: "",
    stock: "",
  });

  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imagen) {
      alert("Seleccioná una imagen.");
      return;
    }

    if (!API_KEY) {
      alert("Falta configurar la API Key de ImgBB.");
      return;
    }

    setCargando(true);

    try {
      console.log("Subiendo imagen a Imgbb...");

      const formData = new FormData();
      formData.append("image", imagen);

      const respuesta = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.success) {
        throw new Error(
          resultado.error?.message || "No se pudo subir la imagen."
        );
      }

      const urlImagen = resultado.data.url;

      console.log("Imagen subida con éxito.");
      console.log("URL:", urlImagen);

      const productoCompleto = {
        ...producto,
        urlImagen,
      };

      console.log(
        "Enviando los siguientes datos COMPLETOS a la API:"
      );
      console.log(productoCompleto);
    } catch (error) {
      console.error("Error:", error.message);
      alert("No se pudo completar el envío: " + error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar producto</h2>

      <div>
        <label htmlFor="id">ID:</label>
        <input
          id="id"
          name="id"
          value={producto.id}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="precio">Precio:</label>
        <input
          id="precio"
          name="precio"
          type="number"
          min="0"
          step="any"
          value={producto.precio}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="stock">Stock:</label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          step="1"
          value={producto.stock}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="imagen">Imagen del producto:</label>
        <input
          id="imagen"
          name="imagen"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImagen(e.target.files?.[0] ?? null)
          }
          required
        />
      </div>

      <button type="submit" disabled={cargando}>
        {cargando ? "Subiendo imagen..." : "Crear producto"}
      </button>
    </form>
  );
}
