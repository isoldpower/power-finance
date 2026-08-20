import { cn } from "@internal/ui-library";

import type { FC } from "react";


interface CategoryPanelSwatchProps {
	color: string;
}

const CategoryPanelSwatch: FC<CategoryPanelSwatchProps> = ({ color }) => (
	<span
		className={cn(
			"size-[9px] flex-none rounded-[2px]"
		)}
		style={{ background: color }}
	/>
);

CategoryPanelSwatch.displayName = 'CategoryPanelSwatch';

export { CategoryPanelSwatch };
export type { CategoryPanelSwatchProps };
