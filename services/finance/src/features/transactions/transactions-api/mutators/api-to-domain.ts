import { parseAmount } from "@shared/api";

import type { MoneyDto } from "@shared/api";
import type { Money } from "@entity/localization";
import type {
	ReceiptScan,
	Transaction,
	TransactionCategory,
	TransactionChain,
	TransactionDetails,
} from "@entity/transactions";
import type {
	CategoryDto,
	ReceiptScanDto,
	TransactionChainDto,
	TransactionDetailDto,
	TransactionDto,
} from "../types.ts";


const moneyFromApi = (dto: MoneyDto): Money => ({
	amount: parseAmount(dto.amount),
	currency: dto.currency,
});

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
	chainId: dto.chain_id,
});

const transactionDetailsFromApi = (dto: TransactionDetailDto): TransactionDetails => ({
	...transactionFromApi(dto),
	evidence: dto.evidence ? { url: dto.evidence.url } : null,
	analysis: { 
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
};
