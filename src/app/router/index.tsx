import { createBrowserRouter } from "react-router-dom";
import { generateRoutesFromDB } from "./router-builder";
import type { DBRoute } from "./types";

// 🔁 Esto luego será dinámico desde Supabase
const ROUTES_FROM_DB: DBRoute[] = [
  {
    path: "/login",
    component: "LoginPage",
    layout: "AuthLayout",
    guard: "public",
  },
  {
    path: "/register",
    component: "RegisterPage",
    layout: "AuthLayout",
    guard: "public",
  },
  {
    path: "/forgot-password",
    component: "ForgotPassword",
    layout: "AuthLayout",
    guard: "public",
  },
  {
    path: "/",
    component: "DashboardPage",
    layout: "MainLayout",
    guard: "private",
  },
  {
    path: "/update-password",
    component: "UpdatePassword",
    layout: "AuthLayout",
    guard: "none",
  },
];

export const router = createBrowserRouter(generateRoutesFromDB(ROUTES_FROM_DB));
