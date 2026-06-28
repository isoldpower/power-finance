import type { FC } from "react";
import { FinanceButton } from "@internal/ui-library";

interface NeedsActionRowProps {
	icon: string;
	iconClass: string;
	title: string;
	subtitle: string;
	primaryLabel: string;
	secondaryLabel: string;
	disabled: boolean;
	onResolve: () => void;
}

const NeedsActionRow: FC<NeedsActionRowProps> = ({ icon, iconClass, title, subtitle, primaryLabel, secondaryLabel, disabled, onResolve }) => (
	<div className="flex items-center gap-3.5 border-b border-border px-[18px] py-3.5 last:border-b-0 hover:bg-secondary">
		<div className={`flex size-[34px] flex-none items-center justify-center rounded-[9px] text-[15px] font-semibold ${iconClass}`}>
			{icon}
		</div>
		<div className="min-w-0 flex-1">
			<div className="text-[13.5px] font-semibold">{title}</div>
			<div className="mt-px text-xs text-text-2">{subtitle}</div>
		</div>
		<FinanceButton variant="outline" size="sm" className="flex-none" disabled={disabled} onClick={onResolve}>
			{secondaryLabel}
		</FinanceButton>
		<FinanceButton size="sm" className="flex-none" disabled={disabled} onClick={onResolve}>
			{primaryLabel}
		</FinanceButton>
	</div>
);

NeedsActionRow.displayName = 'NeedsActionRow';

export { NeedsActionRow };
export type { NeedsActionRowProps };
