import type { LedgerEntryDto } from "@feature/accounts/accounts-api";
import type { MoneyDto, PageParams, ResourceTimestamps, SearchPayload } from "@shared/api";


interface GoalDto extends ResourceTimestamps {
	id: string;
	name: string;
	url: string | null;
	currency: string;
	finish_at: string | null;
	target: MoneyDto;
	progress: MoneyDto;
}

interface GoalDetailDto extends GoalDto {
	history: LedgerEntryDto[];
}

interface GoalCreateBody {
	name: string;
	finish_at: string | null;
	currency: string;
	target: string;
}

interface GoalPatchBody {
	name?: string;
	finish_at?: string;
	target?: string;
}

type GoalSearchField = 'name' | 'currency' | 'target' | 'progress' | 'finish_at' | 'created_at';

type GoalSearchBody = SearchPayload<GoalSearchField>;

type GoalSearchParams = PageParams;

export type {
	GoalCreateBody,
	GoalDetailDto,
	GoalDto,
	GoalPatchBody,
	GoalSearchBody,
	GoalSearchField,
	GoalSearchParams,
};
