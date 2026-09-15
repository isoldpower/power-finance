import { v4 as uuidv4 } from "uuid";

import type { Wallet, WalletDraft } from "@entity/wallets";


const OPTIMISTIC_ID_PREFIX = 'optimistic';

const optimisticWalletId = (): string => `${OPTIMISTIC_ID_PREFIX}:${uuidv4()}`;

const isOptimisticWalletId = (id: string): boolean => id.startsWith(`${OPTIMISTIC_ID_PREFIX}:`);

const walletFromDraft = (draft: WalletDraft, id: string, createdAt: string): Wallet => ({
	id,
	name: draft.name,
	createdAt,
	updatedAt: null,
	deletedAt: null,
	category: draft.category,
	currency: draft.currency,
	balance: { amount: draft.openingBalance, currency: draft.currency },
	zeroBalance: { amount: draft.zeroBalance, currency: draft.currency },
	favorite: false,
	color: draft.color,
});

export { isOptimisticWalletId, optimisticWalletId, walletFromDraft };
