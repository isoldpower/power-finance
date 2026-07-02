import type { FC } from "react";

interface ScanReceiptIconProps {
	size?: number;
	className?: string;
}

const ScanReceiptIcon: FC<ScanReceiptIconProps> = ({ size = 15, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
		<circle cx="12" cy="13" r="4" />
	</svg>
);

ScanReceiptIcon.displayName = 'ScanReceiptIcon';

export { ScanReceiptIcon };
export type { ScanReceiptIconProps };
