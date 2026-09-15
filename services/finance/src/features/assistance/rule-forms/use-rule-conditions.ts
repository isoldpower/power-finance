import { useCallback, useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { firstFieldValue } from "./condition-options.ts";
import { filterPolicySource } from "./filter-policy.ts";
import { ruleFieldsFor } from "./rule-fields.ts";

import type { Control } from "react-hook-form";
import type { FilterFieldOption } from "@shared/api";
import type { FilterPolicySource } from "./filter-policy.ts";
import type { RuleFormSchema } from "./rule-form-schema.ts";


interface UseRuleConditionsReturn {
	conditionRows: { id: string }[];
	filterFields: FilterFieldOption[];
	policySource: FilterPolicySource;
	onAppend: () => void;
	onRemove: (index: number) => void;
}

const useRuleConditions = (control: Control<RuleFormSchema>): UseRuleConditionsReturn => {
	const { fields: conditionRows, append, remove } = useFieldArray({ control, name: 'conditions' });
	const triggerType = useWatch({ control, name: 'triggerType' });
	const event = useWatch({ control, name: 'event' });
	const filterFields = useMemo(() => ruleFieldsFor(triggerType), [triggerType]);
	const policySource = useMemo(
		() => filterPolicySource(triggerType, event),
		[triggerType, event]
	);

	const onAppend = useCallback(() => {
		append({
			field: firstFieldValue(filterFields),
			operator: 'eq',
			value: '',
		});
	}, [append, filterFields]);

	return { conditionRows, filterFields, policySource, onAppend, onRemove: remove };
};

export { useRuleConditions };
export type { UseRuleConditionsReturn };
