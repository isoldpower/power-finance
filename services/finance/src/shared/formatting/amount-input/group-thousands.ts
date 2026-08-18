import { GROUP_BOUNDARY_PATTERN, GROUP_SEPARATOR, ZERO } from "./config.ts";


const groupThousands = (wholePart: string): string => {
	if (wholePart === '') {
		return ZERO;
	}

	return wholePart.replace(GROUP_BOUNDARY_PATTERN, GROUP_SEPARATOR);
};

export { groupThousands };
