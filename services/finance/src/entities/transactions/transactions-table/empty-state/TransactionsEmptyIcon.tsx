import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type TransactionsEmptyIconProps = PropsWithChildren;

const TransactionsEmptyIcon: FC<TransactionsEmptyIconProps> = ({ children }) => (
	<Text
		as="div"
		size="17"
		tone="subtle"
		className={cn(
			"flex size-[38px] items-center justify-center rounded-[10px]",
			"border border-dashed border-border-strong"
		)}
	>
		{children}
	</Text>
);

TransactionsEmptyIcon.displayName = 'TransactionsEmptyIcon';

export { TransactionsEmptyIcon };
export type { TransactionsEmptyIconProps };
