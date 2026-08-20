import type { ActionResolution } from "../types.ts";


interface ResolutionChoice {
	recommended: ActionResolution | null;
	alternatives: ActionResolution[];
}

const resolutionChoice = (resolutions: ActionResolution[]): ResolutionChoice => {
	if (resolutions.length === 0) {
		return {
			recommended: null,
			alternatives: []
		};
	}

	const recommended = resolutions.find((resolution) => {
		return resolution.intent === 'primary';
	}) ?? resolutions[0];
	const alternatives = resolutions.filter((resolution) => {
		return resolution !== recommended;
	});

	return { recommended, alternatives };
};

export { resolutionChoice };
export type { ResolutionChoice };
