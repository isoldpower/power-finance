import type { FC, ReactNode } from "react";


interface ShowOnBrushActiveProps {
	active: boolean;
	children: ReactNode;
}

const ShowOnBrushActive: FC<ShowOnBrushActiveProps> = ({ active, children }) => {
	if (!active) {
		return null;
	}

	return children;
};

ShowOnBrushActive.displayName = 'ShowOnBrushActive';

export { ShowOnBrushActive };
export type { ShowOnBrushActiveProps };
