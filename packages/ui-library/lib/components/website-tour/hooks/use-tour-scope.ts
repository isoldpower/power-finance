import { useCallback, useRef } from "react";


const useTourScope = () => {
	const rootReference = useRef<HTMLSpanElement>(null);

	const findScope = useCallback((): Document | ShadowRoot => {
		return (rootReference.current?.getRootNode() ?? document) as Document | ShadowRoot;
	}, []);

	const findElement = useCallback((selectorId: string): HTMLElement | null => {
		return findScope().getElementById(selectorId) as HTMLElement | null;
	}, [findScope]);

	return { rootReference, findScope, findElement };
};

export { useTourScope };
