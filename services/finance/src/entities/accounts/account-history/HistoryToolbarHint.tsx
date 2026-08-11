
import type { BaseHTMLAttributes, FC } from "react";
import { MetaText } from "@shared/pure-components/typography";


const HistoryToolbarHint: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
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

HistoryToolbarHint.displayName = 'HistoryToolbarHint';

export { HistoryToolbarHint };
