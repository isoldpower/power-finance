import type {Theme} from "@clerk/types";

const getLoginPaperAppearance = (
	overrides: Theme = {}
): Theme => {
	const { layout, ...rest } = overrides;

	return Object.assign({
		layout: {
			unsafe_disableDevelopmentModeWarnings: true,
			socialButtonsPlacement: 'bottom',
			socialButtonsVariant: 'blockButton',
			...layout
		}
	}, rest) as Theme;
};

export { getLoginPaperAppearance };
