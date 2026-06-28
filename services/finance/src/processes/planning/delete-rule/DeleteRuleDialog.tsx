import type { FC, ReactNode } from "react";
import { FinanceButton, Icons } from "@internal/ui-library";

import { useDeleteAutomation } from "@feature/automations";
import { useDisclosure } from "@shared/utils";
import { ModalShell, DisclosureTrigger } from "@shared/components";

interface DeleteRuleDialogProps {
	id: string;
	name: string;
	children: ReactNode;
}

const DeleteRuleDialog: FC<DeleteRuleDialogProps> = ({ id, name, children }) => {
	const { open, onOpen, onClose } = useDisclosure();
	const deleteAutomation = useDeleteAutomation();

	const onConfirm = () => {
		deleteAutomation.mutate(id, { onSuccess: () => { onClose(); } });
	};

	return (
		<>
			<DisclosureTrigger onOpen={onOpen}>{children}</DisclosureTrigger>
			<ModalShell open={open} onClose={onClose} className="w-[400px] p-6 text-center">
				<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[var(--neg-soft)] text-neg">
					<Icons.Trash2 size={22} />
				</div>
				<h2 className="font-display text-[17px] font-semibold">Delete automation</h2>
				<p className="mt-1.5 text-[13px] leading-relaxed text-text-2">
					Permanently delete “{name}”? This can’t be undone.
				</p>
				<div className="mt-5 flex gap-2.5">
					<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={onClose}>
						Cancel
					</FinanceButton>
					<FinanceButton type="button" size="lg" variant="danger" className="flex-1 border-transparent bg-neg text-white shadow-[var(--shadow)] hover:bg-neg hover:brightness-95" disabled={deleteAutomation.isPending} onClick={onConfirm}>
						{deleteAutomation.isPending ? 'Deleting…' : 'Delete'}
					</FinanceButton>
				</div>
			</ModalShell>
		</>
	);
};

DeleteRuleDialog.displayName = 'DeleteRuleDialog';

export { DeleteRuleDialog };
export type { DeleteRuleDialogProps };
