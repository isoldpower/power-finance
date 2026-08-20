import { FinanceBadge } from "@internal/ui-library";

import type { FC } from "react";
import type { AutomationStatusTone } from "../types.ts";


interface AutomationStatusBadgeProps {
	text: string;
	tone: AutomationStatusTone;
}

const AutomationStatusBadge: FC<AutomationStatusBadgeProps> = ({ text, tone }) => (
	<FinanceBadge tone={tone} appearance="soft" size="sm">
		{text}
	</FinanceBadge>
);

AutomationStatusBadge.displayName = 'AutomationStatusBadge';

export { AutomationStatusBadge };
export type { AutomationStatusBadgeProps };
