import { CategoryHeaderChevron } from "./header/CategoryHeaderChevron.tsx";
import { CategoryHeaderLabel } from "./header/CategoryHeaderLabel.tsx";
import { CategoryHeaderSwatch } from "./header/CategoryHeaderSwatch.tsx";
import { CategoryHeaderTotal } from "./header/CategoryHeaderTotal.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { CategoryHeaderChevronProps } from "./header/CategoryHeaderChevron.tsx";
import type { CategoryHeaderLabelProps } from "./header/CategoryHeaderLabel.tsx";
import type { CategoryHeaderSwatchProps } from "./header/CategoryHeaderSwatch.tsx";
import type { CategoryHeaderTotalProps } from "./header/CategoryHeaderTotal.tsx";


type CategoryHeaderProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type CategoryHeaderObject = FC<CategoryHeaderProps> & {
	Chevron: FC<CategoryHeaderChevronProps>;
	Label: FC<CategoryHeaderLabelProps>;
	Swatch: FC<CategoryHeaderSwatchProps>;
	Total: FC<CategoryHeaderTotalProps>;
}

const CategoryHeader: CategoryHeaderObject = ({
	children,
	...props
}) => (
	<div className="mb-1.5 flex items-center gap-2.5" {...props}>
		{children}
	</div>
);

CategoryHeader.Chevron = CategoryHeaderChevron;
CategoryHeader.Label = CategoryHeaderLabel;
CategoryHeader.Swatch = CategoryHeaderSwatch;
CategoryHeader.Total = CategoryHeaderTotal;
CategoryHeader.displayName = 'CategoryHeader';

export { CategoryHeader };
export type { CategoryHeaderProps };
