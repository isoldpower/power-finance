import { Toaster, toast } from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiToaster = forwardUi(Toaster, "UiToaster");

export { 
	toast as uiToast,
};
