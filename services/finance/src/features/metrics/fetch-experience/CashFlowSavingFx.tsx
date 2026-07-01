import type {FC, ReactNode} from "react";
import type { CashFlowInsight } from "@feature/metrics";


interface CashFlowCardFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlowInsight | undefined;
	children: (cashFlow: CashFlowInsight) => ReactNode;
}

const CashFlowSavingFx: FC<CashFlowCardFxProps> = ({
	isPending,
	isError,
	cashFlow,
	children,
}) => {
	if (isPending || isError || !cashFlow) {
		return null;
	}

	return children(cashFlow);
};

export { CashFlowSavingFx };