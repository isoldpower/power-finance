import type { FC } from "react";


interface PaginationRangeProps {
	total: number;
	from: number;
	to: number;
}

const PaginationRange: FC<PaginationRangeProps> = ({
	to,
	from,
	total,
}) => {
	const rangeStart = total === 0 ? 0 : from + 1;
	const rangeEnd = Math.min(to + 1, total);

	return (
		<span className="font-numeric text-[11px] text-text-3">
			{rangeStart}–{rangeEnd} of {total}
		</span>
	);
}

export { PaginationRange };
export type { PaginationRangeProps };
