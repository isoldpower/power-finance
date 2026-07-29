import type { PropsWithChildren, FC } from "react";


const PopoverSettingHeading: FC<PropsWithChildren> = ({ children }) => (
	<h3>{children}</h3>
);

export { PopoverSettingHeading };