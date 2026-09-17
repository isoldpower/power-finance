import { Caption, CardTitle } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface SettingsSectionTitleProps {
	description?: ReactNode;
	action?: ReactNode;
	children: ReactNode;
}

const SettingsSectionTitle: FC<SettingsSectionTitleProps> = ({
	description,
	action,
	children,
}) => (
	<header className="mb-3 flex items-start justify-between gap-4">
		<div className="flex min-w-0 flex-col gap-1">
			<CardTitle>
				{children}
			</CardTitle>
			{description === undefined ? null : (
				<Caption size="11.5">
					{description}
				</Caption>
			)}
		</div>
		{action === undefined ? null : (
			<div className="flex-none">
				{action}
			</div>
		)}
	</header>
);

SettingsSectionTitle.displayName = 'SettingsSectionTitle';

export { SettingsSectionTitle };
export type { SettingsSectionTitleProps };
