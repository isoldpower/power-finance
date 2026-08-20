import { Badge, badgeVariants } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiBadge = forwardUi(Badge, "UiBadge");

export { badgeVariants as uiBadgeVariants };
