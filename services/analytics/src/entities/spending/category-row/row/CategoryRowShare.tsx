import { useMemo } from "react";

import type { FC } from "react";


interface CategoryRowShareProps {
	share: number;
	color: string;
}

const CategoryRowShare: FC<CategoryRowShareProps> = ({ share, color }) => {
	const style = useMemo(() => {
		return {
			width: `${Math.min(100, share).toFixed(1)}%`,
			background: color,
		};
	}, [share, color]);

	return (
		<span className="col-span-3 block h-1 overflow-hidden rounded-full bg-[var(--chart-heat-0)]">
			<span
				className="fx-grow-x block h-full rounded-full transition-[width] duration-500 ease-out"
				style={style}
			/>
		</span>
	);
};

CategoryRowShare.displayName = 'CategoryRowShare';

export { CategoryRowShare };
export type { CategoryRowShareProps };
