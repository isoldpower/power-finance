import type { MoneyDto, PageParams, ResourceTimestamps } from "@shared/api";


type ActionSourceDto = 'assistant' | 'scheduler';

type ActionSeverityDto = 'info' | 'warning' | 'critical';

type ActionStatusDto = 'pending' | 'resolved' | 'dismissed' | 'expired';

type ResolutionIntentDto = 'primary' | 'secondary' | 'danger';

interface ActionResourceRefDto {
	type: string;
	id: string;
}

interface ActionResolutionDto {
	id: string;
	label: string;
	intent: ResolutionIntentDto;
	applies: boolean;
}

interface ActionDto extends ResourceTimestamps {
	id: string;
	source: ActionSourceDto;
	kind: string;
	severity: ActionSeverityDto;
	status: ActionStatusDto;
	title: string;
	body: string;
	subject: ActionResourceRefDto | null;
	money: MoneyDto | null;
	group_key: string | null;
	occurrences: number;
	last_seen_at: string;
	expires_at: string | null;
	resolved_at: string | null;
	resolutions: ActionResolutionDto[];
}

interface ActionListParams extends PageParams {
	status?: ActionStatusDto;
	source?: ActionSourceDto;
	severity?: ActionSeverityDto;
}

interface ActionResolveBody {
	resolution_id: string;
}

export type {
	ActionDto,
	ActionListParams,
	ActionResolutionDto,
	ActionResolveBody,
	ActionSourceDto,
	ActionStatusDto,
	ResolutionIntentDto,
	ActionResourceRefDto,
	ActionSeverityDto,
};
