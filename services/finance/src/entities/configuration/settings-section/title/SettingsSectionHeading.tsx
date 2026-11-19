import { CardTitle } from "@internal/shared";

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
