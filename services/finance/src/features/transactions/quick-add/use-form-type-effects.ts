import {useEffect, useRef} from "react";
import {UseFormReturn, useWatch} from "react-hook-form";
import {QuickAddSchema} from "@feature/transactions";


const useFormTypeEffects = (
	defaultValues: QuickAddSchema,
	form: UseFormReturn<QuickAddSchema>,
) => {
	const { resetField, reset, formState, trigger } = form;
	const type = useWatch({
		control: form.control,
		name: 'type'
	});

	const previousType = useRef(type);

	useEffect(() => {
		if (previousType.current === type) return;
		previousType.current = type;

		resetField('fromWallet');
		resetField('toWallet');
		void trigger();
	}, [type, resetField, trigger]);

	useEffect(() => {
		if (formState.isDirty) return;

		reset(defaultValues);
	}, [defaultValues, formState.isDirty, reset]);
}

export { useFormTypeEffects };