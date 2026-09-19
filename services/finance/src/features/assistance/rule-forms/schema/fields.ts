import { z } from "zod";

import { FILTER_OPERATORS } from "./constants.ts";


const ruleConditionSchema = z.object({
	field: z.string().min(1, "Pick a field"),
	operator: z.enum(FILTER_OPERATORS),
	value: z.string().min(1, "Enter a value"),
});

const ruleFormFields = z.object({
	name: z.string().min(1, "Name is required"),
	icon: z.string().min(1, "Icon is required"),
	triggerType: z.enum(['event', 'schedule']),
	eventCategory: z.enum(['transaction']),
	eventName: z.enum(['created', 'changed']).or(z.literal('')),
	schedule: z.enum(['daily', 'weekly', 'monthly']),
	combinator: z.enum(['and', 'or']),
	conditions: z.array(ruleConditionSchema),
	effectType: z.enum(['set_category', 'notify', 'raise_action', 'transfer']),
	category: z.string(),
	severity: z.enum(['info', 'warning', 'critical']),
	title: z.string(),
	body: z.string(),
	fromWalletId: z.string(),
	toWalletId: z.string(),
	amount: z.string(),
	currency: z.string(),
});

type RuleConditionSchema = z.infer<typeof ruleConditionSchema>;
type RuleFormValues = z.infer<typeof ruleFormFields>;
type RuleEffectType = RuleFormValues['effectType'];
type RuleTriggerType = RuleFormValues['triggerType'];

export { ruleConditionSchema, ruleFormFields };
export type { RuleConditionSchema, RuleEffectType, RuleFormValues, RuleTriggerType };
