import type { MoneyDto } from "@internal/shared";
import type {
	AnalyticsMetaDto,
	AnalyticsParamsDto,
	CategoryRefDto,
	WalletRefDto
} from "@feature/filters/ledger-api";


type FlowNodeKindDto = 'income_category' | 'wallet' | 'expense_category' | 'savings' | 'reserves';

interface FlowNodeDto {
	id: string;
	kind: FlowNodeKindDto;
	label: string;
	category: CategoryRefDto | null;
	wallet: WalletRefDto | null;
	amount: MoneyDto;
}

interface FlowLinkDto {
	source: string;
	target: string;
	amount: MoneyDto;
}

interface MoneyFlowDto {
	nodes: FlowNodeDto[];
	links: FlowLinkDto[];
	totals: {
		inflow: MoneyDto;
		outflow: MoneyDto;
	};
}

type MoneyFlowParamsDto = AnalyticsParamsDto;

type MoneyFlowMetaDto = AnalyticsMetaDto;

export type {
	FlowLinkDto,
	FlowNodeDto,
	FlowNodeKindDto,
	MoneyFlowDto,
	MoneyFlowMetaDto,
	MoneyFlowParamsDto
};
