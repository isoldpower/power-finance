import type { FC, MouseEvent } from "react";
import { cn } from "@internal/ui-library";


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
			"relative h-full min-w-[7px] cursor-pointer rounded-[3px] transition-transform",
			selected && "z-10 scale-y-110"
		)}
		style={{
			width,
			background: `color-mix(in srgb, ${color} ${shade.toString()}%, white)`,
			boxShadow: selected ? '0 2px 6px rgba(17,20,28,0.22)' : undefined,
		}}
	/>
);

CategorySegmentBlock.displayName = 'CategorySegmentBlock';

export { CategorySegmentBlock };
export type { CategorySegmentBlockProps };
