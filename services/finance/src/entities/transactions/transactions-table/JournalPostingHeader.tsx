import { cn } from "@internal/ui-library";
import { AiBadge } from "@shared/pure-components/badges";
import { JournalPostingBalance } from "./journal-header/JournalPostingBalance.tsx";
import { JournalPostingCheck } from "./journal-header/JournalPostingCheck.tsx";
import { JournalPostingTitle } from "./journal-header/JournalPostingTitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { JournalPostingBalanceProps } from "./journal-header/JournalPostingBalance.tsx";
import type { JournalPostingTitleProps } from "./journal-header/JournalPostingTitle.tsx";


type JournalPostingHeaderProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type JournalPostingHeaderObject = FC<JournalPostingHeaderProps> & {
	AiBadge: typeof AiBadge;
	Balance: FC<JournalPostingBalanceProps>;
	Check: FC;
	Title: FC<JournalPostingTitleProps>;
}

const JournalPostingHeader: JournalPostingHeaderObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-3 flex items-center gap-2"
		)}
		{...props}
	>
		{children}
	</div>
);

JournalPostingHeader.AiBadge = AiBadge;
JournalPostingHeader.Balance = JournalPostingBalance;
JournalPostingHeader.Check = JournalPostingCheck;
JournalPostingHeader.Title = JournalPostingTitle;
JournalPostingHeader.displayName = 'JournalPostingHeader';

export { JournalPostingHeader };
export type { JournalPostingHeaderProps };
