import { useMemo } from "react";
import { useCategories } from "@feature/categories";

import { RuleOptionValue } from "./RuleOptionValue.tsx";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


type RuleCategoryValueKey = 'id' | 'name';

interface RuleCategoryValueProps {
	value: string;
	valueKey?: RuleCategoryValueKey;
	multiple: boolean;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleCategoryValue: FC<RuleCategoryValueProps> = ({
	value,
	valueKey = 'name',
	multiple,
	disabled,
	onChange,
}) => {
	const { categories } = useCategories('transaction');
	const options = useMemo<SelectOption[]>(
		() => categories.map((category) => ({ value: category[valueKey], label: category.name })),
		[categories, valueKey]
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
export type { RuleCategoryValueKey, RuleCategoryValueProps };
