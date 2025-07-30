// src/app/router/index.ts
import type { DBRoute } from "./types";

export const publicRoutes: DBRoute[] = [
  {
    id: "login",
    path: "/login",
    component: "LoginPage",
    layout: "AuthLayout",
    guard: "public",
  },
  {
    id: "register",
    path: "/register",
    component: "RegisterPage",
    layout: "AuthLayout",
    guard: "public",
  },
  {
    id: "forgot-password",
    path: "/forgot-password",
    component: "ForgotPassword",
    layout: "AuthLayout",
    guard: "public",
  },
];
