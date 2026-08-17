import type { TransactionDto } from "@feature/transactions/transactions-api";
import type { MoneyDto, PageParams, ResourceTimestamps, SearchOrder, SearchPayload } from "@shared/api";

interface WalletDto extends ResourceTimestamps {
	id: string;
	name: string;
	category: string;
	currency: string;
	money: MoneyDto;
	zero_balance: MoneyDto;
	favorite: boolean;
	color: string;
}

interface WalletFlowsDto {
	inflow: MoneyDto;
	outflow: MoneyDto;
}

interface WalletDetailDto extends WalletDto {
	last_month: WalletFlowsDto;
	recent: TransactionDto[];
}

interface WalletCreateBody {
	name: string;
	color: string;
	opening_balance: string;
	zero_balance: string;
	currency: string;
	category: string;
}

interface WalletPatchBody {
	name?: string;
	favorite?: boolean;
	category?: string;
	zero_balance?: string;
	color?: string;
}

type WalletSearchField = 'name' | 'currency' | 'balance' | 'created_at';

type WalletSearchBody = SearchPayload<WalletSearchField>;

interface WalletSearchParams extends PageParams {
	order?: SearchOrder;
}

export type {
	WalletCreateBody,
	WalletDetailDto,
	WalletDto,
	WalletFlowsDto,
	WalletPatchBody,
	WalletSearchBody,
	WalletSearchField,
	WalletSearchParams,
};
