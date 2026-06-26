import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiBreadcrumb = forwardUi(Breadcrumb, "UiBreadcrumb");
export const UiBreadcrumbList = forwardUi(BreadcrumbList, "UiBreadcrumbList");
export const UiBreadcrumbItem = forwardUi(BreadcrumbItem, "UiBreadcrumbItem");
export const UiBreadcrumbLink = forwardUi(BreadcrumbLink, "UiBreadcrumbLink");
export const UiBreadcrumbPage = forwardUi(BreadcrumbPage, "UiBreadcrumbPage");
export const UiBreadcrumbSeparator = forwardUi(BreadcrumbSeparator, "UiBreadcrumbSeparator");
export const UiBreadcrumbEllipsis = forwardUi(BreadcrumbEllipsis, "UiBreadcrumbEllipsis");
