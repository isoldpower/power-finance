import type { FC, PropsWithChildren } from "react";


type TableHeaderCategoryProps = PropsWithChildren;

const TableHeaderCategory: FC<TableHeaderCategoryProps> = ({ children }) => (
	<div className="hidden w-[108px] md:block">
		{children}
	</div>
);

TableHeaderCategory.displayName = 'TableHeaderCategory';

export { TableHeaderCategory };
export type { TableHeaderCategoryProps };
