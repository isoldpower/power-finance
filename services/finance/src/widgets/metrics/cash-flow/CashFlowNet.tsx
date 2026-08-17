import { useConvertMoney } from "@feature/localization";
import { useMemo } from "react";
import { AnimatedMoney } from "@entity/localization";
import { CashFlowPeriod } from "@entity/metrics";

import type { Period } from "@entity/metrics";
import type { CashFlow } from "@entity/metrics";
import { textClass } from "@shared/pure-components/typography";


interface CashFlowNetProps {
	period: Period;
	cashFlow: CashFlow;
}

const CashFlowNet = ({
	period,
	cashFlow,
}: CashFlowNetProps) => {
	const { convert } = useConvertMoney();
	const { cashNetAmount, cashNetCurrency } = useMemo(() => {
		const converted = convert(cashFlow.totalNet);

		return {
			cashNetAmount: converted.amount,
			cashNetCurrency: converted.currency,
		};
	}, [cashFlow.totalNet, convert]);

	return (
		<div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5">
			<CashFlowPeriod period={period} />
			<AnimatedMoney
				amount={cashNetAmount}
				currency={cashNetCurrency}
				tone={cashFlow.totalNet.amount >= 0 ? "pos" : "neg"}
				size="lg"
				className={textClass({ size: '20' })}
			/>
		</div>
	);
}

export { CashFlowNet };