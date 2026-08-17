import { MoneyInOriginal } from "@entity/localization";

import type { FC } from "react";
import type { Tone } from "@shared/formatting";


interface ActivityRowMoneyProps {
	amount: string;
	converted: string;
	tone: Tone;
}

const ActivityRowMoney: FC<ActivityRowMoneyProps> = ({ amount, converted, tone }) => (
	<MoneyInOriginal align="end">
		<MoneyInOriginal.Amount tone={tone} size="sm">
			{amount}
		</MoneyInOriginal.Amount>
		<MoneyInOriginal.Converted>
			{converted}
		</MoneyInOriginal.Converted>
	</MoneyInOriginal>
);

ActivityRowMoney.displayName = 'ActivityRowMoney';

export { ActivityRowMoney };
export type { ActivityRowMoneyProps };
