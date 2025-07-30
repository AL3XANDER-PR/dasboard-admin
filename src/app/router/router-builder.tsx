import { Route, Routes, type RouteObject } from "react-router-dom";
import type { DBRoute } from "./types";
import { COMPONENTS_MAP, GUARDS_MAP, LAYOUTS_MAP } from "./components-map";
import React, { Suspense } from "react";

// Helper para envolver elementos lazy con Suspense
function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<div>Cargando...</div>}>{element}</Suspense>;
}

export function generateRoutesFromDB(dbRoutes: DBRoute[]): RouteObject[] {
  const groupedByGuard = {
    public: [] as RouteObject[],
    private: [] as RouteObject[],
    none: [] as RouteObject[],
  };

  for (const route of dbRoutes) {
    const Page = COMPONENTS_MAP[route.component];
    const Layout = LAYOUTS_MAP[route.layout];

    const element = withSuspense(
      <Layout>
        <Page />
      </Layout>
    );

    const routeObject: RouteObject = route.index
      ? { index: true, element }
      : { path: route.path, element };

    groupedByGuard[route.guard].push(routeObject);
  }

  const routes: RouteObject[] = [];

  // Public routes (usando guard)
  if (GUARDS_MAP.public) {
    routes.push({
      element: withSuspense(<GUARDS_MAP.public />),
      children: groupedByGuard.public,
    });
  }

  // Private routes (usando guard)
  if (GUARDS_MAP.private) {
    routes.push({
      path: "/",
      element: withSuspense(<GUARDS_MAP.private />),
      children: groupedByGuard.private,
    });
  }
  // Rutas sin guardia
  routes.push(...groupedByGuard.none);

  // 404
  routes.push({
    path: "*",
    element: withSuspense(<COMPONENTS_MAP.NotFoundRouter />),
  });

  console.log("🔧 Rutas generadas:", routes);

  return routes;
}

// Componente auxiliar para renderizar Outlet con rutas hijas
function OutletRoutes({ routes }: { routes: RouteObject[] }) {
  console.log("💻 - OutletRoutes - routes:", routes);
  return (
    <Routes>
      {routes.map((route, i) => {
        const { path, index, element } = route;
        return <Route key={i} path={path} index={index} element={element} />;
      })}
    </Routes>
  );
}
