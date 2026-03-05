import type { types } from "@internal/shared";

const getProfilePaperAppearance = (
	overrides: types.Theme = {}
): types.Theme => {
	const { layout, ...rest } = overrides;

	return Object.assign({
		layout: {
			unsafe_disableDevelopmentModeWarnings: true,
			...layout ?? {}
		},
		elements: {
			providerIcon: "w-[1.25rem]! rounded! bg-white/80! p-[2px]!"
		}
	}, rest);
};

export { getProfilePaperAppearance };
