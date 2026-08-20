import { toAmountString } from "@shared/api";

import type { FilterNode } from "@shared/api";
import type {
	AutomationDraft,
	AutomationEffect,
	AutomationPatch,
	AutomationQuery,
	AutomationTrigger,
	RuleNode,
} from "@entity/assistance";
import type {
	AutomationCreateBody,
	AutomationEffectDto,
	AutomationListParams,
	AutomationPatchBody,
	AutomationTriggerBody,
} from "../types.ts";


const conditionToApi = (node: RuleNode): FilterNode => {
	if ('combinator' in node) {
		return node.combinator === 'and'
			? { and: node.nodes.map(conditionToApi) }
			: { or: node.nodes.map(conditionToApi) };
	}

	return {
		field_name: node.field,
		operator: node.operator,
		value: node.value,
	};
};

const effectToApi = (effect: AutomationEffect): AutomationEffectDto => {
	switch (effect.type) {
		case 'set_category':
			return { 
				type: effect.type,
				params: { 
					category: effect.category,
				},
			};
		case 'notify':
			return { 
				type: effect.type,
				params: { 
					severity: effect.severity, 
					title: effect.title,
				},
			};
		case 'raise_action':
			return {
				type: effect.type,
				params: { 
					severity: effect.severity,
					title: effect.title, 
					body: effect.body,
				},
			};
		case 'transfer':
			return {
				type: effect.type,
				params: {
					from_wallet_id: effect.fromWalletId,
					to_wallet_id: effect.toWalletId,
					money: { 
						amount: toAmountString(effect.money.amount),
						currency: effect.money.currency,
					},
				},
			};
		case 'unknown':
			return { 
				type: effect.name,
				params: {},
			};
	}
};

const triggerToApi = (trigger: AutomationTrigger): AutomationTriggerBody => ({
	type: trigger.type,
	...(trigger.type === 'event' && trigger.event 
		? { event: trigger.event } 
		: {}),
	...(trigger.type === 'schedule' && trigger.schedule 
		? { schedule: trigger.schedule } 
		: {}),
	filter_body: trigger.condition 
		? conditionToApi(trigger.condition) 
		: null,
});

const automationDraftToApi = (draft: AutomationDraft): AutomationCreateBody => ({
	name: draft.name,
	icon: draft.icon,
	enabled: draft.enabled,
	trigger: triggerToApi(draft.trigger),
	effects: draft.effects.map(effectToApi),
});

const automationPatchToApi = (patch: AutomationPatch): AutomationPatchBody => ({
	...(patch.name === undefined 
		? {} 
		: { name: patch.name }),
	...(patch.icon === undefined 
		? {} 
		: { icon: patch.icon }),
	...(patch.enabled === undefined 
		? {} 
		: { enabled: patch.enabled }),
	...(patch.trigger === undefined 
		? {} 
		: { trigger: triggerToApi(patch.trigger) }),
	...(patch.effects === undefined 
		? {} 
		: { effects: patch.effects.map(effectToApi) }),
});

const automationQueryToApi = (query: AutomationQuery | undefined): AutomationListParams => ({
	...(query?.enabled === undefined 
		? {} 
		: { enabled: query.enabled }),
});

export { automationDraftToApi, automationPatchToApi, automationQueryToApi, conditionToApi, effectToApi };
