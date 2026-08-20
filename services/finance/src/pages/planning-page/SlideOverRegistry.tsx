import { NewRulePanel } from "@process/assistance";

import type { ReactNode } from "react";


const planningSlides = {
	newRule: 'new-rule'
} as const;

type SlideOverPanelType = typeof planningSlides[keyof typeof planningSlides];

const planningSlidesRegistry: Record<SlideOverPanelType, ReactNode> = {
	[planningSlides.newRule]: <NewRulePanel />,
}


export {planningSlidesRegistry, planningSlides};
export type { SlideOverPanelType };
