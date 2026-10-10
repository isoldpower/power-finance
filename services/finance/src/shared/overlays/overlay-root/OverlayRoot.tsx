import { useState } from "react";
import { PortalContainerProvider } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface OverlayRootProps {
	children: ReactNode;
}

const OverlayRoot: FC<OverlayRootProps> = ({ children }) => {
	const [overlayRootElement, setOverlayRootElement] = useState<HTMLDivElement | null>(null);

	return (
		<PortalContainerProvider container={overlayRootElement}>
			{children}
			<div ref={setOverlayRootElement} data-overlay-root="" />
		</PortalContainerProvider>
	);
}

OverlayRoot.displayName = 'OverlayRoot';

export { OverlayRoot };
export type { OverlayRootProps };
