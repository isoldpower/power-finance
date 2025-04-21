import {FC} from "react";

const SidebarError: FC = ({ }) => {
	return (
		<div className="flex items-center gap-4 px-2">
			<div className="h-7 w-7 rounded-full bg-destructive" />
			<div
				className="h-4 w-16 rounded bg-destructive" />
		</div>
	)
}

SidebarError.displayName = 'SidebarError';

export { SidebarError };
