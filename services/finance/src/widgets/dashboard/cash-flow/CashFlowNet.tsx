import type {Period} from "@entity/dashboard";
import type {CashFlowInsight} from "@feature/summary";
import { useConvertMoney } from "@feature/fx";
import { useMemo } from "react";
import { AnimatedMoney } from "@entity/money";
import { CashFlowPeriod } from "@src/entities/dashboard/typography/CashFlowPeriod";
import { CASH_FLOW_RANGE_LABELS } from "@widget/dashboard/config.ts";

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
			<CashFlowPeriod 
				period={period} 
				periodLabels={CASH_FLOW_RANGE_LABELS} 
			/>
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