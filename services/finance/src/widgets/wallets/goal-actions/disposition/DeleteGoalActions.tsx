import { cn, FinanceButton } from "@internal/ui-library";
import { GoalDialog } from "@entity/wallets";

import type { FC } from "react";


interface DeleteGoalActionsProps {
	cancelLabel: string;
	confirmLabel: string;
	confirmDisabled: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}

const DeleteGoalActions: FC<DeleteGoalActionsProps> = ({
	cancelLabel,
	confirmLabel,
	confirmDisabled,
	onCancel,
	onConfirm,
}) => (
	<GoalDialog.Actions>
		<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={onCancel}>
			{cancelLabel}
		</FinanceButton>
		<FinanceButton
			type="button"
			size="lg"
			variant="danger"
			className={cn(
				"flex-1 border-transparent bg-neg text-white shadow-[var(--shadow)]",
				"hover:bg-neg hover:brightness-95"
			)}
			disabled={confirmDisabled}
			onClick={onConfirm}
		>
			{confirmLabel}
		</FinanceButton>
	</GoalDialog.Actions>
);

DeleteGoalActions.displayName = 'DeleteGoalActions';

export { DeleteGoalActions };
export type { DeleteGoalActionsProps };
