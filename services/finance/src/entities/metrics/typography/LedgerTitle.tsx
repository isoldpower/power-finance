import type { FC, ReactNode } from "react";


interface LedgerTitleProps {
	children: ReactNode;
}

const LedgerTitle: FC<LedgerTitleProps> = ({ children }) => {
	return (
		<span className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
			{children}
		</span>
	);
}

LedgerTitle.displayName = "LedgerTitle";

export { LedgerTitle };
export type { LedgerTitleProps };