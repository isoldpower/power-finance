import type { PageParams, ResourceTimestamps } from "@shared/api";
import type { ResourceRefDto, SeverityDto } from "@feature/assistance/actions-api";

interface NotificationDto extends ResourceTimestamps {
	id: string;
	severity: SeverityDto;
	title: string;
	body: string;
	subject: ResourceRefDto | null;
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
	severity?: SeverityDto;
}

export type {
	NotificationAcknowledgedDto,
	NotificationCountsDto,
	NotificationDto,
	NotificationListParams,
};
