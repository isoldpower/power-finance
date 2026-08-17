import type {FC, ReactNode} from "react";
import type { CashFlow } from "@entity/metrics";


interface CashFlowCardFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlow | undefined;
	children: (cashFlow: CashFlow) => ReactNode;
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