// src/shared/pages/NotFoundRouter.tsx
import { useAuthStore } from "@/store/auth.store";
import { NotFoundPublic } from "./NotFoundPublic";
import { NotFoundPrivate } from "./NotFoundPrivate";

export const NotFoundRouter = () => {
  const { user, loading } = useAuthStore();

  if (loading) return null; // o un pequeño loader si prefieres

  return user ? <NotFoundPrivate /> : <NotFoundPublic />;
};
