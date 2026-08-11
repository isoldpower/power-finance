import type { BaseHTMLAttributes, FC } from "react";
import { Text } from "@shared/pure-components/typography";


interface ScanReceiptTitleProps extends Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'> {
}

const ScanReceiptTitle: FC<ScanReceiptTitleProps> = ({
	children,
	...props
}) => (
	<Text
		as="span"
		size="13"
		weight="semibold"
		tone="accent"
		className="block"
		{...props}
	>
		{children}
	</Text>
);

ScanReceiptTitle.displayName = 'ScanReceiptTitle';

export { ScanReceiptTitle };
export type { ScanReceiptTitleProps };
