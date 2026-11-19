import { FinanceBadge } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface CategoryRowChangeProps {
	tone: 'pos' | 'neg' | 'neutral';
	children: ReactNode;
}

const CategoryRowChange: FC<CategoryRowChangeProps> = ({ tone, children }) => (
	<FinanceBadge tone={tone} size="sm" className="min-w-14 justify-center font-numeric">
		{children}
	</FinanceBadge>
);

CategoryRowChange.displayName = 'CategoryRowChange';

export { CategoryRowChange };
export type { CategoryRowChangeProps };
