import { SonnerToaster, sonnerToast } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiToaster = forwardUi(SonnerToaster, "UiToaster");

export {
	sonnerToast as uiToast,
};
