import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface TransactionRowTitleProps {
	name: string;
	caption: ReactNode;
}

const TransactionRowTitle: FC<TransactionRowTitleProps> = ({ name, caption }) => (
	<span className="flex min-w-0 flex-1 flex-col">
		<Text size="13" weight="semibold" truncate>
			{name}
		</Text>
		<Text size="11" tone="subtle" truncate>
			{caption}
		</Text>
	</span>
);

TransactionRowTitle.displayName = 'TransactionRowTitle';

export { TransactionRowTitle };
export type { TransactionRowTitleProps };
