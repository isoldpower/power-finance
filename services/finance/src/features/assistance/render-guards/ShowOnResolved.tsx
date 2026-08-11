import { useActions } from "../data-presenters/actions/use-actions.ts";

import type { FC, ReactNode } from "react";


interface ShowOnResolvedProps {
	children: ReactNode;
}

const ShowOnResolved: FC<ShowOnResolvedProps> = ({ children }) => {
	const { actions, isPending } = useActions();
	
	return !isPending && actions.length === 0 && children;
}

export { ShowOnResolved };