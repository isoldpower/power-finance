import type { Goal, GoalPatch } from "@entity/wallets";


const patchGoal = (goal: Goal, patch: GoalPatch): Goal => ({
	...goal,
	name: patch.name ?? goal.name,
	finishAt: patch.finishAt ?? goal.finishAt,
	target: patch.target === undefined
		? goal.target
		: { 
			amount: patch.target,
			currency: goal.currency,
		},
});

export { patchGoal };
