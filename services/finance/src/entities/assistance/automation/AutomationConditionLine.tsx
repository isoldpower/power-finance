import type { FC } from "react";

interface AutomationConditionLineProps {
	trigger: string;
	action: string;
}

const AutomationConditionLine: FC<AutomationConditionLineProps> = ({ trigger, action }) => (
	<div className="mt-0.5 font-numeric text-[10.5px] text-text-3">when {trigger} → {action}</div>
);

AutomationConditionLine.displayName = 'AutomationConditionLine';

export { AutomationConditionLine };
export type { AutomationConditionLineProps };
