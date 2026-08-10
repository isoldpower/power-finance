import { useActions } from "@feature/assistance";

import type { FC, ReactNode } from "react";


interface ShowOnUnresolvedProps {
	children: ReactNode;
}

const ShowOnUnresolved: FC<ShowOnUnresolvedProps> = ({ children }) => {
	const { actions, isPending } = useActions();
	
	return isPending || actions.length !== 0 && children;
}

export { ShowOnUnresolved };