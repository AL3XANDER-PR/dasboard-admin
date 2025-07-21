import { useAuthStore } from "@/store/auth.store";
import { Outlet, useNavigate } from "react-router-dom";

export const MainLayout = () => {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // redirige tras logout
  };

  return (
    <div>
      <header className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-xl font-bold">Mi App</h1>
        <button onClick={handleLogout} className="hover:underline text-sm">
          Cerrar sesión
        </button>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};
