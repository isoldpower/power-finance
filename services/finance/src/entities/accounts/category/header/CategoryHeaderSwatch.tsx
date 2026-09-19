import { cn } from "@internal/ui-library";

import type { FC } from "react";


interface CategoryHeaderSwatchProps {
	color: string;
}

const CategoryHeaderSwatch: FC<CategoryHeaderSwatchProps> = ({ color }) => (
	<span
		className={cn(
			"size-[9px] flex-none rounded-[2px]"
		)}
		style={{ background: color }}
	/>
);

CategoryHeaderSwatch.displayName = 'CategoryHeaderSwatch';

export { CategoryHeaderSwatch };
export type { CategoryHeaderSwatchProps };
