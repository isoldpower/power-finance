import { BodyText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type ScanReceiptParagraphProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const ScanReceiptParagraph: FC<ScanReceiptParagraphProps> = ({
	children,
	...props
}) => (
	<BodyText as="span" size="11.5" className="block" {...props}>
		{children}
	</BodyText>
);

ScanReceiptParagraph.displayName = 'ScanReceiptParagraph';

export { ScanReceiptParagraph };
export type { ScanReceiptParagraphProps };
