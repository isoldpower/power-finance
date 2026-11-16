import { GROUP_BOUNDARY_PATTERN, GROUP_SEPARATOR, ZERO } from "./config.ts";


function groupThousands(wholePart: string): string {
	return wholePart === ''
		? ZERO
		: wholePart.replace(GROUP_BOUNDARY_PATTERN, GROUP_SEPARATOR);
}

export { groupThousands };
