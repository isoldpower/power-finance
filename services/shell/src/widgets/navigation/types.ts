import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "@internal/ui-library";


type SidebarNavIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

interface SidebarNavLink {
	title: string;
	url: string;
	icon: SidebarNavIcon;
}

interface SidebarNavSection {
	title: string;
	links: SidebarNavLink[];
}

export type { SidebarNavIcon, SidebarNavLink, SidebarNavSection };
