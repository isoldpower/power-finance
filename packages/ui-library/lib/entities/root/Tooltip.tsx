import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiTooltip = forwardUi(Tooltip, "UiTooltip");
export const UiTooltipTrigger = forwardUi(TooltipTrigger, "UiTooltipTrigger");
export const UiTooltipContent = forwardUi(TooltipContent, "UiTooltipContent");
export const UiTooltipProvider = forwardUi(TooltipProvider, "UiTooltipProvider");
