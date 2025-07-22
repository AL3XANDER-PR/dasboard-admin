import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { type User } from "@supabase/supabase-js";

import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  loading: boolean;
  recoveryMode: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setRecoveryMode: (value: boolean) => void;
}

const store = persist<AuthState>(
  (set) => ({
    user: null,
    loading: true,
    recoveryMode: false,

    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setRecoveryMode: (value: boolean) => set({ recoveryMode: value }),

    fetchUser: async () => {
      const { data } = await supabase.auth.getUser();
      set({ user: data?.user ?? null, loading: false });
    },

    logout: async () => {
      await supabase.auth.signOut();
      set({ user: null, recoveryMode: false });
      await (useAuthStore as any).persist?.clearStorage?.();
    },
  }),
  {
    name: "auth-storage",
    partialize: (state) => ({
      recoveryMode: state.recoveryMode,
      onRehydrateStorage: () => async (state) => {
        // Esperar a que Supabase emita el evento correcto
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event) => {
            if (event === "PASSWORD_RECOVERY") {
              state?.setRecoveryMode(true);
            }
          }
        );

        state?.setState({ rehydrated: true });

        return () => {
          authListener.subscription.unsubscribe();
        };
      },
    }),
  }
);

export const useAuthStore = create(devtools(store));
