import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


interface ScanReceiptTitleProps extends Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'> {
}

const ScanReceiptTitle: FC<ScanReceiptTitleProps> = ({ 
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

ScanReceiptTitle.displayName = 'ScanReceiptTitle';

export { ScanReceiptTitle };
export type { ScanReceiptTitleProps };
