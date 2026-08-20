import { toAmountString } from "@shared/api";

import type { FilterLeaf, FilterNode } from "@shared/api";
import type { TransactionQuery } from "@entity/transactions";
import type { TransactionSearchBody, TransactionSearchField } from "../types.ts";


const MATCH_ALL: FilterLeaf<TransactionSearchField> = {
	field_name: 'created_at',
	operator: 'gte',
	value: '1970-01-01T00:00:00+00:00',
};

const transactionQueryToApi = (query: TransactionQuery): TransactionSearchBody => {
	const leaves: FilterNode<TransactionSearchField>[] = [];

	if (query.walletIds?.length) leaves.push({ 
		field_name: 'wallet_id',
		operator: 'in',
		value: query.walletIds 
	});
	if (query.chainId) leaves.push({ 
		field_name: 'chain_id',
		operator: 'eq',
		value: query.chainId 
	});
	if (query.currencies?.length) leaves.push({ 
		field_name: 'currency',
		operator: 'in',
		value: query.currencies 
	});
	if (query.categories?.length) leaves.push({ 
		field_name: 'category',
		operator: 'in',
		value: query.categories 
	});
	if (query.types?.length) leaves.push({ 
		field_name: 'type',
		operator: 'in',
		value: query.types 
	});
	if (query.search) leaves.push({ 
		or: [
			{ field_name: 'name', operator: query.caseSensitive ? 'contains' : 'icontains', value: query.search },
			{ field_name: 'category', operator: query.caseSensitive ? 'contains' : 'icontains', value: query.search },
		] 
	});
	if (query.minAmount !== undefined) leaves.push({
		field_name: 'amount',
		operator: 'gte',
		value: toAmountString(query.minAmount) 
	});
	if (query.maxAmount !== undefined) leaves.push({
		field_name: 'amount',
		operator: 'lte',
		value: toAmountString(query.maxAmount) 
	});
	if (query.createdAfter) leaves.push({
		field_name: 'created_at',
		operator: 'gte',
		value: query.createdAfter 
	});
	if (query.createdBefore) leaves.push({
		field_name: 'created_at',
		operator: 'lte',
		value: query.createdBefore 
	});

	return { 
		filter_body: { 
			and: leaves.length > 0 
				? leaves 
				: [MATCH_ALL] 
		}
	};
};

export { transactionQueryToApi };
