import { NODE_LABEL_MIN_HEIGHT } from "../layout";

import type { FC, ReactNode } from "react";


interface ShowOnNodeLabelFitsProps {
	height: number;
	children: ReactNode;
}

const ShowOnNodeLabelFits: FC<ShowOnNodeLabelFitsProps> = ({ height, children }) => {
	if (height < NODE_LABEL_MIN_HEIGHT) {
		return null;
	}

	return children;
};

ShowOnNodeLabelFits.displayName = 'ShowOnNodeLabelFits';

export { ShowOnNodeLabelFits };
export type { ShowOnNodeLabelFitsProps };
