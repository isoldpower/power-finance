import { TRANSACTION_FILTER_FIELDS } from "@feature/transactions/filtration";
import { WALLET_FILTER_FIELDS } from "@feature/wallets/filtration";

import type { FilterFieldOption } from "@shared/api";
import type { AutomationTriggerType } from "@entity/assistance";


const ruleFieldsFor = (triggerType: AutomationTriggerType): FilterFieldOption[] => {
	return triggerType === 'event' 
		? TRANSACTION_FILTER_FIELDS 
		: WALLET_FILTER_FIELDS;
};

export { ruleFieldsFor };
