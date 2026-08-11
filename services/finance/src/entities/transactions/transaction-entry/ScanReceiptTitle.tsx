
import type { BaseHTMLAttributes, FC } from "react";
import { BodyText } from "@shared/pure-components/typography";


interface ScanReceiptTitleProps extends Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'> {
}

const ScanReceiptTitle: FC<ScanReceiptTitleProps> = ({ 
	children,
	...props
}) => (
	<BodyText
			as="span"
			size="11.5"
			className="block"
			{...props}
		>
		{children}
	</BodyText>
);

ScanReceiptTitle.displayName = 'ScanReceiptTitle';

export { ScanReceiptTitle };
export type { ScanReceiptTitleProps };
