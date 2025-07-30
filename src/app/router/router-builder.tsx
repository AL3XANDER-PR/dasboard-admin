import { Route, Routes, type RouteObject } from "react-router-dom";
import type { DBRoute, GuardKey } from "./types";
import { COMPONENTS_MAP, GUARDS_MAP, LAYOUTS_MAP } from "./components-map";
import React, { Suspense } from "react";

export type FlatDBRoute = DBRoute & { children?: FlatDBRoute[] };

// Helper para envolver elementos lazy con Suspense
function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<div>Cargando...</div>}>{element}</Suspense>;
}

// Construye un árbol de rutas desde una lista plana
export function buildRouteTreeFromFlatList(
  flatRoutes: DBRoute[]
): FlatDBRoute[] {
  const routeMap = new Map<string | number, FlatDBRoute>();

  for (const route of flatRoutes) {
    routeMap.set(route.id, { ...route, children: [] });
  }

  const rootRoutes: FlatDBRoute[] = [];

  for (const route of routeMap.values()) {
    if (route.parentId != null) {
      const parent = routeMap.get(route.parentId);
      if (parent) {
        parent.children!.push(route);
      }
    } else {
      rootRoutes.push(route);
    }
  }

  return rootRoutes;
}

export function generateRoutesFromDB(dbRoutes: DBRoute[]): RouteObject[] {
  const tree = buildRouteTreeFromFlatList(dbRoutes);

  const groupedByGuard: Record<GuardKey, RouteObject[]> = {
    public: [],
    private: [],
    none: [],
  };

  function getFullPath(route: FlatDBRoute): string | undefined {
    if (route.index) return undefined;
    const segments = [route.path];
    if (route.params) segments.push(route.params);
    return segments.join("/");
  }

  function convertToRouteObject(route: FlatDBRoute): RouteObject {
    const Page = COMPONENTS_MAP[route.component];
    const routeChildren = route.children?.map(convertToRouteObject);

    const fullPath = getFullPath(route);

    const routeElement = withSuspense(<Page />);

    // Si es raíz, aplicar layout
    if (route.parentId == null) {
      const Layout = LAYOUTS_MAP[route.layout];
      return {
        path: fullPath,
        index: route.index,
        element: withSuspense(<Layout />),
        children: [
          {
            path: route.index ? undefined : "",
            index: route.index,
            element: routeElement,
          },
          ...(routeChildren || []),
        ],
      };
    }

    return {
      path: fullPath,
      index: route.index,
      element: routeElement,
      children: routeChildren,
    };
  }

  for (const route of tree) {
    const group = groupedByGuard[route.guard];
    if (group) {
      group.push(convertToRouteObject(route));
    }
  }

  const routes: RouteObject[] = [];

  if (GUARDS_MAP.public) {
    routes.push({
      element: withSuspense(<GUARDS_MAP.public />),
      children: groupedByGuard.public,
    });
  }

  if (GUARDS_MAP.private) {
    routes.push({
      element: withSuspense(<GUARDS_MAP.private />),
      children: groupedByGuard.private,
    });
  }

  routes.push(...groupedByGuard.none);

  routes.push({
    path: "*",
    element: withSuspense(<COMPONENTS_MAP.NotFoundRouter />),
  });

  return routes;
}

// Renderiza rutas anidadas con <Outlet />
function renderRoute(route: RouteObject, key: number): React.ReactNode {
  return (
    <Route
      key={key}
      path={route.path}
      index={route?.index}
      element={route.element}
    >
      {route.children?.map((child, i) => renderRoute(child, i))}
    </Route>
  );
}

export function OutletRoutes({ routes }: { routes: RouteObject[] }) {
  return <Routes>{routes.map((route, i) => renderRoute(route, i))}</Routes>;
}
