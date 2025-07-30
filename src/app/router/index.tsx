import { createBrowserRouter } from "react-router-dom";
import { generateRoutesFromDB } from "./router-builder";
import type { DBRoute } from "./types";

// 🔁 Esto luego será dinámico desde Supabase
const ROUTES_FROM_DB: DBRoute[] = [
  {
    id: 1,
    path: "/login",
    component: "LoginPage",
    layout: "AuthLayout",
    guard: "public",
  },
  {
    id: 2,
    path: "/register",
    component: "RegisterPage",
    layout: "AuthLayout",
    guard: "public",
  },
  {
    id: 3,
    path: "/forgot-password",
    component: "ForgotPassword",
    layout: "AuthLayout",
    guard: "public",
  },
  {
    id: 4,
    path: "/dashboard",
    component: "DashboardPage",
    layout: "MainLayout",
    guard: "private",
  },
  {
    id: 5,
    path: "home",
    component: "HomePage",
    layout: "MainLayout",
    guard: "private",
    parentId: 4,
  },
  {
    id: 6,
    path: "home",
    component: "HomePage",
    layout: "MainLayout",
    guard: "private",
    parentId: 4,
    params: ":id",
  },
];

export const router = createBrowserRouter(generateRoutesFromDB(ROUTES_FROM_DB));
