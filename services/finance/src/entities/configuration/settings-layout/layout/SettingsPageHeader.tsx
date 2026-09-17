import { Caption, PageTitle } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface SettingsPageHeaderProps {
	description?: ReactNode;
	children: ReactNode;
}

const SettingsPageHeader: FC<SettingsPageHeaderProps> = ({ description, children }) => (
	<header className="mb-6 flex flex-col gap-1 border-b border-border pb-4">
		<PageTitle>
			{children}
		</PageTitle>
		{description === undefined ? null : (
			<Caption size="12.5">
				{description}
			</Caption>
		)}
	</header>
);

SettingsPageHeader.displayName = 'SettingsPageHeader';

export { SettingsPageHeader };
export type { SettingsPageHeaderProps };
