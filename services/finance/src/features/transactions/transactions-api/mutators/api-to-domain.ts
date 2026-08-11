import type { CategoryDto, ReceiptScanDto } from "../types.ts";
import type { ReceiptScan, TransactionCategory } from "@entity/transactions";


const categoryFromApi = (dto: CategoryDto): TransactionCategory => ({
	id: dto.id,
	label: dto.label,
});

const receiptScanFromApi = (dto: ReceiptScanDto): ReceiptScan => ({
	amount: parseFloat(dto.amount),
	currency: dto.currency,
	confidence: dto.confidence,
	fields: dto.fields.map((field) => ({ ...field })),
});

export { categoryFromApi, receiptScanFromApi };
