import { cn } from "@internal/ui-library";
import { PopoverSettingsHeading } from "./settings/PopoverSettingsHeading.tsx";
import { PopoverSettingsRow } from "./settings/PopoverSettingsRow.tsx";

import type { FC, PropsWithChildren } from "react";
import type { PopoverSettingsHeadingProps } from "./settings/PopoverSettingsHeading.tsx";
import type { PopoverSettingsRowProps } from "./settings/PopoverSettingsRow.tsx";


type PopoverSettingsProps = PropsWithChildren;
type PopoverSettingsObject = FC<PopoverSettingsProps> & {
	Heading: FC<PopoverSettingsHeadingProps>;
	Row: FC<PopoverSettingsRowProps>;
}

const PopoverSettings: PopoverSettingsObject = ({ children }) => (
	<div
		className={cn(
			"flex flex-col gap-3 px-3 py-3",
			"[&_h3]:whitespace-nowrap [&_h3]:text-[13px] [&_h3]:font-medium [&_h3]:text-text-2"
		)}
	>
		{children}
	</div>
);

PopoverSettings.Heading = PopoverSettingsHeading;
PopoverSettings.Row = PopoverSettingsRow;
PopoverSettings.displayName = 'PopoverSettings';

export { PopoverSettings };
export type { PopoverSettingsProps };
