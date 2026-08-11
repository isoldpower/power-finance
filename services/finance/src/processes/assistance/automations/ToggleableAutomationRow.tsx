import { useCallback } from "react";
import { UiSwitch } from "@internal/ui-library";

import { AutomationRow, automationStatus } from "@entity/assistance";
import { DeleteRuleDialog, useToggleAutomation } from "@feature/assistance";
import { DeleteRuleModal } from "@widget/assistance";
import { RowDeleteButton } from "@shared/pure-components/collections";

import type { FC } from "react";
import type { AutomationRule } from "@feature/assistance";


interface ToggleableAutomationRowProps {
	rule: AutomationRule;
	order: number;
}

const ToggleableAutomationRow: FC<ToggleableAutomationRowProps> = ({
	rule,
	order,
}) => {
	const toggle = useToggleAutomation();
	const status = automationStatus(rule.enabled);

	const handleToggle = useCallback((enabled: boolean) => {
		toggle.mutate({ id: rule.id, enabled });
	}, [rule.id, toggle]);

	return (
		<AutomationRow.Container style={{ animationDelay: `${(order * 0.04).toString()}s` }}>
			<AutomationRow.Icon icon={rule.icon} />
			<AutomationRow.Body>
				<AutomationRow.Title>
					{rule.name}
					<AutomationRow.StatusBadge
						text={status.text}
						tone={status.tone}
					/>
				</AutomationRow.Title>
				<AutomationRow.ConditionLine
					trigger={rule.trigger}
					action={rule.action}
				/>
			</AutomationRow.Body>
			<AutomationRow.FrequencyBadge frequency={rule.frequency} />
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
		</AutomationRow.Container>
	);
}

ToggleableAutomationRow.displayName = 'ToggleableAutomationRow';

export { ToggleableAutomationRow };
export type { ToggleableAutomationRowProps };
