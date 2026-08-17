import type { FilterNode, PageParams, ResourceTimestamps } from "@shared/api";


type AutomationTriggerTypeDto = 'event' | 'schedule';

type AutomationEventDto = 'transaction.created' | 'transaction.updated';

type AutomationScheduleDto = 'daily' | 'weekly' | 'monthly';

type AutomationEffectTypeDto = 'set_category' | 'notify' | 'raise_action' | 'transfer';

type EffectParamsDto = Record<string, unknown>;

interface AutomationEffectDto {
	type: string;
	params: EffectParamsDto;
}

interface AutomationTriggerDto {
	type: AutomationTriggerTypeDto;
	event: AutomationEventDto | null;
	schedule: AutomationScheduleDto | null;
	filter_body: FilterNode | null;
}

interface AutomationDto extends ResourceTimestamps {
	id: string;
	name: string;
	icon: string;
	enabled: boolean;
	trigger: AutomationTriggerDto;
	effects: AutomationEffectDto[];
	last_run_at: string | null;
	runs: number;
}

interface AutomationTriggerBody {
	type: AutomationTriggerTypeDto;
	event?: AutomationEventDto;
	schedule?: AutomationScheduleDto;
	filter_body?: FilterNode | null;
}

interface AutomationCreateBody {
	name: string;
	icon: string;
	enabled?: boolean;
	trigger: AutomationTriggerBody;
	effects: AutomationEffectDto[];
}

interface AutomationPatchBody {
	name?: string;
	icon?: string;
	enabled?: boolean;
	trigger?: AutomationTriggerBody;
	effects?: AutomationEffectDto[];
}

interface AutomationListParams extends PageParams {
	enabled?: boolean;
}

export type {
	AutomationCreateBody,
	AutomationDto,
	AutomationEffectDto,
	AutomationEffectTypeDto,
	AutomationEventDto,
	AutomationListParams,
	AutomationPatchBody,
	AutomationScheduleDto,
	AutomationTriggerBody,
	AutomationTriggerDto,
	AutomationTriggerTypeDto,
	EffectParamsDto,
};
