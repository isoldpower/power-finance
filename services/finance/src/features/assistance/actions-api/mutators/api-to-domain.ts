import { parseAmount } from "@shared/api";

import type { MoneyDto } from "@shared/api";
import type { Action, ActionResolution, ResourceRef } from "@entity/assistance";
import type { Money } from "@entity/localization";
import type { ActionDto, ActionResolutionDto, ResourceRefDto } from "../types.ts";


const moneyFromApi = (dto: MoneyDto): Money => ({
	amount: parseAmount(dto.amount),
	currency: dto.currency,
});

const resourceRefFromApi = (dto: ResourceRefDto): ResourceRef => ({
	type: dto.type,
	id: dto.id,
});

const resolutionFromApi = (dto: ActionResolutionDto): ActionResolution => ({
	id: dto.id,
	label: dto.label,
	intent: dto.intent,
	applies: dto.applies,
});

const actionFromApi = (dto: ActionDto): Action => ({
	id: dto.id,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	deletedAt: dto.deleted_at,
	source: dto.source,
	kind: dto.kind,
	severity: dto.severity,
	status: dto.status,
	title: dto.title,
	body: dto.body,
	subject: dto.subject ? resourceRefFromApi(dto.subject) : null,
	money: dto.money ? moneyFromApi(dto.money) : null,
	groupKey: dto.group_key,
	occurrences: dto.occurrences,
	lastSeenAt: dto.last_seen_at,
	expiresAt: dto.expires_at,
	resolvedAt: dto.resolved_at,
	resolutions: dto.resolutions.map(resolutionFromApi),
});

export { actionFromApi, resourceRefFromApi };
