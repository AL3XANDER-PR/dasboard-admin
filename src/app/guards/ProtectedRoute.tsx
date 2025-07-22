import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { DashboardProvider } from "@/components/dashboard-provider";

const PUBLIC_ROUTES = ["/login", "/register", "/update-password"]; // ajusta según tus rutas públicas

export const ProtectedRoute = () => {
  const { user, loading, recoveryMode } = useAuthStore();
  const location = useLocation();

  const currentPath = location.pathname;
  const isPublic = PUBLIC_ROUTES.includes(currentPath);

  if (loading) return null;

  if (!user && !isPublic) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && recoveryMode && !isPublic) {
    return <Navigate to="/login" replace />;
  }
  return (
    <DashboardProvider>
      <Outlet />
    </DashboardProvider>
  );
};
