import type { FC, ReactNode } from "react";


interface ShowOnTotalSeriesProps {
	isTotal: boolean;
	children: ReactNode;
}

const ShowOnTotalSeries: FC<ShowOnTotalSeriesProps> = ({ isTotal, children }) => {
	if (!isTotal) {
		return null;
	}

	return children;
};

ShowOnTotalSeries.displayName = 'ShowOnTotalSeries';

export { ShowOnTotalSeries };
export type { ShowOnTotalSeriesProps };
