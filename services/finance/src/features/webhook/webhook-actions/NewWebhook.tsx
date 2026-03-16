import { FormEvent, ReactNode, useCallback } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useWebhooksListMethods } from "@feature/webhook";
import type { WebhookSchema } from "./schemas.ts";
import type { WebhookValuableFields } from "@feature/webhook";


interface NewWebhookProps {
	handleSubmit: UseFormHandleSubmit<WebhookSchema>;
	onSuccess?: (values: WebhookSchema) => void;
	children?: ReactNode;
}

function NewWebhook({
	handleSubmit,
	onSuccess,
	children,
}: NewWebhookProps) {
	const { createWebhook } = useWebhooksListMethods();

	const onSubmit = useCallback((data: WebhookSchema) => {
		const { title, url } = data;
		const webhookData = {
			url,
			title,
			subscribed: []
		} satisfies WebhookValuableFields;

		createWebhook(webhookData);
		if (onSuccess) onSuccess(data);
	}, [createWebhook, onSuccess]);

	const handleSubmitForm = useCallback((
		e: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(onSubmit)(e).catch(console.error);
	}, [handleSubmit, onSubmit]);

	return (
		<form onSubmit={handleSubmitForm}>
			{children}
		</form>
	);
}

NewWebhook.displayName = 'NewWebhook';

export { NewWebhook };
export type { NewWebhookProps };