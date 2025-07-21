// src/app/router/index.tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { AuthLayout } from "../layout/AuthLayout";
import { MainLayout } from "../layout/MainLayout";

import { RegisterPage } from "@/modules/auth/pages/RegisterPage";
import { DashboardPage } from "@/modules/dashboard/pages/DashboardPage";
import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { PublicOnlyRoute } from "../guards/PublicOnlyRoute";
import { ProtectedRoute } from "../guards/ProtectedRoute";
import { NotFoundRouter } from "@/shared/pages/NotFoundRouter";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Público solo si NO está autenticado */}
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Route>

      {/* ✅ Solo un punto central para el 404 */}
      <Route path="*" element={<NotFoundRouter />} />
    </>
  )
);
