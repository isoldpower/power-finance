import type { FC, ReactNode } from "react";
import { Text } from "@shared/pure-components/typography";


interface LedgerSymbolProps {
	children: ReactNode;
}

const LedgerSymbol: FC<LedgerSymbolProps> = ({ children }) => (
	<Text size="15" weight="medium" tone="muted" className="pb-0.5">
		{children}
	</Text>
);

export { LedgerSymbol };
export type { LedgerSymbolProps };