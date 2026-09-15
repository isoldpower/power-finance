import { useMemo } from "react";
import { useTransactionCategories } from "@feature/transactions";

import { RuleOptionValue } from "./RuleOptionValue.tsx";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


interface RuleCategoryValueProps {
	value: string;
	multiple: boolean;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleCategoryValue: FC<RuleCategoryValueProps> = ({ value, multiple, disabled, onChange }) => {
	const { categories } = useTransactionCategories();
	const options = useMemo<SelectOption[]>(
		() => categories.map((category) => ({ value: category.label, label: category.label })),
		[categories]
	);

	return (
		<RuleOptionValue
			value={value}
			options={options}
			multiple={multiple}
			searchable
			placeholder="Pick a category"
			searchPlaceholder="Search categories…"
			emptyLabel="No categories match."
			disabled={disabled}
			onChange={onChange}
		/>
	);
};

RuleCategoryValue.displayName = 'RuleCategoryValue';

export { RuleCategoryValue };
export type { RuleCategoryValueProps };
