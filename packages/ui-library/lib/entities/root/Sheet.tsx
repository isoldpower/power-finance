import {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiSheet = forwardUi(Sheet, "UiSheet");
export const UiSheetTrigger = forwardUi(SheetTrigger, "UiSheetTrigger");
export const UiSheetClose = forwardUi(SheetClose, "UiSheetClose");
export const UiSheetContent = forwardUi(SheetContent, "UiSheetContent");
export const UiSheetHeader = forwardUi(SheetHeader, "UiSheetHeader");
export const UiSheetFooter = forwardUi(SheetFooter, "UiSheetFooter");
export const UiSheetTitle = forwardUi(SheetTitle, "UiSheetTitle");
export const UiSheetDescription = forwardUi(SheetDescription, "UiSheetDescription");
