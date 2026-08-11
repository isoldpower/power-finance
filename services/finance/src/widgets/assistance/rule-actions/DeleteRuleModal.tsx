import { FinanceButton } from "@internal/ui-library";

import { RuleDialog } from "@entity/assistance";
import { ConfirmModal } from "@shared/overlays";
import { DangerIconBadge } from "@shared/pure-components/badges";
import { Heading } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface DeleteRuleModalProps {
	name: string;
	pending: boolean;
	onConfirm: (onDeleted: () => void) => void;
	children: ReactNode;
}

const DeleteRuleModal: FC<DeleteRuleModalProps> = ({ name, pending, onConfirm, children }) => {
	return (
		<ConfirmModal trigger={children} className="w-[400px] p-6 text-center">
			{({ close }) => (
				<>
					<DangerIconBadge className="mx-auto mb-4 size-12" iconSize={22} />
					<Heading>
						Delete automation
					</Heading>
					<RuleDialog.Description>
						Permanently delete “{name}”? This can’t be undone.
					</RuleDialog.Description>
					<RuleDialog.Actions>
						<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={close}>
							Cancel
						</FinanceButton>
						<FinanceButton
							type="button"
							size="lg"
							variant="danger"
							className="flex-1 border-transparent bg-neg text-white shadow-[var(--shadow)] hover:bg-neg hover:brightness-95"
							disabled={pending}
							onClick={() => { onConfirm(close); }}
						>
							{pending ? 'Deleting…' : 'Delete'}
						</FinanceButton>
					</RuleDialog.Actions>
				</>
			)}
		</ConfirmModal>
	);
};

DeleteRuleModal.displayName = 'DeleteRuleModal';

export { DeleteRuleModal };
export type { DeleteRuleModalProps };
