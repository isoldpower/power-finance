import { cloneElement, useCallback } from "react";

import { useWebsiteTourContext } from "./context/context.ts";

import type { ButtonHTMLAttributes, FC, ReactElement } from "react";


interface WebsiteTourTriggerProps {
	children: ReactElement<{ onClick: () => void, type: ButtonHTMLAttributes<unknown>['type'] }>;
}

const WebsiteTourTrigger: FC<WebsiteTourTriggerProps> = ({ children }) => {
	const { startTour } = useWebsiteTourContext();

	const handleClick = useCallback(() => {
		startTour();
	}, [startTour]);

	return cloneElement(children, {
		...children.props as object,
		onClick: handleClick,
		type: "button"
	});
};

WebsiteTourTrigger.displayName = 'WebsiteTourTrigger';

export { WebsiteTourTrigger };
export type { WebsiteTourTriggerProps };
