import { MetaText } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type JournalPostingTitleProps = PropsWithChildren;

const JournalPostingTitle: FC<JournalPostingTitleProps> = ({ children }) => (
	<MetaText size="9.5" tracking="0.12em" className="whitespace-nowrap">
		{children}
	</MetaText>
);

JournalPostingTitle.displayName = 'JournalPostingTitle';

export { JournalPostingTitle };
export type { JournalPostingTitleProps };
