import { FinanceCard } from "@internal/ui-library";
import { CategoryPanelHeader } from "./panel/CategoryPanelHeader.tsx";
import { CategoryPanelList } from "./panel/CategoryPanelList.tsx";
import { CategoryPanelSwatch } from "./panel/CategoryPanelSwatch.tsx";
import { CategoryPanelTitle } from "./panel/CategoryPanelTitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { CategoryPanelHeaderProps } from "./panel/CategoryPanelHeader.tsx";
import type { CategoryPanelListProps } from "./panel/CategoryPanelList.tsx";
import type { CategoryPanelSwatchProps } from "./panel/CategoryPanelSwatch.tsx";
import type { CategoryPanelTitleProps } from "./panel/CategoryPanelTitle.tsx";


type CategoryPanelProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type CategoryPanelObject = FC<CategoryPanelProps> & {
	Header: FC<CategoryPanelHeaderProps>;
	List: FC<CategoryPanelListProps>;
	Swatch: FC<CategoryPanelSwatchProps>;
	Title: FC<CategoryPanelTitleProps>;
}

const CategoryPanel: CategoryPanelObject = ({
	children,
	...props
}) => (
	<FinanceCard className="overflow-hidden" {...props}>
		{children}
	</FinanceCard>
);

CategoryPanel.Header = CategoryPanelHeader;
CategoryPanel.List = CategoryPanelList;
CategoryPanel.Swatch = CategoryPanelSwatch;
CategoryPanel.Title = CategoryPanelTitle;
CategoryPanel.displayName = 'CategoryPanel';

export { CategoryPanel };
export type { CategoryPanelProps };
