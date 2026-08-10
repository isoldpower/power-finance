import { FinanceBadge } from "@internal/ui-library";

import { GoalsToolbar } from "@entity/wallets";
import { SpaceOccupant } from "@shared/components";

import type { FC, ReactNode } from "react";


interface GoalsBrowserHeaderProps {
	children: ReactNode;
}

const GoalsBrowserHeader: FC<GoalsBrowserHeaderProps> = ({ children }) => {
	return (
		<GoalsToolbar.Container>
			<GoalsToolbar.Title>
				Long-term goals
			</GoalsToolbar.Title>
			<FinanceBadge tone="pos" appearance="soft" size="sm">
				NEW
			</FinanceBadge>
			<SpaceOccupant />
			{children}
		</GoalsToolbar.Container>
	);
}

export { GoalsBrowserHeader };
export type { GoalsBrowserHeaderProps };
