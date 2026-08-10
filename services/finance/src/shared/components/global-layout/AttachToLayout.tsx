import { useMemo } from "react";
import { createPortal } from "react-dom";

import { FC, PropsWithChildren } from "react";


const AttachToLayout: FC<PropsWithChildren> = ({ children }) => {
	const relatedElement = useMemo<HTMLElement | null>(() => {
		return document.getElementById('layout-front');
	}, []);
	
	return relatedElement
		? createPortal(children, relatedElement)
		: null;
}

export { AttachToLayout };