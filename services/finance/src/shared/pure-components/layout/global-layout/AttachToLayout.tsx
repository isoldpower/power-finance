import { useMemo } from "react";
import { createPortal } from "react-dom";
import { usePortalTarget } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


const LAYOUT_FRONT_ELEMENT_ID = 'layout-front';

const AttachToLayout: FC<PropsWithChildren> = ({ children }) => {
	const portalContainer = usePortalTarget();
	const relatedElement = useMemo<HTMLElement | null>(() => {
		const rootNode = portalContainer?.getRootNode();
		const isSearchableRoot = rootNode instanceof Document || rootNode instanceof ShadowRoot;

		return isSearchableRoot ? rootNode.getElementById(LAYOUT_FRONT_ELEMENT_ID) : null;
	}, [portalContainer]);

	return relatedElement
		? createPortal(children, relatedElement)
		: null;
}

export { AttachToLayout };
