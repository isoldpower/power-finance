import { cn } from "@internal/ui-library";

import type { FC, MouseEvent } from "react";


interface CategorySegmentBlockProps {
	color: string;
	width: string;
	shade: number;
	selected?: boolean;
	title?: string;
	onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const CategorySegmentBlock: FC<CategorySegmentBlockProps> = ({
	color,
	width,
	shade,
	selected = false,
	title,
	onClick
}) => (
	<div
		title={title}
		onClick={onClick}
		className={cn(
			"relative h-full min-w-[7px] cursor-pointer rounded-[3px] transition-shadow",
			selected && "z-10"
		)}
		style={{
			width,
			background: `color-mix(in srgb, ${color} ${shade.toString()}%, transparent)`,
			boxShadow: selected ? '0 0 0 2px var(--surface), 0 0 0 3px var(--text)' : undefined,
		}}
	/>
);

CategorySegmentBlock.displayName = 'CategorySegmentBlock';

export { CategorySegmentBlock };
export type { CategorySegmentBlockProps };
