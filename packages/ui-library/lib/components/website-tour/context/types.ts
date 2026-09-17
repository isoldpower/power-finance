import type { ReactNode } from "react";


type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TourRect {
	top: number
	left: number
	width: number
	height: number
}

interface ResolvedTourStep {
	order: number
	label: string
	selectorId: string
	content: ReactNode
	placement: TourPlacement
	padding: number
	borderRadius: number
	closeable: boolean
	skippable: boolean
	verticalOffset: number
}

interface WebsiteTourContextType {
	steps: Record<number, ResolvedTourStep>
	activeStep: number
	completed: boolean
}

interface WebsiteTourPayload extends WebsiteTourContextType {
	addStep: (step: ResolvedTourStep) => void
	removeStep: (step: ResolvedTourStep) => void
	startTour: () => void
	endTour: () => void
	skipTour: () => void
	stepBack: () => void
	stepForward: () => void
	isActive: boolean
	totalSteps: number
	uid: string
}

export type { ResolvedTourStep, TourPlacement, TourRect, WebsiteTourContextType, WebsiteTourPayload };
