import { ScanReceiptIcon } from "../icons/ScanReceiptIcon.tsx";

import type { FC } from "react";


interface ScanReceiptCtaProps {
	onClick: () => void;
	className?: string;
}

const ScanReceiptCta: FC<ScanReceiptCtaProps> = ({ onClick, className }) => (
	<button
		type="button"
		onClick={onClick}
		className={className}
	>
		<span className="flex w-full items-center gap-2.5 rounded-[var(--radius-md)] border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-2.5 text-left transition-colors hover:border-primary">
			<ScanReceiptIcon size={18} className="flex-none text-primary" />
			<span className="flex-1">
				<span className="block text-[13px] font-semibold text-primary">Scan a receipt instead</span>
				<span className="block text-[11.5px] text-text-2">Let AI fill the details for you</span>
			</span>
			<span className="text-primary">→</span>
		</span>
	</button>
);

ScanReceiptCta.displayName = 'ScanReceiptCta';

export { ScanReceiptCta };
export type { ScanReceiptCtaProps };
