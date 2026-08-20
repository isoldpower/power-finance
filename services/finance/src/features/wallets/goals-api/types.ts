import type { LedgerEntryDto } from "@feature/accounts/accounts-api";
import type { MoneyDto, ResourceTimestamps } from "@shared/api";


interface GoalDto extends ResourceTimestamps {
	id: string;
	name: string;
	url: string | null;
	currency: string;
	finish_at: string;
	target: MoneyDto;
	progress: MoneyDto;
}

interface GoalDetailDto extends GoalDto {
	history: LedgerEntryDto[];
}

interface GoalCreateBody {
	name: string;
	finish_at: string;
	currency: string;
	target: string;
}

interface GoalPatchBody {
	name?: string;
	finish_at?: string;
	target?: string;
}

export type { GoalCreateBody, GoalDetailDto, GoalDto, GoalPatchBody };
