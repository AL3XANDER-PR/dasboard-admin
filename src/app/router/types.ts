import type { ComponentKey, GuardKey, LayoutKey } from "./components-map";

export type DBRoute = {
  id: string | number;
  path: string;
  component: ComponentKey;
  layout: LayoutKey;
  guard: GuardKey;
  parent_id?: string | number | null;
  index?: boolean;
  params?: string;
};
