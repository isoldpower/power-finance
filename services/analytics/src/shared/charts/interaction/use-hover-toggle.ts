import { useCallback, useMemo } from "react";


interface HoverToggle {
	handleHoverStart: () => void;
	handleHoverEnd: () => void;
}

const useHoverToggle = (onHover: (hovered: boolean) => void): HoverToggle => {
	const handleHoverStart = useCallback(() => {
		onHover(true);
	}, [onHover]);

	const handleHoverEnd = useCallback(() => {
		onHover(false);
	}, [onHover]);

	return useMemo(() => ({ handleHoverStart, handleHoverEnd }), [handleHoverStart, handleHoverEnd]);
};

export { useHoverToggle };
export type { HoverToggle };
