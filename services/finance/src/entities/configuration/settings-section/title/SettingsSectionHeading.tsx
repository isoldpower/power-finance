import { CardTitle } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type SettingsSectionHeadingProps = PropsWithChildren;

const SettingsSectionHeading: FC<SettingsSectionHeadingProps> = ({ children }) => (
	<CardTitle>
		{children}
	</CardTitle>
);

SettingsSectionHeading.displayName = 'SettingsSectionHeading';

export { SettingsSectionHeading };
export type { SettingsSectionHeadingProps };
