import { useCallback, useMemo } from "react";
import { UiSwitch } from "@internal/ui-library";
import {
	AutomationRow,
	automationSummary,
	resolveAutomationIcon,
	resolveAutomationStatus,
} from "@entity/assistance";
import { DeleteRuleDialog, useUpdateAutomation } from "@feature/assistance";
import { DeleteRuleModal } from "@widget/assistance";
import { RowDeleteButton } from "@shared/pure-components/collections";

import type { FC } from "react";
import type { Automation } from "@entity/assistance";


interface ToggleableAutomationRowProps {
	rule: Automation;
	order: number;
}

const ToggleableAutomationRow: FC<ToggleableAutomationRowProps> = ({
	rule,
	order,
}) => {
	const toggle = useUpdateAutomation();
	const status = resolveAutomationStatus(rule.enabled);
	const summary = useMemo(() => {
		return automationSummary(rule);
	}, [rule]);

	const handleToggle = useCallback((enabled: boolean) => {
		toggle.mutate({ id: rule.id, patch: { enabled } });
	}, [rule.id, toggle]);

	return (
		<AutomationRow style={{ animationDelay: `${(order * 0.04).toString()}s` }}>
			<AutomationRow.Icon>
				{resolveAutomationIcon(rule.icon)}
			</AutomationRow.Icon>
			<AutomationRow.Body>
				<AutomationRow.Title>
					{rule.name}
					<AutomationRow.StatusBadge
						text={status.text}
						tone={status.tone}
					/>
				</AutomationRow.Title>
				<AutomationRow.ConditionLine
					when={summary.when}
					then={summary.then}
				/>
			</AutomationRow.Body>
			<AutomationRow.FrequencyBadge frequency={summary.frequency} />
			<UiSwitch
				checked={rule.enabled}
				disabled={toggle.isPending}
				onCheckedChange={handleToggle}
			/>
			<DeleteRuleDialog id={rule.id}>
				{({ deleteRule, isPending }) => (
					<DeleteRuleModal
						name={rule.name}
						pending={isPending}
						onConfirm={deleteRule}
					>
						<RowDeleteButton label={`Delete ${rule.name}`} />
					</DeleteRuleModal>
				)}
			</DeleteRuleDialog>
		</AutomationRow>
	);
}

ToggleableAutomationRow.displayName = 'ToggleableAutomationRow';

export { ToggleableAutomationRow };
export type { ToggleableAutomationRowProps };
