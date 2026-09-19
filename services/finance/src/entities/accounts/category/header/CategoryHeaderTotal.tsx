import { FinanceMoney } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type CategoryHeaderTotalProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const CategoryHeaderTotal: FC<CategoryHeaderTotalProps> = ({
	children,
	...props
}) => (
	<FinanceMoney size="sm" {...props}>
		{children}
	</FinanceMoney>
);

CategoryHeaderTotal.displayName = 'CategoryHeaderTotal';

export { CategoryHeaderTotal };
export type { CategoryHeaderTotalProps };
