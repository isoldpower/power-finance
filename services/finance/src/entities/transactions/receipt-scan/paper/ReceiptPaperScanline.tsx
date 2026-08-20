import { cn } from "@internal/ui-library";

import type { FC } from "react";


const ReceiptPaperScanline: FC = () => (
	<div
		className={cn(
			"fx-scanline pointer-events-none absolute inset-x-0 z-10 h-0.5",
			"bg-primary shadow-[0_0_10px_2px_var(--glow)]"
		)}
	/>
);

ReceiptPaperScanline.displayName = 'ReceiptPaperScanline';

export { ReceiptPaperScanline };
