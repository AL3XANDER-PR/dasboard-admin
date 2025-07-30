import {
  lazy,
  type FC,
  type JSX,
  type LazyExoticComponent,
  type PropsWithChildren,
} from "react";

export const COMPONENTS_MAP = {
  LoginPage: lazy(() => import("@/modules/auth/pages/LoginPage")),
  RegisterPage: lazy(() => import("@/modules/auth/pages/RegisterPage")),
  ForgotPassword: lazy(() => import("@/modules/auth/pages/ForgotPassword")),
  UpdatePassword: lazy(() => import("@/modules/auth/pages/UpdatePassword")),
  NotFoundRouter: lazy(() => import("@/shared/pages/NotFoundRouter")),
  DashboardPage: lazy(() => import("@/modules/dashboard/pages/DashboardPage")),
  HomePage: lazy(() => import("@/modules/dashboard/pages/HomePage")),
} as const satisfies Record<string, LazyExoticComponent<FC>>;

export const LAYOUTS_MAP = {
  AuthLayout: lazy(() => import("@/app/layout/AuthLayout")),
  MainLayout: lazy(() => import("@/app/layout/MainLayout")),
} as const satisfies Record<
  string,
  LazyExoticComponent<(props: PropsWithChildren) => JSX.Element>
>;

export const GUARDS_MAP = {
  public: lazy(() => import("@/app/guards/PublicOnlyRoute")),
  private: lazy(() => import("@/app/guards/ProtectedRoute")),
  none: null,
} as const;

export type ComponentKey = keyof typeof COMPONENTS_MAP;
export type LayoutKey = keyof typeof LAYOUTS_MAP;
export type GuardKey = keyof typeof GUARDS_MAP;
