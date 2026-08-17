import { toAmountString } from "@shared/api";

import type {
	TransactionChainDraft,
	TransactionDraft,
	TransactionPatch,
} from "@entity/transactions";
import type { TransactionChainBody, TransactionCreateBody, TransactionPatchBody } from "../types.ts";


const transactionDraftToApi = (draft: TransactionDraft): TransactionCreateBody => ({
	name: draft.name,
	currency: draft.currency,
	amount: toAmountString(draft.amount),
	wallet_id: draft.walletId,
	origin: draft.origin,
	type: draft.type,
	category: draft.category,
	evidence: draft.evidence ? { url: draft.evidence.url } : null,
});

const transactionPatchToApi = (patch: TransactionPatch): TransactionPatchBody => ({
	...(patch.name === undefined ? {} : { name: patch.name }),
	...(patch.category === undefined ? {} : { category: patch.category }),
	...(patch.evidence === undefined ? {} : { evidence: patch.evidence }),
});

const transactionChainDraftToApi = (draft: TransactionChainDraft): TransactionChainBody => ({
	transactions: draft.entries.map((entry) => ({
		...transactionDraftToApi(entry),
		temporary_id: entry.temporaryId,
		after: entry.after,
	})),
});

export { transactionChainDraftToApi, transactionDraftToApi, transactionPatchToApi };
