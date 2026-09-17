import type { WebsiteTourContextType } from './types.ts';

export const defaultWebsiteTourValue: WebsiteTourContextType = {
	steps: {},
	activeStep: -1,
	completed: false
}

export const TOUR_GAP = 16;

export const SPOTLIGHT_PADDING = 12;

export const SPOTLIGHT_RADIUS = 14;

export const POPOVER_MIN_WIDTH = 300;

export const POPOVER_MAX_WIDTH = 400;

export const TARGET_RETRY_FRAMES = 180;

export const TARGET_SETTLE_FRAMES = 4;

export const ANIMATION_WAIT_TIMEOUT = 1400;
