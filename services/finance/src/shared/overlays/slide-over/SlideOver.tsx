import { createPortal } from "react-dom";
import { usePortalTarget } from "@internal/ui-library";

import { SlideOverOverlay } from "./SlideOverOverlay.tsx";
import { SlideOverBody } from "./SlideOverBody.tsx";
import { SlideOverCollapse } from "./SlideOverCollapse.tsx";
import { SlideOverHeading } from "./SlideOverHeading.tsx";
import { SlideOverTitle } from "./SlideOverTitle.tsx";
import { SlideOverContext } from "./context/context.ts";
import { useContextState } from "./context/use-context-state.ts";

import type { SlideOverPanelsRegistry, SlideOverProps } from "./types.ts";


function SlideOver<T extends SlideOverPanelsRegistry>({ 
	panelsRegistry,
}: SlideOverProps<T>) {
	const slideOverState = useContextState(panelsRegistry);
	const portalContainer = usePortalTarget();

	return slideOverState.currentPanel && portalContainer ? createPortal(
		<SlideOverContext value={slideOverState.contextValue}>
			<div className="finance-theme">
				<SlideOverOverlay />
				<SlideOverBody>
					{slideOverState.currentPanel}
				</SlideOverBody>
			</div>
		</SlideOverContext>,
		portalContainer
	) : null;
}

SlideOver.Collapse = SlideOverCollapse;
SlideOver.Heading = SlideOverHeading;
SlideOver.Title = SlideOverTitle;
SlideOver.displayName = 'SlideOver';

export { SlideOver };
export type { SlideOverProps };
