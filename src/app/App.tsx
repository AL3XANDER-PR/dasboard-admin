import { useAuthStore } from "@/store/auth.store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";

export const App = () => {
  const loading = useAuthStore((s) => s.loading);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-muted-foreground text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
            <p className="text-muted-foreground text-sm">Cargando vista...</p>
          </div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};
