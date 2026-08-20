import { cn } from "@internal/ui-library";
import { ReceiptPaperBody } from "./paper/ReceiptPaperBody.tsx";
import { ReceiptPaperBranch } from "./paper/ReceiptPaperBranch.tsx";
import { ReceiptPaperBrand } from "./paper/ReceiptPaperBrand.tsx";
import { ReceiptPaperDivider } from "./paper/ReceiptPaperDivider.tsx";
import { ReceiptPaperLine } from "./paper/ReceiptPaperLine.tsx";
import { ReceiptPaperScanline } from "./paper/ReceiptPaperScanline.tsx";
import { ReceiptPaperTotal } from "./paper/ReceiptPaperTotal.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ReceiptPaperBodyProps } from "./paper/ReceiptPaperBody.tsx";
import type { ReceiptPaperBranchProps } from "./paper/ReceiptPaperBranch.tsx";
import type { ReceiptPaperBrandProps } from "./paper/ReceiptPaperBrand.tsx";
import type { ReceiptPaperLineProps } from "./paper/ReceiptPaperLine.tsx";
import type { ReceiptPaperTotalProps } from "./paper/ReceiptPaperTotal.tsx";


type ReceiptPaperProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type ReceiptPaperObject = FC<ReceiptPaperProps> & {
	Body: FC<ReceiptPaperBodyProps>;
	Branch: FC<ReceiptPaperBranchProps>;
	Brand: FC<ReceiptPaperBrandProps>;
	Divider: FC;
	Line: FC<ReceiptPaperLineProps>;
	Scanline: FC;
	Total: FC<ReceiptPaperTotalProps>;
}

const ReceiptPaper: ReceiptPaperObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"relative w-[118px] flex-none overflow-hidden rounded-[10px]",
			"border border-border bg-[#f7f5ef] shadow-[var(--shadow)]"
		)}
		{...props}
	>
		{children}
	</div>
);

ReceiptPaper.Body = ReceiptPaperBody;
ReceiptPaper.Branch = ReceiptPaperBranch;
ReceiptPaper.Brand = ReceiptPaperBrand;
ReceiptPaper.Divider = ReceiptPaperDivider;
ReceiptPaper.Line = ReceiptPaperLine;
ReceiptPaper.Scanline = ReceiptPaperScanline;
ReceiptPaper.Total = ReceiptPaperTotal;
ReceiptPaper.displayName = 'ReceiptPaper';

export { ReceiptPaper };
export type { ReceiptPaperProps };
