import { BookDashed, ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useRouteStore } from "@/store/route.store";
import type { GuardKey } from "@/app/router/components-map";

interface RouteItem {
  id: number;
  name: string;
  path: string;
  parent_id?: number | null;
  icon?: LucideIcon;
  guard?: GuardKey;
  params?: string;
}

interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SidebarItem[];
}

export function buildSidebarTree(routes: RouteItem[]): SidebarItem[] {
  const map = new Map<number, SidebarItem>();

  // Solo consideramos rutas privadas y sin parámetros
  const filteredRoutes = routes.filter(
    (route) => route.guard === "private" && route.params === null
  );

  // Crear los nodos base
  filteredRoutes.forEach((route) => {
    map.set(route.id, {
      title: route.name,
      url: route.path,
      fullPath: route.path, // provisional
      icon: route.icon,
      items: [],
    });
  });

  const tree: SidebarItem[] = [];

  // Construir jerarquía solo con rutas filtradas
  filteredRoutes.forEach((route) => {
    const node = map.get(route.id)!;

    if (route.parent_id && map.has(route.parent_id)) {
      const parent = map.get(route.parent_id)!;
      node.fullPath = `${parent.fullPath}/${node.url}`.replace(/\/+/g, "/");
      parent.items!.push(node);
    } else {
      node.fullPath = `/${node.url}`;
      tree.push(node);
    }
  });

  return tree;
}

const renderSidebarItems = (items: SidebarItem[], parentPath = "") => {
  return items.map((item) => {
    const fullPath = `${parentPath}/${item.url}`.replace(/\/+/g, "/"); // limpia slashes dobles

    return (
      <SidebarMenuItem key={fullPath}>
        <SidebarMenuButton asChild>
          <Link to={fullPath}>
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>

        {item.items && item.items.length > 0 && (
          <SidebarMenuSub>
            {renderSidebarItems(item.items, fullPath)}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  });
};

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const routes = useRouteStore.getState().routes; // o donde sea que guardes tus rutas
  const sidebarItems = buildSidebarTree(routes);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={"Dashboard"}>
            <BookDashed />
            <span>Dashboard</span>
          </SidebarMenuButton>
          <SidebarMenuBadge>
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              variant="outline"
            >
              99
            </Badge>
          </SidebarMenuBadge>
        </SidebarMenuItem>
        {renderSidebarItems(sidebarItems)}
      </SidebarMenu>
    </SidebarGroup>
  );
}

//  {
//    sidebarItems.map((item) => (
//      <Collapsible
//        key={item.title}
//        asChild
//        defaultOpen={item.isActive}
//        className="group/collapsible"
//      >
//        <SidebarMenuItem>
//          <CollapsibleTrigger asChild>
//            <SidebarMenuButton tooltip={item.title}>
//              {item.icon && <item.icon />}
//              <span>{item.url}</span>
//              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//            </SidebarMenuButton>
//          </CollapsibleTrigger>
//          <CollapsibleContent>
//            <SidebarMenuSub>
//              {item.items?.map((subItem) => (
//                <SidebarMenuSubItem key={subItem.title}>
//                  <SidebarMenuSubButton asChild>
//                    <Link to={`${item.url}/${subItem.url}`}>
//                      {/* <Link to={subItem.url}> */}
//                      <span>{subItem.url}</span>
//                    </Link>
//                  </SidebarMenuSubButton>
//                </SidebarMenuSubItem>
//              ))}
//            </SidebarMenuSub>
//          </CollapsibleContent>
//        </SidebarMenuItem>
//      </Collapsible>
//    ));
//  }
