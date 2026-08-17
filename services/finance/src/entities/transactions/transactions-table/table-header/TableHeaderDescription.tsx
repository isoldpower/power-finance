import type { FC, PropsWithChildren } from "react";


type TableHeaderDescriptionProps = PropsWithChildren;

const TableHeaderDescription: FC<TableHeaderDescriptionProps> = ({ children }) => (
	<div className="flex-1">
		{children}
	</div>
);

TableHeaderDescription.displayName = 'TableHeaderDescription';

export { TableHeaderDescription };
export type { TableHeaderDescriptionProps };
