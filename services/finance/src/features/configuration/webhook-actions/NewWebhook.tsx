import { FormEvent, ReactNode, useCallback } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useWebhooksListMethods } from "@feature/configuration";
import type { CreateWebhookResponse } from "@feature/configuration";
import type { WebhookSchema } from "./schemas.ts";
import type { WebhookValuableFields } from "@feature/configuration";


interface NewWebhookProps {
	handleSubmit: UseFormHandleSubmit<WebhookSchema>;
	onBeforeCreate?: (data: WebhookSchema) => void;
	onSuccess?: (result: CreateWebhookResponse) => void;
	children?: ReactNode;
}

function NewWebhook({
	handleSubmit,
	onSuccess,
	children,
	onBeforeCreate
}: NewWebhookProps) {
	const { createWebhook } = useWebhooksListMethods();

	const onSubmit = useCallback(async (data: WebhookSchema) => {
		const { title, url } = data;
		const webhookData = {
			url,
			title,
		} satisfies WebhookValuableFields;

		if (onBeforeCreate) onBeforeCreate(webhookData);
		const createResponse = await createWebhook(webhookData);
		if (onSuccess) onSuccess(createResponse);
	}, [createWebhook, onBeforeCreate, onSuccess]);

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