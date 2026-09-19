import { cn } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type SettingsSectionProps = PropsWithChildren<{
	id?: string;
}>;

const SettingsSection: FC<SettingsSectionProps> = ({ children, id }) => (
	<section
		id={id}
		className={cn(
			"flex flex-col gap-1",
			"rounded-[var(--radius-md)] border border-border bg-surface p-5"
		)}
	>
		{children}
	</section>
);

SettingsSection.displayName = 'SettingsSection';

export { SettingsSection };
export type { SettingsSectionProps };
