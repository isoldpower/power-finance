import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import type { FC, ReactNode } from "react";


interface AttachToShadowDomProps {
	children: ReactNode;
	id: string;
	onMountPointChange?: (mointPoint: HTMLDivElement) => void;
}

const savedStyles: Record<string, Node[]> = {};

const AttachToShadowDom: FC<AttachToShadowDomProps> = ({
	children,
	id,
	onMountPointChange
}) => {
	const shadowContainerRef = useRef<HTMLDivElement | null>(null);
	const shadowRootRef = useRef<ShadowRoot | null>(null);
	const mountPointRef = useRef<HTMLDivElement | null>(null);
	const shadowInitializedRef = useRef<boolean>(false);
	const [isMountPointReady, setIsMountPointReady] = useState(false);

	const createShadowRoot = useCallback(() => {
		if (!shadowContainerRef.current) {
			throw new Error('Trying to create shadow root while container is undefined');
		}

		return shadowContainerRef.current.attachShadow({ mode: "open" });
	}, []);

	const createMountPoint = useCallback(() => {
		return document.createElement("div");
	}, []);

	const injectHostStyles = useCallback((shadowRoot: ShadowRoot) => {
		const styleElements = document.head.querySelectorAll('style');

		for (const styleElement of styleElements) {
			const clonedStyle = styleElement.cloneNode(true) as HTMLStyleElement;
        	shadowRoot.appendChild(clonedStyle);
		}

		const previousLoadStyles = savedStyles[id] ?? [];
		previousLoadStyles.map((item) => {
			shadowRoot.appendChild(item);
		})
	}, [id]);

	const createStyleObserver = useCallback(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeName === "STYLE" && shadowRootRef.current) {
						const previousStyles = savedStyles[id] ?? [];
						const clonedStyle = node.cloneNode(true) as HTMLStyleElement;

						previousStyles.push(clonedStyle);
						shadowRootRef.current.appendChild(clonedStyle);
						savedStyles[id] = previousStyles;

						if ((node as HTMLStyleElement).getAttribute('type') === 'text/css') {
							node.parentNode?.removeChild(node);
						}
					}
				});
			});
		});

		return observer;
	}, [id]);

	useEffect(() => {
		if (shadowContainerRef.current && !shadowInitializedRef.current) {
			const shadowRoot = createShadowRoot();
			const mountPoint = createMountPoint();

			shadowRoot.appendChild(mountPoint);
			mountPointRef.current = mountPoint;
			shadowRootRef.current = shadowRoot;
			shadowInitializedRef.current = true;
			
			if (onMountPointChange) onMountPointChange(mountPoint);
		}
	}, [createMountPoint, createShadowRoot, createStyleObserver, injectHostStyles, onMountPointChange]);

	useEffect(() => {
		// As we load our MFM in the lazy() function, we want to observe
		// for new 'style' tags being inserted in the Head of the DOM to further transfer
		// those tags to the Shadow DOM and remove them from the actual DOM (encapsulate them)
		if (shadowRootRef.current) {
			const styleObserver = createStyleObserver();
			styleObserver.observe(document.head, {
				childList: true,
				subtree: false,
			});
			injectHostStyles(shadowRootRef.current);
			setIsMountPointReady(true);
	
			return () => {
				styleObserver.disconnect();
			}
		}
	}, [createStyleObserver, injectHostStyles]);

	return (
		<div ref={shadowContainerRef}>
      		{isMountPointReady && mountPointRef.current && shadowRootRef.current
				? createPortal(children, mountPointRef.current)
				: null}
		</div>
	);
};

AttachToShadowDom.displayName = 'AttachToShadowDom';

export { AttachToShadowDom };
export type { AttachToShadowDomProps };
