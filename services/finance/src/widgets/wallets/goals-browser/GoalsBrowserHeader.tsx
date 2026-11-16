import { FinanceBadge } from "@internal/ui-library";
import { GoalsToolbar } from "@entity/wallets";
import { CardTitle, SpaceOccupant } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface GoalsBrowserHeaderProps {
	children: ReactNode;
}

const GoalsBrowserHeader: FC<GoalsBrowserHeaderProps> = ({ children }) => {
	return (
		<GoalsToolbar>
			<CardTitle as="h2">
				Long-term goals
			</CardTitle>
			<FinanceBadge tone="pos" appearance="soft" size="sm">
				NEW
			</FinanceBadge>
			<SpaceOccupant />
			{children}
		</GoalsToolbar>
	);
}

export { GoalsBrowserHeader };
export type { GoalsBrowserHeaderProps };
