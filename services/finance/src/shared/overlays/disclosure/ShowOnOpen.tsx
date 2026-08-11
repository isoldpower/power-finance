import type { FC, ReactNode } from "react";


interface ShowOnOpenProps {
	open: boolean;
	children: ReactNode;
}

const ShowOnOpen: FC<ShowOnOpenProps> = ({ open, children }) => {
	return open ? children : null;
}

export { ShowOnOpen };