import type { PageParams, ResourceTimestamps } from "@shared/api";


interface NotificationResourceRefDto {
	type: string;
	id: string;
}

type NotificationSeverityDto = 'info' | 'warning' | 'critical';

interface NotificationDto extends ResourceTimestamps {
	id: string;
	severity: NotificationSeverityDto;
	title: string;
	body: string;
	subject: NotificationResourceRefDto | null;
	acknowledged_at: string | null;
}

interface NotificationCountsDto {
	unacknowledged: number;
	total: number;
}

interface NotificationAcknowledgedDto {
	id: string;
	acknowledged_at: string;
}

interface NotificationListParams extends PageParams {
	acknowledged?: boolean;
	severity?: NotificationSeverityDto;
}

export type {
	NotificationAcknowledgedDto,
	NotificationCountsDto,
	NotificationDto,
	NotificationListParams,
	NotificationSeverityDto,
	NotificationResourceRefDto,
};
