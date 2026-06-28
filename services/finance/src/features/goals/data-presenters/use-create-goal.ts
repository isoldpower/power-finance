import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { createWallet } from "@feature/wallet";
import { DEFAULT_GOAL_COLOR } from "../model.ts";
import { CACHE_KEYS } from "./cache-config.ts";
import type { GoalCreatePayload } from "../model.ts";

const useCreateGoal = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [CACHE_KEYS.create],
		mutationFn: (data: GoalCreatePayload) => createWallet({
			handler: apiContext.walletServers.rest,
			payload: {
				data: {
					name: data.name,
					balance: { amount: 0, currency: 'USD' },
					credit: false,
					type: 'long-term-goal',
					goal: {
						icon: data.icon ?? '🎯',
						color: data.color ?? DEFAULT_GOAL_COLOR,
						target: data.target,
						monthly: data.monthly,
					},
				},
			},
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.wallets] });
		},
	});
};

export { useCreateGoal };
