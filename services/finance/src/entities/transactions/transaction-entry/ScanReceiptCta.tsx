import { cn } from "@internal/ui-library";
import { ScanReceiptParagraph } from "./scan-receipt/ScanReceiptParagraph.tsx";
import { ScanReceiptTitle } from "./scan-receipt/ScanReceiptTitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ScanReceiptParagraphProps } from "./scan-receipt/ScanReceiptParagraph.tsx";
import type { ScanReceiptTitleProps } from "./scan-receipt/ScanReceiptTitle.tsx";


type ScanReceiptCtaProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;
type ScanReceiptCtaObject = FC<ScanReceiptCtaProps> & {
	Paragraph: FC<ScanReceiptParagraphProps>;
	Title: FC<ScanReceiptTitleProps>;
}

const ScanReceiptCta: ScanReceiptCtaObject = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"flex w-full items-center gap-2.5 rounded-[var(--radius-md)]",
			"border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)]",
			"px-3.5 py-2.5 text-left transition-colors hover:border-primary"
		)}
		{...props}
	>
		{children}
	</span>
);

ScanReceiptCta.Paragraph = ScanReceiptParagraph;
ScanReceiptCta.Title = ScanReceiptTitle;
ScanReceiptCta.displayName = 'ScanReceiptCta';

export { ScanReceiptCta };
export type { ScanReceiptCtaProps };
