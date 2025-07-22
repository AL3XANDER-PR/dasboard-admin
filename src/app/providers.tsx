import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth.store";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const setRecoveryMode = useAuthStore((s) => s.setRecoveryMode);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);

        if (event === "PASSWORD_RECOVERY") {
          console.log("Sesión de recuperación detectada");
          setRecoveryMode(true);
        } else {
          setRecoveryMode(false); // 🔑 Importante: desactivar si no es recuperación
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
