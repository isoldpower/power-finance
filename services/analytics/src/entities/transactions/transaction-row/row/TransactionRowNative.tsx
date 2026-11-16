import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface TransactionRowNativeProps {
	children: ReactNode;
}

const TransactionRowNative: FC<TransactionRowNativeProps> = ({ children }) => (
	<Text size="10.5" family="numeric" tone="subtle">
		{children}
	</Text>
);

TransactionRowNative.displayName = 'TransactionRowNative';

export { TransactionRowNative };
export type { TransactionRowNativeProps };
