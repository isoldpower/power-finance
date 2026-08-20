import { UiFormField } from "@internal/ui-library";
import { EntryTypeSelector } from "@entity/transactions";

import type { FC } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";


interface EntryTypeControlProps<TValues extends FieldValues> {
	control: Control<TValues>;
	name: Path<TValues>;
	className?: string;
	disabled?: boolean;
}

const EntryTypeControl = <TValues extends FieldValues>({
	control,
	name,
	className,
	disabled,
}: EntryTypeControlProps<TValues>) => (
	<UiFormField
		control={control}
		name={name}
		disabled={disabled}
		render={({ field }) => (
			<EntryTypeSelector
				value={field.value}
				className={className}
				onChange={field.onChange}
			/>
		)}
	/>
);

(EntryTypeControl as FC).displayName = 'EntryTypeControl';

export { EntryTypeControl };
export type { EntryTypeControlProps };
