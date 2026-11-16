import { LABEL_ROOM, MIN_RADIUS, VERTICAL_LABEL_ROOM } from "./config.ts";


const radarRadius = (width: number, height: number): number => {
	const horizontalRoom = width / 2 - LABEL_ROOM;
	const verticalRoom = height / 2 - VERTICAL_LABEL_ROOM;

	return Math.max(MIN_RADIUS, Math.min(horizontalRoom, verticalRoom));
};

export { radarRadius };
