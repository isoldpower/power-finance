import type { FC, PropsWithChildren } from "react";


type PopoverSettingsHeadingProps = PropsWithChildren;

const PopoverSettingsHeading: FC<PopoverSettingsHeadingProps> = ({ children }) => (
	<h3>{children}</h3>
);

PopoverSettingsHeading.displayName = 'PopoverSettingsHeading';

export { PopoverSettingsHeading };
export type { PopoverSettingsHeadingProps };
