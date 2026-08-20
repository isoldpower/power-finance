import { useState } from "react";
import { createWalletsSelectionStore } from "./selection-store.ts";
import { WalletsSelectionReactContext } from "./context.ts";

import type { FC, PropsWithChildren } from "react";
import type { WalletsSelection } from "./types.ts";


type WalletsSelectionProviderProps = PropsWithChildren<Partial<WalletsSelection>>;

const WalletsSelectionProvider: FC<WalletsSelectionProviderProps> = ({
	children,
	...initialValue
}) => {
	const [zustandStore] = useState(() => {
		return createWalletsSelectionStore(initialValue);
	});

	return (
		<WalletsSelectionReactContext value={zustandStore}>
			{children}
		</WalletsSelectionReactContext>
	);
}

export { WalletsSelectionProvider };
