import { z } from "zod";


const goalFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	target: z.string().min(1, "Target is required"),
	finishAt: z.string().min(1, "Target date is required"),
});

type GoalFormSchema = z.infer<typeof goalFormSchema>;

const GOAL_FORM_DEFAULTS: GoalFormSchema = {
	name: '',
	target: '',
	finishAt: '',
};

export { goalFormSchema, GOAL_FORM_DEFAULTS };
export type { GoalFormSchema };
