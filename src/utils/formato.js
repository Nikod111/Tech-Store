export const formatoPrecio = (precio) =>
  Number(precio).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
