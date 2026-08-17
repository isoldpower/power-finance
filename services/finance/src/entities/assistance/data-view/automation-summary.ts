import { eventLabel, operatorLabel } from "../visual-map";

import type {
	Automation,
	AutomationEffect,
	AutomationTrigger,
	RuleNode,
} from "../types.ts";


interface AutomationSummary {
	when: string;
	then: string;
	frequency: string;
}

const conditionText = (node: RuleNode): string => {
	if ('combinator' in node) {
		const joined = node.nodes.map(conditionText).join(node.combinator === 'and' ? ' and ' : ' or ');

		return node.nodes.length > 1 ? `(${joined})` : joined;
	}

	const value = Array.isArray(node.value) ? node.value.join(', ') : node.value;

	return `${node.field} ${operatorLabel(node.operator)} ${value}`;
};

const triggerText = (trigger: AutomationTrigger): string => {
	const occasion = trigger.type === 'event'
		? eventLabel(trigger.event ?? '')
		: `every ${trigger.schedule ?? 'run'}`;

	return trigger.condition === null ? occasion : `${occasion} matching ${conditionText(trigger.condition)}`;
};

const effectText = (effect: AutomationEffect): string => {
	switch (effect.type) {
		case 'set_category':
			return `set category ${effect.category}`;
		case 'notify':
			return `notify "${effect.title}"`;
		case 'raise_action':
			return `raise action "${effect.title}"`;
		case 'transfer':
			return `transfer ${effect.money.amount.toString()} ${effect.money.currency}`;
		case 'unknown':
			return effect.name;
	}
};

const frequencyText = (trigger: AutomationTrigger): string => {
	return trigger.type === 'event' ? 'realtime' : trigger.schedule ?? 'scheduled';
};

const automationSummary = (automation: Automation): AutomationSummary => ({
	when: triggerText(automation.trigger),
	then: automation.effects.map(effectText).join(', '),
	frequency: frequencyText(automation.trigger),
});

export { automationSummary };
export type { AutomationSummary };
