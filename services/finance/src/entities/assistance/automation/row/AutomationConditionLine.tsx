import { MetaText } from "@shared/pure-components/typography";

import type { FC } from "react";


interface AutomationConditionLineProps {
	when: string;
	then: string;
}

const AutomationConditionLine: FC<AutomationConditionLineProps> = ({ when, then }) => (
	<MetaText as="div" size="10.5" className="mt-0.5">when {when} → {then}</MetaText>
);

AutomationConditionLine.displayName = 'AutomationConditionLine';

export { AutomationConditionLine };
export type { AutomationConditionLineProps };
