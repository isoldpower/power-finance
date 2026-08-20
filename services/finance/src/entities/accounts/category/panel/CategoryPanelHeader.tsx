import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type CategoryPanelHeaderProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const CategoryPanelHeader: FC<CategoryPanelHeaderProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2.5 border-b border-border px-4 py-3"
		)}
		{...props}
	>
		{children}
	</div>
);

CategoryPanelHeader.displayName = 'CategoryPanelHeader';

export { CategoryPanelHeader };
export type { CategoryPanelHeaderProps };
