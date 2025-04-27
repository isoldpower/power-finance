import {ReactNode, useEffect} from "react";
import type {FieldValues, Path, UseFormReturn} from "react-hook-form";

interface ShowOnValueProps<T extends FieldValues> {
	children: ReactNode;
	form: UseFormReturn<T>;
	value: Path<T>;
	targetValue: T[keyof T];
	dependentValues?: Path<T>[];
}

function ShowOnValue<T extends FieldValues>({
	children,
	form,
	value,
	targetValue,
	dependentValues = []
}: ShowOnValueProps<T>) {
	const currentValue = form.watch([value]);
	useEffect(() => {
		if (currentValue.includes(targetValue)) return;

		dependentValues?.map((dependency) => {
			if (form.getFieldState(dependency)?.isDirty) {
				form.clearErrors(dependency);
				form.resetField(dependency);
			}
		})
	}, [currentValue]);

	return currentValue.includes(targetValue) && (
		<>
			{children}
		</>
	);
}

ShowOnValue.displayName = 'ShowOnValue';

export { ShowOnValue };
export type { ShowOnValueProps };