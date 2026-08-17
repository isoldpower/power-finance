import { z } from "zod";

const FILTER_OPERATORS = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'contains', 'icontains'] as const;

const ruleConditionSchema = z.object({
	field: z.string().min(1, "Pick a field"),
	operator: z.enum(FILTER_OPERATORS),
	value: z.string().min(1, "Enter a value"),
});

const ruleFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	icon: z.string().min(1, "Icon is required"),
	triggerType: z.enum(['event', 'schedule']),
	event: z.enum(['transaction.created', 'transaction.updated']).or(z.literal('')),
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
}).superRefine((values, context) => {
	if (values.triggerType === 'event' && values.event === '') {
		context.addIssue({ code: 'custom', path: ['event'], message: 'Select an event' });
	}

	if (values.effectType === 'set_category' && values.triggerType !== 'event') {
		context.addIssue({
			code: 'custom',
			path: ['effectType'],
			message: 'Categorising applies to transaction triggers only',
		});
	}

	if (values.effectType === 'set_category' && values.category.trim() === '') {
		context.addIssue({ code: 'custom', path: ['category'], message: 'Enter a category' });
	}

	if (values.effectType !== 'set_category' && values.effectType !== 'transfer' && values.title.trim() === '') {
		context.addIssue({ code: 'custom', path: ['title'], message: 'Enter a title' });
	}

	if (values.effectType === 'raise_action' && values.body.trim() === '') {
		context.addIssue({ code: 'custom', path: ['body'], message: 'Enter a body' });
	}

	if (values.effectType === 'transfer') {
		if (values.fromWalletId.trim() === '') {
			context.addIssue({ code: 'custom', path: ['fromWalletId'], message: 'Pick a source wallet' });
		}
		if (values.toWalletId.trim() === '') {
			context.addIssue({ code: 'custom', path: ['toWalletId'], message: 'Pick a target wallet' });
		}
		if (Number.isNaN(Number.parseFloat(values.amount))) {
			context.addIssue({ code: 'custom', path: ['amount'], message: 'Enter an amount' });
		}
		if (values.currency.trim() === '') {
			context.addIssue({ code: 'custom', path: ['currency'], message: 'Pick a currency' });
		}
	}
});

type RuleConditionSchema = z.infer<typeof ruleConditionSchema>;
type RuleFormSchema = z.infer<typeof ruleFormSchema>;

const RULE_FORM_DEFAULTS: RuleFormSchema = {
	name: '',
	icon: 'rule',
	triggerType: 'event',
	event: '',
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

export { RULE_FORM_DEFAULTS, ruleFormSchema };
export type { RuleConditionSchema, RuleFormSchema };
