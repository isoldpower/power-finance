
import type { BaseHTMLAttributes, FC } from "react";
import { MetaText } from "@shared/pure-components/typography";


const LedgerRowDateCell: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<MetaText
			as="div"
			tone="default"
			className="w-[74px]"
			{...props}
		>
			{children}
		</MetaText>
	);
}

LedgerRowDateCell.displayName = 'LedgerRowDateCell';

export { LedgerRowDateCell };
