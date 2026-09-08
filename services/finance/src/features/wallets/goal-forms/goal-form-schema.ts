import { z } from "zod";


const goalFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	target: z.string().min(1, "Target is required"),
	finishAt: z.string().min(1, "Target date is required"),
	currency: z.string().min(1, "Currency is required"),
});

type GoalFormSchema = z.infer<typeof goalFormSchema>;

export { goalFormSchema };
export type { GoalFormSchema };
