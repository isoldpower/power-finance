import type { FC, ReactNode } from "react";


interface ShowOnSeriesVisibleProps {
	visible: boolean;
	children: ReactNode;
}

const ShowOnSeriesVisible: FC<ShowOnSeriesVisibleProps> = ({ visible, children }) => {
	if (!visible) {
		return null;
	}

	return children;
};

ShowOnSeriesVisible.displayName = 'ShowOnSeriesVisible';

export { ShowOnSeriesVisible };
export type { ShowOnSeriesVisibleProps };
