import type { FC, ReactNode } from "react";


interface LedgerSymbolProps {
	children: ReactNode;
}

const LedgerSymbol: FC<LedgerSymbolProps> = ({ children }) => (
	<span className="pb-0.5 text-[15px] font-medium text-text-2">
		{children}
	</span>
);

export { LedgerSymbol };
export type { LedgerSymbolProps };