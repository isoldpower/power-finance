import { cn } from "@internal/ui-library";
import { SettingsSectionRow } from "./section/SettingsSectionRow.tsx";
import { SettingsSectionTitle } from "./section/SettingsSectionTitle.tsx";

import type { FC, PropsWithChildren } from "react";
import type { SettingsSectionRowProps } from "./section/SettingsSectionRow.tsx";
import type { SettingsSectionTitleProps } from "./section/SettingsSectionTitle.tsx";


type SettingsSectionProps = PropsWithChildren<{
	id?: string;
}>;
type SettingsSectionObject = FC<SettingsSectionProps> & {
	Row: FC<SettingsSectionRowProps>;
	Title: FC<SettingsSectionTitleProps>;
};

const SettingsSection: SettingsSectionObject = ({ children, id }) => (
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

SettingsSection.Row = SettingsSectionRow;
SettingsSection.Title = SettingsSectionTitle;
SettingsSection.displayName = 'SettingsSection';

export { SettingsSection };
export type { SettingsSectionProps };
