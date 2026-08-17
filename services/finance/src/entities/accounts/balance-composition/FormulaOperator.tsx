import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type FormulaOperatorProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const FormulaOperator: FC<FormulaOperatorProps> = ({
	children,
	...props
}) => (
	<Text size="15" weight="medium" tone="muted" className="pb-0.5" {...props}>
		{children}
	</Text>
);

FormulaOperator.displayName = 'FormulaOperator';

export { FormulaOperator };
export type { FormulaOperatorProps };
