import type {Theme} from "@clerk/types";

const getProfilePaperAppearance = (
	overrides: Theme = {}
): Theme => {
	const { elements, layout, ...rest } = overrides;

	return Object.assign({}, rest);
};

export { getProfilePaperAppearance };
