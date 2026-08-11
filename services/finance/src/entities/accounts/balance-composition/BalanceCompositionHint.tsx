
import type { BaseHTMLAttributes, FC } from "react";
import { MetaText } from "@shared/pure-components/typography";


const BalanceCompositionHint: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<MetaText
			size="10"
			tone="subtle"
			className="hidden sm:block"
			{...props}
		>
			{children}
		</MetaText>
	);
}

BalanceCompositionHint.displayName = 'BalanceCompositionHint';

export { BalanceCompositionHint };
