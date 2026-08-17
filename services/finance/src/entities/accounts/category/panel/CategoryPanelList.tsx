import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type CategoryPanelListProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const CategoryPanelList: FC<CategoryPanelListProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"h-[270px] overflow-y-auto"
		)}
		{...props}
	>
		{children}
	</div>
);

CategoryPanelList.displayName = 'CategoryPanelList';

export { CategoryPanelList };
export type { CategoryPanelListProps };
