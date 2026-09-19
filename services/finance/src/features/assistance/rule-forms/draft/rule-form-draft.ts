import { parseAmountDecimal } from "@shared/formatting";
import { composeEvent } from "../events";
import { isBooleanField, parseMultiValue } from "../filters";

import type {
	AutomationDraft,
	AutomationEffect,
	AutomationTrigger,
	RuleNode,
} from "@entity/assistance";
import type { FilterValue } from "@shared/api";
import type { RuleFormSchema } from "../schema";


type RuleCondition = RuleFormSchema['conditions'][number];

function conditionValue(operator: RuleCondition['operator'], value: string): FilterValue {
	return operator === 'in' ? parseMultiValue(value) : value;
}

function booleanLeaf(field: string, value: string): RuleNode {
	return {
		field,
		operator: value === 'yes' ? 'neq' : 'eq',
		value: null,
	};
}

function conditionLeaf(condition: RuleCondition): RuleNode {
	if (isBooleanField(condition.field)) {
		return booleanLeaf(condition.field, condition.value);
	}

	return {
		field: condition.field,
		operator: condition.operator,
		value: conditionValue(condition.operator, condition.value),
	};
}

function triggerFromForm(values: RuleFormSchema): AutomationTrigger {
	const leaves: RuleNode[] = values.conditions.map(conditionLeaf);

	const condition = leaves.length === 0
		? null
		: leaves.length === 1 ? leaves[0] : { 
			combinator: values.combinator,
			nodes: leaves,
		};
	const event = composeEvent(
		values.eventCategory,
		values.eventName,
	);

	return {
		type: values.triggerType,
		event: values.triggerType === 'event' && event !== '' ? event : null,
		schedule: values.triggerType === 'schedule' ? values.schedule : null,
		condition,
	};
}

function effectFromForm(values: RuleFormSchema): AutomationEffect {
	switch (values.effectType) {
		case 'set_category':
			return { 
				type: 'set_category',
				category: values.category.trim(),
			};
		case 'notify':
			return { 
				type: 'notify',
				severity: values.severity,
				title: values.title.trim(),
			};
		case 'raise_action':
			return {
				type: 'raise_action',
				severity: values.severity,
				title: values.title.trim(),
				body: values.body.trim(),
			};
		case 'transfer':
			return {
				type: 'transfer',
				fromWalletId: values.fromWalletId,
				toWalletId: values.toWalletId,
				money: { 
					amount: parseAmountDecimal(values.amount),
					currency: values.currency,
				},
			};
	}
}

function ruleFormToDraft(values: RuleFormSchema): AutomationDraft {
	return {
		name: values.name.trim(),
		icon: values.icon,
		enabled: true,
		trigger: triggerFromForm(values),
		effects: [effectFromForm(values)],
	};
}

export { ruleFormToDraft };
