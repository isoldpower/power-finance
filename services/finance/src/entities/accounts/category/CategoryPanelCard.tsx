import { FinanceCard } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface CategoryPanelCardProps {
	children: ReactNode;
}

const CategoryPanelCard: FC<CategoryPanelCardProps> = ({ children }) => {
	return (
		<FinanceCard className="overflow-hidden">
			{children}
		</FinanceCard>
	);
}

CategoryPanelCard.displayName = 'CategoryPanelCard';

export { CategoryPanelCard };
