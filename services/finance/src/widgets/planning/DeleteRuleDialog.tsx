import { useState } from "react";
import { createPortal } from "react-dom";
import type { FC, ReactNode } from "react";
import { FinanceButton, Icons } from "@internal/ui-library";

import { useDeleteAutomation } from "@feature/automations";

interface DeleteRuleDialogProps {
	id: string;
	name: string;
	children: ReactNode;
}

const DeleteRuleDialog: FC<DeleteRuleDialogProps> = ({ id, name, children }) => {
	const [open, setOpen] = useState(false);
	const deleteAutomation = useDeleteAutomation();

	const close = () => { setOpen(false); };

	const onConfirm = () => {
		deleteAutomation.mutate(id, { onSuccess: () => { close(); } });
	};

	return (
		<>
			<span className="contents" onClick={() => { setOpen(true); }}>{children}</span>
			{open ? createPortal(
				<div className="finance-theme">
					<div onClick={close} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-150" />
					<div
						role="alertdialog"
						aria-modal="true"
						className="fixed left-1/2 top-1/2 z-[41] w-[400px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-lg)] border border-border bg-card p-6 text-center shadow-[var(--shadow-lg)] animate-in fade-in zoom-in-95 duration-150"
					>
						<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[var(--neg-soft)] text-neg">
							<Icons.Trash2 size={22} />
						</div>
						<h2 className="font-display text-[17px] font-semibold">Delete automation</h2>
						<p className="mt-1.5 text-[13px] leading-relaxed text-text-2">
							Permanently delete “{name}”? This can’t be undone.
						</p>
						<div className="mt-5 flex gap-2.5">
							<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={close}>
								Cancel
							</FinanceButton>
							<FinanceButton type="button" size="lg" variant="danger" className="flex-1 border-transparent bg-neg text-white shadow-[var(--shadow)] hover:bg-neg hover:brightness-95" disabled={deleteAutomation.isPending} onClick={onConfirm}>
								{deleteAutomation.isPending ? 'Deleting…' : 'Delete'}
							</FinanceButton>
						</div>
					</div>
				</div>,
				document.body
			) : null}
		</>
	);
};

DeleteRuleDialog.displayName = 'DeleteRuleDialog';

export { DeleteRuleDialog };
export type { DeleteRuleDialogProps };
