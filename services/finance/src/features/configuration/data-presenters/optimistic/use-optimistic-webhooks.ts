import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { patchWebhook } from "./patch-webhook.ts";
import { WEBHOOK_RESOURCE } from "./resource.ts";

import type { WebhookEndpoint, WebhookPatch } from "@entity/configuration";
import type { WebhookCachesSnapshot } from "./types.ts";


interface UseOptimisticWebhooksReturn {
	capture: () => Promise<WebhookCachesSnapshot>;
	restore: (snapshot: WebhookCachesSnapshot | undefined) => void;
	applyPatch: (id: string, patch: WebhookPatch) => void;
	applyCreate: (webhook: WebhookEndpoint) => void;
	applyRemove: (id: string) => void;
	applySettled: (id: string, webhook: WebhookEndpoint) => void;
}

const useOptimisticWebhooks = (): UseOptimisticWebhooksReturn => {
	const cache = useOptimisticCache(WEBHOOK_RESOURCE);

	const applyPatch = useCallback((id: string, patch: WebhookPatch): void => {
		cache.patchPaged(id, (webhook) => patchWebhook(webhook, patch));
		cache.patchDetails(id, (webhook) => patchWebhook(webhook, patch));
	}, [cache]);

	const applyCreate = useCallback((webhook: WebhookEndpoint): void => {
		cache.insertPaged([webhook]);
	}, [cache]);

	const applyRemove = useCallback((id: string): void => {
		cache.removePaged([id]);
	}, [cache]);

	const applySettled = useCallback((id: string, webhook: WebhookEndpoint): void => {
		cache.settlePaged(id, webhook);
		cache.settleDetails(id, () => webhook);
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		applyPatch,
		applyCreate,
		applyRemove,
		applySettled,
	}), [cache.capture, cache.restore, applyPatch, applyCreate, applyRemove, applySettled]);
};

export { useOptimisticWebhooks };
export type { UseOptimisticWebhooksReturn };
