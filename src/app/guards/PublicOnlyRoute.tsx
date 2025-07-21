import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const PublicOnlyRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) return null;

  return user ? <Navigate to="/" replace /> : <Outlet />;
};
