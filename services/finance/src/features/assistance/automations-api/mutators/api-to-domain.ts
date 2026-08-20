import { parseAmount } from "@shared/api";

import type { FilterNode, MoneyDto } from "@shared/api";
import type {
	Automation,
	AutomationEffect,
	AutomationTrigger,
	RuleNode,
	Severity,
} from "@entity/assistance";
import type { Money } from "@entity/localization";
import type { AutomationDto, AutomationEffectDto, EffectParamsDto } from "../types.ts";


const SEVERITIES: Severity[] = ['info', 'warning', 'critical'];

const readString = (params: EffectParamsDto, key: string): string => {
	const value = params[key];

	return typeof value === 'string' ? value : '';
};

const readSeverity = (params: EffectParamsDto, key: string): Severity => {
	const value = readString(params, key);

	return SEVERITIES.find((severity) => severity === value) ?? 'info';
};

const readMoney = (params: EffectParamsDto, key: string): Money => {
	const value = params[key] as MoneyDto | undefined;

	return {
		amount: parseAmount(value?.amount ?? '0'),
		currency: value?.currency ?? '',
	};
};

const conditionFromApi = (node: FilterNode): RuleNode => {
	if ('and' in node) return { 
		combinator: 'and',
		nodes: node.and.map(conditionFromApi),
	};
	if ('or' in node) return { 
		combinator: 'or',
		nodes: node.or.map(conditionFromApi),
	};

	return { 
		field: node.field_name,
		operator: node.operator,
		value: node.value,
	};
};

const effectFromApi = (dto: AutomationEffectDto): AutomationEffect => {
	switch (dto.type) {
		case 'set_category':
			return { type: 'set_category', category: readString(dto.params, 'category') };
		case 'notify':
			return {
				type: 'notify',
				severity: readSeverity(dto.params, 'severity'),
				title: readString(dto.params, 'title'),
			};
		case 'raise_action':
			return {
				type: 'raise_action',
				severity: readSeverity(dto.params, 'severity'),
				title: readString(dto.params, 'title'),
				body: readString(dto.params, 'body'),
			};
		case 'transfer':
			return {
				type: 'transfer',
				fromWalletId: readString(dto.params, 'from_wallet_id'),
				toWalletId: readString(dto.params, 'to_wallet_id'),
				money: readMoney(dto.params, 'money'),
			};
		default:
			return { type: 'unknown', name: dto.type };
	}
};

const triggerFromApi = (dto: AutomationDto['trigger']): AutomationTrigger => ({
	type: dto.type,
	event: dto.event,
	schedule: dto.schedule,
	condition: dto.filter_body ? conditionFromApi(dto.filter_body) : null,
});

const automationFromApi = (dto: AutomationDto): Automation => ({
	id: dto.id,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	deletedAt: dto.deleted_at,
	name: dto.name,
	icon: dto.icon,
	enabled: dto.enabled,
	trigger: triggerFromApi(dto.trigger),
	effects: dto.effects.map(effectFromApi),
	lastRunAt: dto.last_run_at,
	runs: dto.runs,
});

export { automationFromApi, conditionFromApi, effectFromApi, triggerFromApi };
