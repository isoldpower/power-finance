import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

// Navigates the transactions list to a single wallet (filter + sort search params)
// and scrolls its section into view. `sectionId` is the DOM anchor of the target section.
const useViewWalletTransactions = (sectionId: string) => {
	const navigate = useNavigate();

	return useCallback((walletId: string) => {
		navigate({ to: '.', search: (prev) => ({ ...prev, wallet: walletId, sort: 'recent' }) })
			.then(() => {
				document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			})
			.catch((error: unknown) => { console.error(error); });
	}, [navigate, sectionId]);
};

export { useViewWalletTransactions };
