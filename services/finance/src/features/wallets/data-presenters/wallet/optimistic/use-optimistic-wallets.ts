import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { patchWallet } from "./patch-wallet.ts";
import { WALLET_RESOURCE } from "./resource.ts";

import type { Wallet, WalletPatch } from "@entity/wallets";
import type { WalletCachesSnapshot } from "./types.ts";


interface UseOptimisticWalletsReturn {
	capture: () => Promise<WalletCachesSnapshot>;
	restore: (snapshot: WalletCachesSnapshot | undefined) => void;
	applyPatch: (id: string, patch: WalletPatch) => void;
	applyCreate: (wallet: Wallet) => void;
	applyRemove: (id: string, closedAt: string) => void;
	applySettled: (id: string, wallet: Wallet) => void;
}

const useOptimisticWallets = (): UseOptimisticWalletsReturn => {
	const cache = useOptimisticCache(WALLET_RESOURCE);

	const applyPatch = useCallback((id: string, patch: WalletPatch): void => {
		cache.patchPaged(id, (wallet) => patchWallet(wallet, patch));
		cache.patchDetails(id, (wallet) => patchWallet(wallet, patch));
	}, [cache]);

	const applyCreate = useCallback((wallet: Wallet): void => {
		cache.insertPaged([wallet]);
	}, [cache]);

	const applyRemove = useCallback((id: string, closedAt: string): void => {
		cache.removePaged([id]);
		cache.patchDetails(id, (wallet) => ({ ...wallet, deletedAt: closedAt }));
	}, [cache]);

	const applySettled = useCallback((id: string, wallet: Wallet): void => {
		cache.settlePaged(id, wallet);
		cache.settleDetails(id, (current) => ({ ...current, ...wallet }));
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

export { useOptimisticWallets };
export type { UseOptimisticWalletsReturn };
