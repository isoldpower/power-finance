import { useActions } from "../data-presenters";

import type { FC, ReactNode } from "react";


interface ShowOnUnresolvedProps {
	children: ReactNode;
}

const ShowOnUnresolved: FC<ShowOnUnresolvedProps> = ({ children }) => {
	const { actions, isPending } = useActions();
	
	if (!isPending && actions.length === 0) {
		return null;
	}

	return children;
}

export { ShowOnUnresolved };