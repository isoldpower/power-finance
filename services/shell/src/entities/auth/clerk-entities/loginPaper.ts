import type {Theme} from "@clerk/types";

const getLoginPaperAppearance = (
	overrides: Theme = {}
): Theme => {
	const { layout, elements, ...rest } = overrides;

	return Object.assign({
		elements: {
			formButtonPrimary: "after:hidden! group",
			buttonArrowIcon: 'group-hover:ml-4! transition-all!',
			...elements ?? {}
		},
		layout: {
			unsafe_disableDevelopmentModeWarnings: true,
			socialButtonsPlacement: 'bottom',
			socialButtonsVariant: 'blockButton',
			...layout
		}
	}, rest) as Theme;
};

export { getLoginPaperAppearance };
