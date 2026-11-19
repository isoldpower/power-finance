import { getIsEmbedded } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface SwitchOnEmbeddingProps {
	embedded: ReactNode;
	standalone: ReactNode;
}

const SwitchOnEmbedding: FC<SwitchOnEmbeddingProps> = ({ embedded, standalone }) => {
	if (getIsEmbedded()) {
		return embedded;
	}

	return standalone;
};

SwitchOnEmbedding.displayName = 'SwitchOnEmbedding';

export { SwitchOnEmbedding };
export type { SwitchOnEmbeddingProps };
