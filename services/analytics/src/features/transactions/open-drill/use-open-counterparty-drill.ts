import { useCallback } from "react";
import { useAnalyticsFilters } from "@feature/filters";

import type { LedgerSide } from "@entity/filters";
import type { Counterparty } from "@entity/transactions";


const useOpenCounterpartyDrill = (side: LedgerSide): ((counterparty: Counterparty) => void) => {
	const openDrill = useAnalyticsFilters((state) => state.openDrill);

	return useCallback((counterparty: Counterparty) => {
		openDrill({ kind: 'counterparty', side, name: counterparty.name });
	}, [openDrill, side]);
};

export { useOpenCounterpartyDrill };
