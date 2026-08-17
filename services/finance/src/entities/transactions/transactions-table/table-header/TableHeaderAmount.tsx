import type { FC, PropsWithChildren } from "react";


type TableHeaderAmountProps = PropsWithChildren;

const TableHeaderAmount: FC<TableHeaderAmountProps> = ({ children }) => (
	<div className="w-[104px] text-right">
		{children}
	</div>
);

TableHeaderAmount.displayName = 'TableHeaderAmount';

export { TableHeaderAmount };
export type { TableHeaderAmountProps };
