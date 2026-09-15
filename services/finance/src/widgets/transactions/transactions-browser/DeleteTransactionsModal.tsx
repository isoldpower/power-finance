import { cn, FinanceButton } from "@internal/ui-library";
import { TransactionDialog } from "@entity/transactions";
import { ConfirmModal } from "@shared/overlays";
import { DangerIconBadge } from "@shared/pure-components/badges";
import { Heading } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface DeleteTransactionsModalProps {
	count: number;
	pending: boolean;
	onConfirm: (onDeleted: () => void) => void;
	children: ReactNode;
}

const DeleteTransactionsModal: FC<DeleteTransactionsModalProps> = ({
	count,
	pending,
	onConfirm,
	children,
}) => (
	<ConfirmModal trigger={children} className="w-[400px] p-6 text-center">
		{({ close }) => (
			<TransactionDialog>
				<DangerIconBadge className="mx-auto mb-4 size-12" iconSize={22} />
				<Heading>
					Delete {count === 1 ? 'transaction' : `${String(count)} transactions`}
				</Heading>
				<TransactionDialog.Description>
					{count === 1
						? 'Permanently delete this transaction? Wallet balances will be recalculated.'
						: `Permanently delete these ${String(count)} transactions? Wallet balances will be recalculated.`}
				</TransactionDialog.Description>
				<TransactionDialog.Actions>
					<FinanceButton
						type="button"
						size="lg"
						variant="outline"
						className="flex-1"
						onClick={close}
					>
						Cancel
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
						{pending ? 'Deleting…' : 'Delete'}
					</FinanceButton>
				</TransactionDialog.Actions>
			</TransactionDialog>
		)}
	</ConfirmModal>
);

DeleteTransactionsModal.displayName = 'DeleteTransactionsModal';

export { DeleteTransactionsModal };
export type { DeleteTransactionsModalProps };
