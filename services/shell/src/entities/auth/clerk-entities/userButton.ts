import type {Theme} from "@clerk/types";

const getUserButtonAppearance = (
	overrides: Theme = {}
): Theme => {
	const { layout, ...rest } = overrides;

	return Object.assign({
		elements: {
			rootBox: 'w-full! justify-start!',
			userButtonTrigger: 'shadow-none! w-full! justify-start!',
			userButtonBox: 'flex-row-reverse!'
		},
		layout: {
			unsafe_disableDevelopmentModeWarnings: true,
			shimmer: false,
			...layout
		}
	}, rest);
};

export { getUserButtonAppearance };
