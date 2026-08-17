import { useMemo } from "react";

import { Caption, DisplayText, RowTitle } from "@shared/pure-components/typography";
import { RowDeleteButton } from "@shared/pure-components/collections";
import { useLocaleCurrency } from "@shared/formatting";
import { GoalRow, toGoalView } from "@entity/wallets";
import { DeleteGoalDialog } from "@feature/wallets";
import { DeleteGoalModal } from "@widget/wallets";

import type { FC } from "react";
import type { Goal } from "@entity/wallets";


interface DeletableGoalRowProps {
	goal: Goal;
	order: number;
}

const DeletableGoalRow: FC<DeletableGoalRowProps> = ({ goal, order }) => {
	const formatCurrency = useLocaleCurrency();

	const goalView = useMemo(() => toGoalView(goal, formatCurrency), [goal, formatCurrency]);

	return (
		<GoalRow style={{ animationDelay: `${(order * 0.04).toString()}s` }}>
			<GoalRow.Head>
				<GoalRow.Icon icon={goalView.icon} color={goalView.color} />
				<GoalRow.Body>
					<RowTitle>
						{goalView.name}
					</RowTitle>
					<Caption size="11">
						{goalView.eta}
					</Caption>
				</GoalRow.Body>
				<GoalRow.Amounts>
					<DisplayText as="span" size="sm">
						{goalView.saved}
					</DisplayText>
					<GoalRow.Target>
						{goalView.target}
					</GoalRow.Target>
				</GoalRow.Amounts>
				<DeleteGoalDialog goal={goal}>
					{({ deleteGoal, isPending }) => (
						<DeleteGoalModal
							goal={goal}
							pending={isPending}
							onConfirm={deleteGoal}
						>
							<RowDeleteButton label={`Delete ${goal.name}`} />
						</DeleteGoalModal>
					)}
				</DeleteGoalDialog>
			</GoalRow.Head>
			<GoalRow.ProgressBar percent={goalView.percent} />
		</GoalRow>
	);
}

DeletableGoalRow.displayName = 'DeletableGoalRow';

export { DeletableGoalRow };
export type { DeletableGoalRowProps };
