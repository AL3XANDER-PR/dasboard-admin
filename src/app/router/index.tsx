// src/app/router/index.tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { AuthLayout } from "../layout/AuthLayout";
import { MainLayout } from "../layout/MainLayout";

import { PublicOnlyRoute } from "../guards/PublicOnlyRoute";
import { ProtectedRoute } from "../guards/ProtectedRoute";
import { NotFoundRouter } from "@/shared/pages/NotFoundRouter";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/modules/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/modules/auth/pages/RegisterPage"));
const DashboardPage = lazy(
  () => import("@/modules/dashboard/pages/DashboardPage")
);
const ForgotPassword = lazy(
  () => import("@/modules/auth/pages/ForgotPassword")
);
const UpdatePassword = lazy(
  () => import("@/modules/auth/pages/UpdatePassword")
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Público solo si NO está autenticado */}
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Route>

      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          {/* <Route path="/update-password" element={<UpdatePassword />} /> */}
        </Route>
      </Route>

      {/* RUTA INDEPENDIENTE: /reset-password CON AuthLayout pero SIN guard */}
      <Route element={<AuthLayout />}>
        <Route path="/update-password" element={<UpdatePassword />} />
      </Route>

      {/* ✅ Solo un punto central para el 404 */}
      <Route path="*" element={<NotFoundRouter />} />
    </>
  )
);
