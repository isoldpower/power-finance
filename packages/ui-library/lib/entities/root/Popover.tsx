import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiPopover = forwardUi(Popover, "UiPopover");
export const UiPopoverTrigger = forwardUi(PopoverTrigger, "UiPopoverTrigger");
export const UiPopoverContent = forwardUi(PopoverContent, "UiPopoverContent");
export const UiPopoverAnchor = forwardUi(PopoverAnchor, "UiPopoverAnchor");
