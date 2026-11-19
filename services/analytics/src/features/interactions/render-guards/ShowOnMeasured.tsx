import type { FC, ReactNode } from "react";


interface ShowOnMeasuredProps {
	width: number;
	children: (width: number) => ReactNode;
}

const ShowOnMeasured: FC<ShowOnMeasuredProps> = ({ width, children }) => {
	if (width <= 0) {
		return null;
	}

	return children(width);
};

ShowOnMeasured.displayName = 'ShowOnMeasured';

export { ShowOnMeasured };
export type { ShowOnMeasuredProps };
