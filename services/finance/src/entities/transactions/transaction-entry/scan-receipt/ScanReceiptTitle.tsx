import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type ScanReceiptTitleProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const ScanReceiptTitle: FC<ScanReceiptTitleProps> = ({
	children,
	...props
}) => (
	<Text as="span" size="13" weight="semibold" tone="accent" className="block" {...props}>
		{children}
	</Text>
);

ScanReceiptTitle.displayName = 'ScanReceiptTitle';

export { ScanReceiptTitle };
export type { ScanReceiptTitleProps };
