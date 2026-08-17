import { toAmountString } from "@shared/api";
import type { FilterNode } from "@shared/api";
import type { WalletDraft, WalletPatch, WalletQuery } from "@entity/wallets";
import type { WalletCreateBody, WalletPatchBody, WalletSearchBody, WalletSearchField } from "../types.ts";

const MATCH_ALL: FilterNode<WalletSearchField> = {
	field_name: 'created_at',
	operator: 'gte',
	value: '1970-01-01T00:00:00+00:00',
};

const walletDraftToApi = (draft: WalletDraft): WalletCreateBody => ({
	name: draft.name,
	color: draft.color,
	opening_balance: toAmountString(draft.openingBalance),
	zero_balance: toAmountString(draft.zeroBalance),
	currency: draft.currency,
	category: draft.category,
});

const walletPatchToApi = (patch: WalletPatch): WalletPatchBody => ({
	...(patch.name === undefined ? {} : { name: patch.name }),
	...(patch.favorite === undefined ? {} : { favorite: patch.favorite }),
	...(patch.category === undefined ? {} : { category: patch.category }),
	...(patch.color === undefined ? {} : { color: patch.color }),
	...(patch.zeroBalance === undefined ? {} : { zero_balance: toAmountString(patch.zeroBalance) }),
});

const walletQueryToApi = (query: WalletQuery): WalletSearchBody => {
	const leaves: FilterNode<WalletSearchField>[] = [];

	if (query.name) {
		leaves.push({ field_name: 'name', operator: 'icontains', value: query.name });
	}
	if (query.currencies?.length) {
		leaves.push({ field_name: 'currency', operator: 'in', value: query.currencies });
	}
	if (query.minBalance !== undefined) {
		leaves.push({ field_name: 'balance', operator: 'gte', value: toAmountString(query.minBalance) });
	}
	if (query.maxBalance !== undefined) {
		leaves.push({ field_name: 'balance', operator: 'lte', value: toAmountString(query.maxBalance) });
	}
	if (query.createdAfter) {
		leaves.push({ field_name: 'created_at', operator: 'gte', value: query.createdAfter });
	}
	if (query.createdBefore) {
		leaves.push({ field_name: 'created_at', operator: 'lte', value: query.createdBefore });
	}

	return { filter_body: { and: leaves.length > 0 ? leaves : [MATCH_ALL] } };
};

export { walletDraftToApi, walletPatchToApi, walletQueryToApi };
