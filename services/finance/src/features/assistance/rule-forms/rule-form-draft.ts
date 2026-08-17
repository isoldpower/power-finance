import type {
	AutomationDraft,
	AutomationEffect,
	AutomationTrigger,
	RuleNode,
} from "@entity/assistance";
import type { RuleFormSchema } from "./rule-form-schema.ts";


const IN_SEPARATOR = ',';

const conditionValue = (operator: RuleFormSchema['conditions'][number]['operator'], value: string): string | string[] => {
	return operator === 'in' ? value.split(IN_SEPARATOR).map((entry) => entry.trim()) : value;
};

const triggerFromForm = (values: RuleFormSchema): AutomationTrigger => {
	const leaves: RuleNode[] = values.conditions.map((condition) => ({
		field: condition.field,
		operator: condition.operator,
		value: conditionValue(condition.operator, condition.value),
	}));

	const condition = leaves.length === 0
		? null
		: leaves.length === 1 ? leaves[0] : { combinator: values.combinator, nodes: leaves };

	return {
		type: values.triggerType,
		event: values.triggerType === 'event' && values.event !== '' ? values.event : null,
		schedule: values.triggerType === 'schedule' ? values.schedule : null,
		condition,
	};
};

const effectFromForm = (values: RuleFormSchema): AutomationEffect => {
	switch (values.effectType) {
		case 'set_category':
			return { type: 'set_category', category: values.category.trim() };
		case 'notify':
			return { type: 'notify', severity: values.severity, title: values.title.trim() };
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
				money: { amount: Number.parseFloat(values.amount), currency: values.currency },
			};
	}
};

const ruleFormToDraft = (values: RuleFormSchema): AutomationDraft => ({
	name: values.name.trim(),
	icon: values.icon,
	enabled: true,
	trigger: triggerFromForm(values),
	effects: [effectFromForm(values)],
});

export { ruleFormToDraft };
