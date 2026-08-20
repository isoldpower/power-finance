import type { FC, PropsWithChildren } from "react";


type TableHeaderChevronProps = PropsWithChildren;

const TableHeaderChevron: FC<TableHeaderChevronProps> = ({ children }) => (
	<div className="w-[26px]">
		{children}
	</div>
);

TableHeaderChevron.displayName = 'TableHeaderChevron';

export { TableHeaderChevron };
export type { TableHeaderChevronProps };
