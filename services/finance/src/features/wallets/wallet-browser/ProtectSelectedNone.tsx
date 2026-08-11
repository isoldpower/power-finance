import { cn } from "@internal/ui-library";
import {FC, ReactNode} from "react";
import {FinanceCard} from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

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
			<FinanceCard className={cn(textClass({ size: '13', tone: 'subtle' }), "px-6 py-16 text-center")}>
				No wallet selected. Create one to get started.
			</FinanceCard>
		);
	}
	
	return children;
}

export { ProtectSelectedNone };