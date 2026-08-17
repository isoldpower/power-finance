import type { FC, PropsWithChildren } from "react";


type TableHeaderSelectCellProps = PropsWithChildren;

const TableHeaderSelectCell: FC<TableHeaderSelectCellProps> = ({ children }) => (
	<div className="w-[22px]">
		{children}
	</div>
);

TableHeaderSelectCell.displayName = 'TableHeaderSelectCell';

export { TableHeaderSelectCell };
export type { TableHeaderSelectCellProps };
