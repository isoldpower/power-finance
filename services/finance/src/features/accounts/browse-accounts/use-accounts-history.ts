import { useMemo } from "react";

import { useAccountEntries } from "../data-presenters";
import { toLedgerHistoryView } from "@entity/accounts";


const useAccountHistory = (accountId: string) => {
	const { entries } = useAccountEntries(accountId);

	const history = useMemo(() => {
		return entries.map(toLedgerHistoryView);
	}, [entries]);

	return { history };
}

export { useAccountHistory };
