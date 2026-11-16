interface RadarPoint {
	x: number;
	y: number;
}

const RING_LEVELS = [0.25, 0.5, 0.75, 1];

const START_ANGLE = -Math.PI / 2;
const FULL_TURN = Math.PI * 2;

const radarAngle = (index: number, count: number): number => {
	const step = FULL_TURN / count;

	return START_ANGLE + step * index;
};

const radarPoint = (index: number, count: number, radius: number): RadarPoint => {
	const angle = radarAngle(index, count);

	return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
};

const toPolygon = (points: RadarPoint[]): string => {
	return points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
};

const radarPolygon = (values: number[], max: number, radius: number): string => {
	const scale = (value: number): number => (max === 0 ? 0 : (value / max) * radius);
	const points = values.map((value, index) => radarPoint(index, values.length, scale(value)));

	return toPolygon(points);
};

const radarRings = (count: number, radius: number): string[] => {
	return RING_LEVELS.map((level) => {
		const ringRadius = radius * level;
		const points = Array.from({ length: count }, (_, index) => radarPoint(index, count, ringRadius));

		return toPolygon(points);
	});
};

export { radarPoint, radarPolygon, radarRings };
export type { RadarPoint };
