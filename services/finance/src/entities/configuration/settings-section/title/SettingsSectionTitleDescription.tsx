import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type SettingsSectionTitleDescriptionProps = PropsWithChildren;

const SettingsSectionTitleDescription: FC<SettingsSectionTitleDescriptionProps> = ({ children }) => (
	<Caption size="11.5">
		{children}
	</Caption>
);

SettingsSectionTitleDescription.displayName = 'SettingsSectionTitleDescription';

export { SettingsSectionTitleDescription };
export type { SettingsSectionTitleDescriptionProps };
