import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	SidebarContext,
	useSidebar,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiSidebar = forwardUi(Sidebar, "UiSidebar");
export const UiSidebarContent = forwardUi(SidebarContent, "UiSidebarContent");
export const UiSidebarFooter = forwardUi(SidebarFooter, "UiSidebarFooter");
export const UiSidebarGroup = forwardUi(SidebarGroup, "UiSidebarGroup");
export const UiSidebarGroupAction = forwardUi(SidebarGroupAction, "UiSidebarGroupAction");
export const UiSidebarGroupContent = forwardUi(SidebarGroupContent, "UiSidebarGroupContent");
export const UiSidebarGroupLabel = forwardUi(SidebarGroupLabel, "UiSidebarGroupLabel");
export const UiSidebarHeader = forwardUi(SidebarHeader, "UiSidebarHeader");
export const UiSidebarInput = forwardUi(SidebarInput, "UiSidebarInput");
export const UiSidebarInset = forwardUi(SidebarInset, "UiSidebarInset");
export const UiSidebarMenu = forwardUi(SidebarMenu, "UiSidebarMenu");
export const UiSidebarMenuAction = forwardUi(SidebarMenuAction, "UiSidebarMenuAction");
export const UiSidebarMenuBadge = forwardUi(SidebarMenuBadge, "UiSidebarMenuBadge");
export const UiSidebarMenuButton = forwardUi(SidebarMenuButton, "UiSidebarMenuButton");
export const UiSidebarMenuItem = forwardUi(SidebarMenuItem, "UiSidebarMenuItem");
export const UiSidebarMenuSkeleton = forwardUi(SidebarMenuSkeleton, "UiSidebarMenuSkeleton");
export const UiSidebarMenuSub = forwardUi(SidebarMenuSub, "UiSidebarMenuSub");
export const UiSidebarMenuSubButton = forwardUi(SidebarMenuSubButton, "UiSidebarMenuSubButton");
export const UiSidebarMenuSubItem = forwardUi(SidebarMenuSubItem, "UiSidebarMenuSubItem");
export const UiSidebarProvider = forwardUi(SidebarProvider, "UiSidebarProvider");
export const UiSidebarRail = forwardUi(SidebarRail, "UiSidebarRail");
export const UiSidebarSeparator = forwardUi(SidebarSeparator, "UiSidebarSeparator");
export const UiSidebarTrigger = forwardUi(SidebarTrigger, "UiSidebarTrigger");

export { 
	SidebarContext as UiSidebarContext,
	useSidebar as useUiSidebar,
};
