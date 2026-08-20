import { FinanceBadge } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type HistoryToolbarCountProps = PropsWithChildren;

const HistoryToolbarCount: FC<HistoryToolbarCountProps> = ({ children }) => (
	<FinanceBadge tone="neutral" appearance="outline" size="sm">
		{children}
	</FinanceBadge>
);

HistoryToolbarCount.displayName = 'HistoryToolbarCount';

export { HistoryToolbarCount };
export type { HistoryToolbarCountProps };
