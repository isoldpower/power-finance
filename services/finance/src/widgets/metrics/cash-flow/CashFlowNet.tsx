import { useConvertMoney } from "@feature/localization";
import { useMemo } from "react";
import { AnimatedMoney } from "@entity/localization";
import { CashFlowPeriod } from "@entity/metrics";

import type { Period } from "@entity/metrics";
import type { CashFlowInsight } from "@feature/metrics";


interface CashFlowNetProps {
	period: Period;
	cashFlow: CashFlowInsight;
}

const CashFlowNet = ({
	period,
	cashFlow,
}: CashFlowNetProps) => {
	const { convert } = useConvertMoney();
	const { cashNetAmount, cashNetCurrency } = useMemo(() => {
		const converted = convert(cashFlow.net);

		return {
			cashNetAmount: converted.amount,
			cashNetCurrency: converted.currency,
		};
	}, [cashFlow.net, convert]);

	return (
		<div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5">
			<CashFlowPeriod period={period} />
			<AnimatedMoney
				amount={cashNetAmount}
				currency={cashNetCurrency}
				tone={cashFlow.net.amount >= 0 ? "pos" : "neg"}
				size="lg"
				className="text-[20px]"
			/>
		</div>
	);
}

export { CashFlowNet };