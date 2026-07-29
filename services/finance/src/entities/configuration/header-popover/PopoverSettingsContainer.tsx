import type { FC, PropsWithChildren } from "react";


const PopoverSettingsContainer: FC<PropsWithChildren> = ({ children }) => (
	<div className="flex flex-col gap-3 px-3 py-3 [&_h3]:whitespace-nowrap [&_h3]:text-[13px] [&_h3]:font-medium [&_h3]:text-text-2">
		{children}
	</div>
);

export { PopoverSettingsContainer };