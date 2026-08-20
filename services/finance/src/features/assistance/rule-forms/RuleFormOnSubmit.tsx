import { useCallback } from "react";

import { useCreateAutomation } from "../data-presenters";
import { ruleFormToDraft } from "./rule-form-draft.ts";

import type { FC, FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";
import type { Automation } from "@entity/assistance";
import type { RuleFormSchema } from "./rule-form-schema.ts";


interface RuleFormOnSubmitProps {
	handleSubmit: UseFormHandleSubmit<RuleFormSchema>;
	children?: ReactNode;
	className?: string;
	onBeforeSubmit?: () => void;
	onSuccess?: (automation: Automation) => void;
	onError?: (error: unknown) => void;
}

const RuleFormOnSubmit: FC<RuleFormOnSubmitProps> = ({
	handleSubmit,
	children,
	className,
	onBeforeSubmit,
	onSuccess,
	onError,
}) => {
	const createAutomation = useCreateAutomation();

	const wrappedOnSubmit = useCallback(async (data: RuleFormSchema) => {
		if (onBeforeSubmit) onBeforeSubmit();

		try {
			const payload = await createAutomation.mutateAsync(ruleFormToDraft(data));
			if (onSuccess) onSuccess(payload.automation);
		} catch (error: unknown) {
			console.error(error);
			if (onError) onError(error);
		}
	}, [createAutomation, onBeforeSubmit, onSuccess, onError]);

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

RuleFormOnSubmit.displayName = 'RuleFormOnSubmit';

export { RuleFormOnSubmit };
export type { RuleFormOnSubmitProps };
