import { FinanceBadge } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface HistoryToolbarCountProps {
	children: ReactNode;
}

const HistoryToolbarCount: FC<HistoryToolbarCountProps> = ({ children }) => {
	return (
		<FinanceBadge tone="neutral" appearance="outline" size="sm">
			{children}
		</FinanceBadge>
	);
}

HistoryToolbarCount.displayName = 'HistoryToolbarCount';

export { HistoryToolbarCount };
