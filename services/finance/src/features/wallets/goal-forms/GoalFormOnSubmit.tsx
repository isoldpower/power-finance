import { useCallback } from "react";

import { useCreateGoal } from "../data-presenters";
import { parseAmountInput } from "./goal-amount.ts";

import type { FC, FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";
import type { GoalFormSchema } from "./goal-form-schema.ts";
import type { CreateWalletResponse } from "../wallets-api";


interface GoalFormOnSubmitProps {
	handleSubmit: UseFormHandleSubmit<GoalFormSchema>;
	children?: ReactNode;
	className?: string;
	onBeforeSubmit?: () => void;
	onSuccess?: (result: CreateWalletResponse) => void;
	onError?: (error: unknown) => void;
}

const GoalFormOnSubmit: FC<GoalFormOnSubmitProps> = ({
	handleSubmit,
	children,
	className,
	onBeforeSubmit,
	onSuccess,
	onError,
}) => {
	const createGoal = useCreateGoal();

	const wrappedOnSubmit = useCallback(async (data: GoalFormSchema) => {
		if (onBeforeSubmit) onBeforeSubmit();

		try {
			const payload = await createGoal.mutateAsync({
				name: data.name,
				targetAmount: parseAmountInput(data.target),
				monthlyAmount: parseAmountInput(data.monthly),
				icon: data.icon?.trim() ? data.icon.trim() : undefined,
			});
			if (onSuccess) onSuccess(payload);
		} catch (error: unknown) {
			console.error(error);
			if (onError) onError(error);
		}
	}, [createGoal, onBeforeSubmit, onSuccess, onError]);

	const handleSubmitForm = useCallback((
		event: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(wrappedOnSubmit)(event).catch(console.error);
	}, [handleSubmit, wrappedOnSubmit]);

	return (
		<form onSubmit={handleSubmitForm} className={className}>
			{children}
		</form>
	);
}

GoalFormOnSubmit.displayName = 'GoalFormOnSubmit';

export { GoalFormOnSubmit };
export type { GoalFormOnSubmitProps };
