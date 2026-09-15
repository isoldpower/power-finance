import { parseAmount } from "@shared/api";
import { moneyFromApi } from "@feature/localization/currencies-api";

import type {
	ReceiptScan,
	Transaction,
	TransactionCategory,
	TransactionChain,
	TransactionDetails,
	TransactionPosting,
} from "@entity/transactions";
import type {
	CategoryDto,
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
	category: dto.category,
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

const categoryFromApi = (dto: CategoryDto): TransactionCategory => ({
	id: dto.id,
	label: dto.label,
});

const receiptScanFromApi = (dto: ReceiptScanDto): ReceiptScan => ({
	amount: parseAmount(dto.amount),
	currency: dto.currency,
	confidence: dto.confidence,
	fields: dto.fields.map((field) => ({ ...field })),
});

export {
	categoryFromApi,
	moneyFromApi,
	receiptScanFromApi,
	transactionChainFromApi,
	transactionDetailsFromApi,
	transactionFromApi,
	transactionPostingFromApi,
};
