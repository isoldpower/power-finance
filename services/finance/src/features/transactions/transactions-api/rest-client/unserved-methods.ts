import type { ITransactionsRESTApiClient } from "./types.ts";


type UnservedTransactionMethods = Pick<ITransactionsRESTApiClient, 'listCategories' | 'scanReceipt'>;

const reported = new Set<string>();

function reportUnservedMethods(methods: string[]): void {
	if (!import.meta.env.DEV) {
		return;
	}

	for (const method of methods) {
		if (reported.has(method)) continue;

		reported.add(method);
		console.info(`[transactions-api] ${method} has no live endpoint and is served from the mock client`);
	}
}

export { reportUnservedMethods };
export type { UnservedTransactionMethods };
