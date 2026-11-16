import { useDimensions } from "../data-presenters";

import type { FC, ReactNode } from "react";
import type { Dimensions } from "@entity/filters";


interface ProtectDimensionsPendingProps {
	fallback: ReactNode;
	children: (dimensions: Dimensions) => ReactNode;
}

const ProtectDimensionsPending: FC<ProtectDimensionsPendingProps> = ({ fallback, children }) => {
	const { dimensions, isPending } = useDimensions();

	if (isPending || !dimensions) {
		return fallback;
	}

	return children(dimensions);
};

ProtectDimensionsPending.displayName = 'ProtectDimensionsPending';

export { ProtectDimensionsPending };
export type { ProtectDimensionsPendingProps };
