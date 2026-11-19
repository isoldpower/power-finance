import { useMemo } from "react";
import { Icons } from "@internal/ui-library";
import { categoryKey, categoryLabel } from "@entity/spending";
import { CounterpartyList, CounterpartyRow, counterpartyRatios } from "@entity/transactions";
import { formatPercent, useMoneyFormat } from "@shared/formatting";
import { DotList } from "@shared/text";
import { COUNTERPARTY_STAGGER_MS } from "./config.ts";

import type { FC } from "react";
import type { Counterparty, CounterpartyRanking } from "@entity/transactions";


interface CounterpartyBarsProps {
	ranking: CounterpartyRanking;
	colorOf: (key: string) => string;
	onSelect: (counterparty: Counterparty) => void;
	height?: number;
}

const CounterpartyBars: FC<CounterpartyBarsProps> = ({ ranking, colorOf, onSelect, height }) => {
	const formatMoney = useMoneyFormat();
	const ratios = useMemo(() => counterpartyRatios(ranking), [ranking]);

	return (
		<CounterpartyList label="Top counterparties" height={height}>
			{ranking.counterparties.map((counterparty, index) => (
				<CounterpartyRow key={counterparty.name} onSelect={() => { onSelect(counterparty); }}>
					<CounterpartyRow.Name
						rank={index + 1}
						name={counterparty.name}
						caption={(
							<DotList>
								{categoryLabel(counterparty.category)}
								<span className="inline-flex items-center">
									{counterparty.transactionsCount.toString()}
									<Icons.X aria-hidden size={10} />
								</span>
								{formatPercent(counterparty.share)}
							</DotList>
						)}
					/>
					<CounterpartyRow.Amount>
						{formatMoney(counterparty.amount)}
					</CounterpartyRow.Amount>
					<CounterpartyRow.Bar
						ratio={ratios[index]}
						color={colorOf(categoryKey(counterparty.category))}
						delay={index * COUNTERPARTY_STAGGER_MS}
					/>
				</CounterpartyRow>
			))}
		</CounterpartyList>
	);
};

CounterpartyBars.displayName = 'CounterpartyBars';

export { CounterpartyBars };
export type { CounterpartyBarsProps };
