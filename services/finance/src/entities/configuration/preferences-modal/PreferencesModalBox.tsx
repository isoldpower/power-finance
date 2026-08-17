import { Text } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface PreferencesModalBoxProps {
	children: ReactNode;
}

const PreferencesModalBox: FC<PreferencesModalBoxProps> = ({ children }) => {
	return (
		<div className="flex flex-col gap-4 p-2">
			<Text as="h2" size="lg" weight="bold">
				Configure preferences
			</Text>
			<div className="flex flex-col gap-4">
				{children}
			</div>
		</div>
	)
}

PreferencesModalBox.displayName = 'PreferencesModalBox';

export { PreferencesModalBox };
export type { PreferencesModalBoxProps };