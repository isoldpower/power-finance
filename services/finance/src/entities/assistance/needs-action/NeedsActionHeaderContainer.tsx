import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";


type NeedsActionHeaderTone = 'accent' | 'positive';

interface NeedsActionHeaderContainerProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	tone?: NeedsActionHeaderTone;
}

const NeedsActionHeaderContainer: FC<NeedsActionHeaderContainerProps> = ({
	children,
	tone = 'accent',
	...props
}) => (
	<div className={cn(
		"flex items-center gap-2.5 border-b border-border px-[18px] py-3.5",
		tone === 'accent' && "bg-[var(--accent-soft)]",
		tone === 'positive' && "border-b-0 bg-pos-soft"
	)} {...props}>
		{children}
	</div>
);

NeedsActionHeaderContainer.displayName = 'NeedsActionHeaderContainer';

export { NeedsActionHeaderContainer };
export type { NeedsActionHeaderContainerProps, NeedsActionHeaderTone };
