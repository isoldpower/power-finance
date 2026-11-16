import { Controller } from "react-hook-form";
import { ManageCategoriesLink } from "@feature/navigation";

import { RuleField } from "./fields/RuleField.tsx";
import { RuleCategoryValue } from "./fields/value/RuleCategoryValue.tsx";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { RuleFormSchema } from "@feature/assistance";


interface RuleCategoryControlProps {
	control: Control<RuleFormSchema>;
	label: string;
	error?: string;
	disabled?: boolean;
}

const RuleCategoryControl: FC<RuleCategoryControlProps> = ({
	control,
	label,
	error,
	disabled,
}) => (
	<RuleField label={label} error={error} action={<ManageCategoriesLink />}>
		<Controller
			control={control}
			name="categoryId"
			render={({ field }) => (
				<RuleCategoryValue
					value={field.value}
					valueKey="id"
					multiple={false}
					disabled={disabled}
					onChange={field.onChange}
				/>
			)}
		/>
	</RuleField>
);

RuleCategoryControl.displayName = 'RuleCategoryControl';

export { RuleCategoryControl };
export type { RuleCategoryControlProps };
