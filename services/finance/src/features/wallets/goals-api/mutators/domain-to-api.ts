import { toAmountString } from "@shared/api";

import type { FilterNode } from "@shared/api";
import type { GoalDraft, GoalPatch, GoalQuery } from "@entity/wallets";
import type { GoalCreateBody, GoalPatchBody, GoalSearchBody, GoalSearchField } from "../types.ts";


const goalDraftToApi = (draft: GoalDraft): GoalCreateBody => ({
	name: draft.name,
	finish_at: draft.finishAt,
	currency: draft.currency,
	target: draft.target,
});

const goalPatchToApi = (patch: GoalPatch): GoalPatchBody => ({
	...(patch.name === undefined 
		? {} 
		: { name: patch.name }),
	...(patch.finishAt === undefined 
		? {} 
		: { finish_at: patch.finishAt }),
	...(patch.target === undefined 
		? {} 
		: { target: patch.target }),
});

const MATCH_ALL: FilterNode<GoalSearchField> = {
	field_name: 'created_at',
	operator: 'gte',
	value: '1970-01-01T00:00:00+00:00',
};

const goalQueryToApi = (query: GoalQuery): GoalSearchBody => {
	const leaves: FilterNode<GoalSearchField>[] = [];

	if (query.name) {
		leaves.push({ field_name: 'name', operator: 'icontains', value: query.name });
	}
	if (query.currencies?.length) {
		leaves.push({ field_name: 'currency', operator: 'in', value: query.currencies });
	}
	if (query.minTarget !== undefined) {
		leaves.push({ field_name: 'target', operator: 'gte', value: toAmountString(query.minTarget) });
	}
	if (query.maxTarget !== undefined) {
		leaves.push({ field_name: 'target', operator: 'lte', value: toAmountString(query.maxTarget) });
	}
	if (query.minProgress !== undefined) {
		leaves.push({ field_name: 'progress', operator: 'gte', value: toAmountString(query.minProgress) });
	}
	if (query.maxProgress !== undefined) {
		leaves.push({ field_name: 'progress', operator: 'lte', value: toAmountString(query.maxProgress) });
	}
	if (query.finishAfter) {
		leaves.push({ field_name: 'finish_at', operator: 'gte', value: query.finishAfter });
	}
	if (query.finishBefore) {
		leaves.push({ field_name: 'finish_at', operator: 'lte', value: query.finishBefore });
	}
	if (query.createdAfter) {
		leaves.push({ field_name: 'created_at', operator: 'gte', value: query.createdAfter });
	}
	if (query.createdBefore) {
		leaves.push({ field_name: 'created_at', operator: 'lte', value: query.createdBefore });
	}

	return { filter_body: { and: leaves.length > 0 ? leaves : [MATCH_ALL] } };
};

export { goalDraftToApi, goalPatchToApi, goalQueryToApi };
