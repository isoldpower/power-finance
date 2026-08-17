import type { FC } from "react";
import type { LucideIcon } from "lucide-react";


interface AutomationGlyphProps {
	size?: number;
	className?: string;
	children: LucideIcon
}

const AutomationGlyph: FC<AutomationGlyphProps> = ({ 
	size = 16,
	className,
	children: Icon,
}) => (
	<Icon size={size} className={className} />
);

AutomationGlyph.displayName = 'AutomationGlyph';

export { AutomationGlyph };
export type { AutomationGlyphProps };
