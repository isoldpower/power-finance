import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface CounterpartyRowAmountProps {
	children: ReactNode;
}

const CounterpartyRowAmount: FC<CounterpartyRowAmountProps> = ({ children }) => (
	<Text size="13" weight="semibold" family="numeric">
		{children}
	</Text>
);

CounterpartyRowAmount.displayName = 'CounterpartyRowAmount';

export { CounterpartyRowAmount };
export type { CounterpartyRowAmountProps };
