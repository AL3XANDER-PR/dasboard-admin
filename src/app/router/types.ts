import type { ComponentKey, GuardKey, LayoutKey } from "./components-map";

export type DBRoute = {
  id: string | number;
  path: string;
  component: ComponentKey;
  layout: LayoutKey;
  guard: GuardKey;
  parentId?: string | number | null;
  index?: boolean;
  params?: string;
};
