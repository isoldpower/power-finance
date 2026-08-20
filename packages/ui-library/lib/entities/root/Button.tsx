import { Button, buttonVariants } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiButton = forwardUi(Button, "UiButton");

export { buttonVariants as uiButtonVariants };
