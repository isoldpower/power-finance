import { NODE_VALUE_MIN_HEIGHT } from "../layout";

import type { FC, ReactNode } from "react";


interface ShowOnNodeValueFitsProps {
	height: number;
	children: ReactNode;
}

const ShowOnNodeValueFits: FC<ShowOnNodeValueFitsProps> = ({ height, children }) => {
	if (height < NODE_VALUE_MIN_HEIGHT) {
		return null;
	}

	return children;
};

ShowOnNodeValueFits.displayName = 'ShowOnNodeValueFits';

export { ShowOnNodeValueFits };
export type { ShowOnNodeValueFitsProps };
