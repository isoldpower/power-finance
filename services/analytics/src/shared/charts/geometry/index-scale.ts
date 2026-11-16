import { scaleLinear } from "@visx/scale";

import type { PickD3Scale } from "@visx/scale";


type IndexScale = PickD3Scale<'linear', number>;

const indexScale = (count: number, width: number): IndexScale => {
	const lastIndex = Math.max(1, count - 1);

	return scaleLinear<number>({
		domain: [0, lastIndex],
		range: [0, width],
	});
};

export { indexScale };
export type { IndexScale };
