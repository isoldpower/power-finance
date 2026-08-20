import { MetaText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerRowDateCellProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const LedgerRowDateCell: FC<LedgerRowDateCellProps> = ({
	children,
	...props
}) => (
	<MetaText as="div" tone="default" className="w-[74px]" {...props}>
		{children}
	</MetaText>
);

LedgerRowDateCell.displayName = 'LedgerRowDateCell';

export { LedgerRowDateCell };
export type { LedgerRowDateCellProps };
