import { useState } from "react";

function FormularioProducto() {
  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Información enviada:", {
      ...producto,
      id: Number(producto.id),
      precio: Number(producto.precio),
      stock: Number(producto.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Alta de nuevo producto</h2>

      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="number"
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
          type="text"
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
          type="number"
          id="precio"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="imagen">URL de imagen:</label>
        <input
          type="url"
          id="imagen"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          required
        />
      </div>

      <button type="submit">Enviar producto</button>
    </form>
  );
}

export default FormularioProducto;