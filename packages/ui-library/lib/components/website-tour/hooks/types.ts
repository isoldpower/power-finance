import type { RefObject } from "react";
import type { WebsiteTourPayload } from "../context/types.ts";
import type { TourStepContextType } from "../step-context/types.ts";


interface WebsiteTourOptions {
	completed?: boolean;
	storageKey?: string;
	onStart?: () => void;
	onStepChange?: (step: number) => void;
	onSkip?: (step: number) => void;
	onFinish?: () => void;
}

interface WebsiteTourState {
	rootReference: RefObject<HTMLSpanElement | null>;
	payload: WebsiteTourPayload;
	stepValue: TourStepContextType | null;
}

export type { WebsiteTourOptions, WebsiteTourState };
