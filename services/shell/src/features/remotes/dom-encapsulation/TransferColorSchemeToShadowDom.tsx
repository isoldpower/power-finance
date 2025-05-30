import { ReactNode, FC, useEffect } from "react";


interface TransferColorSchemeToShadowDomProps {
	children: ReactNode;
	mountPoint: HTMLDivElement;
}

const TransferColorSchemeToShadowDom: FC<TransferColorSchemeToShadowDomProps> = ({
	children,
	mountPoint
}) => {
	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				const newClassName = (mutation.target as HTMLElement).className;
				mountPoint.className = newClassName;
			});
		});

		const observeElement = document.querySelector('html');
		if (!observeElement) {
			throw new Error('HTML Element not found in the DOM');
		}

		// Set the initial className and start the observer to watch for changes
		const newClassName = observeElement.className;
		mountPoint.className = newClassName;
		observer.observe(observeElement, {
			childList: false,
			subtree: false,
			attributeFilter: ['class']
		});

		return () => {
			observer.disconnect();
		}
	}, [mountPoint]);

	return children;
};

TransferColorSchemeToShadowDom.displayName = 'TransferColorSchemeToShadowDom';

export { TransferColorSchemeToShadowDom };