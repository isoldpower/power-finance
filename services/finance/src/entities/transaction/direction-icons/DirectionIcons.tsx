import type { FC } from "react";

interface GlyphProps {
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

TransferGlyph.displayName = 'TransferGlyph';
FromIcon.displayName = 'FromIcon';
ToIcon.displayName = 'ToIcon';

export { TransferGlyph, FromIcon, ToIcon };
