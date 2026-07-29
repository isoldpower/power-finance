import type { FC, PropsWithChildren } from "react";


const PopoverBottom: FC<PropsWithChildren> = ({ children }) => (
	<div className="border-t border-border p-1">
		{children}
	</div>
);

export { PopoverBottom };