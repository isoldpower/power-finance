import { Icons } from "@internal/ui-library";

import type { FC } from "react";

interface GlyphProps {
	className?: string;
}

interface AmountDirectionIconProps {
	size?: number;
	className?: string;
}

const TransferGlyph: FC<GlyphProps & { size?: number }> = ({ className, size = 24 }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<path d="M7 10l-4 4 4 4" />
		<path d="M3 14h13a4 4 0 0 0 4-4V6" />
	</svg>
);

const FromIcon: FC<GlyphProps> = ({ className }) => (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<line x1="7" y1="17" x2="17" y2="7" />
		<polyline points="7 7 17 7 17 17" />
	</svg>
);

const ToIcon: FC<GlyphProps> = ({ className }) => (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<line x1="7" y1="7" x2="17" y2="17" />
		<polyline points="17 7 17 17 7 17" />
	</svg>
);

const IncomeIcon: FC<AmountDirectionIconProps> = ({ size = 16, className }) => (
	<Icons.ArrowDownLeft size={size} className={className} />
);

const ExpenseIcon: FC<AmountDirectionIconProps> = ({ size = 16, className }) => (
	<Icons.ArrowUpRight size={size} className={className} />
);

const ForwardIcon: FC<AmountDirectionIconProps> = ({ size = 16, className }) => (
	<Icons.ArrowRight size={size} className={className} />
);

TransferGlyph.displayName = 'TransferGlyph';
FromIcon.displayName = 'FromIcon';
ToIcon.displayName = 'ToIcon';
IncomeIcon.displayName = 'IncomeIcon';
ExpenseIcon.displayName = 'ExpenseIcon';
ForwardIcon.displayName = 'ForwardIcon';

export { TransferGlyph, FromIcon, ToIcon, IncomeIcon, ExpenseIcon, ForwardIcon };
export type { AmountDirectionIconProps };
