const injectStylesIntoDocumentHead = (
	styleElementId: string,
	cssText: string
): void => {
	const existingStyleElement = document.getElementById(styleElementId);

	if (existingStyleElement) {
		existingStyleElement.textContent = cssText;
		return;
	}

	const styleElement = document.createElement('style');
	styleElement.id = styleElementId;
	styleElement.setAttribute('type', 'text/css');
	styleElement.textContent = cssText;
	document.head.appendChild(styleElement);
}

export { injectStylesIntoDocumentHead };
