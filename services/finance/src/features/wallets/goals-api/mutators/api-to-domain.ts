import { moneyFromApi } from "@feature/localization/currencies-api";

import type { Goal } from "@entity/wallets";
import type { GoalDto } from "../types.ts";


const goalFromApi = (dto: GoalDto): Goal => ({
	id: dto.id,
	name: dto.name,
	url: dto.url,
	currency: dto.currency,
	finishAt: dto.finish_at,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	deletedAt: dto.deleted_at,
	target: moneyFromApi(dto.target),
	progress: moneyFromApi(dto.progress),
});

export { goalFromApi, moneyFromApi };
