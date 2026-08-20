import { RowTitle } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface WalletsRecentTitleProps {
	children: ReactNode;
}

const WalletsRecentTitle: FC<WalletsRecentTitleProps> = ({ children }) => (
	<div className="px-[18px] pb-1 pt-3.5">
		<RowTitle as="span" size="13.5">
			{children}
		</RowTitle>
	</div>
);

WalletsRecentTitle.displayName = 'WalletsRecentTitle';

export { WalletsRecentTitle };
export type { WalletsRecentTitleProps };
