import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type SettingsSectionRowDescriptionProps = PropsWithChildren;

const SettingsSectionRowDescription: FC<SettingsSectionRowDescriptionProps> = ({ children }) => (
	<Caption size="11.5">
		{children}
	</Caption>
);

SettingsSectionRowDescription.displayName = 'SettingsSectionRowDescription';

export { SettingsSectionRowDescription };
export type { SettingsSectionRowDescriptionProps };
