import { SettingsSectionAction } from "./title/SettingsSectionAction.tsx";
import { SettingsSectionHeading } from "./title/SettingsSectionHeading.tsx";
import { SettingsSectionTitleDescription } from "./title/SettingsSectionTitleDescription.tsx";
import { SettingsSectionTitleInfo } from "./title/SettingsSectionTitleInfo.tsx";

import type { FC, PropsWithChildren } from "react";
import type { SettingsSectionActionProps } from "./title/SettingsSectionAction.tsx";
import type { SettingsSectionHeadingProps } from "./title/SettingsSectionHeading.tsx";
import type { SettingsSectionTitleDescriptionProps } from "./title/SettingsSectionTitleDescription.tsx";
import type { SettingsSectionTitleInfoProps } from "./title/SettingsSectionTitleInfo.tsx";


type SettingsSectionTitleProps = PropsWithChildren;
type SettingsSectionTitleObject = FC<SettingsSectionTitleProps> & {
	Action: FC<SettingsSectionActionProps>;
	Description: FC<SettingsSectionTitleDescriptionProps>;
	Heading: FC<SettingsSectionHeadingProps>;
	Info: FC<SettingsSectionTitleInfoProps>;
};

const SettingsSectionTitle: SettingsSectionTitleObject = ({ children }) => (
	<header className="mb-3 flex items-start justify-between gap-4">
		{children}
	</header>
);

SettingsSectionTitle.Action = SettingsSectionAction;
SettingsSectionTitle.Description = SettingsSectionTitleDescription;
SettingsSectionTitle.Heading = SettingsSectionHeading;
SettingsSectionTitle.Info = SettingsSectionTitleInfo;
SettingsSectionTitle.displayName = 'SettingsSectionTitle';

export { SettingsSectionTitle };
export type { SettingsSectionTitleProps };
