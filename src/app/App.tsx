import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export const App = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return null;
  }

  return <RouterProvider router={router} />;
};
