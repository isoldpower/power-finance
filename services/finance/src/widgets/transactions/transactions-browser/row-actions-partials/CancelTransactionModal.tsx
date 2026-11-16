import { cn, FinanceButton } from "@internal/ui-library";
import { TransactionDialog } from "@entity/transactions";
import { ConfirmModal } from "@shared/overlays";
import { DangerIconBadge } from "@shared/pure-components/badges";
import { Heading } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface CancelTransactionModalProps {
	name: string;
	pending: boolean;
	onConfirm: (onCancelled: () => void) => void;
	children: ReactNode;
}

const CancelTransactionModal: FC<CancelTransactionModalProps> = ({
	name,
	pending,
	onConfirm,
	children,
}) => (
	<ConfirmModal trigger={children} className="w-[400px] p-6 text-center">
		{({ close }) => (
			<TransactionDialog>
				<DangerIconBadge className="mx-auto mb-4 size-12" iconSize={22} />
				<Heading>
					Cancel transaction
				</Heading>
				<TransactionDialog.Description>
					{`Cancel “${name}”? It leaves your transactions list and wallet balances are recalculated.`}
				</TransactionDialog.Description>
				<TransactionDialog.Actions>
					<FinanceButton
						type="button"
						size="lg"
						variant="outline"
						className="flex-1"
						onClick={close}
					>
						Keep
					</FinanceButton>
					<FinanceButton
						type="button"
						size="lg"
						variant="danger"
						className={cn(
							"flex-1 border-transparent bg-neg text-white",
							"shadow-[var(--shadow)] hover:bg-neg hover:brightness-95"
						)}
						disabled={pending}
						onClick={() => { onConfirm(close); }}
					>
						{pending ? 'Cancelling…' : 'Cancel transaction'}
					</FinanceButton>
				</TransactionDialog.Actions>
			</TransactionDialog>
		)}
	</ConfirmModal>
);

CancelTransactionModal.displayName = 'CancelTransactionModal';

export { CancelTransactionModal };
export type { CancelTransactionModalProps };
