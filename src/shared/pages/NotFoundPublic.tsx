import { Link } from "react-router-dom";

export const NotFoundPublic = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Ups... esta página no existe.</p>
      <Link to="/login" className="text-blue-600 font-medium hover:underline">
        Ir al inicio de sesión
      </Link>
    </div>
  );
};
