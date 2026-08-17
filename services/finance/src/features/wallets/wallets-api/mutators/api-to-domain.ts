import { parseAmount } from "@shared/api";
import type { MoneyDto } from "@shared/api";
import type { Money } from "@entity/localization";
import type { Wallet, WalletDetails, WalletFlows } from "@entity/wallets";
import type { WalletDetailDto, WalletDto, WalletFlowsDto } from "../types.ts";

const moneyFromApi = (dto: MoneyDto): Money => ({
	amount: parseAmount(dto.amount),
	currency: dto.currency,
});

const walletFromApi = (dto: WalletDto): Wallet => ({
	id: dto.id,
	name: dto.name,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	deletedAt: dto.deleted_at,
	category: dto.category,
	currency: dto.currency,
	balance: moneyFromApi(dto.money),
	zeroBalance: moneyFromApi(dto.zero_balance),
	favorite: dto.favorite,
	color: dto.color,
});

const walletFlowsFromApi = (dto: WalletFlowsDto): WalletFlows => ({
	inflow: moneyFromApi(dto.inflow),
	outflow: moneyFromApi(dto.outflow),
});

const walletDetailsFromApi = (dto: WalletDetailDto): WalletDetails => ({
	...walletFromApi(dto),
	lastMonth: walletFlowsFromApi(dto.last_month),
});

export { moneyFromApi, walletDetailsFromApi, walletFlowsFromApi, walletFromApi };
