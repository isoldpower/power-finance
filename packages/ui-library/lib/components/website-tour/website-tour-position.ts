import { ANIMATION_WAIT_TIMEOUT, TOUR_GAP } from "./context/config.ts";

import type { TourPlacement, TourRect } from "./context/types.ts";


const PLACEMENT_FALLBACK: Record<TourPlacement, TourPlacement[]> = {
	top: ['top', 'bottom', 'right', 'left'],
	bottom: ['bottom', 'top', 'right', 'left'],
	left: ['left', 'right', 'bottom', 'top'],
	right: ['right', 'left', 'bottom', 'top'],
};

const getElementRect = (element: HTMLElement): TourRect => {
	const rect = element.getBoundingClientRect();

	return {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height,
	};
};

const shiftRect = (rect: TourRect, offset: number): TourRect => ({
	...rect,
	top: rect.top + offset,
});

const padRect = (rect: TourRect, padding: number): TourRect => ({
	top: rect.top - padding,
	left: rect.left - padding,
	width: rect.width + padding * 2,
	height: rect.height + padding * 2,
});

const sameRect = (first: TourRect | null, second: TourRect | null): boolean => {
	if (!first || !second) return false;

	return first.top === second.top
		&& first.left === second.left
		&& first.width === second.width
		&& first.height === second.height;
};

const clamp = (value: number, min: number, max: number): number => {
	return Math.max(min, Math.min(value, max));
};

const availableSpace = (target: TourRect, placement: TourPlacement): number => {
	switch (placement) {
		case 'top':
			return target.top;
		case 'bottom':
			return window.innerHeight - (target.top + target.height);
		case 'left':
			return target.left;
		case 'right':
			return window.innerWidth - (target.left + target.width);
	}
};

const requiredSpace = (size: TourRect, placement: TourPlacement): number => {
	const extent = placement === 'top' || placement === 'bottom' ? size.height : size.width;

	return extent + TOUR_GAP * 2;
};

const resolvePlacement = (
	target: TourRect,
	size: TourRect,
	preferred: TourPlacement
): TourPlacement => {
	const candidates = PLACEMENT_FALLBACK[preferred];
	const surplus = (placement: TourPlacement) => (
		availableSpace(target, placement) - requiredSpace(size, placement)
	);

	return candidates.find((placement) => surplus(placement) >= 0)
		?? candidates.reduce((best, placement) => surplus(placement) > surplus(best) ? placement : best);
};

const alignAcross = (target: TourRect, size: TourRect): number => {
	const targetCenter = target.left + target.width / 2;
	const alignToEnd = targetCenter > window.innerWidth / 2;

	return alignToEnd ? target.left + target.width - size.width : target.left;
};

const calculatePopoverPosition = (
	target: TourRect,
	size: TourRect,
	placement: TourPlacement
): Pick<TourRect, 'top' | 'left'> => {
	const resolved = resolvePlacement(target, size, placement);

	let top = target.top;
	let left = target.left;

	switch (resolved) {
		case 'top':
			top = target.top - TOUR_GAP - size.height;
			left = alignAcross(target, size);
			break;
		case 'bottom':
			top = target.top + target.height + TOUR_GAP;
			left = alignAcross(target, size);
			break;
		case 'left':
			left = target.left - TOUR_GAP - size.width;
			top = target.top + target.height / 2 - size.height / 2;
			break;
		case 'right':
			left = target.left + target.width + TOUR_GAP;
			top = target.top + target.height / 2 - size.height / 2;
			break;
	}

	return {
		top: clamp(top, TOUR_GAP, Math.max(TOUR_GAP, window.innerHeight - size.height - TOUR_GAP)),
		left: clamp(left, TOUR_GAP, Math.max(TOUR_GAP, window.innerWidth - size.width - TOUR_GAP)),
	};
};

const waitForAnimations = async (scope: Document | ShadowRoot): Promise<void> => {
	const source = 'getAnimations' in scope ? scope : document;

	if (typeof source.getAnimations !== 'function') return;

	const pending = source
		.getAnimations()
		.filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
		.map((animation) => animation.finished);

	const expiry = new Promise((resolve) => {
		window.setTimeout(resolve, ANIMATION_WAIT_TIMEOUT);
	});

	await Promise.race([Promise.allSettled(pending), expiry]);
};

export {
	calculatePopoverPosition,
	getElementRect,
	padRect,
	sameRect,
	shiftRect,
	waitForAnimations
};
