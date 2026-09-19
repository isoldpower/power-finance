import { RowTitle } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type CategoryHeaderLabelProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const CategoryHeaderLabel: FC<CategoryHeaderLabelProps> = ({
	children,
	...props
}) => (
	<RowTitle as="span" size="13" className="flex-1" {...props}>
		{children}
	</RowTitle>
);

CategoryHeaderLabel.displayName = 'CategoryHeaderLabel';

export { CategoryHeaderLabel };
export type { CategoryHeaderLabelProps };
