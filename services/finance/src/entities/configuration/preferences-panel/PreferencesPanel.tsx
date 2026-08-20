import { cn } from "@internal/ui-library";
import { PreferencesPanelRow } from "./panel/PreferencesPanelRow.tsx";
import { PreferencesPanelTitle } from "./panel/PreferencesPanelTitle.tsx";

import type { FC, PropsWithChildren } from "react";
import type { PreferencesPanelRowProps } from "./panel/PreferencesPanelRow.tsx";
import type { PreferencesPanelTitleProps } from "./panel/PreferencesPanelTitle.tsx";


type PreferencesPanelProps = PropsWithChildren;
type PreferencesPanelObject = FC<PreferencesPanelProps> & {
	Row: FC<PreferencesPanelRowProps>;
	Title: FC<PreferencesPanelTitleProps>;
};

const PreferencesPanel: PreferencesPanelObject = ({ children }) => (
	<section 
		className={cn(
			"flex max-w-[720px] flex-col gap-1",
			"rounded-[var(--radius-md)] border border-border bg-surface p-5"
		)}
	>
		{children}
	</section>
);

PreferencesPanel.Row = PreferencesPanelRow;
PreferencesPanel.Title = PreferencesPanelTitle;
PreferencesPanel.displayName = 'PreferencesPanel';

export { PreferencesPanel };
export type { PreferencesPanelProps };
