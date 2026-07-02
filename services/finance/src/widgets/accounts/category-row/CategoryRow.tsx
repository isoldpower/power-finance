import type { FC } from "react";
import { cn } from "@internal/ui-library";

import { CategoryHeader, CompositionBar, CategorySegmentBlock } from "@entity/accounts";
import type { CategorySegment } from "@entity/accounts";


interface CategoryRowProps {
	label: string;
	color: string;
	totalFormatted: string;
	active: boolean;
	segments: CategorySegment[];
	isCurrentCategory: boolean;
	selectedAccountId: string;
	onSelectCategory: () => void;
	onSelectSegment: (accountId: string) => void;
}

const CategoryRow: FC<CategoryRowProps> = ({
	label,
	color,
	totalFormatted,
	active,
	segments,
	isCurrentCategory,
	selectedAccountId,
	onSelectCategory,
	onSelectSegment,
}) => (
	<div
		onClick={onSelectCategory}
		className={cn(
			"-mx-2 cursor-pointer rounded-[var(--radius-md)] px-2 py-2 hover:bg-secondary",
			active && "bg-secondary",
		)}
	>
		<CategoryHeader label={label} color={color} totalFormatted={totalFormatted} />
		<CompositionBar>
			{segments.map((segment) => (
				<CategorySegmentBlock
					key={segment.accountId}
					color={color}
					width={segment.width}
					shade={segment.shade}
					title={segment.name}
					selected={isCurrentCategory && segment.accountId === selectedAccountId}
					onClick={(event) => { event.stopPropagation(); onSelectSegment(segment.accountId); }}
				/>
			))}
		</CompositionBar>
	</div>
);

CategoryRow.displayName = 'CategoryRow';

export { CategoryRow };
export type { CategoryRowProps };
