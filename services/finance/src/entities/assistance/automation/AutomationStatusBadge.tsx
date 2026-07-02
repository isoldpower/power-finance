import type { FC } from "react";
import { FinanceBadge } from "@internal/ui-library";

interface AutomationStatusBadgeProps {
	text: string;
	tone: string;
}

const AutomationStatusBadge: FC<AutomationStatusBadgeProps> = ({ text, tone }) => (
	<FinanceBadge tone={tone === 'pos' ? 'pos' : 'warn'} appearance="soft" size="sm">
		{text}
	</FinanceBadge>
);

AutomationStatusBadge.displayName = 'AutomationStatusBadge';

export { AutomationStatusBadge };
export type { AutomationStatusBadgeProps };
