import { cn, Icons } from "@internal/ui-library";
import { RouteLink } from "@shared/routing";

import type { FC } from "react";


const CATEGORIES_TAB_SEARCH = { current: 'categories' };

interface ManageCategoriesLinkProps {
	className?: string;
}

const ManageCategoriesLink: FC<ManageCategoriesLinkProps> = ({ className }) => (
	<RouteLink
		to="settings"
		search={CATEGORIES_TAB_SEARCH}
		className={cn(
			"inline-flex items-center gap-1 text-[11.5px] font-medium text-primary",
			"underline-offset-2 hover:underline",
			className
		)}
	>
		<Icons.Settings2 size={12} />
		Manage categories
	</RouteLink>
);

ManageCategoriesLink.displayName = 'ManageCategoriesLink';

export { ManageCategoriesLink };
export type { ManageCategoriesLinkProps };
