import type { FC, ReactNode } from "react";
import { UiSwitch } from "@internal/ui-library";

import {
	AutomationIcon,
	AutomationStatusBadge,
	AutomationConditionLine,
	AutomationFrequencyBadge,
	automationStatus,
} from "@entity/assistance";

interface AutomationRowProps {
	icon: string;
	name: string;
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
	trigger,
	action,
	frequency,
	enabled,
	toggleDisabled,
	onToggle,
	style,
	deleteSlot,
}) => {
	const status = automationStatus(enabled);

	return (
	<div style={style} className="fx-slidein flex items-center gap-3 border-b border-border px-[18px] py-3.5 last:border-b-0 hover:bg-secondary">
		<AutomationIcon icon={icon} />
		<div className="min-w-0 flex-1">
			<div className="flex items-center gap-2 text-[13.5px] font-semibold">
				{name}
				<AutomationStatusBadge text={status.text} tone={status.tone} />
			</div>
			<AutomationConditionLine trigger={trigger} action={action} />
		</div>
		<AutomationFrequencyBadge frequency={frequency} />
		<UiSwitch
			checked={enabled}
			disabled={toggleDisabled}
			onCheckedChange={onToggle}
		/>
		{deleteSlot}
	</div>
	);
};

AutomationRow.displayName = 'AutomationRow';

export { AutomationRow };
export type { AutomationRowProps };
