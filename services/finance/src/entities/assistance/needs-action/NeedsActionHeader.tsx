import { cn } from "@internal/ui-library";
import { NeedsActionHeaderBadge } from "./header/NeedsActionHeaderBadge.tsx";
import { NeedsActionHeaderDescriptor } from "./header/NeedsActionHeaderDescriptor.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { NeedsActionHeaderBadgeProps } from "./header/NeedsActionHeaderBadge.tsx";
import type { NeedsActionHeaderDescriptorProps } from "./header/NeedsActionHeaderDescriptor.tsx";


type NeedsActionHeaderTone = 'accent' | 'neutral';
type NeedsActionHeaderProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	tone?: NeedsActionHeaderTone;
	divided?: boolean;
}>;
type NeedsActionHeaderObject = FC<NeedsActionHeaderProps> & {
	Badge: FC<NeedsActionHeaderBadgeProps>;
	Descriptor: FC<NeedsActionHeaderDescriptorProps>;
}

const NeedsActionHeader: NeedsActionHeaderObject = ({
	children,
	tone = 'accent',
	divided = true,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2.5 px-[18px] py-3.5",
			divided && "border-b border-border",
			tone === 'accent' && "bg-[var(--accent-soft)]"
		)}
		{...props}
	>
		{children}
	</div>
);

NeedsActionHeader.Badge = NeedsActionHeaderBadge;
NeedsActionHeader.Descriptor = NeedsActionHeaderDescriptor;
NeedsActionHeader.displayName = 'NeedsActionHeader';

export { NeedsActionHeader };
export type { NeedsActionHeaderProps, NeedsActionHeaderTone };
