import { useAnalyticsQuery } from "@feature/filters";
import { ShowOnPresent, useSelectedOption } from "@feature/interactions";
import { useCategoryPalette } from "@feature/spending";
import { CounterpartiesCardFx, useCounterparties, useOpenCounterpartyDrill } from "@feature/transactions";
import { SIDE_OPTIONS } from "@widget/spending";
import { CounterpartyBars } from "@widget/transactions";
import { ChartCard, SegmentedSwitch } from "@shared/charts";
import { LIST_HEIGHT } from "./config.ts";

import type { FC } from "react";
import type { LedgerSide } from "@entity/filters";


interface CounterpartiesCardWithFxProps {
	className?: string;
}

const CounterpartiesCardWithFx: FC<CounterpartiesCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const side = useSelectedOption<LedgerSide>('expense');
	const { ranking, isPending, isError } = useCounterparties(query, side.selected);
	const colorOf = useCategoryPalette(query, side.selected);
	const handleSelect = useOpenCounterpartyDrill(side.selected);

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						{side.selected === 'expense' ? 'Top merchants' : 'Top payers'}
					</ChartCard.Title>
					<ChartCard.Caption>
						<ShowOnPresent value={ranking} fallback="Who your money goes to">
							{(loaded) => `${loaded.totalCounterparties.toString()} counterparties in this period`}
						</ShowOnPresent>
					</ChartCard.Caption>
				</div>
				<SegmentedSwitch label="Side" value={side.selected} options={SIDE_OPTIONS} onChange={side.select} />
			</ChartCard.Header>
			<CounterpartiesCardFx
				isPending={isPending}
				isError={isError}
				ranking={ranking}
				height={LIST_HEIGHT}
			>
				{(loaded) => (
					<CounterpartyBars
						ranking={loaded}
						colorOf={colorOf}
						height={LIST_HEIGHT}
						onSelect={handleSelect}
					/>
				)}
			</CounterpartiesCardFx>
		</ChartCard>
	);
};

CounterpartiesCardWithFx.displayName = 'CounterpartiesCardWithFx';

export { CounterpartiesCardWithFx };
export type { CounterpartiesCardWithFxProps };
