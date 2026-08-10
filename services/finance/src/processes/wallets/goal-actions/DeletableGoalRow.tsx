import { useMemo } from "react";

import { RowDeleteButton } from "@shared/components";
import { useLocaleCurrency } from "@shared/utils";
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
					<GoalRow.Name>
						{goal.name}
					</GoalRow.Name>
					<GoalRow.Meta>
						{goal.monthly} · {goal.eta}
					</GoalRow.Meta>
				</GoalRow.Body>
				<GoalRow.Amounts>
					<GoalRow.Saved>
						{goal.saved}
					</GoalRow.Saved>
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
