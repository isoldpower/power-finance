import { resourceRefFromApi } from "@feature/assistance/actions-api";
import type { Notification, NotificationCounts } from "@entity/assistance";
import type { NotificationCountsDto, NotificationDto } from "../types.ts";

const notificationFromApi = (dto: NotificationDto): Notification => ({
	id: dto.id,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	deletedAt: dto.deleted_at,
	severity: dto.severity,
	title: dto.title,
	body: dto.body,
	subject: dto.subject ? resourceRefFromApi(dto.subject) : null,
	acknowledgedAt: dto.acknowledged_at,
});

const notificationCountsFromApi = (dto: NotificationCountsDto): NotificationCounts => ({
	unacknowledged: dto.unacknowledged,
	total: dto.total,
});

export { notificationCountsFromApi, notificationFromApi };
