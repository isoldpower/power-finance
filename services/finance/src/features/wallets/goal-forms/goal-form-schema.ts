import { z } from "zod";


const goalFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	target: z.string().min(1, "Target is required"),
	monthly: z.string().min(1, "Monthly contribution is required"),
	icon: z.string().optional(),
});

type GoalFormSchema = z.infer<typeof goalFormSchema>;

const GOAL_FORM_DEFAULTS: GoalFormSchema = {
	name: '',
	target: '',
	monthly: '',
	icon: 'target',
};

export { goalFormSchema, GOAL_FORM_DEFAULTS };
export type { GoalFormSchema };
