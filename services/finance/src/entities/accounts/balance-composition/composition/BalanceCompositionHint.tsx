import { MetaText } from "@internal/shared";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type BalanceCompositionHintProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const BalanceCompositionHint: FC<BalanceCompositionHintProps> = ({
	children,
	...props
}) => (
	<MetaText
		size="10"
		tone="subtle"
		className="hidden sm:block"
		{...props}
	>
		{children}
	</MetaText>
);

BalanceCompositionHint.displayName = 'BalanceCompositionHint';

export { BalanceCompositionHint };
export type { BalanceCompositionHintProps };
