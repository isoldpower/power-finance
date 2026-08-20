import { Toggle, toggleVariants } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiToggle = forwardUi(Toggle, "UiToggle");

export { toggleVariants as uiToggleVariants };
