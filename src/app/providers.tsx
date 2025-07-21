import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth.store";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
