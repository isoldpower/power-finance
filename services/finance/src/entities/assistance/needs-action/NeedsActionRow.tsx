import { cn } from "@internal/ui-library";
import { NeedsActionRowIcon } from "./row/NeedsActionRowIcon.tsx";
import { NeedsActionRowSubtitle } from "./row/NeedsActionRowSubtitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { NeedsActionRowIconProps } from "./row/NeedsActionRowIcon.tsx";
import type { NeedsActionRowSubtitleProps } from "./row/NeedsActionRowSubtitle.tsx";


type NeedsActionRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type NeedsActionRowObject = FC<NeedsActionRowProps> & {
	Icon: FC<NeedsActionRowIconProps>;
	Subtitle: FC<NeedsActionRowSubtitleProps>;
}

const NeedsActionRow: NeedsActionRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-3.5 border-b border-border",
			"px-[18px] py-3.5 last:border-b-0 hover:bg-secondary"
		)}
		{...props}
	>
		{children}
	</div>
);

NeedsActionRow.Icon = NeedsActionRowIcon;
NeedsActionRow.Subtitle = NeedsActionRowSubtitle;
NeedsActionRow.displayName = 'NeedsActionRow';

export { NeedsActionRow };
export type { NeedsActionRowProps };
