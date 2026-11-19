import { delay } from "@internal/shared";
import { MockLedger, iso, isTransfer, walletOptionDto } from "./mock-ledger";

import type { CategoryCatalogDto, CategoryRefDto } from "../types.ts";
import type { DimensionsRequest, DimensionsResponse, ILedgerRESTApiClient } from "./types.ts";


const distinctCategories = (ledger: MockLedger, side: 'income' | 'expense'): CategoryRefDto[] => {
	const used = new Map<string, CategoryRefDto>();

	ledger.rows().forEach((row) => {
		if (!isTransfer(row) && row.side === side && row.category !== null) {
			used.set(row.category.id, row.category);
		}
	});

	return [...used.values()].sort((left, right) => left.name.localeCompare(right.name));
};

class LedgerMockRESTApiClient implements ILedgerRESTApiClient {
	public async getDimensions(payload: DimensionsRequest): Promise<DimensionsResponse> {
		await delay();

		const ledger = new MockLedger();
		const rows = ledger.rows();
		const wallets = [...ledger.wallets()].sort((left, right) => (
			Number(right.favorite) - Number(left.favorite) || left.name.localeCompare(right.name)
		));
		const categories: CategoryCatalogDto = {
			expense: distinctCategories(ledger, 'expense'),
			income: distinctCategories(ledger, 'income'),
		};

		return {
			data: {
				wallets: wallets.map(walletOptionDto),
				categories,
				first_transaction_at: rows.length > 0 ? iso(rows[0].createdAt) : null,
				last_transaction_at: rows.length > 0 ? iso(rows[rows.length - 1].createdAt) : null,
			},
			meta: {
				currency: payload.params.currency,
				generated_at: new Date().toISOString(),
			},
		};
	}
}

export { LedgerMockRESTApiClient };
