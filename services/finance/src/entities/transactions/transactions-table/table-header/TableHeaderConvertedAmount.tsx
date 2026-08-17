import type { FC, PropsWithChildren } from "react";


type TableHeaderConvertedAmountProps = PropsWithChildren;

const TableHeaderConvertedAmount: FC<TableHeaderConvertedAmountProps> = ({ children }) => (
	<div className="hidden w-[104px] text-right md:block">
		{children}
	</div>
);

TableHeaderConvertedAmount.displayName = 'TableHeaderConvertedAmount';

export { TableHeaderConvertedAmount };
export type { TableHeaderConvertedAmountProps };
