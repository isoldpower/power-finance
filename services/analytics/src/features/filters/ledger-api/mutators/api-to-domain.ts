import type { MoneyDto } from "@internal/shared";
import type { Money } from "@entity/shell";
import type { CategoryRef } from "@entity/spending";
import type { Dimensions, WalletOption } from "@entity/filters";
import type { TransactionBrief, WalletRef } from "@entity/transactions";
import type { CategoryRefDto, DimensionsDto, TransactionBriefDto, WalletOptionDto, WalletRefDto } from "../types.ts";


const moneyFromApi = (dto: MoneyDto): Money => ({
	amount: dto.amount,
	currency: dto.currency,
});

const categoryRefFromApi = (dto: CategoryRefDto): CategoryRef => ({
	id: dto.id,
	name: dto.name,
	isGlobal: dto.is_global,
});

const optionalCategoryRefFromApi = (dto: CategoryRefDto | null): CategoryRef | null => (
	dto === null ? null : categoryRefFromApi(dto)
);

const walletRefFromApi = (dto: WalletRefDto): WalletRef => ({
	id: dto.id,
	name: dto.name,
	color: dto.color,
});

const walletOptionFromApi = (dto: WalletOptionDto): WalletOption => ({
	id: dto.id,
	name: dto.name,
	color: dto.color,
	currency: dto.currency,
});

const dimensionsFromApi = (dto: DimensionsDto): Dimensions => ({
	wallets: dto.wallets.map(walletOptionFromApi),
	categories: {
		expense: dto.categories.expense.map(categoryRefFromApi),
		income: dto.categories.income.map(categoryRefFromApi),
	},
	firstTransactionAt: dto.first_transaction_at,
	lastTransactionAt: dto.last_transaction_at,
});

const transactionBriefFromApi = (dto: TransactionBriefDto): TransactionBrief => ({
	id: dto.id,
	name: dto.name,
	createdAt: dto.created_at,
	side: dto.type,
	category: optionalCategoryRefFromApi(dto.category),
	wallet: walletRefFromApi(dto.wallet),
	money: moneyFromApi(dto.money),
	converted: moneyFromApi(dto.converted),
});

export {
	categoryRefFromApi,
	optionalCategoryRefFromApi,
	dimensionsFromApi, moneyFromApi, transactionBriefFromApi, walletOptionFromApi, walletRefFromApi };
