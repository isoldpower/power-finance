import { categoryIdToApi } from "@feature/categories/categories-api";

import type {
	TransactionChainDraft,
	TransactionDraft,
	TransactionPatch,
} from "@entity/transactions";
import type { TransactionChainBody, TransactionCreateBody, TransactionPatchBody } from "../types.ts";


const transactionDraftToApi = (draft: TransactionDraft): TransactionCreateBody => ({
	name: draft.name,
	currency: draft.currency,
	amount: draft.amount,
	wallet_id: draft.walletId,
	origin: draft.origin,
	type: draft.type,
	category_id: categoryIdToApi(draft.category),
	evidence: draft.evidence ? { url: draft.evidence.url } : null,
});

const transactionPatchToApi = (patch: TransactionPatch): TransactionPatchBody => ({
	...(patch.name === undefined ? {} : { name: patch.name }),
	...(patch.category === undefined ? {} : { category_id: categoryIdToApi(patch.category) }),
	...(patch.evidence === undefined ? {} : { evidence: patch.evidence }),
});

const transactionChainDraftToApi = (draft: TransactionChainDraft): TransactionChainBody => ({
	transactions: draft.entries.map((entry) => ({
		...transactionDraftToApi(entry),
		temporary_id: entry.temporaryId,
		after: entry.after,
	})),
});

const ADJUSTED_TEMPORARY_ID = 'adjusted';
const ADJUSTMENT_TEMPORARY_ID = 'adjustment';

const transactionAdjustmentToApi = (adjustedId: string, draft: TransactionDraft): TransactionChainBody => ({
	transactions: [
		{ temporary_id: ADJUSTED_TEMPORARY_ID, after: null, transaction_id: adjustedId },
		{ ...transactionDraftToApi(draft), temporary_id: ADJUSTMENT_TEMPORARY_ID, after: ADJUSTED_TEMPORARY_ID },
	],
});

export { transactionAdjustmentToApi, transactionChainDraftToApi, transactionDraftToApi, transactionPatchToApi };
