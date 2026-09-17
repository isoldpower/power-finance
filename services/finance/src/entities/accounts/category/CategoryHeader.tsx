import { FinanceMoney } from "@internal/ui-library";
import { Caption, RowTitle } from "@shared/pure-components/typography";

import type { FC } from "react";


interface CategoryHeaderProps {
	label: string;
	color: string;
	totalFormatted: string;
	selected?: boolean;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({
	label,
	color,
	totalFormatted,
	selected = false
}) => (
	<div className="mb-1.5 flex items-center gap-2.5">
		<span className="size-[9px] flex-none rounded-[2px]" style={{ background: color }} />
		<RowTitle as="span" size="13">
			{label}
		</RowTitle>
		<div className="flex-1" />
		<FinanceMoney size="sm">
			{totalFormatted}
		</FinanceMoney>
		<Caption as="span" size="11" tone={selected ? 'strong' : 'subtle'}>
			›
		</Caption>
	</div>
);

CategoryHeader.displayName = 'CategoryHeader';

export { CategoryHeader };
export type { CategoryHeaderProps };
