import { useMemo } from "react";

import { useAccountEntries } from "../data-presenters";
import { ledgerEntryToHistory } from "./account-view.ts";


const useAccountHistory = (accountId: string) => {
	const { entries } = useAccountEntries(accountId);

	const history = useMemo(() => {
		return entries.map(ledgerEntryToHistory);
	}, [entries]);

	return { history };
}

export { useAccountHistory };
