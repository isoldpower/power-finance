// @reserved-api - wired to the API and intentionally not consumed yet; awaiting post-MVP flows. NOT dead code: do not delete, do not drop from barrels.
import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { rotateWebhookSecret as rotateWebhookSecretApi } from "../webhooks-api";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./cache-config.ts";
import type { RotateWebhookSecretResponse } from "../webhooks-api";


interface UseRotateWebhookSecretReturn {
	meta: {
		rotateMutation: UseMutationResult<RotateWebhookSecretResponse, Error, string>;
	}
	rotateSecret: (id: string) => Promise<RotateWebhookSecretResponse>;
}

const useRotateWebhookSecret = (): UseRotateWebhookSecretReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();

	const rotateMutation = useMutation({
		mutationFn: (id: string) => rotateWebhookSecretApi({
			handler: apiContext.webhookServers.rest,
			payload: { data: { id } },
		}),
		mutationKey: [CACHE_KEYS.rotate],
		onSuccess: (webhook) => {
			void client.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
			void client.invalidateQueries({ queryKey: [CACHE_KEYS.fetch, webhook.id] });
		},
	});

	const rotateSecret = useCallback((id: string) => {
		return rotateMutation.mutateAsync(id);
	}, [rotateMutation]);

	return useMemo(() => ({
		meta: { rotateMutation },
		rotateSecret,
	}), [rotateMutation, rotateSecret]);
};

export { useRotateWebhookSecret };
export type { UseRotateWebhookSecretReturn };
