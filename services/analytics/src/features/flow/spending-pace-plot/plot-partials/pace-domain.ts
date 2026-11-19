import type { PacePoint } from "@entity/flow";


const paceDomain = (points: PacePoint[]): [number, number] => {
	const amounts = points.flatMap((point) => [point.current ?? 0, point.previous ?? 0]);
	const highest = Math.max(1, ...amounts);

	return [0, highest];
};

export { paceDomain };
