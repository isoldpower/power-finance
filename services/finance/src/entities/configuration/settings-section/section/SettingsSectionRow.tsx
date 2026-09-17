import { cn } from "@internal/ui-library";
import { Caption, RowTitle } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface SettingsSectionRowProps {
	label: ReactNode;
	description?: ReactNode;
	children: ReactNode;
}

const SettingsSectionRow: FC<SettingsSectionRowProps> = ({
	label,
	description,
	children,
}) => (
	<div
		className={cn(
			"flex flex-col gap-2 border-b border-border py-3",
			"last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
		)}
	>
		<div className="min-w-0">
			<RowTitle>
				{label}
			</RowTitle>
			{description === undefined ? null : (
				<Caption size="11.5">
					{description}
				</Caption>
			)}
		</div>
		<div className="w-full flex-none sm:w-[260px]">
			{children}
		</div>
	</div>
);

SettingsSectionRow.displayName = 'SettingsSectionRow';

export { SettingsSectionRow };
export type { SettingsSectionRowProps };
