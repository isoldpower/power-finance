import {ReactNode, useMemo} from "react";
import {FieldPath, FieldPathValue, FieldValues, UseFormReturn, useWatch} from "react-hook-form";


interface HideOnFormValueProps<T extends FieldValues, K extends FieldPath<T>> {
	valueKey: K;
	hideOn: FieldPathValue<T, K>[];
	children: ReactNode;
	control: UseFormReturn<T>['control'];
}

function HideOnFormValue<T extends FieldValues, K extends FieldPath<T>>({
	valueKey,
	hideOn,
	children,
	control,
}: HideOnFormValueProps<T, K>){
	const trackedValue = useWatch({
		control,
		name: valueKey,
	});
	const isDisplayed = useMemo(() => {
		return !hideOn.includes(trackedValue);
	}, [trackedValue, hideOn]);
	
	return isDisplayed ? children : null;
}

export { HideOnFormValue };