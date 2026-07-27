import type { AccountPreview, AccountDetailed, LedgerEntry } from "../types.ts";
import type { Account, LedgerEntryDto } from "@entity/accounts";


const accountPreviewToFlat = (
	response: AccountPreview
): Account => {
	return {
		id: response.id,
		name: response.name,
		kind: response.kind,
		type: response.type,
		balance: response.balance,
	};
}

const accountDetailedToFlat = (
	response: AccountDetailed
): Account => {
	return {
		id: response.id,
		name: response.name,
		kind: response.kind,
		type: response.type,
		balance: response.balance,
		createdAt: response.meta.created_at,
		updatedAt: response.meta.updated_at,
	};
}

const ledgerEntryToFlat = (
	response: LedgerEntry
): LedgerEntryDto => {
	return {
		id: response.id,
		occurredAt: response.occurred_at,
		description: response.description,
		icon: response.icon,
		side: response.side,
		amount: response.amount,
	};
}

export { accountPreviewToFlat, accountDetailedToFlat, ledgerEntryToFlat };
