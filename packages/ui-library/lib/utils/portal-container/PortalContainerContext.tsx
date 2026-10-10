import { createContext, useContext } from "react";

import type { FC, ReactNode } from "react";


type PortalContainer = HTMLElement | null | undefined;

const PortalContainerContext = createContext<PortalContainer>(undefined);

interface PortalContainerProviderProps {
	container: HTMLElement | null;
	children: ReactNode;
}

const PortalContainerProvider: FC<PortalContainerProviderProps> = ({ container, children }) => {
	return (
		<PortalContainerContext value={container}>
			{children}
		</PortalContainerContext>
	);
}

const usePortalContainer = (): PortalContainer => useContext(PortalContainerContext);

const usePortalTarget = (): HTMLElement | null => {
	const portalContainer = usePortalContainer();

	return portalContainer === undefined ? document.body : portalContainer;
}

export { PortalContainerProvider, usePortalContainer, usePortalTarget };
export type { PortalContainer, PortalContainerProviderProps };
