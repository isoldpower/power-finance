import type { FC, ReactNode } from "react";
import { FinanceButton } from "@internal/ui-library";

import { useDeleteAutomation } from "@feature/assistance";
import { ConfirmModal } from "@shared/interactions";
import { DangerIconBadge } from "@shared/components";

interface DeleteRuleDialogProps {
	id: string;
	name: string;
	children: ReactNode;
}

const DeleteRuleDialog: FC<DeleteRuleDialogProps> = ({ id, name, children }) => {
	const deleteAutomation = useDeleteAutomation();

	return (
		<ConfirmModal trigger={children} className="w-[400px] p-6 text-center">
			{({ close }) => (
				<>
					<DangerIconBadge className="mx-auto mb-4 size-12" iconSize={22} />
					<h2 className="font-display text-[17px] font-semibold">Delete automation</h2>
					<p className="mt-1.5 text-[13px] leading-relaxed text-text-2">
						Permanently delete “{name}”? This can’t be undone.
					</p>
					<div className="mt-5 flex gap-2.5">
						<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={close}>
							Cancel
						</FinanceButton>
						<FinanceButton
							type="button"
							size="lg"
							variant="danger"
							className="flex-1 border-transparent bg-neg text-white shadow-[var(--shadow)] hover:bg-neg hover:brightness-95"
							disabled={deleteAutomation.isPending}
							onClick={() => { deleteAutomation.mutate(id, { onSuccess: close }); }}
						>
							{deleteAutomation.isPending ? 'Deleting…' : 'Delete'}
						</FinanceButton>
					</div>
				</>
			)}
		</ConfirmModal>
	);
};

DeleteRuleDialog.displayName = 'DeleteRuleDialog';

export { DeleteRuleDialog };
export type { DeleteRuleDialogProps };
