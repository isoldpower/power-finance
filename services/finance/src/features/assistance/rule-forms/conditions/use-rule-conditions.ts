import { useCallback, useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { composeEvent } from "../events";
import { filterPolicySource } from "../filters";
import { blankCondition } from "./condition-cascade.ts";
import { ruleFieldsFor } from "./rule-fields.ts";

import type { Control } from "react-hook-form";
import type { FilterFieldOption } from "@shared/api";
import type { FilterPolicySource } from "../filters";
import type { RuleFormSchema } from "../schema";


interface UseRuleConditionsReturn {
	conditionRows: { id: string }[];
	filterFields: FilterFieldOption[];
	policySource: FilterPolicySource;
	onAppend: () => void;
	onRemove: (index: number) => void;
	onEventCategoryChange: () => void;
	onEventChange: () => void;
	onTriggerTypeChange: () => void;
}

function useRuleConditions(control: Control<RuleFormSchema>): UseRuleConditionsReturn {
	const {
		fields: conditionRows,
		append,
		remove,
		replace,
	} = useFieldArray({ control, name: 'conditions' });
	const triggerType = useWatch({ control, name: 'triggerType' });
	const eventCategory = useWatch({ control, name: 'eventCategory' });
	const eventName = useWatch({ control, name: 'eventName' });
	const event = useMemo(
		() => composeEvent(eventCategory, eventName),
		[eventCategory, eventName]
	);
	const filterFields = useMemo(() => ruleFieldsFor(triggerType), [triggerType]);
	const policySource = useMemo(
		() => filterPolicySource(triggerType, event),
		[triggerType, event]
	);

	const onAppend = useCallback(() => {
		append(blankCondition(filterFields));
	}, [append, filterFields]);

	const clearRows = useCallback(() => {
		replace([]);
	}, [replace]);

	return {
		conditionRows,
		filterFields,
		policySource,
		onAppend,
		onRemove: remove,
		onEventCategoryChange: clearRows,
		onEventChange: clearRows,
		onTriggerTypeChange: clearRows,
	};
}

export { useRuleConditions };
export type { UseRuleConditionsReturn };
