import type { FC } from "react";
import { cn, FinanceMoney } from "@internal/ui-library";

interface CategorySegment {
	accountId: string;
	name: string;
	width: string;
	shade: number;
}

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
		className={cn("-mx-2 cursor-pointer rounded-[var(--radius-md)] px-2 py-2 hover:bg-secondary", active && "bg-secondary")}
	>
		<div className="mb-1.5 flex items-center gap-2.5">
			<span className="size-[9px] flex-none rounded-[2px]" style={{ background: color }} />
			<span className="text-[13px] font-semibold">{label}</span>
			<div className="flex-1" />
			<FinanceMoney size="sm">{totalFormatted}</FinanceMoney>
			<span className="text-[11px] text-text-3">›</span>
		</div>
		<div className="flex h-6 w-full items-stretch gap-0.5 rounded-[6px] bg-secondary">
			{segments.map((segment) => {
				const isSelected = isCurrentCategory && segment.accountId === selectedAccountId;
				return (
					<div
						key={segment.accountId}
						title={segment.name}
						onClick={(event) => { event.stopPropagation(); onSelectSegment(segment.accountId); }}
						className={cn(
							"relative h-full min-w-[7px] cursor-pointer rounded-[3px] transition-transform",
							isSelected && "z-10 scale-y-110"
						)}
						style={{
							width: segment.width,
							background: `color-mix(in srgb, ${color} ${segment.shade.toString()}%, white)`,
							boxShadow: isSelected ? '0 2px 6px rgba(17,20,28,0.22)' : undefined,
						}}
					/>
				);
			})}
		</div>
	</div>
);

CategoryRow.displayName = 'CategoryRow';

export { CategoryRow };
export type { CategoryRowProps, CategorySegment };
