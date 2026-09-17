import type { ResolvedTourStep, TourRect } from "../context/types.ts";

interface TourStepContextType {
	step: ResolvedTourStep
	target: TourRect
	index: number
	first: boolean
	last: boolean
}

export type { TourStepContextType };
