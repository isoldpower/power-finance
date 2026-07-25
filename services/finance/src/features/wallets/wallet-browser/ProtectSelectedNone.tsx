import {FC, ReactNode} from "react";
import {FinanceCard} from "@internal/ui-library";

interface ProtectSelectedNoneProps {
	selectedWallet: string;
	children: ReactNode;
}

const ProtectSelectedNone: FC<ProtectSelectedNoneProps> = ({
	selectedWallet,
	children,
}) => {
	const hasSelection = selectedWallet !== 'none';
	
	if (!hasSelection) {
		return (
			<FinanceCard className="px-6 py-16 text-center text-[13px] text-text-3">
				No wallet selected. Create one to get started.
			</FinanceCard>
		);
	}
	
	return children;
}

export { ProtectSelectedNone };