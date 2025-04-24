import {useCallback, useEffect, useRef} from "react";
import {formatHex, parse} from "culori";

interface UseColorVarToHexReturn {
	getColor: (varName: string) => string
}

const useColorVarToHex = (): UseColorVarToHexReturn => {
	const rootComponent = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (typeof document !== 'undefined') {
			const tempElement = document.createElement('div');
			tempElement.id = 'style-accessor';
			document.body.appendChild(tempElement);
			rootComponent.current = tempElement;

			return () => {
				tempElement.remove();
				rootComponent.current = null;
			};
		}
	}, []);

	const oklchToHex = useCallback((oklch: string) => {
		const parsedColor = parse(oklch);
		return parsedColor
			? formatHex(parsedColor)
			: '#000000';
	}, []);

	const getColor = useCallback((varName: string) => {
		const defaultValue = '#000000';

		if (!rootComponent.current) return defaultValue;

		try {
			const value = getComputedStyle(rootComponent.current).getPropertyValue(varName).trim();
			const isOklch = /^oklch\s*\(/.test(value);

			if (!value) return defaultValue;
			if (isOklch) return oklchToHex(value);

			const tempElement = document.createElement('div');
			tempElement.style.color = value;
			const computedColor = getComputedStyle(tempElement).color;
			if (computedColor && computedColor !== 'rgb(0, 0, 0)') {
				const parsedColor = parse(computedColor);
				return parsedColor ? formatHex(parsedColor) : defaultValue;
			}
		} catch (error) {
			console.error(`Failed to convert CSS variable ${varName} to hex:`, error);
		}

		return defaultValue;
	}, [oklchToHex]);

	return { getColor };
}

export type { UseColorVarToHexReturn };
export { useColorVarToHex };
