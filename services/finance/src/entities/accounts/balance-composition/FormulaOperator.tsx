import type { BaseHTMLAttributes, FC } from "react";
import { Text } from "@shared/pure-components/typography";


const FormulaOperator: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<Text size="15" weight="medium" tone="muted" className="pb-0.5" {...props}>
			{children}
		</Text>
	);
}

export { FormulaOperator };