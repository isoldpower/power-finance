import type { MoneyDto, PageParams, ResourceTimestamps } from "@shared/api";

type ActionSourceDto = 'assistant' | 'scheduler';

type SeverityDto = 'info' | 'warning' | 'critical';

type ActionStatusDto = 'pending' | 'resolved' | 'dismissed' | 'expired';

type ResolutionIntentDto = 'primary' | 'secondary' | 'danger';

interface ResourceRefDto {
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
	severity: SeverityDto;
	status: ActionStatusDto;
	title: string;
	body: string;
	subject: ResourceRefDto | null;
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
	severity?: SeverityDto;
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
	ResourceRefDto,
	SeverityDto,
};
