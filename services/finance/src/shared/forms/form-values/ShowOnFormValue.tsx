import {ReactNode, useMemo} from "react";
import {FieldPath, FieldPathValue, FieldValues, UseFormReturn, useWatch} from "react-hook-form";


interface ShowOnFormValueProps<T extends FieldValues, K extends FieldPath<T>> {
	valueKey: K;
	showOn: FieldPathValue<T, K>[];
	children: ReactNode;
	control: UseFormReturn<T>['control'];
}

function ShowOnFormValue<T extends FieldValues, K extends FieldPath<T>>({
	valueKey,
	showOn,
	children,
	control,
}: ShowOnFormValueProps<T, K>){
	const trackedValue = useWatch({
		control,
		name: valueKey,
	});
	const isDisplayed = useMemo(() => {
		return showOn.includes(trackedValue);
	}, [trackedValue, showOn]);

	return isDisplayed ? children : null;
}

export { ShowOnFormValue };