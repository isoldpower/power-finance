import { useMemo } from "react";
import { CategoryList, CategoryRow, changeTone, toBreakdownSlices } from "@entity/spending";
import { formatChangePercent, formatPercent, useAmountFormat } from "@shared/formatting";
import { DotList } from "@shared/text";
import { SLICE_LIMIT } from "../config.ts";

import type { FC } from "react";
import type { LedgerSide } from "@entity/filters";
import type { BreakdownSlice, CategoryBreakdown } from "@entity/spending";


interface CategoryBreakdownListProps {
	breakdown: CategoryBreakdown;
	side: LedgerSide;
	visibleRows?: number;
	height?: number;
	colorOf: (key: string) => string;
	focused: string | null;
	onFocus: (key: string | null) => void;
	onSelect: (slice: BreakdownSlice) => void;
}

const CategoryBreakdownList: FC<CategoryBreakdownListProps> = ({
	breakdown,
	side,
	visibleRows = SLICE_LIMIT,
	height,
	colorOf,
	focused,
	onFocus,
	onSelect,
}) => {
	const formatAmount = useAmountFormat(breakdown.total.currency);
	const slices = useMemo(() => {
		return toBreakdownSlices(breakdown, SLICE_LIMIT).slice(0, visibleRows);
	}, [breakdown, visibleRows]);

	return (
		<CategoryList label="Categories" height={height}>
			{slices.map((slice) => (
				<CategoryRow
					key={slice.key}
					active={slice.key === focused}
					onHover={(hovered) => { onFocus(hovered ? slice.key : null); }}
					onSelect={() => { onSelect(slice); }}
				>
					<CategoryRow.Name
						color={colorOf(slice.key)}
						label={slice.label}
						caption={(
							<DotList>
								{formatPercent(slice.share)}
								{`${slice.transactionsCount.toString()} txns`}
							</DotList>
						)}
					/>
					<CategoryRow.Change tone={changeTone(slice.changePercentage, side)}>
						{formatChangePercent(slice.changePercentage, 0)}
					</CategoryRow.Change>
					<CategoryRow.Amount>
						{formatAmount(slice.value)}
					</CategoryRow.Amount>
					<CategoryRow.Share share={slice.share} color={colorOf(slice.key)} />
				</CategoryRow>
			))}
		</CategoryList>
	);
};

CategoryBreakdownList.displayName = 'CategoryBreakdownList';

export { CategoryBreakdownList };
export type { CategoryBreakdownListProps };
