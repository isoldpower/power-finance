import type { FC, ReactNode } from "react";


interface ShowOnZoomedProps {
	zoomed: boolean;
	fallback: ReactNode;
	children: ReactNode;
}

const ShowOnZoomed: FC<ShowOnZoomedProps> = ({ zoomed, fallback, children }) => {
	if (!zoomed) {
		return fallback;
	}

	return children;
};

ShowOnZoomed.displayName = 'ShowOnZoomed';

export { ShowOnZoomed };
export type { ShowOnZoomedProps };
