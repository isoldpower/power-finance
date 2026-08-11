import { useMemo } from "react";

import { Caption, DisplayText, RowTitle } from "@shared/pure-components/typography";
import { RowDeleteButton } from "@shared/pure-components/collections";
import { useLocaleCurrency } from "@shared/formatting";
import { GoalRow, toGoalView } from "@entity/wallets";
import { DeleteGoalDialog } from "@feature/wallets";
import { DeleteGoalModal } from "@widget/wallets";

import type { FC } from "react";
import type { GoalWallet } from "@entity/wallets";


interface DeletableGoalRowProps {
	wallet: GoalWallet;
	order: number;
}

const DeletableGoalRow: FC<DeletableGoalRowProps> = ({ wallet, order }) => {
	const formatCurrency = useLocaleCurrency();

	const goal = useMemo(() => toGoalView(wallet, formatCurrency), [wallet, formatCurrency]);

	return (
		<GoalRow.Container style={{ animationDelay: `${(order * 0.04).toString()}s` }}>
			<GoalRow.Head>
				<GoalRow.Icon icon={goal.icon} color={goal.color} />
				<GoalRow.Body>
					<RowTitle>
						{goal.name}
					</RowTitle>
					<Caption size="11">
						{goal.monthly} · {goal.eta}
					</Caption>
				</GoalRow.Body>
				<GoalRow.Amounts>
					<DisplayText as="span" size="sm">
						{goal.saved}
					</DisplayText>
					<GoalRow.Target>
						{goal.target}
					</GoalRow.Target>
				</GoalRow.Amounts>
				<DeleteGoalDialog wallet={wallet}>
					{({ deleteGoal, isPending }) => (
						<DeleteGoalModal
							wallet={wallet}
							pending={isPending}
							onConfirm={deleteGoal}
						>
							<RowDeleteButton label={`Delete ${wallet.name}`} />
						</DeleteGoalModal>
					)}
				</DeleteGoalDialog>
			</GoalRow.Head>
			<GoalRow.ProgressBar percent={goal.percent} />
		</GoalRow.Container>
	);
}

DeletableGoalRow.displayName = 'DeletableGoalRow';

export { DeletableGoalRow };
export type { DeletableGoalRowProps };
