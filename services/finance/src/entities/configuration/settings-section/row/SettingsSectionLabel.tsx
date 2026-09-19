import { RowTitle } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type SettingsSectionLabelProps = PropsWithChildren;

const SettingsSectionLabel: FC<SettingsSectionLabelProps> = ({ children }) => (
	<RowTitle>
		{children}
	</RowTitle>
);

SettingsSectionLabel.displayName = 'SettingsSectionLabel';

export { SettingsSectionLabel };
export type { SettingsSectionLabelProps };
