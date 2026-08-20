import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type EntryAmountEmphasis = 'default' | 'accent';
type EntryAmountFieldBoxProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
		emphasis?: EntryAmountEmphasis;
	}
>;

const BOX_BY_EMPHASIS: Record<EntryAmountEmphasis, string> = {
	default: 'border border-border-strong px-3.5 py-2.5',
	accent: 'border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]',
};

const EntryAmountFieldBox: FC<EntryAmountFieldBoxProps> = ({
	children,
	emphasis = 'default',
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2 rounded-[var(--radius-md)]",
			BOX_BY_EMPHASIS[emphasis]
		)}
		{...props}
	>
		{children}
	</div>
);

EntryAmountFieldBox.displayName = 'EntryAmountFieldBox';

export { EntryAmountFieldBox };
export type { EntryAmountFieldBoxProps, EntryAmountEmphasis };
