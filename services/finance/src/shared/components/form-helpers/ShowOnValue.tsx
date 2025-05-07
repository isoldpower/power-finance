import {ReactNode, useEffect} from "react";
import type {FieldValues, Path, UseFormReturn} from "react-hook-form";

interface ShowOnValueProps<T extends FieldValues> {
	children: ReactNode;
	form: UseFormReturn<T>;
	value: Path<T>;
	targetValue: T[keyof T][];
	dependentValues?: Path<T>[];
}

function ShowOnValue<T extends FieldValues>({
	children,
	form,
	value,
	targetValue,
	dependentValues = []
}: ShowOnValueProps<T>) {
	const currentValue = form.watch(value);
	useEffect(() => {
		if (targetValue.includes(currentValue)) return;

		dependentValues.map((dependency) => {
			if (form.getFieldState(dependency).isDirty) {
				form.clearErrors(dependency);
				form.resetField(dependency);
			}
		})
	}, [currentValue, dependentValues, form, targetValue]);

	return targetValue.includes(currentValue) && (
		<>
			{children}
		</>
	);
}

ShowOnValue.displayName = 'ShowOnValue';

export { ShowOnValue };
export type { ShowOnValueProps };