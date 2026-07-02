import type { FC } from "react";
import { FinanceMoney } from "@internal/ui-library";


interface CategoryHeaderProps {
	label: string;
	color: string;
	totalFormatted: string;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({ label, color, totalFormatted }) => (
	<div className="mb-1.5 flex items-center gap-2.5">
		<span className="size-[9px] flex-none rounded-[2px]" style={{ background: color }} />
		<span className="text-[13px] font-semibold">{label}</span>
		<div className="flex-1" />
		<FinanceMoney size="sm">{totalFormatted}</FinanceMoney>
		<span className="text-[11px] text-text-3">›</span>
	</div>
);

CategoryHeader.displayName = 'CategoryHeader';

export { CategoryHeader };
export type { CategoryHeaderProps };
