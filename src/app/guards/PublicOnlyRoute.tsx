import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const PublicOnlyRoute = () => {
  const { user, loading, recoveryMode } = useAuthStore();

  if (loading) return null;

  // 🛡️ Si hay sesión y NO está en recovery, redirigir al home
  if (user && !recoveryMode) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
