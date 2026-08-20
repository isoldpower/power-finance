import { Caption, CardTitle } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface PreferencesPanelTitleProps {
	description?: ReactNode;
	children: ReactNode;
}

const PreferencesPanelTitle: FC<PreferencesPanelTitleProps> = ({ description, children }) => (
	<header className="mb-3 flex flex-col gap-1">
		<CardTitle>
			{children}
		</CardTitle>
		{description === undefined ? null : (
			<Caption size="11.5">
				{description}
			</Caption>
		)}
	</header>
);

PreferencesPanelTitle.displayName = 'PreferencesPanelTitle';

export { PreferencesPanelTitle };
export type { PreferencesPanelTitleProps };
