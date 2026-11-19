import { parseAmount } from "@internal/shared";
import { moneyFromApi } from "@feature/localization/currencies-api";
import { optionalCategoryRefFromApi } from "@feature/categories/categories-api";

import type {
	ReceiptScan,
	Transaction,
	TransactionChain,
	TransactionDetails,
	TransactionPosting,
} from "@entity/transactions";
import type {
	ReceiptScanDto,
	TransactionChainDto,
	TransactionDetailDto,
	TransactionDto,
	TransactionPostingDto,
} from "../types.ts";


const transactionFromApi = (dto: TransactionDto): Transaction => ({
	id: dto.id,
	name: dto.name,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	deletedAt: dto.deleted_at,
	money: moneyFromApi(dto.money),
	type: dto.type,
	origin: dto.origin,
	wallet: { id: dto.wallet.id, name: dto.wallet.name },
	category: optionalCategoryRefFromApi(dto.category),
	chain: dto.chain ?? null,
});

const transactionPostingFromApi = (dto: TransactionPostingDto): TransactionPosting => ({
	id: dto.id,
	accountId: dto.account_id,
	title: dto.title,
	icon: dto.icon,
	debit: dto.debit,
	position: dto.position,
	money: moneyFromApi(dto.money),
});

const transactionDetailsFromApi = (dto: TransactionDetailDto): TransactionDetails => ({
	...transactionFromApi(dto),
	evidence: dto.evidence ? { url: dto.evidence.url } : null,
	analysis: dto.analysis === null ? null : {
		balanced: dto.analysis.balanced,
		comment: dto.analysis.comment,
	},
});

const transactionChainFromApi = (dto: TransactionChainDto): TransactionChain => ({
	chainId: dto.chain_id,
	transactions: dto.transactions.map(transactionFromApi),
});

const receiptScanFromApi = (dto: ReceiptScanDto): ReceiptScan => ({
	amount: parseAmount(dto.amount),
	currency: dto.currency,
	confidence: dto.confidence,
	fields: dto.fields.map((field) => ({ ...field })),
});

export {
	moneyFromApi,
	receiptScanFromApi,
	transactionChainFromApi,
	transactionDetailsFromApi,
	transactionFromApi,
	transactionPostingFromApi,
};
