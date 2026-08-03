import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";


interface ScanReceiptContainerProps extends Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'> {
}

const ScanReceiptContainer: FC<ScanReceiptContainerProps> = ({ 
	children,
	...props
}) => (
	<span 
		className={cn(
			"flex w-full items-center gap-2.5 rounded-[var(--radius-md)]", 
			"border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)]", 
			"px-3.5 py-2.5 text-left transition-colors hover:border-primary",
		)} 
		{...props}
	>
		{children}
	</span>
);

ScanReceiptContainer.displayName = 'ScanReceiptContainer';

export { ScanReceiptContainer };
export type { ScanReceiptContainerProps };
