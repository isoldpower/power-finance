import type { RuleFormSchema } from "./rule-form-schema.ts";


const RULE_FORM_DEFAULTS: RuleFormSchema = {
	name: '',
	icon: 'rule',
	triggerType: 'event',
	eventCategory: 'transaction',
	eventName: '',
	schedule: 'monthly',
	combinator: 'and',
	conditions: [],
	effectType: 'set_category',
	category: '',
	severity: 'info',
	title: '',
	body: '',
	fromWalletId: '',
	toWalletId: '',
	amount: '',
	currency: 'USD',
};

export { RULE_FORM_DEFAULTS };
