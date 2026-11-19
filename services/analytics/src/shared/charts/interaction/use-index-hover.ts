import { useCallback, useMemo, useState } from "react";
import { localPoint } from "@visx/event";
import { nearestIndex } from "./hover-partials/nearest-index.ts";

import type { MouseEvent, TouchEvent } from "react";


type PointerEvent = MouseEvent<SVGElement> | TouchEvent<SVGElement>;

interface IndexHover {
	index: number | null;
	pointer: { x: number; y: number } | null;
	handleMove: (event: PointerEvent) => void;
	handleLeave: () => void;
}

const useIndexHover = (positions: number[], offsetLeft: number): IndexHover => {
	const [index, setIndex] = useState<number | null>(null);
	const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

	const handleMove = useCallback((event: PointerEvent) => {
		const point = localPoint(event);
		if (!point) {
			return;
		}

		setIndex(nearestIndex(positions, point.x - offsetLeft));
		setPointer({ x: point.x, y: point.y });
	}, [positions, offsetLeft]);

	const handleLeave = useCallback(() => {
		setIndex(null);
		setPointer(null);
	}, []);

	return useMemo(() => ({ index, pointer, handleMove, handleLeave }), [index, pointer, handleMove, handleLeave]);
};

export { useIndexHover };
export type { IndexHover };
