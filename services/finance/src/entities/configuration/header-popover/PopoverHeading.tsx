import type { FC, PropsWithChildren } from "react";


const PopoverHeading: FC<PropsWithChildren> = ({ children }) => (
	<div className="truncate text-sm font-semibold">
		{children}
	</div>
);

export { PopoverHeading };