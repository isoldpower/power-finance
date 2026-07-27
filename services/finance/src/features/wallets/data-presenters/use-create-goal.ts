import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { GOALS_CACHE_KEYS } from "./cache-config.ts";
import { DEFAULT_GOAL_COLOR, DEFAULT_WALLET_GRADIENT } from "@entity/wallets";
import { createWallet } from "../wallets-api";
import type { GoalCreatePayload } from "../wallets-api";


const useCreateGoal = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [GOALS_CACHE_KEYS.create],
		mutationFn: (data: GoalCreatePayload) => createWallet({
			handler: apiContext.walletServers.rest,
			payload: {
				data: {
					name: data.name,
					color: DEFAULT_WALLET_GRADIENT,
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
			void queryClient.invalidateQueries({ queryKey: [GOALS_CACHE_KEYS.wallets] });
		},
	});
};

export { useCreateGoal };
