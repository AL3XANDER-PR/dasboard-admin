import type { ComponentKey, GuardKey, LayoutKey } from "./components-map";

export type DBRoute = {
  path: string;
  component: ComponentKey;
  layout: LayoutKey;
  guard: GuardKey;
  index?: boolean;
};
