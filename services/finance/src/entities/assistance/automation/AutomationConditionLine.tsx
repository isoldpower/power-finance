import { MetaText } from "@shared/pure-components/typography";

import type { FC } from "react";

interface AutomationConditionLineProps {
	trigger: string;
	action: string;
}

const AutomationConditionLine: FC<AutomationConditionLineProps> = ({ trigger, action }) => (
	<MetaText as="div" size="10.5" className="mt-0.5">when {trigger} → {action}</MetaText>
);

AutomationConditionLine.displayName = 'AutomationConditionLine';

export { AutomationConditionLine };
export type { AutomationConditionLineProps };
