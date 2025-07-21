import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { type User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  fetchUser: async () => {
    const { data } = await supabase.auth.getUser();
    set({ user: data?.user ?? null, loading: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
