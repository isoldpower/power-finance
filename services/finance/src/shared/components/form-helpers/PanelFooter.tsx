import type { FC } from "react";
import { FinanceButton } from "@internal/ui-library";

interface PanelFooterProps {
	submitLabel: string;
	cancelLabel?: string;
	onClose: () => void;
	onSubmit?: () => void;
	submitDisabled?: boolean;
	submitType?: 'button' | 'submit';
}

const PanelFooter: FC<PanelFooterProps> = ({ submitLabel, cancelLabel = 'Cancel', onClose, onSubmit, submitDisabled = false, submitType = 'button' }) => (
	<div className="flex gap-2.5 border-t border-border px-5 py-4">
		<FinanceButton
			type={submitType}
			size="lg"
			className="flex-1 shadow-[0_4px_14px_var(--glow)]"
			disabled={submitDisabled}
			onClick={submitType === 'submit' ? undefined : (onSubmit ?? onClose)}
		>
			{submitLabel}
		</FinanceButton>
		<FinanceButton type="button" size="lg" variant="outline" onClick={onClose}>{cancelLabel}</FinanceButton>
	</div>
);

PanelFooter.displayName = 'PanelFooter';

export { PanelFooter };
export type { PanelFooterProps };
