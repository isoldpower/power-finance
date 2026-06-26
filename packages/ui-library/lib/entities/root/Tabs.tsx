import { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiTabs = forwardUi(Tabs, "UiTabs");
export const UiTabsList = forwardUi(TabsList, "UiTabsList");
export const UiTabsTrigger = forwardUi(TabsTrigger, "UiTabsTrigger");
export const UiTabsContent = forwardUi(TabsContent, "UiTabsContent");

export { tabsListVariants as uiTabsListVariants };
