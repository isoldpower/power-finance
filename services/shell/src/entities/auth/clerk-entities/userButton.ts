import type { types } from "@internal/shared";

const getUserButtonAppearance = (
	overrides: types.Theme = {}
): types.Theme => {
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
