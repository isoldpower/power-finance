import {ButtonHTMLAttributes, cloneElement, ReactElement, useCallback} from "react";
import type { FC, ReactNode } from "react";

import type { SlideOverEvent } from "./types.ts";


type SlideOverTriggerProps = {
	panelId: string;
} & ({
	asChild?: false;
	children: ReactNode;
	panelId: string;
} | {
	asChild: true;
	children: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
});

const SlideOverTrigger: FC<SlideOverTriggerProps> = ({ children, panelId, asChild }) => {
	const togglePanel = useCallback(() => {
		window.dispatchEvent(new CustomEvent<SlideOverEvent>('slideoveropen', {
			detail: { panelId }
		}));
	}, [panelId]);
	
	return asChild ? cloneElement(children, {
		...children.props,
		type: "button",
		onClick: togglePanel,
	}) : (
		<button type="button" onClick={togglePanel}>
			{children}
		</button>
	);
}

export { SlideOverTrigger };
export type { SlideOverTriggerProps };