import type { TransactionDto } from "@feature/transactions";
import type { CategoryRefDto } from "@feature/categories/categories-api";
import type { MoneyDto, PageParams, ResourceTimestamps, SearchPayload } from "@internal/shared";


interface WalletDto extends ResourceTimestamps {
	id: string;
	name: string;
	category: CategoryRefDto | null;
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

type WalletPeriodDto = 'last_week' | 'last_month' | 'last_year' | 'all_time';

interface WalletDetailDto extends WalletDto {
	period: WalletFlowsDto;
	recent: TransactionDto[];
}

interface WalletDetailParams extends PageParams {
	period?: WalletPeriodDto;
}

interface WalletCreateBody {
	name: string;
	currency: string;
	category_id?: string | null;
	color?: string;
	zero_balance?: string;
	opening_balance?: string;
}

interface WalletReplaceBody {
	name: string;
	currency: string;
	category_id?: string | null;
	color?: string;
	favorite?: boolean;
	zero_balance?: string;
}

interface WalletPatchBody {
	name?: string;
	favorite?: boolean;
	category_id?: string | null;
	zero_balance?: string;
	color?: string;
}

type WalletSearchField = 'name' | 'currency' | 'balance' | 'category' | 'category_id' | 'created_at';

type WalletSearchBody = SearchPayload<WalletSearchField>;

type WalletSearchParams = PageParams;

export type {
	WalletCreateBody,
	WalletDetailDto,
	WalletDetailParams,
	WalletDto,
	WalletPeriodDto,
	WalletFlowsDto,
	WalletPatchBody,
	WalletReplaceBody,
	WalletSearchBody,
	WalletSearchField,
	WalletSearchParams,
};
