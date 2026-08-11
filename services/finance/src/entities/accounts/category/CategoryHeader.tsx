import type { FC } from "react";
import { FinanceMoney } from "@internal/ui-library";
import { Caption, RowTitle } from "@shared/pure-components/typography";


interface CategoryHeaderProps {
	label: string;
	color: string;
	totalFormatted: string;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({ label, color, totalFormatted }) => (
	<div className="mb-1.5 flex items-center gap-2.5">
		<span className="size-[9px] flex-none rounded-[2px]" style={{ background: color }} />
		<RowTitle as="span" size="13">
			{label}
		</RowTitle>
		<div className="flex-1" />
		<FinanceMoney size="sm">
			{totalFormatted}
		</FinanceMoney>
		<Caption as="span" size="11">
			›
		</Caption>
	</div>
);

CategoryHeader.displayName = 'CategoryHeader';

export { CategoryHeader };
export type { CategoryHeaderProps };
