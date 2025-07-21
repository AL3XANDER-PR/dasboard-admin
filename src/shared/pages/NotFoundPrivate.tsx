import { Link } from "react-router-dom";

export const NotFoundPrivate = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-6">
        No pudimos encontrar esta ruta en la app.
      </p>
      <Link to="/" className="text-blue-600 font-medium hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
};
