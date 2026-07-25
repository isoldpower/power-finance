import type { FC, ReactNode } from "react";
import type { 
	SlideOverCollapseProps,
	SlideOverHeadingProps,
	SlideOverTitleProps,
} from "@shared/components";

interface SlideOverEvent {
	panelId: string;
}

type SlideOverPanelsRegistry = Record<string, ReactNode>;

interface SlideOverProps<T extends SlideOverPanelsRegistry> {
	panelsRegistry: T
}

type SlideOverComponent<T extends SlideOverPanelsRegistry> = FC<SlideOverProps<T>> & {
	Collapse: FC<SlideOverCollapseProps>;
	Heading: FC<SlideOverHeadingProps>;
	Title: FC<SlideOverTitleProps>;
}

export type { SlideOverEvent, SlideOverPanelsRegistry, SlideOverComponent, SlideOverProps };