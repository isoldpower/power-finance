import { FinanceBadge } from "@internal/ui-library";

import type { FC } from "react";


interface AutomationFrequencyBadgeProps {
	frequency: string;
}

const AutomationFrequencyBadge: FC<AutomationFrequencyBadgeProps> = ({ frequency }) => (
	<FinanceBadge tone="neutral" appearance="outline" size="sm" className="hidden flex-none sm:inline-flex">
		{frequency}
	</FinanceBadge>
);

AutomationFrequencyBadge.displayName = 'AutomationFrequencyBadge';

export { AutomationFrequencyBadge };
export type { AutomationFrequencyBadgeProps };
