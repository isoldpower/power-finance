import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiDialog = forwardUi(Dialog, "UiDialog");
export const UiDialogClose = forwardUi(DialogClose, "UiDialogClose");
export const UiDialogContent = forwardUi(DialogContent, "UiDialogContent");
export const UiDialogDescription = forwardUi(DialogDescription, "UiDialogDescription");
export const UiDialogFooter = forwardUi(DialogFooter, "UiDialogFooter");
export const UiDialogHeader = forwardUi(DialogHeader, "UiDialogHeader");
export const UiDialogOverlay = forwardUi(DialogOverlay, "UiDialogOverlay");
export const UiDialogPortal = forwardUi(DialogPortal, "UiDialogPortal");
export const UiDialogTitle = forwardUi(DialogTitle, "UiDialogTitle");
export const UiDialogTrigger = forwardUi(DialogTrigger, "UiDialogTrigger");
