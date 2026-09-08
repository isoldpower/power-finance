import { useMemo } from "react";
import { useSettingsContext } from "@internal/shared";

import type { GoalFormSchema } from "./goal-form-schema.ts";


const useGoalFormInitials = (): GoalFormSchema => {
	const { mainCurrency } = useSettingsContext();

	return useMemo(() => ({
		name: '',
		target: '',
		finishAt: '',
		currency: mainCurrency,
	} satisfies GoalFormSchema), [mainCurrency]);
}

export { useGoalFormInitials };
