import type { GoalDraft, GoalPatch } from "@entity/wallets";
import type { GoalCreateBody, GoalPatchBody } from "../types.ts";


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

export { goalDraftToApi, goalPatchToApi };
