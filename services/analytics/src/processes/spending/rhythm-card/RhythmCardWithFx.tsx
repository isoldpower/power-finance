import { useAnalyticsQuery } from "@feature/filters";
import { useSelectedOption } from "@feature/interactions";
import { RhythmCardFx, useRhythmCaption, useSpendingRhythm } from "@feature/spending";
import { SIDE_OPTIONS, SpendingRhythmChart } from "@widget/spending";
import { ChartCard, INFLOW_COLOR, OUTFLOW_COLOR, SegmentedSwitch } from "@shared/charts";
import { DotList } from "@shared/text";

import type { FC } from "react";
import type { LedgerSide } from "@entity/filters";


interface RhythmCardWithFxProps {
	className?: string;
}

const RhythmCardWithFx: FC<RhythmCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const side = useSelectedOption<LedgerSide>('expense');
	const { rhythm, isPending, isError } = useSpendingRhythm(query, side.selected);
	const caption = useRhythmCaption(rhythm);

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						Weekly rhythm
					</ChartCard.Title>
					<ChartCard.Caption>
						<DotList>
							{caption}
						</DotList>
					</ChartCard.Caption>
				</div>
				<SegmentedSwitch label="Side" value={side.selected} options={SIDE_OPTIONS} onChange={side.select} />
			</ChartCard.Header>
			<RhythmCardFx
				isPending={isPending}
				isError={isError}
				rhythm={rhythm}
			>
				{(loaded) => (
					<SpendingRhythmChart
						rhythm={loaded}
						currency={query.currency}
						color={side.selected === 'expense' ? OUTFLOW_COLOR : INFLOW_COLOR}
					/>
				)}
			</RhythmCardFx>
		</ChartCard>
	);
};

RhythmCardWithFx.displayName = 'RhythmCardWithFx';

export { RhythmCardWithFx };
export type { RhythmCardWithFxProps };
