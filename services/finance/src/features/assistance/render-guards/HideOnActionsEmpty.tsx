import {FC, ReactNode} from "react";

interface HideOnActionsEmptyProps {
	isPending: boolean;
	actions: unknown[];
	children: ReactNode;
}

const HideOnActionsEmpty: FC<HideOnActionsEmptyProps> = ({
	isPending,
	actions,
	children,
}) => {
	if (!isPending && actions.length === 0) {
		return null;
	}
	
	return children;
}

export { HideOnActionsEmpty };