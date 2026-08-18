import { UiFormField } from "@internal/ui-library";
import { EntryCategoryField } from "@entity/transactions";

import type { FC } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";


interface EntryCategoryControlProps<TValues extends FieldValues> {
	control: Control<TValues>;
	name: Path<TValues>;
	options: string[];
	className?: string;
	disabled?: boolean;
}

const EntryCategoryControl = <TValues extends FieldValues>({
	control,
	name,
	options,
	className,
	disabled,
}: EntryCategoryControlProps<TValues>) => (
	<UiFormField
		control={control}
		name={name}
		disabled={disabled}
		render={({ field }) => (
			<EntryCategoryField
				options={options}
				value={field.value}
				className={className}
				onChange={field.onChange}
			/>
		)}
	/>
);

(EntryCategoryControl as FC).displayName = 'EntryCategoryControl';

export { EntryCategoryControl };
export type { EntryCategoryControlProps };
