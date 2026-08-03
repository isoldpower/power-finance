import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


interface ScanReceiptParagraphProps extends Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'> {
}

const ScanReceiptParagraph: FC<ScanReceiptParagraphProps> = ({ 
	children,
	...props
}) => (
	<span 
		className={cn("block text-[11.5px] text-text-2")} 
		{...props}
	>
		{children}
	</span>
);

ScanReceiptParagraph.displayName = 'ScanReceiptParagraph';

export { ScanReceiptParagraph };
export type { ScanReceiptParagraphProps };
