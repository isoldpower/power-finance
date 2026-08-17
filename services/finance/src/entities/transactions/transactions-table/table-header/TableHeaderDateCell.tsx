import type { FC, PropsWithChildren } from "react";


type TableHeaderDateCellProps = PropsWithChildren;

const TableHeaderDateCell: FC<TableHeaderDateCellProps> = ({ children }) => (
	<div className="w-[74px]">
		{children}
	</div>
);

TableHeaderDateCell.displayName = 'TableHeaderDateCell';

export { TableHeaderDateCell };
export type { TableHeaderDateCellProps };
