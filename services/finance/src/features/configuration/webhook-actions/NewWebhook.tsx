import { useCallback } from "react";
import { useCreateWebhook } from "../data-presenters";

import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";
import type { WebhookEndpointSecret } from "@entity/configuration";
import type { WebhookSchema } from "./schemas.ts";


interface NewWebhookProps {
	handleSubmit: UseFormHandleSubmit<WebhookSchema>;
	onBeforeCreate?: () => void;
	onSuccess?: (webhook: WebhookEndpointSecret) => void;
	onFailure?: () => void;
	children?: ReactNode;
}

function NewWebhook({
	handleSubmit,
	onSuccess,
	onFailure,
	children,
	onBeforeCreate
}: NewWebhookProps) {
	const createWebhook = useCreateWebhook();

	const onSubmit = useCallback(async (data: WebhookSchema) => {
		if (onBeforeCreate) onBeforeCreate();

		try {
			const created = await createWebhook.mutateAsync({
				title: data.title,
				url: data.url,
				enabled: true,
			});

			if (onSuccess) onSuccess(created.webhook);
		} catch {
			if (onFailure) onFailure();
		}
	}, [createWebhook, onBeforeCreate, onFailure, onSuccess]);

	const handleSubmitForm = useCallback((
		e: FormEvent<HTMLFormElement>
	) => {
		void handleSubmit(onSubmit)(e);
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
