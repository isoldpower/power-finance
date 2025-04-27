import type {FC, ReactNode} from "react";

interface PreferencesModalBoxProps {
	children: ReactNode;
}

const PreferencesModalBox: FC<PreferencesModalBoxProps> = ({ children }) => {
	return (
		<div className="flex flex-col gap-4 p-2">
			<h3 className="text-lg font-bold">
				Configure preferences
			</h3>
			<div className="flex flex-col gap-4">
				{children}
			</div>
		</div>
	)
}

PreferencesModalBox.displayName = 'PreferencesModalBox';

export { PreferencesModalBox };
export type { PreferencesModalBoxProps };