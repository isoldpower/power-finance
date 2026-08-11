import { FinanceBadge } from "@internal/ui-library";

import { GoalsToolbar } from "@entity/wallets";
import { CardTitle } from "@shared/pure-components/typography";
import { SpaceOccupant } from "@shared/pure-components/layout";

import type { FC, ReactNode } from "react";


interface GoalsBrowserHeaderProps {
	children: ReactNode;
}

const GoalsBrowserHeader: FC<GoalsBrowserHeaderProps> = ({ children }) => {
	return (
		<GoalsToolbar.Container>
			<CardTitle as="h2">
				Long-term goals
			</CardTitle>
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
