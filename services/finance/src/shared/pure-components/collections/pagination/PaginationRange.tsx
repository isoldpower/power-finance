import type { FC } from "react";
import { MetaText } from "@shared/pure-components/typography";


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
		<MetaText size="11">
			Showing {rangeStart}–{rangeEnd} of {total}
		</MetaText>
	);
}

export { PaginationRange };
export type { PaginationRangeProps };
