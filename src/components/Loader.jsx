export default function Loader({ texto = "Cargando..." }) {
  return (
    <div className="loader" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <p>{texto}</p>
    </div>
  );
}
