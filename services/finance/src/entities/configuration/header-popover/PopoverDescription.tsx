import type { FC, PropsWithChildren } from "react";


const PopoverDescription: FC<PropsWithChildren> = ({ children }) => (
	<div className="truncate text-[11.5px] text-text-3">
		{children}
	</div>
);

export { PopoverDescription };