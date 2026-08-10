import { z } from "zod";


const ruleFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	trigger: z.string().min(1, "Trigger is required"),
	action: z.string().min(1, "Action is required"),
	frequency: z.string().min(1, "Frequency is required"),
});

type RuleFormSchema = z.infer<typeof ruleFormSchema>;

const RULE_FORM_DEFAULTS: RuleFormSchema = {
	name: '',
	trigger: '',
	action: '',
	frequency: 'realtime',
};

export { ruleFormSchema, RULE_FORM_DEFAULTS };
export type { RuleFormSchema };
