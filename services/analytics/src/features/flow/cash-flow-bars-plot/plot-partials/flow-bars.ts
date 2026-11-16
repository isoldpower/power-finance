import { SIDE_COLOR, SIDES, STAGGER_MS } from "../config.ts";

import type { PickD3Scale } from "@visx/scale";
import type { CashFlowPoint } from "@entity/flow";
import type { FlowBarView, FlowSide } from "../types.ts";


interface FlowBarScales {
	bucket: PickD3Scale<'band', number, number>;
	side: PickD3Scale<'band', number, FlowSide>;
	amount: PickD3Scale<'linear', number>;
}

const toFlowBars = (points: CashFlowPoint[], scales: FlowBarScales): FlowBarView[] => {
	const baseline = scales.amount(0);
	const barWidth = scales.side.bandwidth();

	return points.flatMap((point, index) => {
		const bucketStart = scales.bucket(index) ?? 0;

		return SIDES.map((side) => {
			const sideOffset = scales.side(side) ?? 0;
			const top = scales.amount(point[side]);

			return {
				key: `${point.start}-${side}`,
				index,
				x: bucketStart + sideOffset,
				y: top,
				width: barWidth,
				height: baseline - top,
				color: SIDE_COLOR[side],
				delay: index * STAGGER_MS,
			};
		});
	});
};

export { toFlowBars };
export type { FlowBarScales };
