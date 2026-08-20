import { GoalDialog } from "@entity/wallets";
import { DangerIconBadge } from "@shared/pure-components/badges";
import { Heading } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface DeleteGoalSummaryProps {
	title: string;
	children: ReactNode;
}

const DeleteGoalSummary: FC<DeleteGoalSummaryProps> = ({ title, children }) => (
	<GoalDialog.Header>
		<DangerIconBadge className="size-10 flex-none" iconSize={20} />
		<GoalDialog.Content>
			<Heading>
				{title}
			</Heading>
			<GoalDialog.Description>
				{children}
			</GoalDialog.Description>
		</GoalDialog.Content>
	</GoalDialog.Header>
);

DeleteGoalSummary.displayName = 'DeleteGoalSummary';

export { DeleteGoalSummary };
export type { DeleteGoalSummaryProps };
