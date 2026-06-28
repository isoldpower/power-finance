import type { FC, ReactNode } from "react";
import { FinanceBadge, UiSwitch } from "@internal/ui-library";

interface AutomationRowProps {
	icon: string;
	name: string;
	statusText: string;
	statusTone: string;
	trigger: string;
	action: string;
	frequency: string;
	enabled: boolean;
	toggleDisabled: boolean;
	onToggle: (checked: boolean) => void;
	style?: React.CSSProperties;
	deleteSlot: ReactNode;
}

const AutomationRow: FC<AutomationRowProps> = ({
	icon,
	name,
	statusText,
	statusTone,
	trigger,
	action,
	frequency,
	enabled,
	toggleDisabled,
	onToggle,
	style,
	deleteSlot,
}) => (
	<div style={style} className="fx-slidein flex items-center gap-3 border-b border-border px-[18px] py-3.5 last:border-b-0 hover:bg-secondary">
		<div className="flex size-[34px] flex-none items-center justify-center rounded-[9px] border border-border bg-secondary text-[15px]">{icon}</div>
		<div className="min-w-0 flex-1">
			<div className="flex items-center gap-2 text-[13.5px] font-semibold">
				{name}
				<FinanceBadge tone={statusTone === 'pos' ? 'pos' : 'warn'} appearance="soft" size="sm">{statusText}</FinanceBadge>
			</div>
			<div className="mt-0.5 font-numeric text-[10.5px] text-text-3">when {trigger} → {action}</div>
		</div>
		<FinanceBadge tone="neutral" appearance="outline" size="sm" className="hidden flex-none sm:inline-flex">{frequency}</FinanceBadge>
		<UiSwitch
			checked={enabled}
			disabled={toggleDisabled}
			onCheckedChange={onToggle}
		/>
		{deleteSlot}
	</div>
);

AutomationRow.displayName = 'AutomationRow';

export { AutomationRow };
export type { AutomationRowProps };
