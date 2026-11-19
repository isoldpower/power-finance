import { useCallback, useMemo, useState } from "react";


interface IndexZoom {
	domain: [number, number];
	zoomed: boolean;
	resetCount: number;
	zoomTo: (start: number, end: number) => void;
	clear: () => void;
	reset: () => void;
}

const MIN_SPAN = 2;

const useIndexZoom = (count: number): IndexZoom => {
	const [zoomWindow, setZoomWindow] = useState<[number, number] | null>(null);
	const [resetCount, setResetCount] = useState(0);
	const full = useMemo<[number, number]>(() => [0, Math.max(1, count - 1)], [count]);

	const zoomTo = useCallback((start: number, end: number) => {
		const low = Math.max(0, Math.min(start, end));
		const high = Math.min(count - 1, Math.max(start, end));
		setZoomWindow(high - low >= MIN_SPAN ? [low, high] : null);
	}, [count]);

	const clear = useCallback(() => {
		setZoomWindow(null);
	}, []);

	const reset = useCallback(() => {
		setZoomWindow(null);
		setResetCount((count) => count + 1);
	}, []);

	return useMemo(() => ({
		domain: zoomWindow ?? full,
		zoomed: zoomWindow !== null,
		resetCount,
		zoomTo,
		clear,
		reset,
	}), [zoomWindow, full, resetCount, zoomTo, clear, reset]);
};

export { useIndexZoom };
export type { IndexZoom };
