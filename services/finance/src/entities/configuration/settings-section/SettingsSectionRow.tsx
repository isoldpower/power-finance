import { cn } from "@internal/ui-library";
import { SettingsSectionControl } from "./row/SettingsSectionControl.tsx";
import { SettingsSectionLabel } from "./row/SettingsSectionLabel.tsx";
import { SettingsSectionRowDescription } from "./row/SettingsSectionRowDescription.tsx";
import { SettingsSectionRowInfo } from "./row/SettingsSectionRowInfo.tsx";

import type { FC, PropsWithChildren } from "react";
import type { SettingsSectionControlProps } from "./row/SettingsSectionControl.tsx";
import type { SettingsSectionLabelProps } from "./row/SettingsSectionLabel.tsx";
import type { SettingsSectionRowDescriptionProps } from "./row/SettingsSectionRowDescription.tsx";
import type { SettingsSectionRowInfoProps } from "./row/SettingsSectionRowInfo.tsx";


type SettingsSectionRowProps = PropsWithChildren;
type SettingsSectionRowObject = FC<SettingsSectionRowProps> & {
	Control: FC<SettingsSectionControlProps>;
	Description: FC<SettingsSectionRowDescriptionProps>;
	Info: FC<SettingsSectionRowInfoProps>;
	Label: FC<SettingsSectionLabelProps>;
};

const SettingsSectionRow: SettingsSectionRowObject = ({ children }) => (
	<div
		className={cn(
			"flex flex-col gap-2 border-b border-border py-3",
			"last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
		)}
	>
		{children}
	</div>
);

SettingsSectionRow.Control = SettingsSectionControl;
SettingsSectionRow.Description = SettingsSectionRowDescription;
SettingsSectionRow.Info = SettingsSectionRowInfo;
SettingsSectionRow.Label = SettingsSectionLabel;
SettingsSectionRow.displayName = 'SettingsSectionRow';

export { SettingsSectionRow };
export type { SettingsSectionRowProps };
