import type {Theme} from "@clerk/types";

const getUserButtonAppearance = (
	overrides: Theme = {}
): Theme => {
	const { elements, layout, ...rest } = overrides;

	return Object.assign({
		elements: {
			userButtonPopoverCard: 'transform-[translateY(-5px)]!',
			rootBox: 'w-full!',
			userButtonTrigger: 'p-1! w-full! justify-start! focus:shadow-none! focus:outline-none!',
			userButtonBox: 'flex flex-row-reverse!',
			userButtonPopoverFooter: 'hidden!',
			...elements
		},
		layout: {
			unsafe_disableDevelopmentModeWarnings: true,
			shimmer: false,
			...layout
		}
	}, rest);
};

export { getUserButtonAppearance };
