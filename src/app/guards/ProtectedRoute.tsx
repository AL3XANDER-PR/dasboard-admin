import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
