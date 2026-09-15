import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createWebhookEndpoint } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import { optimisticWebhookId, useOptimisticWebhooks, webhookFromDraft } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { WebhookDraft } from "@entity/configuration";
import type { CreateWebhookResponse } from "../webhooks-api";
import type { WebhookCachesSnapshot } from "./optimistic";


interface CreateWebhookContext {
	snapshot: WebhookCachesSnapshot;
	temporaryId: string;
}

const useCreateWebhook = (): UseMutationResult<
	CreateWebhookResponse,
	Error,
	WebhookDraft,
	CreateWebhookContext
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticWebhooks();

	return useMutation<CreateWebhookResponse, Error, WebhookDraft, CreateWebhookContext>({
		mutationKey: [CACHE_KEYS.create],
		mutationFn: (draft: WebhookDraft) => createWebhookEndpoint({
			handler: apiContext.webhookServers.rest,
			draft,
		}),
		onMutate: async (draft: WebhookDraft) => {
			const snapshot = await optimistic.capture();
			const temporaryId = optimisticWebhookId();
			optimistic.applyCreate(webhookFromDraft(draft, temporaryId, new Date().toISOString()));

			return { snapshot, temporaryId };
		},
		onError: (_error, _draft, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (response, _draft, context) => {
			optimistic.applySettled(context.temporaryId, response.webhook);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onWebhookChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useCreateWebhook };
export type { CreateWebhookContext };
